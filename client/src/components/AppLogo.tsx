import { NavLink } from 'react-router-dom'
import LogoImg from '@/assets/images/logo.png'
import classNames from 'classnames'

type AppLogoProps = {
  showText?: boolean
  className?: string
  textClassName?: string
  pointerDisabled?: boolean
}

const AppLogo = ({
  showText,
  className,
  textClassName,
  pointerDisabled,
}: AppLogoProps) => {
  return (
    <div className={classNames('inline-block', className)}>
      <NavLink
        to="/"
        onClick={(e) => pointerDisabled && e.preventDefault()}
        style={{ pointerEvents: pointerDisabled ? 'none' : 'auto' }}
        className="flex items-center whitespace-nowrap"
      >
        <img
          src={LogoImg}
          className="bg-primary-100 size-12 rounded-xl"
          alt="app_logo"
        />
        {showText && (
          <span
            className={classNames(
              'text-secondary text-[28px] font-josefin font-bold pt-[6px] pl-2',
              textClassName
            )}
          >
            Dev Store
          </span>
        )}
      </NavLink>
    </div>
  )
}

AppLogo.defaultProps = {
  showText: true,
}

export default AppLogo
