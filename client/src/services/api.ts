import { getAccessTokenFromStorage } from '@/utils/storage'
import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  // withCredentials: true,
})
// baseURL: import.meta.env.VITE_BASE_URL,

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setupInterceptor = (navigate: any) => {
  api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // console.log(error.config.url);
      const statusCode = error.response?.status
      if (statusCode === 401) {
        localStorage.clear()
        // dispatch && dispatch(signOut());
        navigate && navigate('/auth')
      }
      return Promise.reject(error)
    }
  )
}

const getQueryString = (obj?: Record<string, any>) => {
  let queryString =
    obj &&
    Object.entries(obj)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  queryString = queryString && `?${queryString}`
  return queryString ?? ''
}

type GetRequestOptions = {
  queryParams?: Record<string, any>
} & AxiosRequestConfig

export const getRequest = async (
  endpoint: string = '',
  { queryParams, headers = {} }: GetRequestOptions = {}
) => {
  const queryString = getQueryString(queryParams)
  const accessToken = getAccessTokenFromStorage()
  if (accessToken) {
    headers = {
      Authorization: `${accessToken}`,
      ...headers,
    }
  }
  return api
    .get(endpoint + queryString, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => error.response)
}

type PostRequestOptions = {
  queryParams?: Record<string, any>
} & AxiosRequestConfig

export const postRequest = async (
  endpoint = '',
  { queryParams, data, headers = {}, ...args }: PostRequestOptions = {}
) => {
  const queryString = getQueryString(queryParams)
  const accessToken = getAccessTokenFromStorage()
  if (accessToken) {
    headers = {
      Authorization: `${accessToken}`,
      ...headers,
    }
  }
  return api
    .post(endpoint + queryString, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      ...args,
    })
    .then((response) => response)
    .catch((error) => error.response)
}
