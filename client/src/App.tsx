/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { setupInterceptor } from './services/api'
import { useAppDispatch, useAppSelector } from './hooks'
import { getUserProfile } from './slices/userSlice'
import { userSignedIn } from './utils/storage'
import useNavigateWithState from './hooks/useNavigateWithState'
// import { getMetadata } from './slices/metadataSlice'

function App() {
  const navigate = useNavigateWithState()
  const dispatch = useAppDispatch()
  const isSignedOut = useAppSelector((state) => state.auth.isSignedOut)
  const isSignedIn = userSignedIn()

  useEffect(() => {
    setupInterceptor(navigate)
    // dispatch(getMetadata())
    if (isSignedIn) {
      dispatch(getUserProfile())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSignedOut) {
      location.reload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedOut])

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
