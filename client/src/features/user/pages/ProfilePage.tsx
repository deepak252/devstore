import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/Loader'
import PageNotFound from '@/components/PageNotFound'
import Introduction from '../components/portfolio/Introduction'
import AboutMe from '../components/portfolio/AboutMe'
import UserProjects from '../components/portfolio/UserProjects'
import { getOtherProfile, getProfile } from '../userSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'

function ProfilePage() {
  const dispatch = useAppDispatch()
  const { username } = useParams()
  const currUserProfile = useAppSelector((state) => state.user.profile)
  const otherUserProfile = useAppSelector((state) => state.user.otherProfile)

  const userProfile = useMemo(() => {
    if (username) {
      return otherUserProfile
    } else {
      return currUserProfile
    }
  }, [username, currUserProfile, otherUserProfile])

  useEffect(() => {
    if (username) {
      dispatch(getOtherProfile({ username }))
    } else {
      dispatch(getProfile())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  if (userProfile.isLoading) {
    return <Spinner center />
  }
  if (!userProfile.data) {
    return <PageNotFound />
  }

  return (
    <div>
      <Introduction user={userProfile.data} />
      {userProfile.data.about?.trim() && (
        <AboutMe about={userProfile.data.about} />
      )}
      {userProfile.data._id && <UserProjects userId={userProfile.data._id} />}
    </div>
  )
}

export default ProfilePage
