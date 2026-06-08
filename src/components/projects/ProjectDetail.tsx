'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faCalendar,
  faCode,
  faUsers,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'
import type { Project } from '@/lib/api'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

function StackPill({ tech }: { tech: string }) {
  return (
    <span className="inline-block font-sans text-xs font-semibold
                     bg-gray-100 dark:bg-zinc-800
                     text-gray-700 dark:text-gray-300
                     px-3 py-1 rounded-lg">
      {tech}
    </span>
  )
}

function MetaItem({ icon, label, value }: { icon: typeof faCalendar; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <FontAwesomeIcon icon={icon} className="h-4 w-4 text-volt mt-0.5 shrink-0" />
      <div>
        <p className="font-sans text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="font-sans text-sm text-gray-800 dark:text-gray-200 font-medium">{value}</p>
      </div>
    </div>
  )
}

function Timeline({ timelines }: { timelines: Project['timelines'] }) {
  if (!timelines || timelines.length === 0) return null
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-6">Timeline</h2>
      <ol className="relative border-l border-gray-200 dark:border-zinc-700 space-y-8 pl-6">
        {timelines.map((t) => (
          <li key={t.id} className="relative">
            <span className="absolute left-[-1.65rem] top-1 h-3 w-3 rounded-full bg-volt ring-4 ring-white dark:ring-zinc-900" />
            <time className="font-sans text-xs text-gray-400 dark:text-gray-500">{formatDate(t.occurred_at)}</time>
            <h3 className="font-display font-bold text-base text-gray-900 dark:text-gray-100 mt-0.5 mb-1">{t.title}</h3>
            {t.description && (
              <p className="font-sans text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t.description}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function Contributors({ contributors }: { contributors: Project['contributors'] }) {
  if (!contributors || contributors.length === 0) return null
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-6">Contributors</h2>
      <ul className="space-y-3">
        {contributors.map((c) => (
          <li key={c.id} className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800/60
                                    border border-gray-100 dark:border-zinc-700 rounded-xl px-4 py-3">
            <div className="h-9 w-9 rounded-full bg-volt/15 flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-sm text-volt">{c.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-gray-800 dark:text-gray-200">{c.name}</p>
              <p className="font-sans text-xs text-gray-400 dark:text-gray-500">{c.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ImageGallery({ images }: { images: Project['images'] }) {
  if (!images || images.length === 0) return null
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-6">Gallery</h2>
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {images.map((img) => (
          <motion.div key={img.id} variants={fadeUp}
            className="group relative overflow-hidden rounded-xl
                       border border-gray-100 dark:border-zinc-800
                       bg-gray-50 dark:bg-zinc-900 aspect-video">
            <Image src={img.path} alt={img.caption ?? 'Project screenshot'}
              fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, 50vw" />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent
                              px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                <p className="font-sans text-xs text-white/90">{img.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function ProjectDetail({ project }: { project: Project }) {
  const period = project.started_at
    ? `${formatDate(project.started_at)} — ${project.ended_at ? formatDate(project.ended_at) : 'Present'}`
    : '—'

  return (
    <>
      {/* Back link */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <Link href="/projects"
          className="inline-flex items-center gap-2 font-sans text-sm
                     text-gray-400 dark:text-gray-500
                     hover:text-volt dark:hover:text-volt-light
                     transition-colors mb-8">
          <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
          All projects
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

        {/* Left */}
        <div className="lg:col-span-2 space-y-12">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-xs font-sans font-semibold tracking-widest uppercase text-volt">
              {project.type}
            </span>
            <h1 className="font-display font-bold text-3xl md:text-4xl
                           text-gray-900 dark:text-gray-100
                           mt-3 mb-4 leading-tight tracking-tight">
              {project.title}
            </h1>
            <p className="font-sans text-gray-500 dark:text-gray-400 leading-relaxed text-base">
              {project.brief}
            </p>
            {project.stack && project.stack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {project.stack.map((tech: string) => <StackPill key={tech} tech={tech} />)}
              </div>
            )}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ImageGallery images={project.images} />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Timeline timelines={project.timelines} />
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="sticky top-24 space-y-8">
            <motion.div variants={fadeUp}
              className="bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-700 rounded-xl p-6 space-y-5">
              <MetaItem icon={faCalendar} label="Period" value={period} />
              <MetaItem icon={faCode} label="Type" value={project.type ?? '—'} />
              {project.is_maintained && (
                <MetaItem icon={faWrench} label="Status" value="Actively maintained" />
              )}
              {project.contributors && project.contributors.length > 0 && (
                <MetaItem icon={faUsers} label="Team size"
                  value={`${project.contributors.length} contributor${project.contributors.length !== 1 ? 's' : ''}`} />
              )}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Contributors contributors={project.contributors} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link href="/#contact"
                className="flex items-center justify-center gap-2
                           font-sans font-medium text-sm
                           bg-volt hover:bg-volt/90 text-white
                           px-5 py-3 rounded-lg transition-colors w-full text-center">
                Start a similar project
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
              </Link>
            </motion.div>
          </motion.div>
        </aside>

      </div>
    </>
  )
}