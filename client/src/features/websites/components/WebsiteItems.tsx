import GridView from '@/components/GridView'
import {
  ProjectItemShimmer,
  ProjectItemViewMemo,
} from '@/components/tiles/ProjectItemView'
import { useAppSelector } from '@/hooks'

const WebsiteItems = () => {
  const websiteItems = useAppSelector((state) => state.websites.data)

  return (
    <GridView
      heading=""
      wrapperClass="my-8 mx-4"
      itemsClass="gap-8 !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 md:gap-10"
    >
      {websiteItems.list?.map((item) => (
        <ProjectItemViewMemo key={item._id} project={item} />
      ))}
      {websiteItems.isLoading &&
        [...Array(6).keys()].map((id) => <ProjectItemShimmer key={id} />)}
      {!websiteItems.isLoading && !websiteItems.list.length && (
        <div className="text-lg text-neutral-500">No websites available!</div>
      )}
    </GridView>
  )
}

export default WebsiteItems
