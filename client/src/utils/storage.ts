const ACCESS_TOKEN_KEY = 'access_token'
const USER_KEY = 'user'
const METADATA_KEY = 'metadata'

export const saveAccessTokenToStorage = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const getAccessTokenFromStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)?.trim()
}
export const userSignedIn = () => {
  return !!getAccessTokenFromStorage()
}

export const saveUserToStorage = (user: Record<string, any>) => {
  if (!user) return
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem(USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  } catch (e) {
    return null
  }
}

export const saveMetadataToStorage = (metadata: Record<string, any>) => {
  if (!metadata) return
  localStorage.setItem(METADATA_KEY, JSON.stringify(metadata))
}

export const getMetadataFromStorage = () => {
  try {
    const metadataStr = localStorage.getItem(METADATA_KEY)
    return metadataStr ? JSON.parse(metadataStr) : null
  } catch (e) {
    return null
  }
}

export const removeUserFromStorage = () => {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}
