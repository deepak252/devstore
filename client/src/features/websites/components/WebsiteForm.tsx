import { useFormik } from 'formik'
import ModalWrapper from '@/components/ModalWrapper'
import CheckboxInput from '@/components/CheckboxInput'
import Dropdown from '@/components/Dropdown'
import FormInputWrapper from '@/components/FormInputWrapper'
import FileInput from '@/components/FileInput'
import Attachment from '@/components/Attachment'
import Loader from '@/components/Loader'
import CloseIcon from '@/assets/icons/close.svg?react'
import { validateWebsiteForm } from '../websitesUtil'
import { WebsiteFormError, WebsiteFormValues } from '../websites.types'
import { useAppDispatch, useAppSelector, useFormikErrors } from '@/hooks'
import { createWebsite } from '../websitesSlice'

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
  const isLoading = useAppSelector(
    (state) => state.websites.websiteForm.isLoading
  )
  const formik = useFormik<WebsiteFormValues>({
    initialValues: {
      name: '',
      description: '',
      isPrivate: false,
      platform: 'website',
      categories: [],
      sourceCodeUrl: '',
      demoUrl: '',
      attachmentIcon: undefined,
      attachmentBanner: undefined,
      attachmentImages: [],
    },
    validate: validateWebsiteForm,
    onSubmit: (values) => {
      dispatch(createWebsite(values))
      // dispatch(signIn(values))
    },
  })
  const totalImages =
    (formik.values.images?.length || 0) +
    (formik.values.attachmentImages?.length || 0)
  const errors = useFormikErrors<WebsiteFormValues, WebsiteFormError>(formik)

  const handleSelectImages = (files: File[]) => {
    const currFiles = formik.values.attachmentImages || []
    const newFiles = files.map((file, index) => ({
      id: `${file.name}-${index}-${Date.now()}`, // Unique ID
      file,
    }))

    formik.setFieldValue(
      'attachmentImages',
      [...currFiles, ...newFiles].slice(
        0,
        MAX_IMAGES_COUNT - (formik.values.images?.length ?? 0)
      )
    )
  }

  return (
    <>
      <ModalWrapper onClose={onClose} isOpen closeOnEsc>
        <div className="flex flex-col bg-white rounded-2xl max-w-3xl w-[80vw] max-h-[80vh] min-h-[50vh]">
          <div className="flex items-start justify-between p-6 max-md:p-5">
            <h5>Add Website</h5>
            <div className="flex-center">
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
                  // selectedOptions={formik.values.categories || []}
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
                error={errors.attachmentIcon}
                className="mt-6"
              >
                {formik.values.icon || formik.values.attachmentIcon ? (
                  <Attachment
                    file={formik.values.attachmentIcon}
                    url={formik.values.icon}
                    wrapperClassName="!size-32"
                    onRemove={() => {
                      if (formik.values.attachmentIcon) {
                        formik.setFieldValue('attachmentIcon', undefined)
                      } else {
                        formik.setFieldValue('icon', undefined)
                      }
                    }}
                  />
                ) : (
                  <FileInput
                    hintDescription="(Only png/jpg file allowed | Maximum file size: 512KB)"
                    allowedFileTypes={['.png', '.jpg', '.jpeg']}
                    maxFileSizeKB={512}
                    multiple={false}
                    onSelectFiles={([file]) => {
                      formik.setFieldValue('attachmentIcon', file)
                    }}
                  />
                )}
              </FormInputWrapper>

              <FormInputWrapper
                title="Add Banner Image"
                error={errors.attachmentBanner}
                className="mt-6"
              >
                {formik.values.banner || formik.values.attachmentBanner ? (
                  <Attachment
                    file={formik.values.attachmentBanner}
                    url={formik.values.icon}
                    wrapperClassName="!size-32"
                    onRemove={() => {
                      if (formik.values.attachmentBanner) {
                        formik.setFieldValue('attachmentBanner', undefined)
                      } else {
                        formik.setFieldValue('banner', undefined)
                      }
                    }}
                  />
                ) : (
                  <FileInput
                    hintDescription="(Only png/jpg file allowed | Maximum file size: 1024KB)"
                    allowedFileTypes={['.png', '.jpg', '.jpeg']}
                    maxFileSizeKB={1024}
                    multiple={false}
                    onSelectFiles={([file]) => {
                      formik.setFieldValue('attachmentBanner', file)
                    }}
                  />
                )}
              </FormInputWrapper>

              <FormInputWrapper
                title="Add Screenshots"
                error={errors.attachmentImages}
                className="mt-6"
              >
                <div className="flex flex-wrap gap-4">
                  {totalImages < 5 && (
                    <FileInput
                      hintDescription="(Only png/jpg file allowed | Maximum file size: 1024KB)"
                      allowedFileTypes={['.png', '.jpg', '.jpeg']}
                      maxFileSizeKB={1024}
                      multiple={true}
                      onSelectFiles={handleSelectImages}
                      className="w-full"
                    />
                  )}
                  {formik.values.images?.map((img) => (
                    <Attachment
                      key={img}
                      url={img}
                      wrapperClassName="!size-32"
                      onRemove={() => {
                        const updatedImages = formik.values.images?.filter(
                          (e) => e != img
                        )
                        formik.setFieldValue('images', updatedImages)
                      }}
                    />
                  ))}
                  {formik.values.attachmentImages?.map(({ id, file }) => (
                    <Attachment
                      key={id}
                      file={file}
                      wrapperClassName="!size-32"
                      onRemove={() => {
                        const updatedImages =
                          formik.values.attachmentImages?.filter(
                            (e) => e.id != id
                          )
                        formik.setFieldValue('attachmentImages', updatedImages)
                      }}
                    />
                  ))}
                </div>
              </FormInputWrapper>
            </form>
          </div>
          <hr />
          <div className="flex justify-end p-4">
            <button className="btn-outlined mx-3" onClick={onClose}>
              Cancel
            </button>
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
      <Loader isLoading={isLoading} />
    </>
  )
}

export default WebsiteForm
