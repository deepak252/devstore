import { lazy, Suspense } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { Spinner } from '@/components/Loader'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import accountRoutes from './accountRoutes'
import projectRoutes from './projectRoutes'
const RootLayout = lazy(() => import('@/components/layouts/RootLayout'))
const MainLayout = lazy(() => import('@/components/layouts/MainLayout'))
const AppsPage = lazy(() => import('@/features/apps/pages/AppsPage'))
const AppDetailsPage = lazy(
  () => import('@/features/apps/pages/AppDetailsPage')
)
const WebsitesPage = lazy(
  () => import('@/features/websites/pages/WebsitesPage')
)
const WebsiteDetailsPage = lazy(
  () => import('@/features/websites/pages/WebsiteDetailsPage')
)
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
            path: 'apps',
            children: [
              {
                path: '',
                element: <AppsPage />,
              },
              {
                path: ':projectId',
                element: <AppDetailsPage />,
              },
            ],
          },
          {
            path: 'websites',
            children: [
              {
                path: '',
                element: <WebsitesPage />,
              },
              {
                path: ':projectId',
                element: <WebsiteDetailsPage />,
              },
            ],
          },
          accountRoutes,
          projectRoutes,
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
