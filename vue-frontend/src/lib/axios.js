import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // replace with your API base
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
