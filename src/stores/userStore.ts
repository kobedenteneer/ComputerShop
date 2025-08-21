import { defineStore } from 'pinia'
import type { User, UserState, UserData } from '@/types/User'
import axios from 'axios'
import { Roles } from '@/constants/roles'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
  }),

  getters: {
    username: (state) => state.user?.username || '',
    userId: (state) => state.user?.id,
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === Roles.ADMIN,
  },

  actions: {
    setUser(user: User) {
      this.user = {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
      }
      localStorage.setItem('user', JSON.stringify({ user: this.user }))
    },

    loadUserFromLocalStorage() {
      const data = localStorage.getItem('user')
      if (data) {
        const parsed: UserData = JSON.parse(data)
        this.user = parsed.user
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    },

    async login(username: string, password: string) {
      try {
        const response = await axios.get(`http://localhost:3000/users?username=${username}`)
        const user = response.data.length > 0 ? response.data[0] : null

        if (user) {
          if (user.password === password) {
            this.setUser(user)
          } else {
            console.log('Incorrect password')
            return 'incorrect_password'
          }
        } else {
          console.log('User not found')
          return 'not_found'
        }
      } catch (error) {
        console.error(error)
        return 'error'
      }
    },
  },
})
