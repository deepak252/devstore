import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/Loader'
import PageNotFound from '@/components/PageNotFound'
import Introduction from '../components/profile/Introduction'
import AboutMe from '../components/profile/AboutMe'
import Projects from '../components/profile/Projects'
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
    return (
      <div className="absolute-center">
        <Spinner />
      </div>
    )
  }
  if (!userProfile.data) {
    return <PageNotFound />
  }
  console.log(userProfile.data._id)

  return (
    <div>
      <Introduction user={userProfile.data} />
      {userProfile.data.about?.trim() && (
        <AboutMe about={userProfile.data.about} />
      )}
      {userProfile.data._id && <Projects userId={userProfile.data._id} />}
    </div>
  )
}

export default ProfilePage
