const { exec } = require('child_process');

const path = process.cwd();
const command = `termix upload -c ${path}/oss-conf.json -p store/images -d ./ -o ${path}/cdn-images.json ${path}/src/images --override --verbose`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行命令时出错：${error}`);
    return;
  }
  console.log(`stdout：${stdout}`);
  console.error(`stderr：${stderr}`);
});
