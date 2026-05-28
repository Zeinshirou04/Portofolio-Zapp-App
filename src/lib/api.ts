const API_BASE = process.env.API_BASE_URL!
const API_TOKEN = process.env.API_SECRET_KEY!

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: 'application/json',
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`)
  }

  return res.json()
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectImage {
  id: number
  path: string
  caption: string | null
  sort_order: number
}

export interface ProjectTimeline {
  id: number
  title: string
  description: string
  occurred_at: string
}

export interface ProjectContributor {
  id: number
  name: string
  role: string
}

export interface Project {
  id: number
  title: string
  slug: string
  type: string
  brief: string
  stack: string[]
  cover_image: string | null
  earning: string
  is_maintained: boolean
  started_at: string
  ended_at: string | null
  images?: ProjectImage[]
  timelines?: ProjectTimeline[]
  contributors?: ProjectContributor[]
}

export interface Service {
  id: number
  name: string
  type: string
  description: string
  includes: string[]
  price: string
  duration: string
  is_active: boolean
}

export interface Testimonial {
  id: number
  client_name: string
  client_photo: string | null
  quote: string
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const res = await apiFetch<{ data: Project[] }>('/api/projects')
  return res.data
}

export async function getProject(slug: string): Promise<Project> {
  const res = await apiFetch<{ data: Project }>(`/api/projects/${slug}`)
  return res.data
}

export async function getServices(): Promise<Service[]> {
  const res = await apiFetch<{ data: Service[] }>('/api/services')
  return res.data
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await apiFetch<{ data: Testimonial[] }>('/api/testimonials')
  return res.data
}