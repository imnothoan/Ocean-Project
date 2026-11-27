"""Loopback routing for the simulator's isolated GoTrue, PostgREST and Storage."""
from http.client import HTTPConnection
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

class Gateway(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def proxy(self):
        prefix, _, path = self.path[1:].partition('/v1')
        ports = {'auth': 55324, 'rest': 55326, 'storage': 55327}
        if prefix not in ports:
            return self.send_error(404)
        conn = HTTPConnection('127.0.0.1', ports[prefix], timeout=30)
        try:
            data = self.rfile.read(int(self.headers.get('Content-Length', 0)))
            headers = {k:v for k,v in self.headers.items() if k.lower() not in ('host','connection','accept-encoding')}
            conn.request(self.command,path or '/',data,headers)
            r = conn.getresponse()
            body = r.read()
            self.send_response(r.status)
            for k,v in r.getheaders():
                if k.lower() not in ('transfer-encoding','connection','content-length'):
                    self.send_header(k,v)
            self.send_header('Content-Length',str(len(body)))
            self.end_headers()
            if self.command != 'HEAD':
                self.wfile.write(body)
        finally:
            conn.close()

    do_GET = do_HEAD = do_POST = do_PATCH = do_PUT = do_DELETE = proxy

if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1',55321),Gateway).serve_forever()
