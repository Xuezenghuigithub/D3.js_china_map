module.exports = {
    publicPath: '/',
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9000/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
  }