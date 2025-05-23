import axios from 'axios'
const baseUrl = 'http://localhost/core/api'

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
