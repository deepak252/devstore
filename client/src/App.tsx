/// <reference types="vite-plugin-svgr/client" />
import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { setupInterceptor } from './services/api'
// import { useAppDispatch } from './hooks'
// import { getMetadata } from './slices/metadataSlice'

function App() {
  // const dispatch = useAppDispatch()
  useEffect(() => {
    setupInterceptor()
    // dispatch(getMetadata())
    // if (signedIn) {
    //   dispatch(getUser())
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
