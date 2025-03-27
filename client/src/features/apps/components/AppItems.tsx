import GridView from '@/components/GridView'
import { AppItemShimmer, AppItemViewMemo } from '@/components/tiles/AppItemView'
import { useAppSelector } from '@/hooks'

const AppItems = () => {
  const appItems = useAppSelector((state) => state.apps.data)

  return (
    <GridView heading="" wrapperClass="my-8 mx-4">
      {appItems.list?.map((item) => (
        <AppItemViewMemo key={item._id} appItem={item} />
      ))}
      {appItems.isLoading &&
        [...Array(6).keys()].map((id) => <AppItemShimmer key={id} />)}
      {!appItems.isLoading && !appItems.list.length && (
        <div className="text-lg text-neutral-500">No Apps available!</div>
      )}
    </GridView>
  )
}

export default AppItems
