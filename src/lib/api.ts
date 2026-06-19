const API_BASE = process.env.API_BASE_URL!
const API_TOKEN = process.env.API_SECRET_KEY!

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    next: options?.method && options.method !== 'GET' ? undefined : { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`)
  }

  return res.json()
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StackItem {
  name: string
  version: string
}

export interface ProjectImage {
  id: number
  path: string
  caption: string | null
  type: 'screenshot' | 'certificate' | 'documentary' | 'other'
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

export interface ProjectLink {
  id: number
  label: string
  url: string
  type: 'repo' | 'site' | 'video' | 'doc' | 'other'
  sort_order: number
}

export interface Project {
  id: number
  title: string
  slug: string
  type: string
  brief: string
  stack: StackItem[]
  cover_image_url: string | null
  earning: string
  is_maintained: boolean
  started_at: string
  ended_at: string | null
  likes_count: number
  images?: ProjectImage[]
  timelines?: ProjectTimeline[]
  contributors?: ProjectContributor[]
  links?: ProjectLink[]
}

export interface LikeResponse {
  likes_count: number
  liked: boolean
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

export async function getLikeStatus(slug: string): Promise<LikeResponse> {
  const res = await apiFetch<LikeResponse>(`/api/projects/${slug}/like`)
  return res
}

export async function likeProject(slug: string): Promise<LikeResponse> {
  const res = await apiFetch<LikeResponse>(`/api/projects/${slug}/like`, {
    method: 'POST',
  })
  return res
}

export async function unlikeProject(slug: string): Promise<LikeResponse> {
  const res = await apiFetch<LikeResponse>(`/api/projects/${slug}/like`, {
    method: 'DELETE',
  })
  return res
}

export async function getServices(): Promise<Service[]> {
  const res = await apiFetch<{ data: Service[] }>('/api/services')
  return res.data
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await apiFetch<{ data: Testimonial[] }>('/api/testimonials')
  return res.data
}