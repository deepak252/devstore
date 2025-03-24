// import Carousel, { CarouselShimmer } from '@/components/Carousel'
import { AppFormWrapper } from '../components/AppForm'
import { useAppDispatch } from '@/hooks'
import { getAppBanners, getApps } from '../appsSlice'
import { useCallback, useEffect } from 'react'
import { AppItems } from '../components/AppItems'
import { AppCarousel } from '../components/AppsCarousel'

function AppsPage() {
  const dispatch = useAppDispatch()

  const fetchApps = useCallback(() => {
    dispatch(getApps({}))
  }, [dispatch])

  const fetchAppBanners = useCallback(() => {
    dispatch(getAppBanners({}))
  }, [dispatch])

  useEffect(() => {
    fetchApps()
  }, [fetchApps])

  useEffect(() => {
    fetchAppBanners()
  }, [fetchAppBanners])

  return (
    <div className="">
      <AppCarousel />
      <div className="flex gap-3 mx-6 mb-4 pt-6">
        {/* <div className="chip active me-3">All</div> */}
        <div className="chip active">All</div>
        <div className="chip">Android</div>
        <div className="chip">iOS</div>
      </div>
      <AppItems />
      <AppFormWrapper />
    </div>
  )
}

export default AppsPage
