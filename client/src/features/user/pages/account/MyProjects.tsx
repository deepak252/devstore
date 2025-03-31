import { useCallback, useEffect } from 'react'
import GridView from '@/components/GridView'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getUserProjects } from '../../userSlice'
import {
  UserProjectItemShimmer,
  UserProjectItemViewMemo,
} from '@/components/tiles/UserProjectItemView'
import { confirmDeleteProject } from '@/features/projects/projectsSlice'
import { Link } from 'react-router-dom'

const MyProjects = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.user.profile.data?._id)
  const userProjects = useAppSelector((state) => state.user.projects)

  const fetchProjects = useCallback(() => {
    if (userId) {
      dispatch(getUserProjects({ userId }))
    }
  }, [dispatch, userId])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useEffect(() => {}, [userId])

  const handleProjectDelete = useCallback(
    (projectId: string) => {
      dispatch(confirmDeleteProject({ projectId }))
    },
    [dispatch]
  )
  return (
    <section id="projects" className="">
      <GridView
        heading=""
        wrapperClass="my-8 mx-4"
        itemsClass="gap-8 !grid-cols-1 sm:!grid-cols-2 md:gap-8"
      >
        {userProjects.list?.map((item) => (
          <UserProjectItemViewMemo
            key={item._id}
            project={item}
            edit={true}
            onDeleteClick={handleProjectDelete}
          />
        ))}
        {userProjects.isLoading &&
          [...Array(6).keys()].map((id) => <UserProjectItemShimmer key={id} />)}
      </GridView>
      {!userProjects.isLoading && !userProjects.list.length && (
        <div className="w-full">
          <p className="font-light text-neutral-500">
            No projects available!{' '}
            <Link
              to="/projects/create"
              className="p-2 underline text-primary"
              title="Add Project"
            >
              Create Project
            </Link>
          </p>
        </div>
      )}
    </section>
  )
}

export default MyProjects
