import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
// import Loader from '@/components/Loader'
import AppLogo from '@/components/AppLogo'
import BGAuth from '@/assets/images/bg-auth.svg?react'
import { resetAuthState } from '@/features/auth/authSlice'
import {
  useAppDispatch,
  useAppSelector,
  useAuth,
  useNavigateWithState,
} from '@/hooks'

function AuthLayout() {
  const navigate = useNavigateWithState()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isSignedIn = useAuth()
  const isEmailVerificationSent = useAppSelector(
    (state) => state.auth.isEmailVerificationSent
  )

  const from = (location.state?.from?.pathname as string) || '/'

  useEffect(() => {
    if (isSignedIn) {
      if (from.startsWith('/auth')) {
        navigate('/', { replace: true })
      } else {
        navigate(from, { replace: true })
      }
    } else if (isEmailVerificationSent) {
      navigate('/auth/verify-email')
    }
    dispatch(resetAuthState())
  }, [navigate, dispatch, from, isSignedIn, isEmailVerificationSent])

  return (
    <>
      <div className="h-screen w-screen relative overflow-hidden bg-secondary">
        {/* Auth Navbar */}
        <div className="flex items-center sticky top-0 w-full px-3 py-4">
          <AppLogo className="ms-2" textClassName="text-white" />
          <div className="flex items-center justify-end w-full max-sm:hidden">
            <NavLink
              to="/auth/sign-in"
              className="btn-outlined mx-2 text-white active:bg-[#E0E0FF22]"
            >
              Sign In
            </NavLink>
            <NavLink to="/auth/sign-up" className="btn-filled mx-2">
              Sign Up
            </NavLink>
          </div>
        </div>
        <BGAuth className="absolute h-[calc(100vh-100px)] max-h-[800px] left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90 transition-all duration-1000 max-lg:opacity-70 max-lg:left-1/2 " />
        <div className="absolute left-[70%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-9 rounded-3xl bg-white shadow-2xl shadow-secondary transition-[left] duration-1000 custom-scrollbar max-lg:left-1/2 max-lg:p-7">
          <Outlet />
        </div>
      </div>
      {/* <Loader isLoading={isLoading} /> */}
    </>
  )
}

export default AuthLayout
