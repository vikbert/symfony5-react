/* eslint-disable no-prototype-builtins */
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
    return {
        mode: 'production',
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, '../symfony/public/react'),
            filename: 'main-[hash].js',
        },
        module: {
            rules: [
                {
                    exclude: /node_modules|packages/,
                    test: /\.(js)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'eslint-loader',
                            options: {
                                fix: argv.hasOwnProperty('fix'),
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/frontend',
                        },
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new ManifestPlugin({
                fileName: 'manifest.json',
                publicPath: 'react/',
            }),
            new webpack.DefinePlugin({
                BASE_URI: JSON.stringify('/api'),
            }),
        ],
    };
};
