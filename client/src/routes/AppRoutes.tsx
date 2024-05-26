import DefaultLayout from '@/components/layout/DefaultLayout'
import HomePage from '@/pages/Home'
import Login from '@/pages/auth/Login'
import { Route, Routes } from 'react-router-dom'

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default AppRoutes
