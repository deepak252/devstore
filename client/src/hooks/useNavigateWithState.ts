// import { To, useLocation, useNavigate } from 'react-router-dom'

// function useNavigateWithState() {
//   const navigate = useNavigate()
//   const location = useLocation()

//   return (to: To | number, { replace }: { replace?: boolean } = {}) => {
//     if (typeof to === 'number') {
//       return navigate(to) // Allow going back/forward in history
//     }

//     return navigate(to, {
//       state: { ...location.state }, // Preserve existing state
//       replace,
//     })
//   }
// }

// export default useNavigateWithState

import { NavigateOptions, To, useLocation, useNavigate } from 'react-router-dom'

function useNavigateWithState() {
  const navigate = useNavigate()
  const location = useLocation()

  return (to: To | number, options: NavigateOptions = {}) => {
    if (typeof to === 'number') {
      return navigate(to) // Allow going back/forward in history
    }
    return navigate(to as To, {
      state: { from: location },
      ...options,
    })
  }
}

export default useNavigateWithState
