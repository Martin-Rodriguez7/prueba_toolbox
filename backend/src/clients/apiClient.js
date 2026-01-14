const axios = require('axios')

// lo ideal es que esto venga de variables de entorno
const API_BASE_URL = 'https://echo-serv.tbxnet.com'
const API_KEY = 'aSuperSecretKey'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
})

module.exports = apiClient
