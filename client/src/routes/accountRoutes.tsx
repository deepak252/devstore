import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const AccountLayout = lazy(
  () => import('@/features/user/components/AccountLayout')
)
const GeneralPage = lazy(() => import('@/features/user/pages/account/General'))
const MyProjectsPage = lazy(
  () => import('@/features/user/pages/account/MyProjects')
)

const accountRoutes: RouteObject = {
  path: '/account',
  element: <AccountLayout />,
  children: [
    {
      path: '',
      element: <GeneralPage />,
    },
    {
      path: 'projects',
      element: <MyProjectsPage />,
    },
  ],
}

export default accountRoutes
