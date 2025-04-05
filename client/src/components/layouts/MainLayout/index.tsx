import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ConfirmSignOutWrapper from '@/features/auth/components/ConfirmSignOutWrapper'

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[78px] min-h-screen max-w-[1200px] mx-auto">
        <Outlet />
      </div>
      <Footer />
      <ConfirmSignOutWrapper />
    </div>
  )
}

export default MainLayout
