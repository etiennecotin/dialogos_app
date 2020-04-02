const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|css)$/
      })
    ],
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
  },
  pwa: {
    name: "Dialogos",
    themeColor: "#D7BB61",
    msTileColor: "#D7BB61",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#292929",
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      importWorkboxFrom: 'local',
      swSrc: "src/service-worker.js",
      exclude: [/\.map$/, /manifest\.json$/, /_redirects/]
    },
    manifestOptions: {
      short_name: "dialogos",
      display: "standalone",
      orientation: "portrait",
      background_color: "#292929",
      start_url: "/index.html"
    }

    // workboxOptions: {
    // swSrc is required in InjectManifest mode.
    // swSrc: 'dev/sw.js',
    // ...other Workbox options...
    // }
  }
};
