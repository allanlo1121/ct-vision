在 Monorepo 根目录执行 PowerShell：
Copy-Item -Path .\packages\hrm -Destination .\packages\master-data -Recurse


这会将整个 hrm 目录及其内容复制为 master-data。
如果 master-data 目录已经存在，想只复制 hrm 内部的文件：
Copy-Item -Path .\packages\hrm\* -Destination .\packages\master-data -Recurse -Force


复制完成后，记得修改 master-data/package.json 中的包名：
"name": "@workspace/master-data"


然后在根目录运行：
pnpm install