import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const ProfileLayout = lazy(
  () => import('@/features/user/components/ProfileLayout')
)
const ProfilePage = lazy(() => import('@/features/user/pages/ProfilePage'))

const userRoutes: RouteObject = {
  path: '/u',
  element: <ProfileLayout />,
  children: [
    {
      path: ':username',
      element: <ProfilePage />,
    },
  ],
}

export default userRoutes
