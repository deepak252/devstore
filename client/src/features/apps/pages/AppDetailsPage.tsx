import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageNotFound from '@/components/PageNotFound'
import CustomCarousel from '@/components/CustomCarousel'
import HeartIcon from '@/assets/icons/heart-outlined.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import CodeIcon from '@/assets/icons/code.svg?react'
import RedirectIcon from '@/assets/icons/redirect.svg?react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getAppDetails } from '../appsSlice'
import { Spinner } from '@/components/Loader'
import ProfileImage from '@/components/ProfileImage'

function AppDetailsPage() {
  const dispatch = useAppDispatch()
  const { projectId = '' } = useParams()
  const appDetails = useAppSelector((state) => state.apps.appDetails)
  const appData = appDetails.data

  const appImages = useMemo(() => {
    if (appData?.images?.length) {
      return appData?.images.map((item) => ({
        id: item._id,
        imgUrl: item.url,
      }))
    }
    return []
  }, [appData?.images])

  useEffect(() => {
    dispatch(getAppDetails({ projectId }))
  }, [dispatch, projectId])

  if (appDetails.isLoading) {
    return (
      <div className="absolute-center">
        <Spinner />
      </div>
    )
  }
  if (!appData) {
    return <PageNotFound />
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex gap-6">
        <img
          className="card size-20 aspect-square bg-white md:size-28 lg:size-32"
          src={appData.icon.url}
          alt={`${appData.name}_icon`}
        />
        <div className="flex-grow">
          <div className="flex items-start justify-between w-full">
            <div>
              <h4 className="mb-2 max-sm:text-xl">{appData.name}</h4>
              <div className="flex gap-2 items-center">
                <ProfileImage imgUrl={appData.owner.profileImage?.url} />
                <Link
                  to={`/u/${appData.owner.username}`}
                  className="text-neutral-600 text-sm font-medium overflow-ellipsis"
                >
                  {appData.owner.fullname || appData.owner.username}
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
              href={appData.demoUrl}
              target="_blank"
              className="btn-filled flex-center gap-2 rounded-full !py-2.5"
            >
              Demo <RedirectIcon className="fill-white size-4" />
            </a>
            <a
              href={appData.sourceCodeUrl}
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
          items={appImages}
          itemWidth={30}
          itemClassName="min-w-72 h-96 sm:h-96 md:h-96"
          autoPlay={false}
          loop={false}
          dragFree={true}
        />
      </div>

      <div className="mt-12">
        <h6 className="mb-4">Description</h6>
        <p className="text-neutral-600 text-15">{appData.description}</p>
      </div>
      {/* <Preview webUrl={''} /> */}
      <div className="mt-12">
        <h6 className="mb-4">Related To</h6>
        <div className="flex gap-2 mb-4">
          {appData.categories?.map((cat) => (
            <div key={cat} className="chip py-1">
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AppDetailsPage
