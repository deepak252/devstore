import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[70px] min-h-[100vh] max-w-[1200px] mx-auto max-md:mt-[117px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
