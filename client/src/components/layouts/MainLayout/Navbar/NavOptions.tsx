import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

const navItems = ['Projects', 'Developers', 'Blogs']

const NavOptions = () => {
  const { pathname } = useLocation()

  return (
    <div className="text-neutral-600 flex-grow max-md:order-3 max-md:flex max-md:w-full max-md:justify-around">
      {navItems.map((item) => (
        <Link
          key={item}
          className={classNames('px-3 py-2', {
            'text-primary': `/${item.toLocaleLowerCase()}` === pathname,
          })}
          to={item.toLowerCase()}
        >
          {item}
        </Link>
      ))}
    </div>
  )
}

export default NavOptions
