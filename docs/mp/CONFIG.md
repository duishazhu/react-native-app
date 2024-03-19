# octopus.config.js 配置说明

```ts
interface IConfig {
  tsConfig?: string; // 使用工程内的tsconfig.json, 配置路径
  base?: string; // cli 工作区
  from: string; // 源代码的路径, 相对于 base
  target: PlatFormType; // 小程序平台类型 'wx' | 'alipay'
  extensions?: IExtension[]; // 文件扩展名
  output?: string; // 文件输出路径
  adapter: AdapterType; // 配置文件不要出先
  entry: string; // 入口文件路径
  maxXmlDepth?: number; // 小程序模版层级深度（不宜过深）
  extraComponents?: string[]; // 第三方组件库，会作为小程序组件列入编译范围
  resolve?: ResolveOptions; // 参考rollup-plugin-node-resolve
  alias?: any[]; // 模块替换，只支持数组，参考@terminus/rollup-plugin-alias
  postcss?: any[]; // postcss plugin 参考rollup-plugin-postcss
}

export const config: IConfig = {
  base: process.cwd(),
  from: 'src',
  target: 'wx',
  extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  output: 'dist',
  adapter: createAdapter(),
  entry: 'src/app.ts',
  extraComponents: [],
  maxXmlDepth: 20,
};
```
