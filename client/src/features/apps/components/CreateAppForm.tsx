import ModalWrapper from '@/components/ModalWrapper'
import CloseIcon from '@/assets/icons/close.svg?react'
import MinimizeIcon from '@/assets/icons/minimize.svg?react'
import FormInputWrapper from '@/components/FormInputWrapper'
import { useFormik } from 'formik'
import { useMemo } from 'react'
import { CreateAppFormData, CreateAppFormError } from '../apps.types'

const CreateAppForm = ({ onClose }: { onClose: () => void }) => {
  const formik = useFormik<CreateAppFormData>({
    initialValues: {
      name: '',
      description: '',
      categories: [],
      sourceCode: '',
      isSourceCodePublic: false,
      isPrivate: false,
      attachmentIcon: null,
      attachmentImages: [],
      attachmentVideo: null,
      attachmentGraphic: null,
      attachmentPackage: null,
    },
    // validate: validateSignInForm,
    onSubmit: (values) => {
      console.log(values)

      // dispatch(signIn(values))
    },
  })

  const errors = useMemo(() => {
    const e: CreateAppFormError = {}
    if (formik.touched.name && formik.errors.name) {
      e.name = formik.errors.name
    }
    if (formik.touched.attachmentPackage && formik.errors.attachmentPackage) {
      e.attachmentPackage = formik.errors.attachmentPackage
    }
    if (formik.touched.attachmentIcon && formik.errors.attachmentIcon) {
      e.attachmentIcon = formik.errors.attachmentIcon
    }
    if (formik.touched.attachmentImages && formik.errors.attachmentImages) {
      e.attachmentImages = formik.errors.attachmentImages
    }
    return e
  }, [formik.touched, formik.errors])

  return (
    <ModalWrapper onClose={onClose} isOpen closeOnEsc>
      <div className="flex flex-col bg-white p-3 rounded-2xl max-w-3xl w-[80vw] max-h-[80vh] min-h-[50vh]">
        <div className="flex items-start justify-between p-3">
          <h5>Create App</h5>
          <div className="flex-center">
            <button className="mx-2">
              <MinimizeIcon className="size-7" />
            </button>
            <button onClick={onClose}>
              <CloseIcon className="size-7" />
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-auto p-3 custom-scrollbar">
          <form onSubmit={formik.handleSubmit}>
            <FormInputWrapper title="App Name*" error={errors.name}>
              <input
                name="name"
                type="text"
                placeholder="Enter app name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormInputWrapper>
            <FormInputWrapper title="Description">
              <textarea
                name="description"
                placeholder="Enter app description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormInputWrapper>
          </form>
        </div>
        <hr />
        <div className="flex justify-end pt-3">
          <button className="btn-outlined mx-3">Cancel</button>
          <button className="btn-filled">Create</button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default CreateAppForm
