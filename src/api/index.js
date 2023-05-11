import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = "http://127.0.0.1:8000/"

let isRefreshing = false // 标记是否正在刷新 Token
let requests = [] // 存储待重发请求的数组

//请求拦截器
axios.interceptors.request.use(config => {
  if (localStorage.elementToken) {
    config.headers.Authorization = localStorage.elementToken
  }
  return config
})

//响应拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    const { config, response } = error
    const originalRequest = config
    if (response.status === 401 && !originalRequest._retry) {
      // token 失效，进入刷新 token 的流程
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