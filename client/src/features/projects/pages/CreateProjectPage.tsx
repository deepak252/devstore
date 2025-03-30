import { useEffect } from 'react'
import ProjectForm from '../components/ProjectForm'
import { useAppDispatch, useAppSelector, useNavigateWithState } from '@/hooks'
import { resetProjectForm } from '../projectsSlice'

function CreateProjectPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const isSuccessful = useAppSelector(
    (state) => state.projects.projectForm.isSuccessful
  )

  useEffect(() => {
    if (isSuccessful) {
      dispatch(resetProjectForm())
      navigate('/projects')
    }
  }, [isSuccessful, dispatch, navigate])

  return (
    <div className="pb-12">
      <ProjectForm />
    </div>
  )
}

export default CreateProjectPage
