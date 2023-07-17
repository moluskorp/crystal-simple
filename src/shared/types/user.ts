import { ErrorResponse } from './error'

export interface User {
  id: number
  name: string
  username: string
  password: string
  active: boolean
}

export type insertUserTableDTO = Omit<User, 'active' | 'id'>

export type getUserTableDTO = { id: number }

export type getListUserTableDTO = {
  name: string
  page: number
  rows: number
}

export type loginUserTableDTO = {
  username: string
  password: string
}

export type updateUserTableDTO = User

export type deleteUserTableDTO = { id: number }

/**
 * Responses
 */

export type CreateUserResponse = ErrorResponse

export type FechAllUserResponse = ErrorResponse & {
  data?: User[]
}

export type FetchUserResponse = ErrorResponse & {
  data?: User
}

export type LoginUserResponse = ErrorResponse & {
  data?: Omit<User, 'active' | 'password'>
}

export type UpdateUserResponse = ErrorResponse

export type DeleteUserResponse = ErrorResponse
