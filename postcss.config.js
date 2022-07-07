// postcss.config.js
module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 只有我们自己写的样式才除以75转换为rem
        return (file.indexOf('vant') !== -1 || file.indexOf('gitbub-markdown-css') !== -1) ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
