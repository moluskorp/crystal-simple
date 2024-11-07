import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'
import * as fin from '../models/finmgr'
import * as dto from '../../shared/types/finisher'

ipcMain.handle(
  IPC.FINISHER.CREATE,
  async (
    _,
    data: dto.InsertFinisherTableDTO,
  ): Promise<dto.CreateFinisherResponse> => {
    try {
      const finisherExists = await fin.getFinisherByCodeActive({
        code: data.code,
      })

      if (finisherExists) {
        throw new Error('Finalizadora já existente')
      }

      await fin.insertFinisher(data)

      return {
        type: 'success',
      }
    } catch (err: any) {
      return {
        type: 'error',
        message: err.message,
      }
    }
  },
)

ipcMain.handle(
  IPC.FINISHER.DELETE,
  async (
    _,
    data: dto.DeleteFinisherTableDTO,
  ): Promise<dto.DeleteFinisherResponse> => {
    try {
      await fin.deleteFinisher(data)

      return { type: 'success' }
    } catch (err: any) {
      return { type: 'error', message: err.message }
    }
  },
)

ipcMain.handle(
  IPC.FINISHER.FETCH,
  async (
    _,
    data: dto.GetFinisherTableDTO,
  ): Promise<dto.FetchFinisherResponse> => {
    try {
      const result = await fin.getFinisher(data)

      return { type: 'success', data: result }
    } catch (err: any) {
      return { type: 'error', message: err.message }
    }
  },
)

ipcMain.handle(
  IPC.FINISHER.FETCH_ALL,
  async (
    _,
    data: dto.FetchListFinisherDTO,
  ): Promise<dto.FetchListFinisherResponse> => {
    try {
      const result = await fin.getAllFinisher({
        rowsPerPage: data.rowsPerPage,
        page: data.page,
      })

      return { type: 'success', data: result }
    } catch (err: any) {
      return { type: 'error', message: err.message }
    }
  },
)

ipcMain.handle(
  IPC.FINISHER.FETCH_BY_CODE,
  async (
    _,
    data: dto.GetFinisherByCodeTableDTO,
  ): Promise<dto.FetchFinisherResponse> => {
    try {
      const result = await fin.getFinisherByCode(data)

      return { type: 'success', data: result }
    } catch (err: any) {
      return { type: 'error', message: err.message }
    }
  },
)

ipcMain.handle(
  IPC.FINISHER.UPDATE,
  async (
    _,
    data: dto.UpdateFinisherTableDTO,
  ): Promise<dto.UpdateFinisherResponse> => {
    try {
      const finisherExists = await fin.getFinisherByCodeActive({
        code: data.code,
      })

      if (finisherExists && finisherExists.code !== data.code) {
        throw new Error('Código de Finalizadora já existente')
      }

      await fin.updateFinisher(data)

      return { type: 'success' }
    } catch (err: any) {
      return { type: 'error', message: err.message }
    }
  },
)
