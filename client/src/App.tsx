/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { setupInterceptor } from './services/api'
import { useAppDispatch } from './hooks'
import { getUserProfile } from './slices/userSlice'
import { isSignedIn } from './utils/storage'
// import { useAppDispatch } from './hooks'
// import { getMetadata } from './slices/metadataSlice'

function App() {
  const dispatch = useAppDispatch()
  const signedIn = isSignedIn()
  useEffect(() => {
    setupInterceptor()
    // dispatch(getMetadata())
    if (signedIn) {
      dispatch(getUserProfile())
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
