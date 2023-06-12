var path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devServer: {
        static: {
            directory: path.join(__dirname, "Public"),
        },
        open: true,
        port: 9000,
    },
    watch: true,
    mode: 'development',
    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
            fallbackModuleFilenameTemplate: '[absolute-resource-path]',
            moduleFilenameTemplate: '[absolute-resource-path]'
        }),
    ],

});