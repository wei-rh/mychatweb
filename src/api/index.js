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


//全局前置守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth) {
    axios.get('/api/is_token/')
      .then(response => {
        // 判断token是否有效
        if (response.data.valid) {
          next() // 有效，继续导航
        } else {
          next({ path: '/login' }) // 无效，跳转到登录页
        }
      })
      .catch(error => {
        next({ path: '/login' }) // 请求失败，跳转到登录页
      })
  } else {
    next()
  }
})


export default {
    install: (app)=> {
        app.config.globalProperties.$axios = axios
    }
};