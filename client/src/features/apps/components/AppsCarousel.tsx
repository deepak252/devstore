import { useCallback, useMemo } from 'react'
import CustomCarousel from '@/components/CustomCarousel'
import { useAppSelector, useNavigateWithState } from '@/hooks'

export const AppCarousel = () => {
  const banner = useAppSelector((state) => state.apps.banner)
  const navigate = useNavigateWithState()
  const carouselItems = useMemo(() => {
    if (banner.list?.length) {
      return banner.list.map((item) => ({
        id: item._id,
        imgUrl: item.img?.url,
        redirectUrl: item.redirectUrl,
      }))
    }
    return []
  }, [banner])

  const handleBannerClick = useCallback((_: string, redirectUrl?: string) => {
    if (redirectUrl) {
      navigate(redirectUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!banner.isLoading && !banner.list.length) {
    return <></>
  }

  return (
    <div className="pt-4">
      <CustomCarousel
        items={carouselItems}
        onItemClick={handleBannerClick}
        isLoading={banner.isLoading}
      />
    </div>
  )
}
