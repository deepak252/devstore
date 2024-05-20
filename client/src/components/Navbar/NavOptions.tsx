import { NavLink } from 'react-router-dom'

const NavOptions = () => {
  return (
    <ul className="text-gray-700 flex-grow max-md:flex max-md:w-full max-md:justify-around">
      <NavLink className="px-3 py-2" to={'apps'}>
        Apps
      </NavLink>
      <NavLink className="px-3 py-2" to={'websites'}>
        Websites
      </NavLink>
      <NavLink className="px-3 py-2" to={'games'}>
        Games
      </NavLink>
    </ul>
  )
}

export default NavOptions
