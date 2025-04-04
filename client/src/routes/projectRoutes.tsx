import ProtectedRoute from '@/components/ProtectedRoute'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const ProjectsPage = lazy(
  () => import('@/features/projects/pages/ProjectsPage')
)
const ProjectDetailsPage = lazy(
  () => import('@/features/projects/pages/ProjectDetailsPage')
)
const CreateProjectPage = lazy(
  () => import('@/features/projects/pages/CreateProjectPage')
)
const EditProjectRoute = lazy(
  () => import('@/features/projects/pages/EditProjectPage')
)

const projectRoutes: RouteObject = {
  path: '/projects',
  // element: <ProfileLayout />,
  children: [
    {
      path: '',
      element: <ProjectsPage />,
    },
    {
      path: 'create',
      element: (
        <ProtectedRoute>
          <CreateProjectPage />
        </ProtectedRoute>
      ),
    },
    {
      path: 'edit/:projectId',
      element: (
        <ProtectedRoute>
          <EditProjectRoute />
        </ProtectedRoute>
      ),
    },
    {
      path: ':projectId',
      element: <ProjectDetailsPage />,
    },
  ],
}

export default projectRoutes
