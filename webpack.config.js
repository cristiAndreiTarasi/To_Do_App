
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = {
    // Optional *****
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    // END *****
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    //{ loader: MiniCssExtractPlugin.loader },
                    { loader: 'style-loader'},
                    { loader: 'css-loader'},
                    { loader: 'sass-loader'}
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),

        //new MiniCssExtractPlugin({
            //filename: '[name].css',
            //chunkFilename: '[id].css'
        //}), 

        new OptimizeCSSAssetsPlugin({})
    ]
}
