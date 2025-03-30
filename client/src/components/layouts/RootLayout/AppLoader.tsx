import Loader from '@/components/Loader'
import { useAppSelector } from '@/hooks'

const AppLoader = () => {
  const isLoadingAuth = useAppSelector((state) => state.auth.isLoading)
  const isDeletingProject = useAppSelector(
    (state) => state.projects.projectDelete.isLoading
  )
  const isLoadingProjectForm = useAppSelector(
    (state) => state.projects.projectForm.isLoading
  )

  const isLoading = isLoadingAuth || isDeletingProject || isLoadingProjectForm

  return (
    <div>
      <Loader isLoading={isLoading} />
    </div>
  )
}

export default AppLoader
