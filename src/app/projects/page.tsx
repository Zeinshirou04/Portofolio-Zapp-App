import type { Metadata } from 'next'
import { getProjects } from '@/lib/api'
import ProjectsGrid from '@/components/projects/ProjectsGrid'

export const metadata: Metadata = {
  title: 'Projects — Zayn',
  description: 'A collection of projects I have built — web apps, APIs, dashboards, and more.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="bg-white dark:bg-zinc-900 min-h-screen pt-16">
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-sans font-semibold tracking-widest uppercase text-volt">
              Portfolio
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-gray-100 mt-4 mb-4 leading-tight tracking-tight">
              Things I&apos;ve built
            </h1>
            <p className="font-sans text-gray-500 dark:text-gray-400 leading-relaxed">
              A selection of client work, personal projects, and open-source contributions
              across web apps, REST APIs, and admin systems.
            </p>
          </div>

          {/* Grid */}
          {projects.length > 0 ? (
            <ProjectsGrid projects={projects} />
          ) : (
            <p className="font-sans text-sm text-gray-400 dark:text-gray-500">
              No projects to show yet.
            </p>
          )}

        </div>
      </section>
    </main>
  )
}
