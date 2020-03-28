module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    port: 8008,
    overlay: {
      warnings: false,
      errors: false
    },
    // lintOnSave: false
}
}
