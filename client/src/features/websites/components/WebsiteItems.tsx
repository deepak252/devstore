import GridView from '@/components/GridView'
import {
  WebsiteItemShimmer,
  WebsiteItemViewMemo,
} from '@/components/tiles/WebsiteItemView'
import { useAppSelector } from '@/hooks'

export const WebsiteItems = () => {
  const websiteItems = useAppSelector((state) => state.websites.data)

  return (
    <GridView
      heading=""
      wrapperClass="my-8 mx-4"
      itemsClass="gap-4 !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3"
    >
      {websiteItems.list?.map((item) => (
        <WebsiteItemViewMemo key={item._id} websiteItem={item} />
      ))}
      {websiteItems.isLoading &&
        [...Array(6).keys()].map((id) => <WebsiteItemShimmer key={id} />)}
      {!websiteItems.isLoading && !websiteItems.list.length && (
        <div className="text-lg text-neutral-500">No websites available!</div>
      )}
    </GridView>
  )
}
