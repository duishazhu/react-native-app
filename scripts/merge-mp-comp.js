const fs = require('fs');
const path = require('path');

const tasks = [
  {
    from: 'src/components/mp-tab-bars/customize-tab-bar',
    to: 'dist/alipay/customize-tab-bar',
  },
];

// 递归复制文件和文件夹
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  }
}

// 复制 origin 到根目录
tasks.forEach((v) => copyRecursiveSync(v.from, v.to));
console.log('Files copied successfully');
