import { useFormik } from 'formik'
import ModalWrapper from '@/components/ModalWrapper'
import CheckboxInput from '@/components/CheckboxInput'
import Dropdown from '@/components/Dropdown'
import FormInputWrapper from '@/components/FormInputWrapper'
import FileInput from '@/components/FileInput'
import CloseIcon from '@/assets/icons/close.svg?react'
import MinimizeIcon from '@/assets/icons/minimize.svg?react'
import useFormikErrors from '@/hooks/useFormikErrors'
import { validateWebsiteForm } from '../websitesUtil'
import { WebsiteFormError, WebsiteFormValues } from '../websites.types'
import { useAppDispatch } from '@/hooks'
import { uploadWebsiteIcon } from '../websitesSlice'
import Attachment from '@/components/Attachment'
import _ from 'lodash'

const categories = [
  'Education',
  'Healthcare',
  'Fitness',
  'SAKSDJKDF',
  'sdfsdfsdf',
  'sdfsdfdsfdfdsf',
]

const MAX_IMAGES_COUNT = 5

const WebsiteForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch()
  const formik = useFormik<WebsiteFormValues>({
    initialValues: {
      name: '',
      description: '',
      isPrivate: false,
      categories: [],
      sourceCodeUrl: '',
      demoUrl: '',
    },
    validate: validateWebsiteForm,
    onSubmit: (values) => {
      console.log(values)

      // dispatch(signIn(values))
    },
  })
  const errors = useFormikErrors<WebsiteFormValues, WebsiteFormError>(formik)

  const handleIconSelect = ([file]: File[]) => {
    formik.setFieldValue('icon', { file })
    // dispatch(uploadWebsiteIcon({ icon: file }))
  }

  const handleImagesSelect = (files: File[]) => {
    const currentImages = formik.values.images || []

    const incomingImages = files.map((file) => ({
      file,
    }))
    formik.setFieldValue(
      'images',
      [...currentImages, ...incomingImages].slice(0, MAX_IMAGES_COUNT)
    )
  }

  const handleRemoveImage = (item: any) => {
    const updatedFiles = formik.values.images?.filter(
      (e) => !_.isEqual(e, item)
    )
    formik.setFieldValue('images', updatedFiles || [])
  }

  const handleRemoveIcon = () => {
    formik.setFieldValue('icon', undefined)
  }

  // const handleRemoveFile = (field, file) => {
  //   if (field === 'attachmentPackage') {
  //     handleInputChange(field, null)
  //     dispatch(uploadAppPackageCancelled())
  //   } else if (field === 'attachmentImages') {
  //     let updatedFiles = formData?.[field]?.filter((e) => e.name !== file.name)
  //     handleInputChange(field, updatedFiles)
  //   } else {
  //     //attachmentIcon, attachmentVideo
  //     handleInputChange(field, null)
  //   }
  // }

  return (
    <ModalWrapper onClose={onClose} isOpen closeOnEsc>
      <div className="flex flex-col bg-white rounded-2xl max-w-3xl w-[80vw] max-h-[80vh] min-h-[50vh]">
        <div className="flex items-start justify-between p-6 max-md:p-5">
          <h5>Add Website</h5>
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
            {/* <FormInputWrapper
              title="Upload Package File*"
              // error={errors.attachmentPackage}
            >
              <FileInput
                hintDescription="(Only .apk/.ios file allowed | Maximum file size: 20MB)"
                allowedFileTypes={['.ipa', '.apk']}
                maxFileSizeKB={20480}
                multiple={false}
                // disabled={formik.values.attachmentPackage ? true : false}
                onSelectFiles={([file]) =>
                  formik.setFieldValue('attachmentPackage', file)
                }
              />
            </FormInputWrapper> */}
            <FormInputWrapper title="Website Title*" error={errors.name}>
              <input
                name="name"
                type="text"
                placeholder="Enter website title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="textfield"
              />
            </FormInputWrapper>
            <FormInputWrapper title="Description">
              <textarea
                name="description"
                placeholder="Enter website description"
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
            <FormInputWrapper
              title="Source Code URL"
              error={errors.sourceCodeUrl}
            >
              <input
                name="sourceCodeUrl"
                type="text"
                placeholder="Enter source code url (Github/Gitlab)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="textfield"
              />
            </FormInputWrapper>
            <FormInputWrapper
              title="Add Icon"
              error={errors.icon}
              className="mt-6"
            >
              {formik.values.icon ? (
                <Attachment
                  file={formik.values.icon.file}
                  wrapperClassName="!size-32"
                  onRemove={handleRemoveIcon}
                />
              ) : (
                <FileInput
                  hintDescription="(Only png/jpg file allowed | Maximum file size: 512KB)"
                  allowedFileTypes={['.png', '.jpg', '.jpeg']}
                  maxFileSizeKB={512}
                  multiple={false}
                  onSelectFiles={handleIconSelect}
                />
              )}
            </FormInputWrapper>

            <FormInputWrapper
              title="Add Screenshots"
              error={errors.images}
              className="mt-6"
            >
              <div className="flex flex-wrap gap-4">
                {(formik.values.images?.length || 0) < 5 && (
                  <FileInput
                    hintDescription="(Only png/jpg file allowed | Maximum file size: 1024KB)"
                    allowedFileTypes={['.png', '.jpg', '.jpeg']}
                    maxFileSizeKB={1024}
                    multiple={true}
                    onSelectFiles={handleImagesSelect}
                    className="w-full"
                  />
                )}
                {formik.values.images?.map((item) => (
                  <Attachment
                    key={item.file?.name || item.publicId}
                    file={item.file}
                    wrapperClassName="!size-32"
                    onRemove={() => {
                      handleRemoveImage(item)
                    }}
                  />
                ))}
              </div>
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
            Submit
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default WebsiteForm
