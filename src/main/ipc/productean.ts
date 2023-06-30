import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'
import * as dto from '../../shared/types/productean'
import * as pean from '../models/peanmgr'

ipcMain.handle(
  IPC.PRODUCT_EAN.DELETE,
  async (
    _,
    data: dto.deleteProductEanTableDTO,
  ): Promise<dto.DeleteProductEanResponse> => {
    try {
      await pean.deleteProductEanTable(data)
      return { type: 'success' }
    } catch (err: any) {
      return { type: 'error', message: err }
    }
  },
)

ipcMain.handle(
  IPC.PRODUCT_EAN.FETCH_BY_EAN,
  async (
    _,
    data: dto.getProductEanByEanTableDTO,
  ): Promise<dto.FetchProductEanResponse> => {
    try {
      const result = await pean.getProductEanByEanTable(data)
      return { type: 'success', data: result }
    } catch (err: any) {
      return { type: 'error', message: err }
    }
  },
)
