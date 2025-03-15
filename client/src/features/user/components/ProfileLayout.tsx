import { Outlet } from 'react-router-dom'

function ProfileLayout() {
  return (
    <div className="min-h-screen max-w-[1200px] mx-auto px-6 py-8">
      <Outlet />
    </div>
  )
}

export default ProfileLayout
