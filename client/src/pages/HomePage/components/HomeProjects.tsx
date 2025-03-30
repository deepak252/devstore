import { useEffect } from 'react'
import GridView from '@/components/GridView'
import {
  ProjectItemShimmer,
  ProjectItemViewMemo,
} from '@/components/tiles/ProjectItemView'
import { getHomeProjects } from '@/features/projects/projectsSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'

const HomeProjects = () => {
  const dispatch = useAppDispatch()
  const homeProjects = useAppSelector((state) => state.projects.home)

  useEffect(() => {
    dispatch(getHomeProjects())
  }, [dispatch])

  return (
    <GridView
      heading="Projects"
      itemsClass="gap-8 !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 md:gap-10"
    >
      {homeProjects.list?.map((item) => (
        <ProjectItemViewMemo key={item._id} project={item} />
      ))}
      {homeProjects.isLoading &&
        [...Array(6).keys()].map((id) => <ProjectItemShimmer key={id} />)}
      {!homeProjects.isLoading && !homeProjects.list.length && (
        <div className="font-light text-neutral-500">
          No projects available!
        </div>
      )}
    </GridView>
  )
}

export default HomeProjects
