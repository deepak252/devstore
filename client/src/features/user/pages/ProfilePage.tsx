import { useAppSelector } from '@/hooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProfilePage() {
  const { username } = useParams()
  const currUser = useAppSelector((state) => state.user.profile)
  const currUserProfile = currUser.data

  useEffect(() => {
    console.log(username)
  }, [username])

  return (
    <div>
      <p>{currUserProfile?.username}</p>
    </div>
  )
}

export default ProfilePage
