rmdir .\build
mkdir .\build
mkdir .\build\lib
copy .\src\index.html .\build\index.html
copy .\src\index.css .\build\index.css
copy .\src\lib\three.module.js .\build\lib\three.module.js
tsc
