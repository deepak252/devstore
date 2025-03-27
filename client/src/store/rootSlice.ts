import contentReducer from '../features/content/contentSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import appsReducer from '../features/apps/appsSlice'
import websitesReducer from '../features/websites/websitesSlice'
import projectsReducer from '../features/projects/projectsSlice'

export default {
  content: contentReducer,
  auth: authReducer,
  user: userReducer,
  apps: appsReducer,
  websites: websitesReducer,
  projects: projectsReducer,
}
