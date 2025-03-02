import { useAppDispatch, useAppSelector } from '@/hooks'
import { setAuthToast } from '@/features/auth/authSlice'
import { setUserToast } from '@/features/user/userSlice'
import Toast from '@/components/Toast'

const AppToast = () => {
  const dispatch = useAppDispatch()
  const authToastData = useAppSelector((state) => state.auth.toastData)
  const userToastData = useAppSelector((state) => state.user.toastData)

  return (
    <div>
      {authToastData?.message && (
        <Toast
          type={authToastData.type}
          message={authToastData.message}
          onClose={() => {
            dispatch(setAuthToast({}))
          }}
        />
      )}
      {userToastData?.message && (
        <Toast
          type={userToastData.type}
          message={userToastData.message}
          onClose={() => {
            dispatch(setUserToast({}))
          }}
        />
      )}
    </div>
  )
}

export default AppToast
