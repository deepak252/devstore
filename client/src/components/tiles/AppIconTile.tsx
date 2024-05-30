import { memo } from 'react'
import { NavLink } from 'react-router-dom'

type AppIconTilePropTypes = {
  id: string
  name: string
  imgUrl: string
  username: string
}

const AppIconTile = ({ id, name, imgUrl, username }: AppIconTilePropTypes) => {
  return (
    <NavLink
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
        <p className="text-13 text-gray-700">{username}</p>
      </div>
    </NavLink>
  )
}

const IconTileMemo = memo(AppIconTile)
export { IconTileMemo }

export default AppIconTile
