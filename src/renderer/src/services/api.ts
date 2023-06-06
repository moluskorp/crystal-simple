import axios, { AxiosError } from 'axios'
// import { cookiesName } from '../config'
import { signOut } from '../contexts/AuthContext'
// import { API_MOLTER_URL } from '../config';

let isRefreshing = false
let failedRequestsQueue = [] as any[]

export function setupApiClient(ctx: any = undefined) {
  // let cookies = parseCookies(ctx)
  const api = axios.create({
    baseURL: '/api',
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: any) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          // cookies = parseCookies(ctx)

          // const { [cookiesName.refreshToken]: refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true
            api
              .post('/refresh', {
                refreshToken: '',
              })
              .then((response) => {
                const { token } = response.data

                // setCookie(ctx, cookiesName.token, token, {
                //   maxAge: 60 * 60 * 24 * 30, // 30 days
                //   path: '/',
                // })

                // setCookie(
                //   ctx,
                //   cookiesName.refreshToken,
                //   response.data.refreshToken,
                //   {
                //     maxAge: 60 * 60 * 24 * 30, // 30 days
                //     path: '/',
                //   },
                // )

                const headers = api.defaults.headers as any

                headers.Authorization = `Bearer ${token}`

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token),
                )
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.onFailure(err))
                failedRequestsQueue = []

                signOut()
              })
              .finally(() => {
                isRefreshing = false
              })
          }
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers.Authorization = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        }
        signOut()
      }

      return Promise.reject(error)
    },
  )

  return api
}
