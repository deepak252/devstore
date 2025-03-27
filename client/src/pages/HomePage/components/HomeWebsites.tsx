import { useEffect } from 'react'
import GridView from '@/components/GridView'
import {
  ProjectItemShimmer,
  ProjectItemViewMemo,
} from '@/components/tiles/ProjectItemView'
import { getHomeWebsites } from '@/features/websites/websitesSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'

const HomeWebsites = () => {
  const dispatch = useAppDispatch()
  const homeWebsites = useAppSelector((state) => state.websites.home)

  useEffect(() => {
    dispatch(getHomeWebsites())
  }, [dispatch])

  return (
    <GridView
      heading="Websites"
      wrapperClass="my-8 mx-4"
      itemsClass="gap-8 !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 md:gap-10"
    >
      {homeWebsites.list?.map((item) => (
        <ProjectItemViewMemo key={item._id} project={item} />
      ))}
      {homeWebsites.isLoading &&
        [...Array(6).keys()].map((id) => <ProjectItemShimmer key={id} />)}
      {!homeWebsites.isLoading && !homeWebsites.list.length && (
        <div className="text-lg text-neutral-500">No websites available!</div>
      )}
    </GridView>
  )
}

export default HomeWebsites
