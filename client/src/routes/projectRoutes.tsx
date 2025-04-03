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
      element: <CreateProjectPage />,
    },
    {
      path: 'edit/:projectId',
      element: <EditProjectRoute />,
    },
    {
      path: ':projectId',
      element: <ProjectDetailsPage />,
    },
  ],
}

export default projectRoutes
