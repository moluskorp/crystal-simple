import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'
import * as dto from '../../shared/types/productean'
import * as pean from '../models/peanmgr'

ipcMain.handle(
  IPC.PRODUCT_EAN.GENERATE,
  async (
    _,
    data: dto.generateEanIPCDTO,
  ): Promise<dto.FetchProductEanResponse> => {
    try {
      let generatedEan = '0'
      const returnGeneratedEan = await pean.getLastGeneratedProductEanTable({
        weightProduct: !!data.weightProduct!,
      })

      if (!returnGeneratedEan) {
        generatedEan = data.weightProduct ? '1' : '10007'
      } else {
        const { pean_generated_ean } = returnGeneratedEan
        generatedEan = data.weightProduct
          ? String(pean_generated_ean + 1)
          : String(pean_generated_ean + 7)
      }
      const result = await pean.insertProductEanTable({
        ean: generatedEan,
        prd_id: data.prd_id,
        generated: true,
        weightProduct: data.weightProduct,
        generated_ean: Number(generatedEan) || 0,
      })
      return {
        type: 'success',
        data: result,
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
  IPC.PRODUCT_EAN.CREATE,
  async (
    _,
    data: dto.insertProductEanTableDTO,
  ): Promise<dto.CreateProductEanResponse> => {
    try {
      const eanExists = await pean.getProductEanByEanTable({ ean: data.ean })

      if (eanExists) {
        throw new Error('Código de barras já cadastrado')
      }

      const result = await pean.insertProductEanTable(data)

      return { type: 'success', data: result }
    } catch (err: any) {
      return { type: 'error', message: err.message }
    }
  },
)

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

ipcMain.handle(
  IPC.PRODUCT_EAN.FETCH_BY_PRD_ID,
  async (
    _,
    data: dto.getProductEanByProductIdTableDTO,
  ): Promise<dto.FetchAllProductEanResponse> => {
    try {
      const result = await pean.getProductEanByPrdIdTable(data)
      return { type: 'success', data: result }
    } catch (err: any) {
      return { type: 'error', message: err.message }
    }
  },
)
