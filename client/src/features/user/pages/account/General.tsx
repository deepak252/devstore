import { useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import FormInputWrapper from '@/components/FormInputWrapper'
import { Spinner } from '@/components/Loader'
import PageNotFound from '@/components/PageNotFound'
import ProfileImage from '@/components/ProfileImage'
import FileInput from '@/components/FileInput'
import EditIcon from '@/assets/icons/edit.svg?react'
import { useAppDispatch, useAppSelector, useFormikErrors } from '@/hooks'
import { GeneralFormError, GeneralFormValues } from '../../user.types'
import { validateGeneralForm } from '../../userUtil'
import { updateProfile } from '../../userSlice'
import { getChangedFields } from '@/utils/formUtil'

function GeneralSettings() {
  const dispatch = useAppDispatch()
  const userProfile = useAppSelector((state) => state.user.profile)
  const formik = useFormik<GeneralFormValues>({
    initialValues: {
      fullname: '',
      title: '',
      headline: '',
      about: '',
    },
    validate: validateGeneralForm,
    onSubmit: (values) => {
      if (!userProfile.data) return
      dispatch(updateProfile(getChangedFields(userProfile.data, values)))
    },
  })
  const changedFields = useMemo(() => {
    if (!userProfile.data) return {}

    return getChangedFields(userProfile.data, formik.values)
  }, [userProfile.data, formik.values])

  const errors = useFormikErrors<GeneralFormValues, GeneralFormError>(formik)

  useEffect(() => {
    if (userProfile.data) {
      formik.setValues({
        fullname: userProfile.data.fullname,
        title: userProfile.data.title,
        headline: userProfile.data.headline,
        about: userProfile.data.about,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile.data])

  if (userProfile.isLoading) {
    return (
      <div className="absolute-center">
        <Spinner />
      </div>
    )
  }

  if (!userProfile.data) {
    return <PageNotFound />
  }

  return (
    <div className="p-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-center">
          <FileInput
            enableDragAndDrop={false}
            allowedFileTypes={['.png', '.jpg', '.jpeg']}
            maxFileSizeKB={512}
            multiple={false}
            onSelectFiles={([file]) => {
              console.log(file)
              // formik.setFieldValue('attachmentBanner', file)
            }}
          >
            <div className="relative">
              <ProfileImage className="!size-24 opacity-80 hover:opacity-70 border border-neutral-600" />
              <div className="absolute -right-1 bottom-3 bg-neutral-500 border border-white rounded-full p-1">
                <EditIcon className="size-4 fill-white" />
              </div>
            </div>
          </FileInput>
        </div>

        <FormInputWrapper
          title="Full Name"
          error={errors.fullname}
          className="mt-4"
        >
          <input
            type="text"
            name="fullname"
            className="textfield"
            placeholder="Enter full name"
            value={formik.values.fullname ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormInputWrapper>
        <FormInputWrapper title="Title" error={errors.title} className="mt-4">
          <input
            type="text"
            name="title"
            className="textfield"
            placeholder="Enter title"
            value={formik.values.title ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormInputWrapper>
        <FormInputWrapper
          title="Headline"
          error={errors.headline}
          className="mt-4"
        >
          <input
            type="text"
            name="headline"
            className="textfield"
            placeholder="Enter headline"
            value={formik.values.headline ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormInputWrapper>
        <FormInputWrapper title="About" error={errors.about} className="mt-4">
          <textarea
            name="about"
            placeholder="About yourself"
            value={formik.values.about ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="textfield h-32"
          />
        </FormInputWrapper>
        <div className="flex justify-end">
          <button
            className="btn-filled mt-8 rounded-xl"
            disabled={!Object.keys(changedFields).length}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default GeneralSettings
