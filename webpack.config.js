var webpack = require('webpack'); //to access built-in plugins

module.exports = {
  output: {
    filename: 'app.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      "videojs": "video.js",
      "window.videojs": "video.js"
    })
  ]
};

