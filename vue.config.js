/* eslint-disable */
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: 'dist_web',
  // 使用多页面会导致窗口起不来
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    // https: true,
    port: 8080,
    hot: true
  },
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // svga
    // config.module.rule('url').test(/\.svga$/).use('url-loader').end();
    // alias
    config.resolve.alias.set('@',resolve('src'));
    // define
    config.plugin('define').tap(([options={}])=>[{
      ...options,
      VERSION: JSON.stringify('1.0.0'),
      APPNAME: JSON.stringify('vue-spa-cli')
    }])
  },
  pluginOptions: {
    electronBuilder: {
      outputDir: 'dist_window'
    },
  }
};
