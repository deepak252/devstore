import AppLogo from '../../../AppLogo'
import Dropdown, { DropdownOption } from '../../../Dropdown'
import AccountIcon from '@/assets/icons/account.svg?react'
import SignInIcon from '@/assets/icons/sign-in.svg?react'
import SignOutIcon from '@/assets/icons/sign-out.svg?react'
import ProfileIcon from '@/assets/icons/profile.svg?react'
import SettingsIcon from '@/assets/icons/settings.svg?react'
import BookmarksIcon from '@/assets/icons/bookmarks.svg?react'
import NavOptions from './NavOptions'
import SearchField from './SearchField'
import {
  useAppDispatch,
  useAuth,
  useNavigateWithState,
  useWindowDimensions,
} from '@/hooks'
import { signOut } from '@/features/auth/authSlice'

const Navbar = () => {
  const { width } = useWindowDimensions()
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const isSignedIn = useAuth()
  // const userProfile = useAppSelector((state) => state.user.profile)
  const isMdScreen = width < 768 // 992px

  const handleOptionSelect = (options: DropdownOption[]) => {
    switch (options[0].value) {
      case 'signIn': {
        navigate('/auth/sign-in')
        break
      }
      case 'signOut': {
        dispatch(signOut())
        break
      }
      default:
        break
    }
  }

  const options = isSignedIn
    ? [
        {
          label: 'Profile',
          value: 'profile',
          icon: <ProfileIcon className="size-5 me-2" />,
        },
        {
          label: 'Bookmarks',
          value: 'bookmarks',
          icon: <BookmarksIcon className="size-5 me-2" />,
        },
        {
          label: 'Settings',
          value: 'settings',
          icon: <SettingsIcon className="size-5 me-2" />,
        },
        {
          label: 'Sign Out',
          value: 'signOut',
          icon: <SignOutIcon className="size-5 me-2" />,
        },
      ]
    : [
        {
          label: 'Sign In',
          value: 'signIn',
          icon: <SignInIcon className="size-5 me-2" />,
        },
      ]

  return (
    <nav className="fixed top-0 z-30 flex items-center font-light bg-white shadow p-2 w-full max-md:inline-block">
      <AppLogo className="px-4" />
      {!isMdScreen && <NavOptions />}
      <div className="flex items-center px-2 max-md:inline-flex max-md:float-end">
        <SearchField />
        <Dropdown options={options} onChange={handleOptionSelect}>
          <button className="icon-button  ms-2">
            <AccountIcon className="size-9" />
          </button>
        </Dropdown>
      </div>
      {isMdScreen && <NavOptions />}
    </nav>
  )
}

export default Navbar
