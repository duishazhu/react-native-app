# cli

### 安装

`npm install -g @terminus/octopus-cli`

### 步骤

1. 初始化小程序项目 `octopus init`
   该命令会做以下操作

- 创建 octopus 配置文件`octopus.config.js`
- 更新 package.json, 添加依赖, 添加 octopus 开发构建命令`octopus:watch` `octopus:watch`
- 创建一个默认的入口文件`src/mp_app.tsx`, 可修改

2. 安装依赖 `npmi`
3. 根据项目需要修改 octopus 配置
4. 构建小程序代码，打开小程序编辑器实时预览

### 命令

```bash
Usage: octopus [options] [command]

Options:
  -V, --version    output the version number
  -h, --help       output usage information

Commands:
  build [options]  build mini program from a rn project
  init             Init octopus.config.js
```

```bash
Usage: octopus init [options]

Init octopus.config.js

Options:
  -h, --help  output usage information
```

```bash
Usage: octopus build [options]

build mini program from a rn project

Options:
  -t, --target <target>  target: wx alipay (default: "wx")
  --from <from>          source project (default: ".")
  -w, --watch            watch mode (default: false)
  --base <base>          base path (default: "/Users/looading/Documents/trash/TRNW-App-Template")
  --progress             show progress (default: false)
  -h, --help             output usage information
```
