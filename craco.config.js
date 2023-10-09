module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3002' // 所有以/api开头的接口都指向3002
    }
  }
}