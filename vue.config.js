const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     host: '0.0.0.0',
//     // https:true,
//     port: 8080,
//     client: {
//       webSocketURL: 'ws://0.0.0.0:8080/ws',
//     },
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     }
//   },

// })
module.exports = {
  devServer: {
    proxy: {
      // 将 /api 匹配到 http://localhost:8000
      '/api': {
        target: 'http://localhost:8000',// 后端端口号
        changeOrigin: true, // 能否跨域
        ws: true, // 这里默认是true
        secure: false,
        pathRewite: {
            '/api': '/'
        }
      }
    }
  }
}