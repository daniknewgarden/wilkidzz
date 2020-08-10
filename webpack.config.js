const isDevelopment = process.env.NODE_ENV === 'development';

//Plugins
const path = require('path'); //Path from this folder (not root C:\\) plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Css separate file plugin
const CopyPlugin = require('copy-webpack-plugin'); //Copy static files plugin
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin

//Modules
module.exports = {
  entry: __dirname + "/src/index.js", // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: 'bundle.js' // public URL of the output directory when referenced in a browser
  },
  module: {
    rules: [
      //javaScript
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ]
      },
      //Styles 
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
              config: {
                path: `./postcss.config.js`
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        // css
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `./postcss.config.js`
              }
            }
          }
        ]
      },
      //Images
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }]
      },
      //Fonts
      {
        test: /\.woff(2)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  plugins: [ // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    new CopyPlugin({
      patterns: [{
        from: 'src/static/images',
        to: 'images'
      }],
    }),
  ],
  devServer: { // configuration for webpack-dev-server
    contentBase: './src', //source of static assets
    port: 7700, // port to run dev-server
  }
};