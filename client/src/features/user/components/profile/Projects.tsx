// import { projects } from '@/lib/utils'

const Projects = () => {
  return (
    <section id="projects" className="mt-12">
      <h3 className="mb-10">Projects</h3>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* {projects.map((project) => (
          <ProjectItem key={project.name} project={project} />
        ))} */}
      </div>
      {/* <div className="flex-center">
        <Link href="/projects" className="btn-primary px-16 mt-12">
          All Projects
          <ArrowRightIcon className="size-6 fill-white dark:fill-dark" />
        </Link>
      </div> */}
    </section>
  )
}

// const ProjectItem = ({ project }: { project: Project }) => {
//   return (
//     <div className="flex flex-col items-center cursor-pointer group">
//       <div className="relative bg-red h-48 w-full rounded-2xl  overflow-hidden bg-white sm:h-44 lg:h-44">
//         <Image
//           src={project.imgPath}
//           fill
//           alt="project-img"
//           className="object-cover group-hover:scale-105 transition-all duration-300"
//         />
//         <div className="absolute inset-0 size-full bg-neutral-800 bg-opacity-30 group-hover:bg-opacity-0 transition-all duration-300" />
//       </div>
//       <div className="py-6">
//         <p className="text-xl font-medium line-clamp-1 mb-1">{project.name}</p>
//         <p className="text-base line-clamp-3 text-light">
//           {project.description}
//         </p>
//       </div>
//     </div>
//   )
// }

export default Projects
