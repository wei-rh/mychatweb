import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = "http://127.0.0.1:8000/"
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
let isRefreshing = false // 标记是否正在刷新 Token
let requests = [] // 存储待重发请求的数组

//请求拦截器
axios.interceptors.request.use(config => {
  // config.headers['Access-Control-Allow-Origin'] = '*';
  // config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
  // config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, CSRF-Token';
  if (localStorage.elementToken) {
    config.headers.Authorization = localStorage.elementToken
  }
  return config
})

axios.interceptors.response.use(
  response => response,
  error => {
    const { config, response } = error
    const originalRequest = config
    if (response.status === 401 && !originalRequest._retry) {
      if (config.url === '/api/refresh/') {
        // 刷新 token 的请求本身返回了 401 错误码，将错误抛出
        return Promise.reject(error)
      }
      if (isRefreshing) { // 正在刷新 token，将请求挂起
        return new Promise(resolve => {
          requests.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(axios(originalRequest))
          })
        })
      } else { // 开始刷新 token
        originalRequest._retry = true
        isRefreshing = true
        return new Promise(resolve => {
          const refresh_token = localStorage.refresh
          axios.post('/api/refresh/', { refresh: refresh_token })
            .then(response => {
              const access_token = response.data.access
              localStorage.elementToken = `Bearer ${access_token}`
              originalRequest.headers.Authorization = `Bearer ${access_token}`
              resolve(axios(originalRequest))
              // 执行之前挂起的请求
              requests.forEach(cb => cb(access_token))
              requests = []
            })
            .catch(error => {
              router.push('/login')
              return Promise.reject(error)
            }).finally(() => {
              isRefreshing = false // 处理完毕，可以允许再次刷新 token
            })
        })
      }
    } else {
      return Promise.reject(error)
    }
  }
)
export default {
  install: (app) => {
    app.config.globalProperties.$axios = axios
  }
};