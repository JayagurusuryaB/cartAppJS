var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var extractPlugin = new MiniCssExtractPlugin({
    filename: 'main.css'
});
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                    loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',    // where the fonts will go
                    publicPath: './fonts/verdana'       // override the default path
                  }
                }]
              },
        ]
    },
    plugins: [extractPlugin]
};