import classNames from 'classnames'
import { Link, useLocation, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'General', to: '/account' },
  { label: 'Projects', to: '/account/projects' },
]

function AccountLayout() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h4>Account</h4>
      <AccountNavOptions />
      <Outlet />
    </div>
  )
}

const AccountNavOptions = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex gap-4 mt-4 text-15 text-neutral-500 border-b">
      {navItems.map(({ label, to }) => {
        const isSelected = to === pathname.removeTrailingSlashes()
        return (
          <Link
            key={label}
            className={classNames(
              'px-2 py-1 inline-block border-primary hover:text-primary hover:border-b-[2.5px]',
              {
                'text-primary border-b-[2.5px]': isSelected,
              }
            )}
            to={to}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}

export default AccountLayout
