const express = require('express')
const next = require('next')
const proxy = require('http-proxy-middleware')

const port = parseInt(process.env.PORT, 10) || 3000
const hostname = process.env.HOST || 'localhost'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let apiProxy = proxy({
  target: 'http://192.168.1.173:8080',
  changeOrigin: true,

  ws: true,
  pathRewrite: {
    '^/api': ''
  }
})

app.prepare().then(() => {
  const server = express()

  server.use('/api', apiProxy)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(
      `> 服务启动成功 -> 浏览器打开此链接: [ http://${hostname}:${port}]`
    )
  })
})
