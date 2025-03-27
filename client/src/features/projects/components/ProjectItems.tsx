import GridView from '@/components/GridView'
import {
  ProjectItemShimmer,
  ProjectItemViewMemo,
} from '@/components/tiles/ProjectItemView'
import { useAppSelector } from '@/hooks'

const ProjectItems = () => {
  const projectItems = useAppSelector((state) => state.projects.data)

  return (
    <GridView
      heading=""
      wrapperClass="my-8 mx-4"
      itemsClass="gap-8 !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 md:gap-10"
    >
      {projectItems.list?.map((item) => (
        <ProjectItemViewMemo key={item._id} project={item} />
      ))}
      {projectItems.isLoading &&
        [...Array(6).keys()].map((id) => <ProjectItemShimmer key={id} />)}
      {!projectItems.isLoading && !projectItems.list.length && (
        <div className="text-lg text-neutral-500">No projects available!</div>
      )}
    </GridView>
  )
}

export default ProjectItems
