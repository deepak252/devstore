import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import FormInputWrapper from '@/components/FormInputWrapper'
import GoogleIcon from '@/assets/icons/google.svg?react'
import GithubIcon from '@/assets/icons/github.svg?react'
import VisibilityOnIcon from '@/assets/icons/visibility-on.svg?react'
import VisibilityOffIcon from '@/assets/icons/visibility-off.svg?react'
import { signIn } from '@/slices/authSlice'
import { useAppDispatch } from '@/hooks'
import { SignInFormError, SignInFormValues, validateSignInForm } from './util'

function SignIn() {
  const dispatch = useAppDispatch()

  const formik = useFormik<SignInFormValues>({
    initialValues: { usernameOrEmail: '', password: '' },
    validate: validateSignInForm,
    onSubmit: (values) => {
      dispatch(signIn(values))
    },
  })
  const isPasswordVisible = formik.values.isPasswordVisible

  const errors = useMemo(() => {
    const e: SignInFormError = {}
    if (formik.touched.usernameOrEmail && formik.errors.usernameOrEmail) {
      e.usernameOrEmail = formik.errors.usernameOrEmail
    }
    if (formik.touched.password && formik.errors.password) {
      e.password = formik.errors.password
    }
    return e
  }, [formik.touched, formik.errors])

  const togllePasswordVisible = () => {
    formik.setFieldValue('isPasswordVisible', !isPasswordVisible)
  }

  return (
    <>
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
      <form onSubmit={formik.handleSubmit}>
        <FormInputWrapper
          title="Username or Email"
          error={errors.usernameOrEmail}
        >
          <input
            name="usernameOrEmail"
            type="text"
            className="form-input"
            placeholder="Enter username or email"
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
        <p className="text-end py-1">
          <Link to="/auth/forgot-password" className="text-primary text-sm ">
            Forgot Password?
          </Link>
        </p>
        <button type="submit" className="btn-filled w-full my-5">
          Log In
        </button>
      </form>
      <p className="text-sm text-center">
        Don't have an account?{' '}
        <Link to="/auth/register" className="text-primary">
          Create Account
        </Link>
      </p>
    </>
  )
}

export default SignIn
