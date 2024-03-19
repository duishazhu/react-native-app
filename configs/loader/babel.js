/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const isDevelopment = process.env.NODE_ENV === 'development';

const commonPlugins = [
  // 使用 version > 7.5.0 开启 objectSpread helper, > 7.14.0 开启 interopRequireWildcard helper
  ['@babel/plugin-transform-runtime', { version: '7.14.3' }],
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-export-default-from',
  !isDevelopment && ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }],
  ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
].filter(Boolean);

const plugins = [
  ...commonPlugins,
  ['import', { libraryName: 'date-fns', libraryDirectory: 'esm', camel2DashComponentName: false }, 'date-fns'],
  ['import', { libraryName: '@terminus/nusi-mobile', libraryDirectory: 'lib' }, '@terminus/nusi-mobile'],
  [
    'import',
    { libraryName: '@terminus/octopus-hooks', libraryDirectory: 'dist', camel2DashComponentName: false },
    '@terminus/octopus-hooks',
  ],
  ['import', { libraryName: '@terminus/mall-utils', libraryDirectory: 'es' }, '@terminus/mall-utils'],
  ['import', { libraryName: '@terminus/mall-base', libraryDirectory: 'es' }, '@terminus/mall-base'],
];

if (isDevelopment) {
  plugins.unshift('react-refresh/babel');
}

const commonBabelOptions = {
  babelrc: false, // 避免读取 .babelrc 中配置 与native端 babel配置隔离
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {
        // 禁用 metro preset 中 plugin-transform-runtime 的默认配置，走 plugins 中的配置
        enableBabelRuntime: false,
      },
    ],
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: require('core-js/package.json').version,
        // #issue https://github.com/facebook/create-react-app/issues/5277
        exclude: ['transform-typeof-symbol'],
        targets: {
          chrome: '58',
          browsers: ['android >= 4', 'ios >= 7', 'and_uc >= 10'],
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        development: isDevelopment,
      },
    ],
  ],
  sourceType: 'unambiguous',
  cacheDirectory: isDevelopment,
  cacheCompression: false,
};

module.exports = {
  loader: {
    loader: 'babel-loader',
    options: {
      ...commonBabelOptions,
      plugins,
    },
  },
  forDesign: {
    loader: 'babel-loader',
    options: {
      ...commonBabelOptions,
      plugins: [...commonPlugins, ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }, 'antd']],
    },
  },
};
