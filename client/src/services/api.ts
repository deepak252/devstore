import { getAccessTokenFromStorage } from '@/utils/storage'
import axios, { AxiosRequestConfig } from 'axios'
import { call } from 'redux-saga/effects'

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

export const getRequest = async (
  endpoint: string = '',
  { headers = {}, ...args }: AxiosRequestConfig = {}
) => {
  const accessToken = getAccessTokenFromStorage()
  if (accessToken) {
    headers = {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    }
  }
  return api
    .get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...args,
    })
    .then((response) => response)
    .catch((error) => error.response)
}

export const postRequest = async (
  endpoint = '',
  { data, headers = {}, ...args }: AxiosRequestConfig = {}
) => {
  const accessToken = getAccessTokenFromStorage()
  if (accessToken) {
    headers = {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    }
  }
  return api
    .post(endpoint, data, {
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

export const putRequest = async (
  endpoint = '',
  { data, headers = {}, ...args }: AxiosRequestConfig = {}
) => {
  const accessToken = getAccessTokenFromStorage()
  if (accessToken) {
    headers = {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    }
  }
  return api
    .post(endpoint, data, {
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

export function* uploadTask(
  endpoint = '',
  { signal, ...args }: AxiosRequestConfig = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cb = function* (_: any, __: any): Generator<any, any, any> {} //  (success: any, error: any) {}
): Generator<any, any, any> {
  try {
    const response = yield call(postRequest, endpoint, {
      signal,
      ...args,
    })
    if (response && response.status >= 200 && response.status <= 299) {
      yield cb(response, null)
    } else if (!signal?.aborted) {
      // if upload not cancelled
      throw response?.data || response
    }
  } catch (e) {
    console.error('uploadTask error', e)
    yield cb(null, e)
  }
}
