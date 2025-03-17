import { memo } from 'react'
import { Link } from 'react-router-dom'
import Shimmer from '../Shimmer'

type AppIconTilePropTypes = {
  id: string
  name: string
  imgUrl: string
  username: string
}

const AppIconTile = ({ id, name, imgUrl, username }: AppIconTilePropTypes) => {
  return (
    <Link
      to={`/apps/${id}`}
      className="flex flex-col overflow-hidden rounded-3xl hover:bg-gray-1100"
    >
      <img
        className="m-2 rounded-2xl drop-shadow-lg aspect-square bg-white"
        src={imgUrl}
        alt={name}
      />
      <div className="mx-2 mt-2 mb-3">
        <p className="text-15 font-semibold text-gray-900">{name}</p>
        <p className="text-13 text-neutral-600">{username}</p>
      </div>
    </Link>
  )
}

const AppIconTileMemo = memo(AppIconTile)
export { AppIconTileMemo }

export const AppIconTileShimmer = () => {
  return <Shimmer className="!rounded-3xl w-full h-40" />
}

export default AppIconTile
