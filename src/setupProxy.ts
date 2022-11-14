const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  console.log('work')
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://approve.sast.fun/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
}
