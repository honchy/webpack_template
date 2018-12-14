const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProd = mode === 'production';

const output_dir = path.join(__dirname, 'dist');
const base_dir = path.join(__dirname, 'src');
const pages_dir = path.join(base_dir, 'pages');
const PORT = 8000;
console.log(makeupEntry());

module.exports = {
    mode: mode,
    entry: makeupEntry(),
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
        makeupHtml().map(
            item =>
                new HtmlWebpackPlugin({
                    template: item.html,
                    filename: item.html_out,
                    chunks: [item.name],
                    minify: isProd
                })
        )
    )
};

function makeupEntry() {
    return makeupHtml()
        .filter(item => !!item.js)
        .reduce((ret, item) => {
            ret[item.name] = item.js;
            return ret;
        }, {});
}

function makeupHtml() {
    let files = getEntryFiles(pages_dir);

    return files
        .filter(item => !!item.html)
        .map(item => {
            return {
                name: path.relative(base_dir, item.js).replace(/^(\.\/)|(\.js)$/, ''),
                js: item.js,
                html: item.html,
                html_out: item.html.replace(/\/src/, '/dist')
            };
        });
}

function getEntryFiles(dir) {
    getEntryFiles._list = getEntryFiles._list || [];

    let page = getPage(dir);

    if (page) {
        getEntryFiles._list.push(page);
    }

    fs.readdirSync(dir).forEach(item => {
        let fpath = path.join(dir, item);
        if (fs.statSync(fpath).isDirectory()) {
            let page = getPage(fpath);
            if (page) {
                getEntryFiles._list.push(page);
            }

            getEntryFiles(fpath);
        }
    });

    return getEntryFiles._list;
}

function getPage(dir) {
    let htmlPath = path.join(dir, 'index.html');
    let jsPath = path.join(dir, 'index.js');
    return fs.existsSync(htmlPath) ? { js: jsPath, html: htmlPath } : null;
}
