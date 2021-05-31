import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8080', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(function(config) {
  var hash = localStorage.getItem('token')

  if (hash !== null) {
    config.headers['Authorization'] = hash
    config.headers = config.headers || {}
  } else {
    localStorage.clear()
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(function(response) {
  return response
}, function(error) {
  if (error.response.status === 401) {
    localStorage.clear()
    this.$router.push({ path: '/login' })
  }
  // Do something with response error
  return Promise.reject(error)
})

export default service
