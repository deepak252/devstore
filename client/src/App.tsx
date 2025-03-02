/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { setupInterceptor } from './services/api'
import { useAppDispatch, useAuth } from './hooks'
import useNavigateWithState from './hooks/useNavigateWithState'
import { getProfile } from './features/user/userSlice'
// import { getMetadata } from './slices/metadataSlice'

function App() {
  const navigate = useNavigateWithState()
  const dispatch = useAppDispatch()
  const isSignedIn = useAuth()

  useEffect(() => {
    setupInterceptor(navigate)
    // dispatch(getMetadata())
    if (isSignedIn) {
      dispatch(getProfile())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
