const path = require('path');
const fs = require('fs');
const App = require('./app_config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProd = mode === 'production';

const output_dir = path.join(__dirname, 'dist');
const base_dir = path.join(__dirname, 'src');
const pages_dir = path.join(base_dir, 'pages');

const PORT = 8000;

module.exports = {
    mode: mode,
    entry: App.entry,
    output: {
        path: output_dir,
        filename: isProd ? '[name]@[chunkhash].js' : '[name].js',
        publicPath: isProd ? 'https://honchy.cn/' : 'http://localhost:' + PORT + '/'
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
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: output_dir,
        port: PORT
    },
    plugins: [].concat(
        new CleanWebpackPlugin(output_dir),
        App.html.map(
            item => {
                let cfg = {
                    filename: item.html_out,
                    chunks: [item.name],
                    minify: isProd
                };

                if(item.html) {
                    cfg.template = item.html;
                }
                
                return new HtmlWebpackPlugin(cfg);
            }
        )
    )
};
