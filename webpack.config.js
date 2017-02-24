 var path = require('path');
var webpack = require('webpack');
var hgWebpack = require('@hg/hg-common-toolz/webpack');

var isProdBuild = process.argv.indexOf('-p') !== -1;

var envPlugin = new webpack.DefinePlugin({
  __DEBUG__: JSON.stringify(!isProdBuild),
  __RELEASE__: JSON.stringify(isProdBuild),
  'process.env.NODE_ENV': isProdBuild ? '"production"' : '"development"'
});

var localConfig = {
  entry: [
    'webpack-hot-middleware/client',
     './app/client.js'
  ],
  output: {
    path: require("path").resolve("./dist"), 
    filename: 'bundle.js',
    publicPath: '/'
  },
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
          presets: ['react', 'es2015', 'es2016', 'es2017']
        }
      },

      {
        test: /\.(jsx|es)$/,
        loader: 'babel',
        include: /node_modules[\/\\]\@hg[\/\\]/ ,
        query: {
          plugins: ['transform-runtime', 'transform-object-rest-spread'],
          presets: ['react', 'es2015', 'es2016', 'es2017']
        }
      },
      { test: /\.less$/, loader: 'style!css!less'},
      { test: /\.scss$/, loader: 'style!css!sass'},
      { test: /\.json$/, loader: 'json', exclude: /node_modules/},
      
      // This loader is used to inline import the font files.
      {
        test: /\.woff2$/,
        loader: 'url?mimetype=application/font-woff2',
        include: /node_modules[\\\/]\@hg[\\\/]/
      },

      // These loaders are used to import Markdown, used in styleguides
      {test: /\.md$/, loader: 'raw'},
      {test: /\.json$/, loader: 'json'}
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), envPlugin],
  devServer: {
    proxy: {
      '/**/': {
        target: 'http://localhost:8080/index.html',
        ignorePath: true,
        bypass: function(req, res, proxyOptions) {
          if(req.path.match(/\./)) {
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
};

var config = hgWebpack(localConfig, false);

module.exports = config;