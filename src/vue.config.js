module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    overlay: {
       warnings: false,
       errors: false
    },
    lintOnSave: false
}
}
