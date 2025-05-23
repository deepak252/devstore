import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import DrawerIcon from '@/assets/icons/menu.svg?react'

const navItems = ['Projects', 'Developers', 'Blogs']

const NavOptions = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className="text-neutral-800 flex-grow max-md:order-3 max-md:grow-0">
      <button className="icon-button md:hidden" onClick={toggleDrawer}>
        <DrawerIcon className="size-8" />
      </button>
      <div
        className={classNames('max-md:nav-drawer', {
          'max-md:!h-0 max-md:!p-0': !isDrawerOpen,
          'max-md:!h-auto': isDrawerOpen,
        })}
      >
        {navItems.map((item) => (
          <Link
            key={item}
            className={classNames('px-3 py-2 font-medium', {
              'text-primary': `/${item.toLocaleLowerCase()}` === pathname,
            })}
            to={item.toLowerCase()}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavOptions
