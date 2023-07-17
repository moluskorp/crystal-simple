import { ipcMain } from 'electron'
import { IPC } from '@shared/constants/ipc'
import * as usr from '../models/usrmgr'
import * as dto from '../../shared/types/user'
import * as bcrypt from 'bcrypt'

const SALTS = 10

ipcMain.handle(
  IPC.USER.CREATE,
  async (_, data: dto.insertUserTableDTO): Promise<dto.CreateUserResponse> => {
    const userExists = await usr.getUserByUsername(data.username)

    if (userExists) {
      return { type: 'error', message: 'Usuário já existente' }
    }

    const passwordHash = bcrypt.hashSync(data.password, SALTS)

    const newUser = {
      ...data,
      password: passwordHash,
    }

    try {
      await usr.insertUserTable(newUser)
      return {
        type: 'success',
      }
    } catch {
      return { type: 'error', message: 'Erro ao cadastrar usuário' }
    }
  },
)

ipcMain.handle(
  IPC.USER.DELETE,
  async (_, data: dto.deleteUserTableDTO): Promise<dto.DeleteUserResponse> => {
    try {
      await usr.deleteUserTable(data)
      return { type: 'success' }
    } catch {
      return { type: 'error', message: 'Erro ao deletar usuário' }
    }
  },
)

ipcMain.handle(
  IPC.USER.FETCH,
  async (_, data: dto.getUserTableDTO): Promise<dto.FetchUserResponse> => {
    try {
      const user = await usr.getUserTable(data)
      return { type: 'success', data: user }
    } catch {
      return { type: 'error', message: 'Erro ao selecionar usuário' }
    }
  },
)

ipcMain.handle(
  IPC.USER.FETCH_LIST,
  async (
    _,
    data: dto.getListUserTableDTO,
  ): Promise<dto.FechAllUserResponse> => {
    try {
      const users = await usr.getListUserTable(data)
      return { type: 'success', data: users }
    } catch {
      return { type: 'error', message: 'Erro ao selecionar usuários' }
    }
  },
)

ipcMain.handle(
  IPC.USER.LOGIN,
  async (_, data: dto.loginUserTableDTO): Promise<dto.LoginUserResponse> => {
    try {
      const user = await usr.getUserByUsernameLogin(data.username)

      if (!user) {
        throw new Error('Usuário ou senha incorretos')
      }

      const passwordOk = bcrypt.compareSync(data.password, user.password)

      if (passwordOk) {
        return { type: 'success', data: user }
      }

      throw new Error('Usuário ou senha incorretos')
    } catch (err: any) {
      return { type: 'error', message: err.message }
    }
  },
)

ipcMain.handle(
  IPC.USER.RECOVER,
  async (_, data: dto.deleteUserTableDTO): Promise<dto.DeleteUserResponse> => {
    try {
      await usr.recoverUserTable(data)
      return { type: 'success' }
    } catch {
      return { type: 'error', message: 'Erro ao recuperar o usuário' }
    }
  },
)

ipcMain.handle(
  IPC.USER.UPDATE,
  async (_, data: dto.updateUserTableDTO): Promise<dto.UpdateUserResponse> => {
    try {
      await usr.updateUserTable(data)
      return { type: 'success' }
    } catch {
      return { type: 'error', message: 'Erro ao atualizar o usuário' }
    }
  },
)
