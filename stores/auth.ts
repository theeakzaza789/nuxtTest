import { defineStore } from 'pinia'

export interface AuthUser extends Record<string, any> {}

export interface AuthState {
  loggedIn: boolean
  user: AuthUser | null
  loading: boolean
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => {
    const { token, user } = useAuthStorage()

    return {
      loggedIn: !!token.value,
      user: user.value,
      loading: false,
    }
  },
  actions: {
    logout() {
      const { clear } = useAuthStorage()
      clear()
      // localStorage.removeItem('sessionToken')
      // localStorage.removeItem('prefix')
      this.loggedIn = false
      this.user = null
    },
  },
})
