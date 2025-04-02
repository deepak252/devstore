import { Link, useLocation } from 'react-router-dom'

type StatefulLinkProps = {
  to: string
  children?: React.ReactNode
  className?: string
  title?: string
}

const StatefulLink = ({
  to,
  children,
  className,
  title,
}: StatefulLinkProps) => {
  const location = useLocation()

  return (
    <Link
      title={title}
      to={to}
      state={{ from: location }}
      className={className}
    >
      {children}
    </Link>
  )
}

export default StatefulLink
