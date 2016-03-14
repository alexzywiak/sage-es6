
module.exports = {
  output: {
    filename: 'bundle.js'
  },

  devtool: 'sourcemap',

  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css/, loader: 'style!css' },
      { test: /\.(png|jpg|jpeg)$/, loader: 'file' },
      { 
        test: /\.js$/, 
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] 
      }
    ]
  },

  stylus: {
    use: [require('jeet')(), require('rupture')()]
  }
};
