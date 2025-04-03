import { useEffect } from 'react'
import ProjectForm from '../components/ProjectForm'
import { useAppDispatch, useAppSelector, useNavigateWithState } from '@/hooks'
import { getProjectDetails, resetProjectForm } from '../projectsSlice'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from '@/components/Loader'

function EditProjectPage() {
  const location = useLocation()
  const { projectId = '' } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const isSuccessful = useAppSelector(
    (state) => state.projects.projectForm.isSuccessful
  )
  const projectDetails = useAppSelector(
    (state) => state.projects.projectDetails
  )

  const from = (location.state?.from?.pathname as string) || '/'

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectDetails({ projectId }))
    }
  }, [dispatch, projectId])

  useEffect(() => {
    if (isSuccessful) {
      dispatch(resetProjectForm())
      navigate(from)
    }
  }, [isSuccessful, from, dispatch, navigate])

  return (
    <div className="pb-12">
      {projectDetails.isLoading ? (
        <Spinner center />
      ) : (
        <ProjectForm project={projectDetails.data} />
      )}
    </div>
  )
}

export default EditProjectPage
