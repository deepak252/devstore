import { useCallback, useEffect } from 'react'
import { getUsers } from '../userSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import GridView from '@/components/GridView'
import {
  DeveloperItemShimmer,
  DeveloperItemViewMemo,
} from '../components/DeveloperItemView'

function DevelopersPage() {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.user.users)

  const fetchUsers = useCallback(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // return (
  //   <div className="">
  //     <div className="flex gap-3 mx-6 mb-4 pt-6">
  //       <div className="chip active">All</div>
  //       <div className="chip">App Dev</div>
  //       <div className="chip">Web Dev</div>
  //     </div>
  //     {/* <ProjectItems /> */}
  //   </div>
  // )

  return (
    <GridView
      heading=""
      wrapperClass="pt-2 pb-10 px-6 max-w-2xl mx-auto"
      itemsClass="gap-0 !grid-cols-1 divide-y"
    >
      {users.list?.map((item) => (
        <DeveloperItemViewMemo key={item._id} user={item} />
      ))}
      {users.isLoading &&
        [...Array(6).keys()].map((id) => <DeveloperItemShimmer key={id} />)}
      {!users.isLoading && !users.list.length && (
        <div className="font-light text-neutral-500">
          No projects available!
        </div>
      )}
    </GridView>
  )
}

export default DevelopersPage
