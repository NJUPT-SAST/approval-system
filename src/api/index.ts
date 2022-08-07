import axios from 'axios'

axios.interceptors.request.use((config: any) => {
  if (localStorage.getItem('token') !== null) {
    config.headers['Token'] = localStorage.getItem('token')
  }
  return config
})
