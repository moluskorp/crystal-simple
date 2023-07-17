import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
// import { setCookie, parseCookies, destroyCookie } from 'nookies';
// import { cookiesName } from '../config'

type SignInCredentials = {
  username: string
  password: string
}

type User = {
  username: string
  name: string
  id: number
  // role: any
  // permissions: string[];
  // roles: string[];
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User | null | undefined
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()
  const isAuthenticated = !!user

  const signOut = useCallback(() => {
    setUser(null)
  }, [])

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      const response = await window.api.user.login({ username, password })

      const { type } = response

      if (type === 'error') {
        throw new Error(response.message)
      }

      const userLogged = response.data as User

      console.log('userLogged', userLogged)

      setUser(userLogged)
    },
    [],
  )

  const value = useMemo(
    () => ({
      signIn,
      isAuthenticated,
      user,
      signOut,
    }),
    [signIn, isAuthenticated, user, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
