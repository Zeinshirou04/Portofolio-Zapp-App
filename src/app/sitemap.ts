import { MetadataRoute } from 'next'
import { getProjects } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `https://portfolio.zapp.web.id/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://portfolio.zapp.web.id',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://portfolio.zapp.web.id/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectEntries,
  ]
}