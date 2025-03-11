import Loader from '@/components/Loader'
import { useAppSelector } from '@/hooks'

const AppLoader = () => {
  const isLoadingAuth = useAppSelector((state) => state.auth.isLoading)

  const isLoading = isLoadingAuth

  return (
    <div>
      <Loader isLoading={isLoading} />
    </div>
  )
}

export default AppLoader
