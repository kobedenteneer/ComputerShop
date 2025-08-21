import { createPinia, setActivePinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { useUserStore } from '../stores/userStore'
import type { User } from '@/types/User'
import axios from 'axios'

// Mock axios
vi.mock('axios')

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  clear: vi.fn(),
  key: vi.fn(),
}
global.localStorage = localStorageMock as Storage

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorage.clear?.()
  })

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    password: 'password123',
    role: 'user',
  }

  const mockAdminUser: User = {
    id: 2,
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
  }

  it('starts with null user', () => {
    const store = useUserStore()
    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(store.username).toBe('')
    expect(store.userId).toBeUndefined()
  })

  describe('login', () => {
    it('successfully logs in regular user', async () => {
      const store = useUserStore()
      vi.mocked(axios.get).mockResolvedValueOnce({
        data: [mockUser],
      })

      await store.login('testuser', 'password123')

      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users?username=testuser')

      expect(store.user).toEqual(mockUser)
      expect(store.isAuthenticated).toBe(true)
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ user: mockUser }))
    })

    it('successfully logs in admin user', async () => {
      const store = useUserStore()
      vi.mocked(axios.get).mockResolvedValueOnce({
        data: [mockAdminUser],
      })

      await store.login('admin', 'admin123')

      expect(store.user).toEqual(mockAdminUser)
      expect(store.isAuthenticated).toBe(true)
    })

    it('handles incorrect password', async () => {
      const store = useUserStore()
      vi.mocked(axios.get).mockResolvedValueOnce({
        data: [mockUser],
      })

      const result = await store.login('testuser', 'wrongpassword')

      expect(result).toBe('incorrect_password')
      expect(store.user).toBeNull()
      expect(store.isAuthenticated).toBe(false)
    })

    it('handles non-existent user', async () => {
      const store = useUserStore()
      vi.mocked(axios.get).mockResolvedValueOnce({
        data: [],
      })

      const result = await store.login('nonexistent', 'password123')

      expect(result).toBe('not_found')
      expect(store.user).toBeNull()
    })

    it('handles API error', async () => {
      const store = useUserStore()
      vi.mocked(axios.get).mockRejectedValueOnce(new Error('API Error'))

      const result = await store.login('testuser', 'password123')

      expect(result).toBe('error')
      expect(store.user).toBeNull()
    })
  })

  describe('logout', () => {
    it('successfully logs out user', () => {
      const store = useUserStore()
      store.setUser(mockUser)
      expect(store.isAuthenticated).toBe(true)

      store.logout()

      expect(store.user).toBeNull()
      expect(store.isAuthenticated).toBe(false)
      expect(localStorage.removeItem).toHaveBeenCalledWith('user')
    })
  })

  describe('local storage', () => {
    it('loads user from localStorage on init', () => {
      const store = useUserStore()
      vi.mocked(localStorage.getItem).mockReturnValueOnce(JSON.stringify({ user: mockUser }))

      store.loadUserFromLocalStorage()

      expect(localStorage.getItem).toHaveBeenCalledWith('user')
      expect(store.user).toEqual(mockUser)
      expect(store.isAuthenticated).toBe(true)
    })

    it('handles missing localStorage data', () => {
      const store = useUserStore()
      vi.mocked(localStorage.getItem).mockReturnValueOnce(null)

      store.loadUserFromLocalStorage()

      expect(store.user).toBeNull()
      expect(store.isAuthenticated).toBe(false)
    })
  })

  describe('getters', () => {
    it('returns correct username', () => {
      const store = useUserStore()
      store.setUser(mockUser)
      expect(store.username).toBe('testuser')
    })

    it('returns correct userId', () => {
      const store = useUserStore()
      store.setUser(mockUser)
      expect(store.userId).toBe(1)
    })

    it('returns correct authentication status', () => {
      const store = useUserStore()
      expect(store.isAuthenticated).toBe(false)
      store.setUser(mockUser)
      expect(store.isAuthenticated).toBe(true)
    })
  })
})
