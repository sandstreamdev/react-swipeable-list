var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
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
                localIdentName: '[name]_[local]__[hash:base64:5]_',
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
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader'
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
  ],
  resolve: {
    alias: {
      // replace with any css - cannot ignore this import
      '@sandstreamdev/react-swipeable-list/dist/styles.css': path.join(
        __dirname,
        'src',
        'app.css'
      ),
      // to import module sources
      '@sandstreamdev/react-swipeable-list': path.join(__dirname, '..', 'src'),
      // to make the module use same react as example
      // (otherwise even if same version is in module sources used
      // we get error about duplicated react and cannot use hooks)
      react: path.resolve(__dirname, 'node_modules', 'react'),
      'prop-types': path.resolve(__dirname, 'node_modules', 'prop-types')
    },
    extensions: ['.js']
  }
};
