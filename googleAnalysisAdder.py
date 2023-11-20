import glob
files=[]
rawfiles = glob.glob('./**', recursive=True)
for file in rawfiles:
    if file.endswith('.html'):
        files.append(file)
input(f'enter to do this files: {files}')
an = '''
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3Q1S7MS25V"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3Q1S7MS25V');
</script>
'''
for filepath in files:
    f = open(filepath, 'r')
    file = f.read()
    f.close()
    f1, f2 = file.split('<head>', 1)
    if not f2.startswith(an):
        f2 = an+f2
        print('k')
    else:
        print(f'alr done {filepath}')
    file = f1+'<head>'+f2
    f = open(filepath, 'w')
    f.write(file)
    f.close()
print('done')