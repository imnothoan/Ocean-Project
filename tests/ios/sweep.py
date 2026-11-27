"""Generate native navigation checks from the real frame registry."""
import json, re, sys
from pathlib import Path

repo = Path(__file__).resolve().parents[2]
frames = re.findall(r'^\s*"(\d+:\d+)": (\w+),?$', (repo/'src/features/design/frames.ts').read_text(), re.M)
# Receipts require a successful action. A bare URL intentionally cannot issue one.
stateful = {'1581:1764','1581:1986','230:1402','258:1177','258:1450','1253:517','670:5193'}
out = ['appId: host.exp.Exponent', '---']
for frame, screen in frames:
    if screen.startswith('AnimatedLogo') or frame in stateful:
        continue
    out.extend(['- openLink: "exp://127.0.0.1:8081/--/frame/'+frame.replace(':','-')+'"',
                '- extendedWaitUntil:', '    visible:', '      id: '+json.dumps('frame-'+frame),
                '    timeout: 18000','- waitForAnimationToEnd', '- takeScreenshot: '+frame.replace(':','-')])
Path(sys.argv[1]).write_text('\n'.join(out)+'\n')
print('Scheduled native navigation and capture for', len(frames)-len(stateful)-5, 'deep-linkable screens.')
