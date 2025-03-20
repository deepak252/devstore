import GridView from '@/components/GridView'
import { AppItemShimmer, AppItemViewMemo } from '@/components/tiles/AppItemView'
import { useAppSelector } from '@/hooks'

export const AppItems = () => {
  const websiteItems = useAppSelector((state) => state.websites.data)

  return (
    <GridView
      heading=""
      wrapperClass="my-8 mx-4"
      itemsClass="gap-4 !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3"
    >
      {websiteItems.list?.map((item) => (
        <AppItemViewMemo key={item._id} appItem={item} />
      ))}
      {websiteItems.isLoading &&
        [...Array(6).keys()].map((id) => <AppItemShimmer key={id} />)}
      {!websiteItems.isLoading && !websiteItems.list.length && (
        <div className="text-lg text-neutral-500">No websites available!</div>
      )}
    </GridView>
  )
}
