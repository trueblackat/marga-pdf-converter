module.exports = {
  css: {
    sourceMap: true,

    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/scss/variables.scss";
        `,
      },
    },
  },

  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_HOST,
      },
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');
  },
};
