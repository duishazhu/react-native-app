module.exports = (api) => {
  /** file-remove-begin */
  const source = `mall-${process.env.PROJECT_TYPE || 'b2c'}` || 'mall-b2c';
  /** file-remove-end */
  const options = {
    presets: [
      [
        'module:metro-react-native-babel-preset',
        {
          enableBabelRuntime: false,
        },
      ],
    ],
    plugins: [
      ['transform-inline-environment-variables'],
      ['react-native-reanimated/plugin'],
      ['@babel/plugin-transform-runtime', { version: '7.15.0' }],
      ['@babel/plugin-proposal-numeric-separator'],
      ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
      ['import', { libraryName: 'date-fns', libraryDirectory: 'esm', camel2DashComponentName: false }, 'date-fns'],
      [
        'import',
        { libraryName: '@terminus/octopus-hooks', libraryDirectory: 'dist', camel2DashComponentName: false },
        '@terminus/octopus-hooks',
      ],
      ['import', { libraryName: '@terminus/nusi-mobile', libraryDirectory: 'lib' }, '@terminus/nusi-mobile'],
      ['import', { libraryName: '@terminus/mall-base', libraryDirectory: 'es' }, '@terminus/mall-base'],
      ['import', { libraryName: '@terminus/mall-utils', libraryDirectory: 'es' }, '@terminus/mall-utils'],
      [
        'module-resolver',
        {
          root: ['./src/components', './origin/src/components', `./src`, './origin/src'],
          extensions: [
            '.scss',
            '.less',
            '.android.jsx',
            '.android.js',
            '.ios.jsx',
            '.ios.js',
            '.native.jsx',
            '.native.js',
            '.jsx',
            '.js',
            '.tsx',
            '.ts',
            '.json',
          ],
        },
      ],
    ],
  };
  // 如果是小程序，需要去掉presets
  if (api.env('miniProgram')) {
    delete options.presets;
    options.plugins.shift();
  }
  return options;
};
