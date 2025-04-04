import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageNotFound from '@/components/PageNotFound'
import CustomCarousel from '@/components/CustomCarousel'
import { Spinner } from '@/components/Loader'
import ProfileImage from '@/components/ProfileImage'
import HeartIcon from '@/assets/icons/heart-outlined.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import CodeIcon from '@/assets/icons/code.svg?react'
import RedirectIcon from '@/assets/icons/redirect.svg?react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getProjectDetails } from '../projectsSlice'
import ModalWrapper from '@/components/ModalWrapper'

function ProjectDetailsPage() {
  const dispatch = useAppDispatch()
  const { projectId = '' } = useParams()
  const projectDetails = useAppSelector(
    (state) => state.projects.projectDetails
  )
  const [selectedImg, setSelectedImg] = useState('')
  const projectData = projectDetails.data

  const projectImages = useMemo(() => {
    const images = []
    if (projectData?.banner) {
      images.push({
        id: projectData.banner._id,
        imgUrl: projectData.banner.url,
      })
    }
    if (projectData?.images?.length) {
      projectData?.images.forEach((item) => {
        images.push({
          id: item._id,
          imgUrl: item.url,
        })
      })
    }

    return images
  }, [projectData?.banner, projectData?.images])

  useEffect(() => {
    dispatch(getProjectDetails({ projectId }))
  }, [dispatch, projectId])

  if (projectDetails.isLoading) {
    return <Spinner center />
  }
  if (!projectData) {
    return <PageNotFound />
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex gap-6">
        <img
          className="card size-20 aspect-square bg-white md:size-28 lg:size-32"
          src={projectData.icon.url}
          alt={`${projectData.name}_icon`}
        />
        <div className="flex-grow">
          <div className="flex items-start justify-between w-full">
            <div>
              <h4 className="mb-2 max-sm:text-xl">{projectData.name}</h4>
              <div className="flex gap-2 items-center">
                <ProfileImage imgUrl={projectData.owner.profileImage?.url} />
                <Link
                  to={`/u/${projectData.owner.username}`}
                  className="text-neutral-600 text-sm font-medium overflow-ellipsis"
                >
                  {projectData.owner.fullname || projectData.owner.username}
                </Link>
              </div>
            </div>
            <div className="flex">
              <button
                className="icon-button"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <HeartIcon className="size-10 rounded-full p-2" />
              </button>
              <button
                className="icon-button"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <ShareIcon className="size-10 rounded-full p-1.5" />
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <a
              href={projectData.demoUrl}
              target="_blank"
              className="btn-filled flex-center gap-2 rounded-full !py-2.5"
            >
              Demo <RedirectIcon className="fill-white size-4" />
            </a>
            <a
              href={projectData.sourceCodeUrl}
              target="_blank"
              className="btn-outlined flex-center gap-2 rounded-full !py-2.5"
            >
              Code <CodeIcon className="fill-primary size-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <CustomCarousel
          items={projectImages}
          itemWidth={30}
          itemClassName="cursor-pointer min-w-72 h-96 sm:h-96 md:h-96"
          autoPlay={false}
          loop={false}
          dragFree={true}
          onItemClick={(item) => {
            setSelectedImg(item.imgUrl)
          }}
        />
      </div>

      <div className="mt-12">
        <h6 className="mb-4">Description</h6>
        <p className="text-neutral-600 text-15 whitespace-pre-line">
          {projectData.description}
        </p>
      </div>
      {/* <Preview webUrl={''} /> */}
      {!!projectData.categories?.length && (
        <div className="mt-12">
          <h6 className="mb-4">Related To</h6>
          <div className="flex gap-2 mb-4">
            {projectData.categories?.map((cat) => (
              <div key={cat} className="chip py-1">
                {cat}
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedImg && (
        <ModalWrapper
          isOpen
          showCloseIcon
          closeOnEsc
          closeOnOutsideClick
          onClose={() => setSelectedImg('')}
        >
          <div className="px-4 max-w-7xl max-h-screen">
            <img src={selectedImg} className="max-h-[calc(100vh-100px)]" />
          </div>
        </ModalWrapper>
      )}
    </div>
  )
}

export default ProjectDetailsPage
