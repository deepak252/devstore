import { useMemo } from 'react'
import AppLogo from '@/components/AppLogo'
import Dropdown, { DropdownOption } from '@/components/Dropdown'
import AccountIcon from '@/assets/icons/account.svg?react'
import SignInIcon from '@/assets/icons/sign-in.svg?react'
import SignOutIcon from '@/assets/icons/sign-out.svg?react'
import ProfileIcon from '@/assets/icons/profile.svg?react'
import SettingsIcon from '@/assets/icons/settings.svg?react'
import FavoriteIcon from '@/assets/icons/heart-outlined.svg?react'
import NavOptions from './NavOptions'
import SearchField from './SearchField'
import {
  useAppDispatch,
  useAppSelector,
  useAuth,
  useNavigateWithState,
} from '@/hooks'
import { signOut } from '@/features/auth/authSlice'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const isSignedIn = useAuth()
  const userProfile = useAppSelector((state) => state.user.profile)

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
      case 'portfolio': {
        navigate(`/u/${userProfile.data?.username}`)
        break
      }
      default:
        break
    }
  }

  const options = useMemo(() => {
    if (!isSignedIn) {
      return [
        {
          label: 'Sign In',
          value: 'signIn',
          icon: <SignInIcon className="size-5 me-2" />,
        },
      ]
    }
    return [
      {
        label: 'Portfolio',
        value: 'portfolio',
        icon: <ProfileIcon className="size-5 me-2" />,
      },
      {
        label: 'Favorites',
        value: 'favorites',
        icon: <FavoriteIcon className="size-4 me-2" />,
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
  }, [isSignedIn])

  return (
    <nav className="fixed top-0 z-30 flex items-center font-light bg-white shadow p-2 w-full max-md:flex-wrap max-md:justify-between">
      <AppLogo className="px-4 max-md:order-1" />
      <NavOptions />
      <div className="flex items-center px-2 max-md:order-2">
        <SearchField />
        <Dropdown options={options} onChange={handleOptionSelect}>
          <button className="icon-button  ms-2">
            <AccountIcon className="size-9" />
          </button>
        </Dropdown>
      </div>
    </nav>
  )
}

export default Navbar
