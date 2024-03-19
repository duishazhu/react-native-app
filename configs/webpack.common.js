/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const HappyPack = require('happypack');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const tsLoaders = require('./loader/ts');
const cssLoaders = require('./loader/css');
const lessLoaders = require('./loader/less');
const sassLoaders = require('./loader/sass');
const babelLoaders = require('./loader/babel');
const pathConfig = require('./default-config');
const postcssLoaders = require('./loader/postcss');
const miniCssExtractLoader = require('./loader/miniCssExtract');

const happyThreadPool = HappyPack.ThreadPool({ size: 2 });

module.exports = {
  context: pathConfig.basePath,
  output: {
    path: pathConfig.outputPath,
    publicPath: pathConfig.publicPath,
    filename: `assets/js/[name]${pathConfig.isDevMode ? '' : '-[contenthash]'}.js`,
    chunkFilename: `assets/js/chunk-[name]${pathConfig.isDevMode ? '' : '-[contenthash]'}.js`,
  },
  resolve: {
    alias: pathConfig.resolveAlias,
    modules: pathConfig.resolveModules,
    extensions: pathConfig.extensions,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'happypack/loader?id=babel',
        include: pathConfig.babelIncludes,
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.less$/,
        use: [miniCssExtractLoader.loader, cssLoaders.loader, postcssLoaders.loader, lessLoaders.loader],
      },
      {
        test: /(\.module\.scss$)|(@terminus\/eevee\-react\-components\/.+\.scss$)/,
        use: [miniCssExtractLoader.loader, cssLoaders.cssModuleLoader, postcssLoaders.loader, sassLoaders.loader],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [miniCssExtractLoader.loader, cssLoaders.loader, postcssLoaders.loader, sassLoaders.loader],
      },
      {
        test: /\.css$/,
        use: [miniCssExtractLoader.loader, cssLoaders.loader, postcssLoaders.loader],
      },
      {
        test: /\.tsx?$/,
        include: pathConfig.babelIncludes,
        use: ['happypack/loader?id=babel', tsLoaders.loader],
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]',
          publicPath: `${pathConfig.publicPath || ''}`,
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 2048, // 2kb
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: '.env',
      /** file-remove-begin */
      defaults: `../.env.default`,
      /** file-remove-end */
      systemvars: true,
    }),
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    new MiniCssExtractPlugin({
      filename: `assets/styles/[name]${pathConfig.isDevMode ? '' : '-[contenthash]'}.css`,
      ignoreOrder: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: pathConfig.resolve('src/assets'),
          to: pathConfig.resolve('public/assets'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new HappyPack({
      id: 'babel',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [babelLoaders.loader],
    }),
  ],
};
