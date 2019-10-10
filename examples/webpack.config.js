var HtmlWebpackPlugin = require('html-webpack-plugin');
var CssLoaderUtils = require('css-loader/dist/utils');

const babelLoaderOptions = {
  presets: ['@babel/env', '@babel/react'],
  plugins: ['@babel/plugin-proposal-class-properties']
};

module.exports = {
  devServer: {
    port: 3000,
    open: true,
    inline: true,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelLoaderOptions
        }
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent: (
                  loaderContext,
                  localIdentName,
                  localName,
                  options
                ) => {
                  if (loaderContext.resourcePath.includes('node_modules')) {
                    return localName;
                  }
                  return CssLoaderUtils.getLocalIdent(
                    loaderContext,
                    localIdentName,
                    localName,
                    options
                  );
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
