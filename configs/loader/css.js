module.exports = {
  loader: 'css-loader',
  cssModuleLoader: {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
      importLoaders: 1,
    },
  },
};
