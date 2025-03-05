import authReducer from '../features/auth/authSlice'
import metadataReducer from '../features/metadata/metadataSlice'
import userReducer from '../features/user/userSlice'
import appsReducer from '../features/apps/appsSlice'
import websitesReducer from '../features/websites/websitesSlice'

export default {
  auth: authReducer,
  metadata: metadataReducer,
  user: userReducer,
  apps: appsReducer,
  websites: websitesReducer,
}
