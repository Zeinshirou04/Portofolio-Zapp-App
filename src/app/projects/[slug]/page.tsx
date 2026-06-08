import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProject } from '@/lib/api'
import ProjectDetail from '@/components/projects/ProjectDetail'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) notFound()

  return (
    <main className="bg-white dark:bg-zinc-900 min-h-screen pt-16">
      {project.cover_image_url && (
        <div className="relative w-full h-64 md:h-96 bg-gray-100 dark:bg-zinc-800 overflow-hidden">
          <Image src={project.cover_image_url} alt={project.title}
            fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-t from-white/80 dark:from-zinc-900/80 via-transparent to-transparent" />
        </div>
      )}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <ProjectDetail project={project} />
        </div>
      </section>
    </main>
  )
}