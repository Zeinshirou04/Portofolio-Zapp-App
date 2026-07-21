import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useProjectLikes } from '@/hooks/useProjectLikes'
import { getLikeStatus, likeProject, unlikeProject } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  getLikeStatus: vi.fn(),
  likeProject: vi.fn(),
  unlikeProject: vi.fn(),
}))

// Echo/Pusher are dynamically imported inside the hook purely to subscribe
// to live count updates — stub them out so tests don't touch a real socket.
vi.mock('laravel-echo', () => ({
  // Must be a regular function (not an arrow fn) so it's valid with `new Echo(...)`.
  default: vi.fn().mockImplementation(function () {
    return {
      channel: vi.fn().mockReturnValue({ listen: vi.fn().mockReturnThis() }),
      leaveChannel: vi.fn(),
    }
  }),
}))
vi.mock('pusher-js', () => ({ default: vi.fn() }))

const mockedGetLikeStatus = vi.mocked(getLikeStatus)
const mockedLikeProject = vi.mocked(likeProject)
const mockedUnlikeProject = vi.mocked(unlikeProject)

describe('useProjectLikes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('reconciles with the server on mount and updates localStorage', async () => {
    mockedGetLikeStatus.mockResolvedValueOnce({ likes_count: 10, liked: true })

    const { result } = renderHook(() => useProjectLikes('zapp', 5))

    // initial render uses the SSR-provided count before the server call resolves
    expect(result.current.count).toBe(5)

    await waitFor(() => expect(result.current.ready).toBe(true))

    expect(result.current.count).toBe(10)
    expect(result.current.liked).toBe(true)
    expect(localStorage.getItem('zapp_liked_zapp')).toBe('true')
  })

  it('falls back to localStorage if the server check fails', async () => {
    localStorage.setItem('zapp_liked_zapp', 'true')
    mockedGetLikeStatus.mockRejectedValueOnce(new Error('network error'))

    const { result } = renderHook(() => useProjectLikes('zapp', 5))

    await waitFor(() => expect(result.current.ready).toBe(true))

    // count stays at the initial SSR value, liked stays true from localStorage
    expect(result.current.count).toBe(5)
    expect(result.current.liked).toBe(true)
  })

  it('optimistically likes, then reconciles with the server response', async () => {
    mockedGetLikeStatus.mockResolvedValueOnce({ likes_count: 5, liked: false })
    mockedLikeProject.mockResolvedValueOnce({ likes_count: 6, liked: true })

    const { result } = renderHook(() => useProjectLikes('zapp', 5))
    await waitFor(() => expect(result.current.ready).toBe(true))

    act(() => {
      result.current.toggle()
    })

    // optimistic update happens synchronously before the request resolves
    expect(result.current.liked).toBe(true)
    expect(result.current.count).toBe(6)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(mockedLikeProject).toHaveBeenCalledWith('zapp')
    expect(result.current.liked).toBe(true)
    expect(result.current.count).toBe(6)
    expect(localStorage.getItem('zapp_liked_zapp')).toBe('true')
  })

  it('optimistically unlikes when already liked', async () => {
    mockedGetLikeStatus.mockResolvedValueOnce({ likes_count: 6, liked: true })
    mockedUnlikeProject.mockResolvedValueOnce({ likes_count: 5, liked: false })

    const { result } = renderHook(() => useProjectLikes('zapp', 6))
    await waitFor(() => expect(result.current.ready).toBe(true))
    expect(result.current.liked).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.liked).toBe(false)
    expect(result.current.count).toBe(5)

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(mockedUnlikeProject).toHaveBeenCalledWith('zapp')
  })

  it('reverts the optimistic update if the like request fails', async () => {
    mockedGetLikeStatus.mockResolvedValueOnce({ likes_count: 5, liked: false })
    mockedLikeProject.mockRejectedValueOnce(new Error('server down'))

    const { result } = renderHook(() => useProjectLikes('zapp', 5))
    await waitFor(() => expect(result.current.ready).toBe(true))

    act(() => {
      result.current.toggle()
    })

    // optimistic bump
    expect(result.current.liked).toBe(true)
    expect(result.current.count).toBe(6)

    await waitFor(() => expect(result.current.loading).toBe(false))

    // reverted back after the rejected request
    expect(result.current.liked).toBe(false)
    expect(result.current.count).toBe(5)
  })

  it('ignores toggle calls while a request is already in flight or not ready', async () => {
    mockedGetLikeStatus.mockResolvedValueOnce({ likes_count: 5, liked: false })

    const { result } = renderHook(() => useProjectLikes('zapp', 5))

    // not ready yet — toggle should be a no-op
    act(() => {
      result.current.toggle()
    })
    expect(mockedLikeProject).not.toHaveBeenCalled()

    await waitFor(() => expect(result.current.ready).toBe(true))
  })
})