import type { AuthUser } from '~~/stores/auth'

export function useAuthStorage({ authTokenKey, authUserKey } = {
  authTokenKey: 'Authentication',
}) {
  const user = useCookie<AuthUser>(authUserKey)
  const token = useCookie<string>(authTokenKey)

  const store = (newToken: string, newUser: Record<string, any>) => {
    token.value = newToken
    user.value = newUser
  }

  const clear = () => {
    user.value = null
    token.value = ''
  }

  return { store, clear, user, token }
}
