'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { motion, type Variants } from 'framer-motion'
import type { Project } from '@/lib/api'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={item}>
      <Link href={`/projects/${project.slug}`} className="block group">
        <div className="bg-white dark:bg-zinc-900
                        border border-gray-100 dark:border-zinc-800
                        rounded-xl overflow-hidden shadow-sm
                        group-hover:shadow-md group-hover:-translate-y-0.5
                        transition-all duration-200">

          {/* Cover image */}
          <div className="aspect-video bg-gray-50 dark:bg-zinc-800 relative">
            {project.cover_image_url ? (
              <Image
                src={project.cover_image_url}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-sans text-xs text-gray-300 dark:text-zinc-600">
                  No cover
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-volt">
              {project.type}
            </span>

            <h3 className="font-display font-bold text-lg
                           text-gray-900 dark:text-gray-100
                           mt-2 mb-3">
              {project.title}
            </h3>

            <p className="font-sans text-sm text-gray-500 dark:text-gray-400
                          leading-relaxed mb-4 line-clamp-2">
              {project.brief}
            </p>

            {/* Stack pills */}
            {project.stack?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech}
                    className="font-sans text-xs px-2.5 py-1 rounded-md
                               bg-gray-50 dark:bg-zinc-800
                               border border-gray-100 dark:border-zinc-700
                               text-gray-500 dark:text-gray-400">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="font-sans text-xs px-2.5 py-1 rounded-md
                                   bg-gray-50 dark:bg-zinc-800
                                   border border-gray-100 dark:border-zinc-700
                                   text-gray-400 dark:text-gray-500">
                    +{project.stack.length - 4} more
                  </span>
                )}
              </div>
            )}

            <span className="inline-flex items-center gap-2 font-sans font-medium text-sm
                             text-volt group-hover:text-volt/80 transition-colors">
              View project
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-sans text-gray-400 dark:text-gray-600 text-sm">
          No projects yet.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  )
}