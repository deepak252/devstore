import BGAuth from '@/assets/images/BG_Auth.svg?react'
import AppLogo from '@/components/AppLogo'
import GoogleIcon from '@/assets/icons/Google.svg?react'
import GithubIcon from '@/assets/icons/Github.svg?react'
import { NavLink } from 'react-router-dom'
import FormInputWrapper from '@/components/FormInputWrapper'

function Login() {
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
      <div className="absolute left-[70%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-9 rounded-3xl bg-white shadow-2xl shadow-secondary transition-[left] duration-1000 max-lg:left-1/2">
        <h4 className="text-gray-750">Welcome...</h4>
        <button className="btn-outlined flex-center w-full my-5 border-gray">
          <GoogleIcon className="size-6 mx-3" />
          <span className="text-gray-750 text-15 font-medium">
            Continue with Google
          </span>
        </button>
        <button className="btn-outlined flex-center w-full my-5 border-gray">
          <GithubIcon className="size-6 mx-3" />
          <span className="text-gray-750 text-15 font-medium">
            Continue with Github
          </span>
        </button>
        <div className="relative w-full my-9 border-t border-gray-400">
          <span className="absolute-center text-gray px-3 bg-white">OR</span>
        </div>
        <FormInputWrapper title="Username or Email">
          <input
            type="text"
            className="form-input"
            placeholder="Enter username or email"
          />
        </FormInputWrapper>
        <FormInputWrapper title="Password" className="mt-4">
          <input
            type="password"
            className="form-input"
            placeholder="Enter password"
          />
        </FormInputWrapper>
        <p className="text-end py-1">
          <NavLink to="/forgot-password" className="text-primary text-sm ">
            Forgot Password?
          </NavLink>
        </p>
        <button className="btn-filled w-full my-5">Log In</button>
        <p className="text-sm text-center">
          Don't have an account?{' '}
          <NavLink to="/register" className="text-primary">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Login
