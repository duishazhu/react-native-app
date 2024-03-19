/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const Dotenv = require('dotenv-webpack');
const images = require('./cdn-images');

module.exports = (config) => {
  const obj = Object.assign(config, {
    entry: path.resolve(__dirname, 'src/mp_app.tsx'),
    strip: process.env.NODE_ENV === 'production',
    imageSourceMap: images,
    useReactNavigationAlias: false,
    plugins: [
      new Dotenv({
        path: '.env',
        defaults: '.env.default',
        systemvars: true,
      }),
    ],
    resolve: {
      alias: {
        '@terminus/react-native-appinfo': path.resolve(__dirname, 'src/utils/react-native-appinfo.js'),
        'react-native-safe-area-context': path.resolve(__dirname, 'src/utils/safe-area-polyfill.tsx'),
        'promise-polyfill': path.resolve(__dirname, 'src/utils/promise-polyfill.ts'),
      },
      modules: [
        __dirname,
        path.resolve(__dirname, 'src/components'),
        path.resolve(__dirname, 'origin/src/components'),
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'origin/src'),
        'node_modules',
      ],
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|jpeg|gif)$/,
          loader: 'file-loader',
          include: path.resolve(__dirname, 'src'),
          options: {
            name: '[name].[ext]',
            emitFile: true,
            outputPath: '/assets',
            publicPath: '/assets',
          },
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          package: {
            test: /(?<!design)[\\/]components[\\/](?!activity|cart|user-center|common|home|category|hooks|distribution[\\/]common)/,
          },
        },
      },
    },
  });

  return obj;
};
