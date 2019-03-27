/* eslint-disable */
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    https: true,
    port: 8080,
    hot: true
  },
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // svga
    // config.module.rule('url').test(/\.svga$/).use('url-loader').end();
    // alias
    config.resolve.alias.set('@',resolve('src')).set('css',resolve('src/assets/css')).set('components',resolve('src/components')).set('configs',resolve('src/configs')).set('decorators',resolve('src/decorators')).set('services',resolve('src/services')).set('stores',resolve('src/stores')).set('utils',resolve('src/utils')).set('views',resolve('src/views'));
    // define
    config.plugin('define').tap(([options={}])=>[{
      ...options,
      VERSION: JSON.stringify('1.0.0'),
      APPNAME: JSON.stringify('vue-spa-cli')
    }])
  }
};
