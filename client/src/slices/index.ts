import authReducer from './authSlice'
import metadataReducer from './metadataSlice'
import userReducer from './userSlice'

export default {
  auth: authReducer,
  metadata: metadataReducer,
  user: userReducer,
}
