module.exports = {
  devServer: {
    port: 3005
  }
,
  proxy: {
    '/api/*': {
      target: 'http://localhost:8080'
    }
  }
}
