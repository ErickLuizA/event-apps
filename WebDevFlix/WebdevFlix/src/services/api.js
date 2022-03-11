import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_REMOTE_URL
})

export default api
