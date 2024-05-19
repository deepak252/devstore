import { NavLink } from 'react-router-dom'
import AppLogo from './AppLogo'
import AccountIcon from '@/assets/icons/Account.svg?react'
import SignInIcon from '@/assets/icons/SignIn.svg?react'
import SignOutIcon from '@/assets/icons/SignOut.svg?react'
import ProfileIcon from '@/assets/icons/Profile.svg?react'
import SettingsIcon from '@/assets/icons/Settings.svg?react'
import BookmarksIcon from '@/assets/icons/Bookmarks.svg?react'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import Dropdown, { DropdownOption } from './Dropdown'
import { useState } from 'react'

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
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([])
  // const user = useSelector((state) => stat)
  const user = true
  const isMdScreen = width < 768 // 992px

  const handleOptionSelect = (options: DropdownOption[]) => {
    console.log(options)
    setSelectedOptions(options)
  }

  const options = user
    ? [
        {
          label: 'Profile',
          value: 'profile',
          icon: <ProfileIcon className="size-20 ml-8" />,
        },
        {
          label: 'Bookmarks',
          value: 'bookmarks',
          icon: <BookmarksIcon className="size-20 ml-8" />,
        },
        {
          label: 'Settings',
          value: 'settings',
          icon: <SettingsIcon className="size-20 ml-8" />,
        },
        {
          label: 'Sign Out',
          value: 'signOut',
          icon: <SignOutIcon className="size-20 ml-8" />,
        },
      ]
    : [
        {
          label: 'Sign In',
          value: 'signIn',
          icon: <SignInIcon className="size-20 ml-8" />,
        },
      ]

  return (
    <nav className="fixed top-0 z-30 flex items-center font-light bg-white shadow p-2 w-full max-md:inline-block">
      <AppLogo className="px-4" />
      {!isMdScreen && <NavOptions />}
      <div className="px-2 max-md:inline-flex max-md:float-end">
        <Dropdown
          options={options}
          onChange={handleOptionSelect}
          isMultiSelect
          selectedOptions={selectedOptions}
        >
          <button className="icon-button">
            <AccountIcon className="size-9" />
          </button>
        </Dropdown>
      </div>
      {isMdScreen && <NavOptions />}
    </nav>
  )
}

export default Navbar
