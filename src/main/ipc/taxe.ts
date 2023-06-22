import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'
import * as tax from '@shared/types/taxes'
import * as db from '../models/taxmgr'

ipcMain.handle(
  IPC.TAXE.CREATE,
  async (_, data: tax.insertTaxeTableDTO): Promise<tax.CreateTaxeResponse> => {
    const ncmExists = await db.getTaxeTableByNcm({ ncm: data.ncm })

    if (ncmExists) {
      return { type: 'error', message: 'Tributação já cadastrada' }
    }

    try {
      await db.insertTaxeTable(data)
    } catch (e: any) {
      return { type: 'error', message: e }
    }

    return { type: 'success' }
  },
)

ipcMain.handle(
  IPC.TAXE.FETCH,
  async (_, data: tax.getTaxeTableByNcmDTO): Promise<tax.FetchTaxeResponse> => {
    try {
      const result = await db.getTaxeTableByNcm(data)
      return {
        type: 'success',
        data: result,
      }
    } catch (e: any) {
      return {
        type: 'error',
        message: e,
      }
    }
  },
)

ipcMain.handle(
  IPC.TAXE.FETCH_ALL,
  async (): Promise<tax.FetchAllTaxesResponse> => {
    try {
      const result = await db.getAllTaxeTable()
      return {
        type: 'success',
        data: result,
      }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)

ipcMain.handle(
  IPC.TAXE.UPDATE,
  async (_, data: tax.updateTaxeTableDTO): Promise<tax.UpdateTaxeRespone> => {
    try {
      await db.updateTaxeTable(data)
      return { type: 'success' }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)
