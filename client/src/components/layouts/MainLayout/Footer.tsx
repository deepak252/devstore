import AppLogo from '@/components/AppLogo'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-secondary py-7 px-3 font-light">
      <div className="flex items-start justify-around mt-5 mb-10">
        <AppLogo className="px-4" textClassName="text-white" />
        <div className="flex flex-col text-white">
          <NavLink className="p-2" to={'apps'}>
            Apps
          </NavLink>
          <NavLink className="p-2" to={'games'}>
            Games
          </NavLink>
          <NavLink className="p-2" to={'websites'}>
            Websites
          </NavLink>
        </div>
        <div className="flex flex-col text-white">
          <NavLink className="p-2" to={'apps'}>
            About Us
          </NavLink>
          <NavLink className="p-2" to={'games'}>
            Terms & Conditions
          </NavLink>
          <NavLink className="p-2" to={'websites'}>
            Privacy Policy
          </NavLink>
        </div>
      </div>
      <p className="text-white text-center text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  )
}

export default Footer
