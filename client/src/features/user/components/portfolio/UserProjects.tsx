import { useCallback, useEffect } from 'react'
import GridView from '@/components/GridView'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getUserProjects } from '../../userSlice'
import {
  UserProjectItemShimmer,
  UserProjectItemViewMemo,
} from '@/components/tiles/UserProjectItemView'

const UserProjects = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch()
  const userProjects = useAppSelector((state) => state.user.projects)

  const fetchProjects = useCallback(() => {
    dispatch(getUserProjects({ userId }))
  }, [dispatch, userId])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useEffect(() => {}, [userId])
  return (
    <section id="projects" className="mt-12">
      <h3 className="mb-10">Projects</h3>
      <GridView
        heading=""
        wrapperClass="my-8 mx-4"
        itemsClass="gap-8 !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 md:gap-10"
      >
        {userProjects.list?.map((item) => (
          <UserProjectItemViewMemo key={item._id} project={item} />
        ))}
        {userProjects.isLoading &&
          [...Array(6).keys()].map((id) => <UserProjectItemShimmer key={id} />)}
        {!userProjects.isLoading && !userProjects.list.length && (
          <div className="font-light text-neutral-500">
            No projects available!
          </div>
        )}
      </GridView>
    </section>
  )
}

export default UserProjects
