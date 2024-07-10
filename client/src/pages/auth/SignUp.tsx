import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { Spinner } from '@/components/Loader'
import FormInputWrapper from '@/components/FormInputWrapper'
import GoogleIcon from '@/assets/icons/google.svg?react'
import GithubIcon from '@/assets/icons/github.svg?react'
import CheckCicleIcon from '@/assets/icons/check-circle.svg?react'
import VisibilityOnIcon from '@/assets/icons/visibility-on.svg?react'
import VisibilityOffIcon from '@/assets/icons/visibility-off.svg?react'
import {
  checkUsernameAvailable,
  resetAuthState,
  signUp,
} from '@/slices/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { validateSignUpForm } from './util'
import { validateUsername } from '@/utils/validators'
import { debounceHandler } from '@/utils'
import { SignUpFormError, SignUpFormValues } from '@/types/auth.types'

const debounce = debounceHandler()

function SignUp() {
  const dispatch = useAppDispatch()
  const usernameState = useAppSelector((state) => state.auth.username)

  const formik = useFormik<SignUpFormValues>({
    initialValues: { email: '', username: '', password: '' },
    validate: validateSignUpForm,
    onSubmit: (values) => {
      console.log(values)

      if (errors.username || !usernameState.isAvailable) return
      dispatch(signUp(values))
    },
  })
  const isPasswordVisible = formik.values.isPasswordVisible

  const errors = useMemo(() => {
    const e: SignUpFormError = {}
    if (formik.touched.email && formik.errors.email) {
      e.email = formik.errors.email
    }
    if (formik.touched.username && formik.errors.username) {
      e.username = formik.errors.username
    } else if (usernameState.error) {
      e.username = usernameState.error
    }
    if (formik.touched.password && formik.errors.password) {
      e.password = formik.errors.password
    }
    return e
  }, [formik.touched, formik.errors, usernameState.error])

  useEffect(() => {
    //To reset username state
    dispatch(resetAuthState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const username = formik.values.username
    if (!validateUsername(username)) {
      debounce(() => dispatch(checkUsernameAvailable({ username })), 400)
    }
  }, [formik.values.username, dispatch])

  const togllePasswordVisible = () => {
    formik.setFieldValue('isPasswordVisible', !isPasswordVisible)
  }

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
      <form onSubmit={formik.handleSubmit}>
        <FormInputWrapper title="Email" error={errors.email}>
          <input
            type="text"
            name="email"
            className="form-input"
            placeholder="Enter email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormInputWrapper>
        <FormInputWrapper
          title="Password"
          className="mt-4"
          error={errors.password}
        >
          <div className="textfield">
            <input
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Enter password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {isPasswordVisible ? (
              <VisibilityOffIcon
                role="button"
                onClick={togllePasswordVisible}
              />
            ) : (
              <VisibilityOnIcon role="button" onClick={togllePasswordVisible} />
            )}
          </div>
        </FormInputWrapper>
        <FormInputWrapper
          title="Username"
          className="mt-4"
          error={errors.username}
        >
          <div className="textfield">
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {usernameState.isLoading ? (
              <Spinner className="size-5 !border-[4px]" />
            ) : (
              !errors?.username &&
              usernameState.isAvailable && <CheckCicleIcon className="size-5" />
            )}
          </div>
        </FormInputWrapper>
        <button
          type="submit"
          className="btn-filled w-full mt-6 mb-5"
          disabled={usernameState.isLoading}
        >
          Register
        </button>
      </form>
      <p className="text-sm text-center">
        Don't have an account?{' '}
        <Link to="/auth/login" className="text-primary">
          Login
        </Link>
      </p>
    </>
  )
}

export default SignUp
