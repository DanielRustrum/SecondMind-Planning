import fs from 'fs'
fs.cpSync("./.temp", "./mobile/web", {recursive: true});
fs.cpSync("./.temp", "./desktop/web", {recursive: true});
fs.rmSync("./.temp", { recursive: true, force: true });