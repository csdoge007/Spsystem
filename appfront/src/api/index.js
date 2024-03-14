// import Vue from 'vue'
import Axios from 'axios'

Axios.defaults.timeout = 10000;
// const baseURL = 'http://localhost:3000/'
const axiosInstance = Axios.create({
    withCredentials: true,
    // baseURL,
});


axiosInstance.interceptors.request.use(config => {
  // 从本地存储或者其他地方获取Token，这里假设Token存储在localStorage中
  const token = localStorage.getItem('token');

  // 如果Token存在，则将其添加到请求头中
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});




// 通过拦截器处理csrf问题，这里的正则和匹配下标可能需要根据实际情况小改动
// axiosInstance.interceptors.request.use((config) => {
//     config.headers['X-Requested-With'] = 'XMLHttpRequest'
//     const regex = /.*csrftoken=([^;.]*).*$/
//     config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1]
//     return config
// })

// axiosInstance.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// Vue.prototype.axios = axiosInstance

export default axiosInstance