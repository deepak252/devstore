import authReducer from '../features/auth/authSlice'
import metadataReducer from '../features/metadata/metadataSlice'
import userReducer from '../features/user/userSlice'
import appsReducer from '../features/apps/appsSlice'

export default {
  auth: authReducer,
  metadata: metadataReducer,
  user: userReducer,
  apps: appsReducer,
}
