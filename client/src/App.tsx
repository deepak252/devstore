/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { setupInterceptor } from './services/api'
import { useAppDispatch } from './hooks'
import { getUserProfile } from './features/user/userSlice'
import useNavigateWithState from './hooks/useNavigateWithState'
import useSignedIn from './hooks/useSignedIn'
// import { getMetadata } from './slices/metadataSlice'

function App() {
  const navigate = useNavigateWithState()
  const dispatch = useAppDispatch()
  const isSignedIn = useSignedIn()

  useEffect(() => {
    setupInterceptor(navigate)
    // dispatch(getMetadata())
    if (isSignedIn) {
      // dispatch(getUserProfile())
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
