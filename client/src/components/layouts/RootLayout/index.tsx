import { Outlet } from 'react-router-dom'
import AppToast from './AppToast'
import AppLoader from './AppLoader'

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <AppToast />
      <AppLoader />
    </div>
  )
}

export default RootLayout
