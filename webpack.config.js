var path = require('path');
var webpack = require('webpack');
var hgWebpack = require('@hg/hg-common-toolz/webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProdBuild = process.argv.indexOf('-p') !== -1;
console.log("isProdBuild ", isProdBuild);

var envPlugin = new webpack.DefinePlugin({
    __DEBUG__: JSON.stringify(!isProdBuild),
    __RELEASE__: JSON.stringify(isProdBuild),
    'process.env.NODE_ENV': isProdBuild ? '"production"' : '"development"'
});
var styleLoaderString = 'css-loader!autoprefixer-loader?{browsers:["last 2 version", "iOS 7", "iOS 8", "Android 4"]}!less-loader';

var loaders = [
    { test: require.resolve('react'), loader: 'expose?React' },
    {
        test: /\.(jsx|es|js)$/,
        hgNameUsedInServerJs: 'js',
        include: [
            path.join(__dirname, 'node_modules/@hg'),
            path.join(__dirname, 'node_modules/@healthgrades'),
            path.join(__dirname, 'src'),
            path.join(__dirname, 'app'),
            path.join(__dirname, 'utils'),
            path.join(__dirname, 'redux')
        ],
        loader: 'babel',
        query: {
            plugins: ['transform-runtime', 'transform-object-rest-spread'],
            presets: ['react', 'es2015', 'es2016', 'es2017']
        }
    },
    { test: /\.json$/, loader: 'json', exclude: /node_modules/ },
    { test: /\.raw\.less$/, loader: 'raw!less?strictMath&noIeCompat' }
];
var stylesLoaders = {
    server: [
        { test: /\.css$/, loader: 'null-loader' },
        { test: /\.less$/, loader: 'null-loader', exclude: /\.raw\.less$/ },
        { test: /\.json$/, loader: 'json' }
    ],
    client: [
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.less$/, loader: 'style-loader!' + styleLoaderString, exclude: /\.raw\.less$/ },
        { test: /\.json$/, loader: 'json' }
    ],
    styleOnly: [
        { test: /\.less$/, loader: ExtractTextPlugin.extract('style', styleLoaderString) },
        { test: /\.json$/, loader: 'json' }
    ]
};

var serverLoaders = loaders.concat(stylesLoaders.server);
var separateStylesLoaders = loaders.concat(stylesLoaders.styleOnly);

var resolveServerSide = {
    extensions: ['', '.css', '.es6', '.json', '.raw.less', '.sass', 'scss', '.jsx', '.es', '.webpack.js', '.web.js', '.js', '.less'],
    modulesDirectories: ['node_modules', 'vendor'],
    root: [__dirname, path.join(__dirname, 'src'), path.join(__dirname, 'src/components'), path.join(__dirname, 'app')],
    alias: {
        "hg3tracker": "HgTracker/mockTracker"
    }
};
var resolveClientSide = {
    extensions: ['', '.css', '.es6', '.json', '.raw.less', '.sass', 'scss', '.jsx', '.es', '.webpack.js', '.web.js', '.js', '.less'],
    modulesDirectories: ['node_modules', 'vendor'],
    root: [__dirname, path.join(__dirname, 'src'), path.join(__dirname, 'src/components'), path.join(__dirname, 'app')],
    alias: {
        "hg3tracker": "@hg/three-ui/src/components/HgTracker/mockTracker"
    }
};

var config = [
    hgWebpack({
        entry: [
            './app/client.jsx'
        ],
        output: {
            path: require("path").resolve("./dist"),
            filename: 'bundle.js',
            publicPath: '/'
        },
        debug: true,
        devtool: "#eval-source-map",
        resolve: {
            root: [
                __dirname,
                path.join(__dirname, 'src'),
                path.join(__dirname, 'src/components')
            ],
            extensions: ['', '.es', '.js', '.jsx', '.less', '.raw.less', '.scss', '.txt', '.md', '.json'],
            alias: {
                "hg3tracker": "HgTracker/mockTracker"
            }
        },
        node: {
            fs: "empty"
        },
        cache: false,
        module: {
            loaders: [

                {
                    test: /\.(js|jsx|es)$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        plugins: ['transform-runtime', 'transform-object-rest-spread'],
                        presets: ['react', 'es2015', 'es2016', 'es2017', 'react-hmre']
                    }
                },

                {
                    test: /\.(jsx|es)$/,
                    loader: 'babel',
                    include: /node_modules[\/\\]\@hg[\/\\]/,
                    query: {
                        plugins: ['transform-runtime', 'transform-object-rest-spread'],
                        presets: ['react', 'es2015', 'es2016', 'es2017', 'react-hmre']
                    }
                },
                { test: /\.less$/, loader: 'style!css!less' },
                { test: /\.scss$/, loader: 'style!css!sass' },
                { test: /\.json$/, loader: 'json', exclude: /node_modules/ },

                // This loader is used to inline import the font files.
                {
                    test: /\.woff2$/,
                    loader: 'url?mimetype=application/font-woff2',
                    include: /node_modules[\\\/]\@hg[\\\/]/
                },

                // These loaders are used to import Markdown, used in styleguides
                { test: /\.md$/, loader: 'raw' },
                { test: /\.json$/, loader: 'json' },
                { test: /\.(png|jpg)$/, loader: 'url-loader?mimetype=image/[name]' }
            ]
        },
        plugins: [new webpack.HotModuleReplacementPlugin(), envPlugin],
        devServer: {
            proxy: {
                '/**/': {
                    target: 'http://localhost:6060/index.html',
                    ignorePath: true,
                    bypass: function (req, res, proxyOptions) {
                        if (req.path.match(/\./)) {
                            return req.path;
                        } else if (req.path === '/tests/') {
                            return '/tests/index.html';
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
    }, false),
    hgWebpack({
        entry: {
            hgGlobal: "./app/client.jsx"
        },
        output: {
            path: require("path").resolve("./dist"),
            filename: 'bundle.[hash].js',
            publicPath: '/'
        },
        debug: false,
        resolve: resolveServerSide,
        module: {
            loaders: serverLoaders
        },
        plugins: [new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /NEVER_MATCH^/), envPlugin]
    }, false),
    hgWebpack({
        entry: {
            "practice": './src/app.less'
        },
        output: {
            path: require("path").resolve("./dist"),
            filename: '[name].[hash].css',
            publicPath: '/'
        },
        target: "web",
        debug: false,
        resolve: resolveServerSide,
        module: {
            loaders: separateStylesLoaders
        },
        plugins: [new ExtractTextPlugin("[name].[hash].css"),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /NEVER_MATCH^/)]
    }, false),

];


module.exports = config;