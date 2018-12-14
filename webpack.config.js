const path = require('path');

const mode = process.env.NODE_ENV === 'development' ? 'development': 'production';
const isProd = mode === 'production';

module.exports = {
    mode: mode,
    entry: {
        'index': './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProd ? '[name]@[chunkhash].js' : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    devtool: "cheap-source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }
}
