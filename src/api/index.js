import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = "http://127.0.0.1:8000/"


//请求拦截
axios.interceptors.request.use(config =>{
    if(localStorage.elementToken){
        config.headers.Authorization = localStorage.elementToken
    }
    return config
})

axios.interceptors.response.use(
  response => {
    // 处理正常响应
    return response
  },
  error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      return new Promise((resolve, reject) => {
        axios.post('/api/refresh/', {"refresh": localStorage.refresh})
          .then(response => {
            console.log(localStorage.refresh)
            if (response.status === 200) {
              console.log(response)
              console.log(response.data.access)
              localStorage.setItem("elementToken", 'Bearer ' + response.data.access)
              originalRequest.headers.authorization = `Bearer ${response.data.access}`
              resolve(axios(originalRequest))
            } else {
              reject(new Error('Refresh token request failed.'))
            }
          })
          .catch(error => {
            router.push('/login')
            reject(error)
          })
      })
    } else {
      // Handle other errors
      return Promise.reject(error)
    }
  }
)



export default {
    install: (app)=> {
        app.config.globalProperties.$axios = axios
    }
};