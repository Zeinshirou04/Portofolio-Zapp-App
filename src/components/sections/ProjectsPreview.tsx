import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { getProjects, type Project } from '@/lib/api'
import ProjectsGrid from '@/components/projects/ProjectsGrid'

export default async function ProjectsPreview() {
  let projects: Project[] = []

  try {
    const all = await getProjects()
    projects = all.slice(0, 3)
  } catch {
    // API unavailable — render empty state
  }

  return (
    <section className="bg-gray-50 dark:bg-zinc-950 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-sans font-semibold tracking-widest uppercase text-volt">
              Selected work
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl
                           text-gray-900 dark:text-gray-100
                           leading-tight tracking-tight mt-4">
              Projects I've built.
            </h2>
          </div>

          <Link href="/projects"
            className="inline-flex items-center gap-2 font-sans font-medium text-sm
                       text-volt hover:text-volt/80 transition-colors shrink-0">
            View all projects
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
          </Link>
        </div>

        {/* Grid — reuse ProjectsGrid client component */}
        <ProjectsGrid projects={projects} />

      </div>
    </section>
  )
}