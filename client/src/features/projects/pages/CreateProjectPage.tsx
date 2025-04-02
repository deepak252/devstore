import { useEffect } from 'react'
import ProjectForm from '../components/ProjectForm'
import { useAppDispatch, useAppSelector, useNavigateWithState } from '@/hooks'
import { resetProjectForm } from '../projectsSlice'
import { useLocation } from 'react-router-dom'

function CreateProjectPage() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const isSuccessful = useAppSelector(
    (state) => state.projects.projectForm.isSuccessful
  )
  const from = (location.state?.from?.pathname as string) || '/'

  useEffect(() => {
    if (isSuccessful) {
      dispatch(resetProjectForm())
      navigate(from)
    }
  }, [isSuccessful, from, dispatch, navigate])

  return (
    <div className="pb-12">
      <ProjectForm />
    </div>
  )
}

export default CreateProjectPage
