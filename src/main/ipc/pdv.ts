import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'
import * as pdv from '@shared/types/pdv'
import * as db from '../models/pdvmgr'

ipcMain.handle(
  IPC.PDV.CREATE,
  async (_, data: pdv.InsertPdvTableDTO): Promise<pdv.CreatePdvResponse> => {
    try {
      const pdvExists = await db.getPdvByNumber({ number: data.number })
      if (pdvExists) {
        throw new Error('Pdv já cadastrado')
      }

      await db.insertPdvTable(data)
      return { type: 'success' }
    } catch (e: any) {
      return { type: 'error', message: e.message }
    }
  },
)

ipcMain.handle(
  IPC.PDV.DELETE,
  async (_, data: pdv.DeletePdvTableDTO): Promise<pdv.DeletePdvResponse> => {
    try {
      await db.deletePdvTable(data)
      return { type: 'success' }
    } catch (e: any) {
      return { type: 'error', message: e.message }
    }
  },
)

ipcMain.handle(
  IPC.PDV.FETCH,
  async (_, data: pdv.GetPdvTableDTO): Promise<pdv.FetchPdvResponse> => {
    try {
      const pdv = await db.getPdvTable(data)
      return { type: 'success', data: pdv }
    } catch (e: any) {
      return { type: 'error', message: e.message }
    }
  },
)

ipcMain.handle(
  IPC.PDV.FETCH_ALL,
  async (): Promise<pdv.FetchAllPdvResponse> => {
    try {
      const pdvs = await db.getListPdvTable()
      return { type: 'success', data: pdvs }
    } catch (e: any) {
      return { type: 'error', message: e.message }
    }
  },
)

ipcMain.handle(
  IPC.PDV.UPDATE,
  async (_, data: pdv.UpdatePdvTableDTO): Promise<pdv.UpdatePdvResponse> => {
    try {
      const pdvExists = await db.getPdvByNumber({ number: data.number })
      if (pdvExists && pdvExists.number !== data.number) {
        throw new Error('Pdv já cadastrado')
      }
      await db.updatePdvTable(data)
      return { type: 'success' }
    } catch (e: any) {
      return { type: 'error', message: e.message }
    }
  },
)
