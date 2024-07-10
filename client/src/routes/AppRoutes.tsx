import { Route, Routes } from 'react-router-dom'
import AuthLayout from '@/features/auth/components/AuthLayout'
import DefaultLayout from '@/components/layout/DefaultLayout'
import Home from '@/pages/Home'
import SignIn from '@/features/auth/pages/SignIn'
import SignUp from '@/features/auth/pages/SignUp'
import AppsPage from '@/features/apps/pages/AppsPage'
import ForgotPassword from '@/features/auth/pages/ForgotPassword'
import PageNotFound from '@/pages/PageNotFound'

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="apps" element={<AppsPage />} />
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
