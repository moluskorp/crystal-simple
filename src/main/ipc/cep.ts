import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'
import * as dto from '../../shared/types/cep'
import cepPromise from 'cep-promise'

ipcMain.handle(
  IPC.CEP.FIND,
  async (_, { cep }: dto.FindCepDTO): Promise<dto.FindCepResponse> => {
    try {
      const data = await cepPromise(cep.replaceAll('-', ''))

      return {
        type: 'success',
        data,
      }
    } catch (e: any) {
      return {
        type: 'error',
        message: e.message,
      }
    }
  },
)
