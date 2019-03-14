D:
cd "D:\github\tkGame\server"
call tsc --outDir debug -t ES5 Hello.ts
cd "D:\github\tkGame\server\debug\server"
node Hello.js

pause