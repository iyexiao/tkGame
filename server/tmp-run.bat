D:
cd "D:\git\tkGame\server"
call tsc --outDir debug -t ES5 Hello.ts
cd "D:\git\tkGame\server\debug\server"
node Hello.js
REM node Hello.js >D:\git\tkGame\server\log.txt

pause