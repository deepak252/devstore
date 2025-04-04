import { useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import CheckboxInput from '@/components/CheckboxInput'
import Dropdown from '@/components/Dropdown'
import FormInputWrapper from '@/components/FormInputWrapper'
import FileInput from '@/components/FileInput'
import Attachment from '@/components/Attachment'
import { generateProjectFormValues, validateProjectForm } from '../projectsUtil'
import { useAppDispatch, useAppSelector, useFormikErrors } from '@/hooks'
import { createProject } from '../projectsSlice'
import {
  ProjectDetails,
  ProjectFormError,
  ProjectFormValues,
} from '@/shared.types'

const MAX_IMAGES_COUNT = 5

const ProjectForm = ({ project }: { project?: ProjectDetails | null }) => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(
    (state) => state.content.metadata.data?.categories
  )

  const categoryOptions = useMemo(() => {
    if (categories) {
      return categories.map((e) => ({ label: e.name, value: e.name }))
    }
    return []
  }, [categories])

  const platformOptions = useMemo(() => {
    return [
      { label: 'Android', value: 'android' },
      { label: 'iOS', value: 'ios' },
      { label: 'Website', value: 'website' },
    ]
  }, [])

  const formik = useFormik<ProjectFormValues>({
    initialValues: {
      name: '',
      description: '',
      isPrivate: false,
      platforms: [],
      categories: [],
      sourceCodeUrl: '',
      demoUrl: '',
      attachmentIcon: undefined,
      attachmentBanner: undefined,
      attachmentImages: [],
    },
    validate: validateProjectForm,
    onSubmit: (values) => {
      dispatch(createProject(values))
    },
  })

  const totalImages =
    (formik.values.images?.length || 0) +
    (formik.values.attachmentImages?.length || 0)
  const errors = useFormikErrors<ProjectFormValues, ProjectFormError>(formik)

  useEffect(() => {
    if (project) {
      formik.setValues(generateProjectFormValues(project))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project])

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
      <div className="flex flex-col bg-white max-w-3xl mx-auto p-6 md:p-8">
        <div className="flex items-start justify-between mb-8">
          <h5>Add Project</h5>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <CheckboxInput
            title="Public"
            onChange={(value) => {
              formik.setFieldValue('isPrivate', !value)
            }}
            checked={!formik.values.isPrivate}
          />
          <FormInputWrapper title="Project Title*" error={errors.name}>
            <input
              name="name"
              type="text"
              value={formik.values.name}
              placeholder="Enter project title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="textfield"
            />
          </FormInputWrapper>
          <FormInputWrapper title="Description">
            <textarea
              name="description"
              placeholder="Enter project description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="textfield"
              rows={5}
            />
          </FormInputWrapper>
          <FormInputWrapper title={`Platform*`} error={errors.platforms}>
            <Dropdown
              selectedOptions={formik.values.platforms || []}
              options={platformOptions}
              onChange={(options) => {
                formik.setFieldTouched('platforms')
                formik.setFieldValue('platforms', options)
              }}
              showMenuIcon
              multiselect
              targetClass="textfield py-0"
              contentClass="left-0 right-auto mt-2"
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
              value={formik.values.demoUrl}
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
              value={formik.values.sourceCodeUrl}
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
                url={formik.values.icon?.url}
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
                url={formik.values.banner?.url}
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
                  key={img._id}
                  url={img.url}
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
                      formik.values.attachmentImages?.filter((e) => e.id != id)
                    formik.setFieldValue('attachmentImages', updatedImages)
                  }}
                />
              ))}
            </div>
          </FormInputWrapper>
        </form>
        <div className="flex justify-end mt-8">
          {/* <button className="btn-outlined mx-3" onClick={onClose}>
            Cancel
          </button> */}
          <button
            type="submit"
            className="btn-filled"
            onClick={() => formik.handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default ProjectForm
