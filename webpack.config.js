const isDevelopment = process.env.NODE_ENV === 'development';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin

module.exports = {
    entry: __dirname + "/src/index.js", // webpack entry point. Module to start building dependency graph
    output: {
        path: __dirname + '/dist', // Folder to store generated bundle
        filename: 'bundle.js' // public URL of the output directory when referenced in a browser
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: [
                /node_modules/
            ]
        },
        {
          test: /\.(jpe?g|png|gif|webp)$/i,
          /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
          // exclude: path.resolve(__dirname, '../src/static/images'),
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }]
        },
        {
          test: /\.svg$/,
          oneOf: [{
              exclude: path.resolve(__dirname, 'static/images/icons'),
              use: [{
                loader: 'svg-inline-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images/'
                }
              }]
            },
            {
              include: path.resolve(__dirname, 'static/images/icons'),
              use: [{
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images/'
                }
              }]
            },
          ],
        }, 
        {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              root: path.join(__dirname, 'src')
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
              config: { path: `./postcss.config.js` }
            }
          },
          
        ]
      },
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }]
    },
    resolve: {extensions: ['.js', '.jsx', '.scss']},
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
            patterns: [
              { from: 'src/static/images', to: 'static/images' }
            ],
        }),
    ],
    devServer: { // configuration for webpack-dev-server
        contentBase: './src', //source of static assets
        port: 7700, // port to run dev-server
    }
};

