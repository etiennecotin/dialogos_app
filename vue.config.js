const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000
      },
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_fnames: false
          },
          cache: true
        })
      ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/index.scss";`
      }
    }
  }
};
