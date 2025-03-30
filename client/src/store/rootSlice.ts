import contentReducer from '../features/content/contentSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import projectsReducer from '../features/projects/projectsSlice'

export default {
  content: contentReducer,
  auth: authReducer,
  user: userReducer,
  projects: projectsReducer,
}
