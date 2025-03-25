import { Outlet } from 'react-router-dom'
import AppToast from './AppToast'
import AppLoader from './AppLoader'
import ScrollToTop from './ScrollToTop'

const RootLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Outlet />
      <AppToast />
      <AppLoader />
    </div>
  )
}

export default RootLayout
