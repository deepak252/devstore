import { useEffect, useMemo } from 'react'
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
import { getWebsiteDetails } from '../websitesSlice'

function WebsiteDetailsPage() {
  const dispatch = useAppDispatch()
  const { projectId = '' } = useParams()
  const websiteDetails = useAppSelector(
    (state) => state.websites.websiteDetails
  )
  const websiteData = websiteDetails.data

  const websiteImages = useMemo(() => {
    if (websiteData?.images?.length) {
      return websiteData?.images.map((item) => ({
        id: item._id,
        imgUrl: item.url,
      }))
    }
    return []
  }, [websiteData?.images])

  useEffect(() => {
    dispatch(getWebsiteDetails({ projectId }))
  }, [dispatch, projectId])

  if (websiteDetails.isLoading) {
    return (
      <div className="absolute-center">
        <Spinner />
      </div>
    )
  }
  if (!websiteData) {
    return <PageNotFound />
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex gap-6">
        <img
          className="card size-20 aspect-square bg-white md:size-28 lg:size-32"
          src={websiteData.icon.url}
          alt={`${websiteData.name}_icon`}
        />
        <div className="flex-grow">
          <div className="flex items-start justify-between w-full">
            <div>
              <h4 className="mb-2 max-sm:text-xl">{websiteData.name}</h4>
              <div className="flex gap-2 items-center">
                <ProfileImage imgUrl={websiteData.owner.profileImage?.url} />
                <Link
                  to={`/u/${websiteData.owner.username}`}
                  className="text-neutral-600 text-sm font-medium overflow-ellipsis"
                >
                  {websiteData.owner.fullname || websiteData.owner.username}
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
              href={websiteData.demoUrl}
              target="_blank"
              className="btn-filled flex-center gap-2 rounded-full !py-2.5"
            >
              Demo <RedirectIcon className="fill-white size-4" />
            </a>
            <a
              href={websiteData.sourceCodeUrl}
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
          items={websiteImages}
          itemWidth={30}
          itemClassName="min-w-72 h-96 sm:h-96 md:h-96"
          autoPlay={false}
          loop={false}
          dragFree={true}
        />
      </div>

      <div className="mt-12">
        <h6 className="mb-4">Description</h6>
        <p className="text-neutral-600 text-15">{websiteData.description}</p>
      </div>
      {/* <Preview webUrl={''} /> */}
      <div className="mt-12">
        <h6 className="mb-4">Related To</h6>
        <div className="flex gap-2 mb-4">
          {websiteData.categories?.map((cat) => (
            <div key={cat} className="chip py-1">
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WebsiteDetailsPage
