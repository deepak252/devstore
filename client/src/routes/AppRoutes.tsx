import { lazy, Suspense } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { Spinner } from '@/components/Loader'
import authRoutes from './authRoutes'
const RootLayout = lazy(() => import('@/components/layouts/RootLayout'))
const MainLayout = lazy(() => import('@/components/layouts/MainLayout'))
const AppsPage = lazy(() => import('@/features/apps/pages/AppsPage'))
const WebsitesPage = lazy(
  () => import('@/features/websites/pages/WebsitesPage')
)
const HomePage = lazy(() => import('@/pages/HomePage'))
const PageNotFound = lazy(() => import('@/pages/PageNotFound'))

const routes = [
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
            path: 'apps',
            element: <AppsPage />,
          },
          {
            path: 'websites',
            element: <WebsitesPage />,
          },
        ],
      },
      authRoutes,
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
