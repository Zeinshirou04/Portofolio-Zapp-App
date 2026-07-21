import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getProjects,
  getProject,
  getProfile,
  getLikeStatus,
  likeProject,
  unlikeProject,
} from '@/lib/api'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

function jsonResponse(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
  } as Response
}

describe('lib/api — project & profile fetchers', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('getProjects calls the projects endpoint with auth header and unwraps data', async () => {
    const projects = [{ id: 1, title: 'Zapp', slug: 'zapp' }]
    mockFetch.mockResolvedValueOnce(jsonResponse({ data: projects }))

    const result = await getProjects()

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/projects',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-secret',
          Accept: 'application/json',
        }),
      })
    )
    expect(result).toEqual(projects)
  })

  it('getProject fetches a single project by slug', async () => {
    const project = { id: 1, title: 'Zapp', slug: 'zapp' }
    mockFetch.mockResolvedValueOnce(jsonResponse({ data: project }))

    const result = await getProject('zapp')

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/projects/zapp',
      expect.anything()
    )
    expect(result).toEqual(project)
  })

  it('getProfile fetches and unwraps profile data', async () => {
    const profile = { name: 'Zayn', job_title: 'Full Stack Developer' }
    mockFetch.mockResolvedValueOnce(jsonResponse({ data: profile }))

    const result = await getProfile()

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/profile',
      expect.anything()
    )
    expect(result).toEqual(profile)
  })

  it('throws when the API responds with a non-OK status', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ message: 'Server error' }, false, 500))

    await expect(getProjects()).rejects.toThrow('API error 500 on /api/projects')
  })
})

describe('lib/api — like endpoints', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('getLikeStatus hits the relative like endpoint (no auth header, client-side)', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ likes_count: 4, liked: false }))

    const result = await getLikeStatus('zapp')

    expect(mockFetch).toHaveBeenCalledWith('/api/projects/zapp/like')
    expect(result).toEqual({ likes_count: 4, liked: false })
  })

  it('likeProject POSTs to the like endpoint', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ likes_count: 5, liked: true }))

    const result = await likeProject('zapp')

    expect(mockFetch).toHaveBeenCalledWith('/api/projects/zapp/like', { method: 'POST' })
    expect(result).toEqual({ likes_count: 5, liked: true })
  })

  it('unlikeProject DELETEs the like endpoint', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ likes_count: 4, liked: false }))

    const result = await unlikeProject('zapp')

    expect(mockFetch).toHaveBeenCalledWith('/api/projects/zapp/like', { method: 'DELETE' })
    expect(result).toEqual({ likes_count: 4, liked: false })
  })
})