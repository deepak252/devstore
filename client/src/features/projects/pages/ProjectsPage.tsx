import { useCallback, useEffect } from 'react'
import ProjectItems from '../components/ProjectItems'
import ProjectCarousel from '../components/ProjectCarousel'
import { ProjectFormWrapper } from '../components/ProjectForm'
import { useAppDispatch } from '@/hooks'
import { getProjectBanners, getProjects } from '../projectsSlice'

function ProjectsPage() {
  const dispatch = useAppDispatch()

  const fetchProjects = useCallback(() => {
    dispatch(getProjects())
  }, [dispatch])

  const fetchProjectBanners = useCallback(() => {
    dispatch(getProjectBanners({}))
  }, [dispatch])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    fetchProjectBanners()
  }, [fetchProjectBanners])

  return (
    <div className="">
      <ProjectCarousel />
      <div className="mx-6 mb-4 pt-6">
        {/* <div className="chip active me-3">All</div> */}
        <div className="chip active">Projects</div>
      </div>
      <ProjectItems />
      <ProjectFormWrapper />
    </div>
  )
}

export default ProjectsPage
