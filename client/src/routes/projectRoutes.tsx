import ProjectDetailsPage from '@/features/projects/pages/ProjectDetailsPage'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const ProjectsPage = lazy(
  () => import('@/features/projects/pages/ProjectsPage')
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
      path: ':projectId',
      element: <ProjectDetailsPage />,
    },
  ],
}

export default projectRoutes
