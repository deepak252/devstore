import { Outlet } from 'react-router-dom'
import AppLogo from '@/components/AppLogo'
import BGAuth from '@/assets/images/BG_Auth.svg?react'

function AuthLayout() {
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-secondary">
      {/* Auth Navbar */}
      <div className="flex items-center sticky top-0 w-full px-3 py-4">
        <AppLogo className="ms-2" textClassName="text-white" />
        <div className="flex items-center justify-end w-full">
          <button className="btn-outlined mx-2 text-white active:bg-[#E0E0FF22]">
            Login
          </button>
          <button className="btn-filled mx-2">Register</button>
        </div>
      </div>
      <BGAuth className="absolute h-[calc(100vh-100px)] max-h-[800px] left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90 transition-all duration-1000 max-lg:opacity-70 max-lg:left-1/2 " />
      <div className="absolute left-[70%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-9 rounded-3xl bg-white shadow-2xl shadow-secondary transition-[left] duration-1000 custom-scrollbar max-lg:left-1/2">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
