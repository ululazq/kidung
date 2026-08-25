import re, sys

start, end = int(sys.argv[1]), int(sys.argv[2])
subs = [(r'\bcuma\b','hanya'),(r'\bCuma\b','Hanya'),(r'\bnggak\b','tidak'),(r'\bkayak\b','seperti'),
        (r'\bgitu\b','begitu'),(r'\bgini\b','begini'),(r'\budah\b','sudah'),(r'\bbanget\b','sekali'),
        (r'\bbikin\b','membuat'),(r'\bpake\b','pakai'),(r'\bnanya\b','bertanya'),(r'\bnyari\b','mencari'),
        (r'\bemang\b','memang')]
total=0
for n in range(start,end+1):
    f=f'chapter-{n}.md'
    try: t=open(f,encoding='utf-8').read()
    except: continue
    o=t
    for a,b in subs: t=re.sub(a,b,t)
    if t!=o:
        open(f,'w',encoding='utf-8',newline='').write(t); total+=1; print(f)
print('BERUBAH:',total)
