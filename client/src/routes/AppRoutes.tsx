import { lazy, Suspense } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { Spinner } from '@/components/Loader'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import accountRoutes from './accountRoutes'
import projectRoutes from './projectRoutes'
import DevelopersPage from '@/features/user/pages/DevelopersPage'
const RootLayout = lazy(() => import('@/components/layouts/RootLayout'))
const MainLayout = lazy(() => import('@/components/layouts/MainLayout'))
const HomePage = lazy(() => import('@/pages/HomePage'))
const PageNotFound = lazy(() => import('@/components/PageNotFound'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: '/developers',
            element: <DevelopersPage />,
          },
          accountRoutes,
          projectRoutes,
          {
            path: '*',
            element: <PageNotFound />,
          },
        ],
      },
      authRoutes,
      userRoutes,
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]

const SuspenseWrapper = (route: RouteObject): RouteObject => {
  if (route.element) {
    route.element = (
      <Suspense fallback={<Spinner center />}>{route.element}</Suspense>
    )
  }

  if (route.children) {
    // Recursive Wrapping for Nested Routes
    route.children = route.children.map(SuspenseWrapper)
  }

  return route
}

function AppRoutes() {
  const wrappedRoutes = routes.map(SuspenseWrapper)
  return useRoutes(wrappedRoutes)
}

export default AppRoutes
