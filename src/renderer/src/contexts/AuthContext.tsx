import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
// import Router from 'next/router';
// import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from '../services/apiClient'
// import { cookiesName } from '../config'

type SignInCredentials = {
  email: string
  password: string
}

type User = {
  email: string
  displayName: string
  role: any
  // permissions: string[];
  // roles: string[];
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User | undefined
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// let authChannel: BroadcastChannel;

export function signOut() {
  // destroyCookie(undefined, cookiesName.token);
  // destroyCookie(undefined, cookiesName.refreshToken);
  // authChannel.postMessage('signOut');
  // Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  // useEffect(() => {
  //   authChannel = new BroadcastChannel('auth');
  //   authChannel.onmessage = message => {
  //     switch (message.data) {
  //       case 'signOut':
  //         signOut();
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  // }, []);

  useEffect(() => {
    // const { [cookiesName.token]: token } = parseCookies();
    // if (token) {
    //   api
    //     .get('/me')
    //     .then(response => {
    //       const userLogged = response.data as User;
    //       setUser(userLogged);
    //     })
    //     .catch(() => {
    //       signOut();
    //     });
    // }
  }, [])

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/login', {
      username: email,
      password,
    })

    const { data } = response.data

    if (data.type === 'error') {
      throw new Error(data.message)
    }

    // eslint-disable-next-line
    const { access_token, refresh_token } = response.data;

    // setCookie(null, cookiesName.token, access_token, {
    //   maxAge: 60 * 60 * 24 * 30, // 30 days
    //   path: '/',
    // });

    // setCookie(null, cookiesName.refreshToken, refresh_token, {
    //   maxAge: 60 * 60 * 24 * 30, // 30 days
    //   path: '/',
    // });

    const userLogged = data as User

    setUser(userLogged)

    const headers = api.defaults.headers as any

    // eslint-disable-next-line
    headers.Authorization = `Bearer ${access_token}`;

    // Router.push('/dashboard');

    // authChannel.postMessage('signIn');
  }, [])

  const value = useMemo(
    () => ({
      signIn,
      isAuthenticated,
      user,
      signOut,
    }),
    [signIn, isAuthenticated, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
