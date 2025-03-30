import ModalWrapper from './ModalWrapper'
type ConfirmationModalProps = {
  title?: string
  message?: string
  onClose?: () => void
  onConfirm?: () => void
}

const ConfirmationModal = ({
  title = 'Alert',
  message = 'Confirmation required',
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <ModalWrapper
      onClose={onClose}
      isOpen
      closeOnEsc
      className="backdrop-blur-none"
    >
      <div className="modal-container max-w-80">
        <p className="text-xl font-medium text-neutral-800">{title}</p>
        <p className="text-neutral-500 mt-3">{message}</p>

        <div className="flex items-center justify-end gap-4 mt-6">
          <button className="btn-outlined py-2.5" onClick={onClose}>
            NO
          </button>
          <button className="btn-filled py-2.5" onClick={onConfirm}>
            YES
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ConfirmationModal
