import axios from 'axios'
import { JWT } from 'next-auth/jwt'

const api = axios.create({
  baseURL: process.env.APP_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

export class apiCoreClient {
  private token: JWT | string
  constructor(accessToken: JWT | string | undefined) {
    this.token = accessToken || ''
    api.interceptors.request.use(
      async function (config) {
        config.headers.Authorization = accessToken
          ? ` Bearer ${accessToken}`
          : ''

        return config
      },
      function (error) {
        return Promise.reject(error)
      },
    )
  }

  get(data: any) {
    return api.get(data)
  }
}
