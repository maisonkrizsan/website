#!/usr/bin/env python3
"""Maison build/release smoke tests. Stdlib only. Run from repository root."""
import argparse, pathlib, re, sys, urllib.request, urllib.error, json
root=pathlib.Path(__file__).resolve().parents[1]
errors=[]
checks=0

def test(condition,label):
    global checks
    checks+=1
    if not condition: errors.append(label)

pages=['index.html','work.html','enquire.html','privacy.html','terms.html','accessibility.html']
for file in pages:
    f=root/file
    test(f.exists(),f'{file} missing')
    if not f.exists(): continue
    s=f.read_text(encoding='utf-8')
    test('<main' in s,f'{file}: no <main>')
    test('<h1' in s,f'{file}: no <h1>')
    test('rel="canonical"' in s or 'rel="canonical"' in s.replace("'",'"'),f'{file}: canonical missing')
    for path in re.findall(r'(?:src|href|poster|data-src)=["\'](/(?:assets|styles\.css|script\.js|enquire\.js)[^"\']*)["\']',s):
        target=path.lstrip('/').split('?')[0]
        test((root/target).is_file(),f'{file}: broken {path}')
    for path in re.findall(r'/(assets/webp/[^\s,\"\']+\.webp)',s):
        test((root/path).is_file(),f'{file}: missing srcset {path}')
for name in ['functions/api/inquiry.js','functions/api/form-config.js','_routes.json','sitemap.xml','robots.txt','enquire.js']:
    test((root/name).is_file(),f'{name} missing')
imgs=list((root/'assets/webp').glob('**/*.webp'))
test(len(imgs)==222,f'expected 222 WebP variants, found {len(imgs)}')
for f in imgs:
    with f.open('rb') as inp: hdr=inp.read(12)
    test(hdr[:4]==b'RIFF' and hdr[8:12]==b'WEBP',f'{f.name}: corrupt WebP header')
try:
    manifest=json.loads((root/'image-manifest.json').read_text())
    test(len(manifest)==74,f'manifest has {len(manifest)} instead of 74 photos')
except Exception as e:errors.append('manifest unreadable: '+str(e))

def check_live(base):
    cases={
        '/': 'text/html',
        '/work': 'text/html',
        '/enquire': 'text/html',
        '/assets/webp/batch-01/destination-20-1600.webp': 'image/webp',
        '/assets/webp/batch-02/IMG_0826-1791704242-2560.webp':'image/webp',
        '/assets/webp/batch-02/IMG_1566-2560.webp':'image/webp',
        '/assets/webp/batch-02/IMG_1583-1600.webp':'image/webp',
    }
    for p,kind in cases.items():
        try:
            req=urllib.request.Request(base.rstrip('/')+p,headers={'User-Agent':'MaisonReleaseCheck/1.0','Cache-Control':'no-cache'})
            with urllib.request.urlopen(req,timeout=12) as resp:
                mime=resp.headers.get_content_type()
                test(mime==kind,f'{p}: received {resp.status} {mime}, expected {kind}')
                test(resp.status==200,f'{p}: status {resp.status}')
                if kind=='image/webp':
                    test(resp.read(12).startswith(b'RIFF'),f'{p}: invalid WebP magic bytes')
        except Exception as e: errors.append(f'{p}: {e}')

if __name__=='__main__':
    ap=argparse.ArgumentParser()
    ap.add_argument('--live',help='Optional deployed origin, e.g. https://maisonkrizsan.com')
    args=ap.parse_args()
    if args.live:check_live(args.live)
    print(f'{checks-len(errors)}/{checks} checks passed')
    if errors:
        for e in errors[:80]: print('FAIL:',e)
        sys.exit(1)
    print('PASS: file and image integrity'+(' + live response checks' if args.live else ''))
