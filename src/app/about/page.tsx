import { Metadata } from 'next'
import { getProfile } from '@/lib/api'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About — Farras Adhani Zayn',
  description: 'Full Stack Web Developer from Semarang, Indonesia. Specialising in Laravel and Next.js.',
  openGraph: {
    title: 'About — Farras Adhani Zayn',
    description: 'Full Stack Web Developer from Semarang, Indonesia.',
    url: 'https://portfolio.zapp.web.id/about',
  },
}

export default async function AboutPage() {
  const profile = await getProfile()
  return <AboutContent profile={profile} />
}