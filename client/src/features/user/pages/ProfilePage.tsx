import { useAppDispatch, useAppSelector } from '@/hooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/Loader'
import PageNotFound from '@/components/PageNotFound'
import Introduction from '../components/profile/Introduction'
import AboutMe from '../components/profile/AboutMe'
import Projects from '../components/profile/Projects'
import { getProfile } from '../userSlice'

function ProfilePage() {
  const dispatch = useAppDispatch()
  const { username } = useParams()
  const userProfile = useAppSelector((state) => state.user.profile)

  useEffect(() => {
    dispatch(getProfile())
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
