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
import { checkUsername, resetAuthState, signUp } from '../authSlice'
import { useAppDispatch, useAppSelector, useFormikErrors } from '@/hooks'
import { validateSignUpForm } from '../authUtil'
import { SignUpFormError, SignUpFormValues } from '../auth.types'
import _ from 'lodash'

function SignUpPage() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.auth.signUp.isLoading)
  const usernameState = useAppSelector((state) => state.auth.username)
  const debouncedCheckUsername = useMemo(
    () =>
      _.debounce((username: string) => {
        dispatch(checkUsername({ username }))
      }, 400),
    [dispatch] // Only recreate the function if `dispatch` changes
  )

  const formik = useFormik<SignUpFormValues>({
    initialValues: { email: '', username: '', password: '' },
    validate: validateSignUpForm,
    onSubmit: (values) => {
      if (errors.username || !usernameState.isAvailable) return
      dispatch(signUp(values))
    },
  })
  const isPasswordVisible = formik.values.isPasswordVisible

  const errors = useFormikErrors<SignUpFormValues, SignUpFormError>(formik)

  useEffect(() => {
    //To reset username state
    dispatch(resetAuthState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const username = formik.values.username
    if (username.trim()) {
      debouncedCheckUsername(formik.values.username)
    }
  }, [formik.values.username, debouncedCheckUsername])

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
        <FormInputWrapper
          title="Username"
          className="mt-4"
          error={errors.username || usernameState.error}
          // trailing={
          //   usernameState.isLoading ? (
          //     <Spinner className="size-6 mx-4" />
          //   ) : (
          //     <></>
          //   )
          // }
          // trailing={
          // usernameState.isLoading ? (
          //   <Spinner className="size-5 !border-[4px]" />
          // ) : (
          //   !errors?.username &&
          //   usernameState.isAvailable && <CheckCicleIcon className="size-5" />
          // )
          // }
        >
          <div className="textfield p-0">
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-4 py-3"
            />
            <div className="me-2 flex-center">
              {usernameState.isLoading ? (
                <Spinner className="size-5 !border-[4px]" />
              ) : (
                !errors?.username &&
                usernameState.isAvailable && (
                  <CheckCicleIcon className="size-5" />
                )
              )}
            </div>
          </div>
        </FormInputWrapper>
        <FormInputWrapper title="Email" error={errors.email}>
          <input
            type="text"
            name="email"
            className="textfield"
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
          <div className="textfield p-0">
            <input
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Enter password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-4 py-3"
            />
            <div className="me-2">
              {isPasswordVisible ? (
                <VisibilityOffIcon
                  role="button"
                  onClick={togllePasswordVisible}
                />
              ) : (
                <VisibilityOnIcon
                  role="button"
                  onClick={togllePasswordVisible}
                />
              )}
            </div>
          </div>
        </FormInputWrapper>

        <button
          type="submit"
          className="btn-filled w-full mt-6 mb-5"
          disabled={isLoading}
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm text-center">
        Already have an accoount?{' '}
        <Link to="/auth/sign-in" className="text-primary">
          Sign In
        </Link>
      </p>
    </>
  )
}

export default SignUpPage
