import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import AppLogo from '@/components/AppLogo'
import Loader from '../../../components/Loader'
import Toast from '../../../components/Toast'
import BGAuth from '@/assets/images/bg-auth.svg?react'
import { resetAuthState, setAuthToastData } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'

function AuthLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const toastData = useAppSelector((state) => state.auth.toastData)
  const isSignedIn = useAppSelector((state) => state.auth.isSignedIn)
  const from = (location.state?.pathname as string) || '/'

  useEffect(() => {
    if (isSignedIn) {
      navigate(from, { replace: true })
      // dispatch(getUserProfile())
      dispatch(resetAuthState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, from, isSignedIn])

  return (
    <>
      <div className="h-screen w-screen relative overflow-hidden bg-secondary">
        {/* Auth Navbar */}
        <div className="flex items-center sticky top-0 w-full px-3 py-4">
          <AppLogo className="ms-2" textClassName="text-white" />
          <div className="flex items-center justify-end w-full">
            <NavLink
              to="/auth/login"
              className="btn-outlined mx-2 text-white active:bg-[#E0E0FF22]"
            >
              Login
            </NavLink>
            <NavLink to="/auth/register" className="btn-filled mx-2">
              Register
            </NavLink>
          </div>
        </div>
        <BGAuth className="absolute h-[calc(100vh-100px)] max-h-[800px] left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90 transition-all duration-1000 max-lg:opacity-70 max-lg:left-1/2 " />
        <div className="absolute left-[70%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-9 rounded-3xl bg-white shadow-2xl shadow-secondary transition-[left] duration-1000 custom-scrollbar max-lg:left-1/2 max-lg:p-7">
          <Outlet />
        </div>
      </div>
      {toastData.message && (
        <Toast
          type={toastData.type}
          message={toastData.message}
          onClose={() => {
            dispatch(setAuthToastData({}))
          }}
        />
      )}
      <Loader isLoading={isLoading} />
    </>
  )
}

export default AuthLayout
