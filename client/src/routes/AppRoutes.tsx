import { Route, Routes } from 'react-router-dom'
import AuthLayout from '@/components/layout/AuthLayout'
import DefaultLayout from '@/components/layout/DefaultLayout'
import Home from '@/pages/Home'
import SignIn from '@/pages/auth/SignIn'
import SignUp from '@/pages/auth/SignUp'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import Apps from '@/pages/Apps'
import PageNotFound from '@/pages/PageNotFound'

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="apps" element={<Apps />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
