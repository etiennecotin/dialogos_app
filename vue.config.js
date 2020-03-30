module.exports = {
  configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000,
      }
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
