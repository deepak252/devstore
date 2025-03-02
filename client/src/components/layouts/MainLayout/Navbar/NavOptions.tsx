import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

const navItems = ['Apps', 'Websites', 'Games']

const NavOptions = () => {
  const { pathname } = useLocation()

  return (
    <div className="text-gray-700 flex-grow max-md:flex max-md:w-full max-md:justify-around">
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
