import { useCallback, useEffect } from 'react'
import ProjectItems from '../components/ProjectItems'
import ProjectCarousel from '../components/ProjectCarousel'
import SearchInputField from '@/components/SearchInputField'
import AddIcon from '@/assets/icons/add.svg?react'
import { useAppDispatch } from '@/hooks'
import { getProjectBanners, getProjects } from '../projectsSlice'
import { Link } from 'react-router-dom'

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
    <div className="py-3">
      <div className="flex items-center gap-2 max-w-2xl px-4 mx-auto">
        <SearchInputField placeholder="Search project..." />
        <Link
          to="/projects/create"
          className="btn-filled p-2"
          title="Add Project"
        >
          <AddIcon className="size-8 fill-white" />
        </Link>
      </div>
      <ProjectCarousel />
      <div className="flex gap-3 mx-6 mb-4 pt-6">
        <div className="chip active">All</div>
        <div className="chip">Apps</div>
        <div className="chip">Websites</div>
      </div>
      <ProjectItems />
    </div>
  )
}

export default ProjectsPage
