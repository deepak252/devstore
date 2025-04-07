import { useEffect, useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAuth, useNavigateWithState } from '@/hooks'
import { sendEmailVerification, verifyEmail } from '../authSlice'
import { getUserFromStorage } from '@/utils/storage'

function EmailVerificationPage() {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const location = useLocation()
  const user = useMemo(getUserFromStorage, [])

  const isSignedIn = useAuth()
  const from = (location.state?.from?.pathname as string) || '/'
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail({ token }))
    } else if (isSignedIn) {
      navigate(from)
    } else if (!user) {
      navigate('/auth/sign-in')
    }
  }, [navigate, dispatch, from, isSignedIn, user, token])

  const handleResendClick = async () => {
    if (!user?.email) {
      navigate('/auth/sign-in')
    } else {
      dispatch(sendEmailVerification({ email: user.email }))
    }
  }

  return (
    <>
      <h4 className="text-gray-750">Almost Done</h4>
      <div className="my-5">
        <p className="text-neutral-600">
          A verification link has been sent to your email:{' '}
          <span className="text-neutral-900 font-medium">{user?.email}</span>
        </p>
      </div>

      <button
        className="btn-filled mt-12 mb-5 mx-auto"
        onClick={handleResendClick}
      >
        Resend Link
      </button>
    </>
  )
}

export default EmailVerificationPage
