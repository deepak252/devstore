import { call } from 'redux-saga/effects'
import { postRequest } from './api'
import { AxiosRequestConfig } from 'axios'

type UploadTaskOptions = {
  queryParams?: Record<string, any>
} & AxiosRequestConfig

export function* uploadTask(
  endpoint = '',
  {
    queryParams,
    data,
    headers = {},
    signal,
    onUploadProgress,
    ...args
  }: UploadTaskOptions = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cb = function* (_: any, __: any): Generator<any, any, any> {} //  (success: any, error: any) {}
): Generator<any, any, any> {
  try {
    const response = yield call(postRequest, endpoint, {
      data,
      queryParams,
      headers,
      onUploadProgress,
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
