import { NavLink } from 'react-router-dom'
import FormInputWrapper from '@/components/FormInputWrapper'
import GoogleIcon from '@/assets/icons/Google.svg?react'
import GithubIcon from '@/assets/icons/Github.svg?react'

function SignUp() {
  return (
    <>
      <h4 className="text-gray-750">Create Account</h4>
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
      <FormInputWrapper title="Email">
        <input type="text" className="form-input" placeholder="Enter email" />
      </FormInputWrapper>
      <FormInputWrapper title="Password" className="mt-4">
        <input
          type="password"
          className="form-input"
          placeholder="Enter password"
        />
      </FormInputWrapper>
      <FormInputWrapper title="Username" className="mt-4">
        <input
          type="text"
          className="form-input"
          placeholder="Enter username"
        />
      </FormInputWrapper>
      <button className="btn-filled w-full mt-6 mb-5">Register</button>
      <p className="text-sm text-center">
        Don't have an account?{' '}
        <NavLink to="/auth/login" className="text-primary">
          Login
        </NavLink>
      </p>
    </>
  )
}

export default SignUp
