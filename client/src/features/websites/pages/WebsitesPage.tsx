import { useCallback, useEffect } from 'react'
import WebsiteItems from '../components/WebsiteItems'
import WebsiteCarousel from '../components/WebsiteCarousel'
import { WebsiteFormWrapper } from '../components/WebsiteForm'
import { useAppDispatch } from '@/hooks'
import { getWebsiteBanners, getWebsites } from '../websitesSlice'

function WebsitesPage() {
  const dispatch = useAppDispatch()

  const fetchWebsites = useCallback(() => {
    dispatch(getWebsites({}))
  }, [dispatch])

  const fetchWebsiteBanners = useCallback(() => {
    dispatch(getWebsiteBanners({}))
  }, [dispatch])

  useEffect(() => {
    fetchWebsites()
  }, [fetchWebsites])

  useEffect(() => {
    fetchWebsiteBanners()
  }, [fetchWebsiteBanners])

  return (
    <div className="">
      <WebsiteCarousel />
      <div className="mx-6 mb-4 pt-6">
        {/* <div className="chip active me-3">All</div> */}
        <div className="chip active">Websites</div>
      </div>
      <WebsiteItems />
      <WebsiteFormWrapper />
    </div>
  )
}

export default WebsitesPage
