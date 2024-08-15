import { userSignedIn } from '@/utils/storage'
import { useAppSelector } from '.'

export default function useSignedIn() {
  const isLocalSignedIn = userSignedIn()
  const isSignedOut = useAppSelector((state) => state.auth.isSignedOut)
  const isSignedIn = useAppSelector((state) => state.auth.isSignedIn)

  return (isSignedIn || isLocalSignedIn) && !isSignedOut
}
