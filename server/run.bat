D:
cd "D:\github\tkGame\server"
call tsc --outDir debug --resolveJsonModule -t ES5 Hello.ts
cd "D:\github\tkGame\server\debug\server"
node Hello.js
REM node Hello.js >D:\github\tkGame\server\log.txt

pause