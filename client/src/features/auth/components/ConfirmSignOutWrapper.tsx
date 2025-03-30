import ConfirmationModal from '@/components/ConfirmationModal'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { cancelSignOut, signOut } from '../authSlice'

const ConfirmSignOutWrapper = () => {
  const dispatch = useAppDispatch()
  const isConfirmSignOut = useAppSelector(
    (state) => state.auth.isConfirmSignOut
  )

  return (
    <>
      {isConfirmSignOut && (
        <ConfirmationModal
          title="Logout?"
          message="Are you sure to logout?"
          onClose={() => {
            dispatch(cancelSignOut())
          }}
          onConfirm={() => {
            dispatch(signOut())
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

export default ConfirmSignOutWrapper
