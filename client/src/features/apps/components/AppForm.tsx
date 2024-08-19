import { useFormik } from 'formik'
import ModalWrapper from '@/components/ModalWrapper'
import CheckboxInput from '@/components/CheckboxInput'
import Dropdown from '@/components/Dropdown'
import FormInputWrapper from '@/components/FormInputWrapper'
import FileInput from '@/components/FileInput'
import CloseIcon from '@/assets/icons/close.svg?react'
import MinimizeIcon from '@/assets/icons/minimize.svg?react'
import useFormikErrors from '@/hooks/useFormikErrors'
import { validateAppForm } from '../util'
import { AppFormValues, AppFormError } from '../apps.types'

const categories = [
  'Education',
  'Healthcare',
  'Fitness',
  'SAKSDJKDF',
  'sdfsdfsdf',
  'sdfsdfdsfdfdsf',
]

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
        <div className="flex items-start justify-between p-6 max-md:p-5">
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
        <div className="flex-grow overflow-auto px-8 pb-6 custom-scrollbar max-md:px-6">
          <form onSubmit={formik.handleSubmit}>
            <CheckboxInput
              title="Public"
              onChange={(value) => {
                formik.setFieldValue('isPrivate', !value)
              }}
              checked={!formik.values.isPrivate}
            />
            <FormInputWrapper
              title="Upload Package File*"
              error={errors.attachmentPackage}
            >
              <FileInput
                hintDescription="(Only .apk/.ios file allowed | Maximum file size: 20MB)"
                allowedFileTypes={['.ipa', '.apk']}
                maxFileSizeKB={20480}
                multiple={false}
                disabled={formik.values.attachmentPackage ? true : false}
                onSelectFiles={([file]) =>
                  formik.setFieldValue('attachmentPackage', file)
                }
              />
            </FormInputWrapper>
            <FormInputWrapper title="App Name*" error={errors.name}>
              <input
                name="name"
                type="text"
                placeholder="Enter app name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="textfield"
              />
            </FormInputWrapper>
            <FormInputWrapper title="Description">
              <textarea
                name="description"
                placeholder="Enter app description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="textfield"
              />
            </FormInputWrapper>
            <FormInputWrapper
              title={`Categories (${formik.values.categories?.length ?? 0}/5)`}
              error={errors.categories}
            >
              <Dropdown
                selectedOptions={formik.values.categories}
                options={categories.toDropdownOptions()}
                onChange={(options) => {
                  formik.setFieldTouched('categories')
                  formik.setFieldValue('categories', options)
                }}
                selectionLimit={5}
                showMenuIcon
                multiselect
                targetClass="textfield py-0"
                contentClass="left-0 right-auto mt-2"
              />
            </FormInputWrapper>
            <FormInputWrapper title="Source Code URL" error={errors.sourceCode}>
              <input
                name="sourceCode"
                type="text"
                placeholder="Enter source code url (Github/Gitlab)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="textfield"
              />
            </FormInputWrapper>
            <CheckboxInput
              title="Public Source Code"
              onChange={(value) => {
                formik.setFieldValue('isSourceCodePublic', value)
              }}
              checked={formik.values.isSourceCodePublic}
              className="mt-3"
            />
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
