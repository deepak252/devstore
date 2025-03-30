import ConfirmationModal from '@/components/ConfirmationModal'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { deleteProject, cancelDeleteProject } from '../projectsSlice'

const ProjectDeleteWrapper = () => {
  const dispatch = useAppDispatch()
  const isConfirmDelete = useAppSelector(
    (state) => state.projects.projectDelete.isConfirm
  )

  return (
    <>
      {isConfirmDelete && (
        <ConfirmationModal
          title="Confirm Delete"
          message="Are you sure you want to delete this item?"
          onClose={() => {
            dispatch(cancelDeleteProject())
          }}
          onConfirm={() => {
            dispatch(deleteProject())
          }}
        />
      )}
      {/* <button
        className="btn-fab fixed bottom-8 right-8"
        onClick={handleToggleProjectFormOpen}
      >
        <AddIcon className="fill-primary size-8" />
        Add Project
      </button>
      {isFormOpen && <ProjectForm onClose={handleToggleProjectFormOpen} />} */}
    </>
  )
}

export default ProjectDeleteWrapper
