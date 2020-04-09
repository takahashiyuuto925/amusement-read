// function mock(app, url, data) {
//   app.get(url, (req, res) => {
//     res.json(data)
//   })
// }

// const homeData = require('./src/mock/bookHome')
// const shelfData = require('./src/mock/bookShelf')
// const listData = require('./src/mock/bookList')
// const flatListData = require('./src/mock/bookFlatList')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    port: 8008,
    // proxy:{
    //   '/api':{
    //     target:'http://192.168.1.126:5000',
    //     changeOrigin:true,
    //     pathRewrite:{
    //       '/api':''
    //     }
    //   }
    // },
    overlay: {
      warnings: false,
      errors: false
    },
    // configureWebpack: {
    //   performance: {
    //     hints: 'warning',
    //     maxAssetSize: 524288,
    //     maxEntrypointSize: 524288,
    //   }
    // }
    // before(app) {
    //   mock(app, '/bookmall/home', homeData)
    //   mock(app, '/bookmall/shelf', shelfData)
    //   mock(app, '/bookmall/list', listData)
    //   mock(app, '/bookmall/flat-list', flatListData)
    // },
    // lintOnSave: false
  }
}
