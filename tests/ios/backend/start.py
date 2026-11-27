"""Start real services in an empty temporary Postgres cluster on the CI Mac."""
import base64, hashlib, hmac, json, os, secrets, subprocess as sp, sys, time
from pathlib import Path
from urllib.request import Request, urlopen

work, binaries = (Path(v).resolve() for v in sys.argv[1:3])
root = Path(__file__).resolve().parents[3]
work.mkdir(parents=True, exist_ok=True)
key, password = secrets.token_urlsafe(48), secrets.token_hex(20)
db = {'PGHOST':'127.0.0.1', 'PGPORT':'55322', 'PGUSER':'postgres', 'PGDATABASE':'postgres'}
os.environ.update(db)
def token(role):
    def enc(raw):
        return base64.urlsafe_b64encode(raw).rstrip(b'=')
    head = enc(b'{"alg":"HS256","typ":"JWT"}')
    payload = enc(json.dumps({'role':role,'iss':'local-supabase','exp':int(time.time())+86400}).encode())
    body = head+b'.'+payload
    return (body+b'.'+enc(hmac.new(key.encode(),body,hashlib.sha256).digest())).decode()
anon,service = token('anon'),token('service_role')
def run(command, settings, name, directory):
    with (work/(name+'.log')).open('wb') as log:
        proc = sp.Popen(command,cwd=directory,env={**os.environ,**settings},stdout=log,stderr=log,start_new_session=True)
        proc.log_path = work/(name+'.log')
        return proc
def check(url, process):
    for _ in range(120):
        try:
            with urlopen(url,timeout=1): return
        except OSError:
            if process.poll() is not None:
                diagnostic=process.log_path.read_text(errors='replace')[-2500:]
                for secret in [key,password,service,anon]: diagnostic=diagnostic.replace(secret,'[redacted]')
                raise RuntimeError('Local service exited: '+url+'\n'+diagnostic)
            time.sleep(.5)
    raise RuntimeError('Local service timed out: '+url)
def sql(source):
    sp.run(['psql','-Xq','-v','ON_ERROR_STOP=1'],input=source.encode(),check=True)
def uri(user):
    return 'postgresql://'+user+':'+password+'@127.0.0.1:55322/postgres?sslmode=disable'
sp.run(['initdb','-D',work/'pg','-U','postgres','-A','trust','-E','UTF8','--no-locale'],stdout=sp.DEVNULL,check=True)
sp.run(['pg_ctl','-D',work/'pg','-l',work/'postgres.log','-o',"-p 55322 -h 127.0.0.1",'start'],check=True)
sql(f"""
create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
create role authenticator login noinherit password '{password}'; grant anon,authenticated,service_role to authenticator;
create role supabase_auth_admin login password '{password}'; create schema auth authorization supabase_auth_admin;
alter role supabase_auth_admin set search_path=auth,public;
create role supabase_storage_admin login bypassrls password '{password}'; create schema storage authorization supabase_storage_admin;
alter role supabase_storage_admin set search_path=storage,public;
grant usage on schema auth,storage,public to anon,authenticated,service_role;
alter default privileges in schema public grant all on tables to anon,authenticated,service_role;
alter default privileges in schema public grant all on sequences to anon,authenticated,service_role;
create function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{{}}')::jsonb$$;
create function auth.uid() returns uuid language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claim.sub',true),''),auth.jwt()->>'sub')::uuid$$;
create function auth.role() returns text language sql stable as $$select auth.jwt()->>'role'$$;
""")
mail=run([binaries/'mail/mailpit'],{'MP_UI_BIND_ADDR':'127.0.0.1:55325','MP_SMTP_BIND_ADDR':'127.0.0.1:55328'},'mail',work)
check('http://127.0.0.1:55325/livez',mail)
auth=run([binaries/'auth/auth'],{'GOTRUE_API_HOST':'127.0.0.1','GOTRUE_API_PORT':'55324','API_EXTERNAL_URL':'http://127.0.0.1:55321/auth/v1','GOTRUE_SITE_URL':'http://127.0.0.1:55321','GOTRUE_DB_DRIVER':'postgres','GOTRUE_DB_DATABASE_URL':uri('supabase_auth_admin'),'GOTRUE_JWT_SECRET':key,'GOTRUE_JWT_DEFAULT_GROUP_NAME':'authenticated','GOTRUE_JWT_ADMIN_ROLES':'service_role','GOTRUE_EXTERNAL_EMAIL_ENABLED':'true','GOTRUE_MAILER_AUTOCONFIRM':'false','GOTRUE_JWT_EXP':'3600','GOTRUE_MAILER_URLPATHS_CONFIRMATION':'/verify','GOTRUE_MAILER_URLPATHS_RECOVERY':'/verify','GOTRUE_SMTP_HOST':'127.0.0.1','GOTRUE_SMTP_PORT':'55328','GOTRUE_SMTP_ADMIN_EMAIL':'ocean@example.invalid','GOTRUE_SMTP_MAX_FREQUENCY':'1s'},'auth',binaries/'auth')
check('http://127.0.0.1:55324/health',auth)
rest=run([binaries/'rest/postgrest'],{'PGRST_SERVER_HOST':'127.0.0.1','PGRST_SERVER_PORT':'55326','PGRST_DB_URI':uri('authenticator'),'PGRST_DB_SCHEMAS':'public','PGRST_DB_ANON_ROLE':'anon','PGRST_JWT_SECRET':key},'rest',work)
check('http://127.0.0.1:55326/',rest)
storage=run(['node','dist/start/server.js'],{'DATABASE_URL':uri('supabase_storage_admin'),'DATABASE_SEARCH_PATH':'storage,public','ANON_KEY':anon,'SERVICE_KEY':service,'PGRST_JWT_SECRET':key,'POSTGREST_URL':'http://127.0.0.1:55326','STORAGE_BACKEND':'file','FILE_STORAGE_BACKEND_PATH':str(work/'objects'),'TENANT_ID':'local','REGION':'local','GLOBAL_S3_BUCKET':'local','DB_INSTALL_ROLES':'false','DB_ANON_ROLE':'anon','DB_AUTHENTICATED_ROLE':'authenticated','DB_SERVICE_ROLE':'service_role','SERVER_HOST':'127.0.0.1','SERVER_PORT':'55327','FILE_SIZE_LIMIT':'10485760'},'storage',binaries/'storage')
check('http://127.0.0.1:55327/status',storage)
for p in [root/'supabase/bootstrap.sql', *sorted((root/'supabase/migrations').glob('*.sql'))]:
    sql(p.read_text())
sql("notify pgrst,'reload schema';")
gateway=run([sys.executable,Path(__file__).with_name('gateway.py')],{},'gateway',work)
check('http://127.0.0.1:55321/auth/v1/health',gateway)
# All credentials belong to this disposable cluster. Only the public key reaches Metro.
testpass=secrets.token_urlsafe(22)
address='ocean-'+secrets.token_hex(4)+'@example.invalid'
user = Request('http://127.0.0.1:55324/admin/users',data=json.dumps({'email':address,'password':testpass,'email_confirm':True,'app_metadata':{'role':'admin'}}).encode(),headers={'Authorization':'Bearer '+service,'Content-Type':'application/json'})
with urlopen(user) as r: assert r.status in (200,201)
with Path(os.environ['GITHUB_ENV']).open('a') as env:
    env.write('EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:55321\nEXPO_PUBLIC_SUPABASE_ANON_KEY='+anon+'\nQA_EMAIL='+address+'\nQA_PASSWORD='+testpass+'\n')
print('Isolated Supabase Auth, PostgREST, PostgreSQL, Storage and Mailpit are ready.')
