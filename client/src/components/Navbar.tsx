import { NavLink } from 'react-router-dom'
import AppLogo from './AppLogo'
import AccountIcon from '@/assets/icons/Account.svg?react'
import useWindowDimensions from '@/hooks/useWindowDimensions'

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

const Navbar = () => {
  const { width } = useWindowDimensions()
  const isMdScreen = width < 768 // 992px

  return (
    <nav className="fixed top-0 z-30 flex items-center font-light bg-white shadow p-2 w-full max-md:inline-block">
      <AppLogo className="px-4" />
      {!isMdScreen && <NavOptions />}
      <div className="px-2 max-md:inline-flex max-md:float-end">
        <button className="icon-button">
          <AccountIcon className="size-9" />
        </button>
      </div>
      {isMdScreen && <NavOptions />}
    </nav>
  )
}

export default Navbar
