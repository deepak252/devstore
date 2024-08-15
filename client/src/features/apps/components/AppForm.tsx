import { useFormik } from 'formik'
import ModalWrapper from '@/components/ModalWrapper'
import CloseIcon from '@/assets/icons/close.svg?react'
import MinimizeIcon from '@/assets/icons/minimize.svg?react'
import FormInputWrapper from '@/components/FormInputWrapper'
import useFormikErrors from '@/hooks/useFormikErrors'
import { validateAppForm } from '../util'
import { AppFormValues, AppFormError } from '../apps.types'

const AppForm = ({ onClose }: { onClose: () => void }) => {
  const formik = useFormik<AppFormValues>({
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
    validate: validateAppForm,
    onSubmit: (values) => {
      console.log(values)

      // dispatch(signIn(values))
    },
  })
  const errors = useFormikErrors<AppFormValues, AppFormError>(formik)

  return (
    <ModalWrapper onClose={onClose} isOpen closeOnEsc>
      <div className="flex flex-col bg-white rounded-2xl max-w-3xl w-[80vw] max-h-[80vh] min-h-[50vh]">
        <div className="flex items-start justify-between p-6">
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
        <div className="flex-grow overflow-auto px-8 pb-6 custom-scrollbar">
          <form onSubmit={formik.handleSubmit}>
            <input type="checkbox" />
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
            <FormInputWrapper title="Source Code URL" error={errors.sourceCode}>
              <input
                name="sourceCode"
                type="text"
                placeholder="Enter source code url (Github/Gitlab)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormInputWrapper>
          </form>
        </div>
        <hr />
        <div className="flex justify-end p-4">
          <button className="btn-outlined mx-3">Cancel</button>
          <button
            type="submit"
            className="btn-filled"
            onClick={() => formik.handleSubmit()}
          >
            Create
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default AppForm
