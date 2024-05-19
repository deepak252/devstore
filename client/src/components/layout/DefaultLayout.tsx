import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'

const DefaultLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[70px] min-h-[calc(100vh-300px)] max-w-[1200px] mx-auto max-md:mt-[117px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
