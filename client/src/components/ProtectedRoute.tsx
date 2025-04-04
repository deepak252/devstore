import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isSignedIn = useAuth()
  const location = useLocation()
  return isSignedIn ? (
    children
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  )
}

export default ProtectedRoute
