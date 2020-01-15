/* eslint-disable no-prototype-builtins */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  return {
    stats: { children: false},
    mode: "development",
    entry: "./index.js",
    output: {
      path: path.resolve(__dirname, "../symfony/public/react"),
      filename: "main-[hash].js",
      publicPath: "/"
    },
    resolve: {
      alias: {
        "react-dom": "@hot-loader/react-dom"
      }
    },
    module: {
      rules: [
        {
          exclude: /node_modules|packages/,
          test: /\.(js)$/,
          use: [
            {
              loader: "babel-loader"
            },
            {
              loader: "eslint-loader",
              options: {
                fix: argv.hasOwnProperty("fix"),
                emitWarning: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: "file-loader",
            options: {
              publicPath: ""
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html"
      }),
      new ManifestPlugin({
        fileName: "manifest.json",
        publicPath: ""
      }),
      new webpack.NamedModulesPlugin()
    ],
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    devServer: {
      host: "0.0.0.0",
      port: 8080,
      clientLogLevel: "debug",
      disableHostCheck: true,
      publicPath: "/",
      historyApiFallback: true,
      hot: true,
      headers: {
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
        "Access-Control-Allow-Origin": "*"
      }
    }
  };
};
