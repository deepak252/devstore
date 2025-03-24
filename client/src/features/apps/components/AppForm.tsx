import { useMemo } from 'react'
import { useFormik } from 'formik'
import ModalWrapper from '@/components/ModalWrapper'
import CheckboxInput from '@/components/CheckboxInput'
import Dropdown from '@/components/Dropdown'
import FormInputWrapper from '@/components/FormInputWrapper'
import FileInput from '@/components/FileInput'
import Attachment from '@/components/Attachment'
import Loader from '@/components/Loader'
import CloseIcon from '@/assets/icons/close.svg?react'
import AddIcon from '@/assets/icons/add.svg?react'
import { validateAppForm } from '../appsUtil'
import { AppFormError, AppFormValues } from '../apps.types'
import { useAppDispatch, useAppSelector, useFormikErrors } from '@/hooks'
import { createApp, toggleCreateAppFormOpen } from '../appsSlice'

const MAX_IMAGES_COUNT = 5

export const AppFormWrapper = () => {
  const dispatch = useAppDispatch()
  const isFormOpen = useAppSelector((state) => state.apps.appForm.isOpen)

  const handleToggleAppFormOpen = () => {
    dispatch(toggleCreateAppFormOpen())
  }

  return (
    <>
      <button
        className="btn-fab fixed bottom-8 right-8"
        onClick={handleToggleAppFormOpen}
      >
        <AddIcon className="fill-primary size-8" />
        Add App
      </button>
      {isFormOpen && <AppForm onClose={handleToggleAppFormOpen} />}
    </>
  )
}

export const AppForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(
    (state) => state.content.metadata.data?.categories
  )
  const isLoading = useAppSelector((state) => state.apps.appForm.isLoading)
  const categoryOptions = useMemo(() => {
    if (categories) {
      return categories.map((e) => ({ label: e.name, value: e.name }))
    }
    return []
  }, [categories])

  const formik = useFormik<AppFormValues>({
    initialValues: {
      name: '',
      description: '',
      isPrivate: false,
      platforms: ['android'],
      categories: [],
      sourceCodeUrl: '',
      demoUrl: '',
      attachmentIcon: undefined,
      attachmentBanner: undefined,
      attachmentImages: [],
    },
    validate: validateAppForm,
    onSubmit: (values) => {
      dispatch(createApp(values))
    },
  })

  const totalImages =
    (formik.values.images?.length || 0) +
    (formik.values.attachmentImages?.length || 0)
  const errors = useFormikErrors<AppFormValues, AppFormError>(formik)

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
            <h5>Add App</h5>
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
              <FormInputWrapper title="App Title*" error={errors.name}>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter app title"
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
                  selectedOptions={formik.values.categories || []}
                  options={categoryOptions}
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
              <FormInputWrapper title="Demo URL" error={errors.demoUrl}>
                <input
                  name="demoUrl"
                  type="text"
                  placeholder="Enter demo url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="textfield"
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
