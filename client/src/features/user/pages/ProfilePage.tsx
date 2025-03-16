import { useAppSelector } from '@/hooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/Loader'
import PageNotFound from '@/components/PageNotFound'
import Introduction from '../components/profile/Introduction'
import AboutMe from '../components/profile/AboutMe'
import Projects from '../components/profile/Projects'

function ProfilePage() {
  const { username } = useParams()
  const userProfile = useAppSelector((state) => state.user.profile)

  useEffect(() => {
    console.log(username)
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
      <AboutMe about={userProfile.data.about} />
      <Projects />
    </div>
  )
}

export default ProfilePage
