import { ipcMain } from 'electron'
import { IPC } from '@shared/constants/ipc'
import * as prd from '../models/prdmgr'
import * as pean from '../models/peanmgr'
import * as dto from '../../shared/types/product'

ipcMain.handle(
  IPC.PRODUCT.CREATE,
  async (
    _,
    data: dto.insertProductTableDTO,
  ): Promise<dto.CreateProductResponse> => {
    try {
      const { prd_id: id } = await prd.insertProductTable(data)
      let generated = false
      let eanGenerated = ''
      if (!data.ean) {
        generated = true
        const returnGeneratedEan = await pean.getLastGeneratedProductEanTable({
          weightProduct: !!data.weightProduct!,
        })

        if (!returnGeneratedEan) {
          eanGenerated = data.weightProduct ? '1' : '10007'
        } else {
          const { pean_generated_ean } = returnGeneratedEan
          eanGenerated = data.weightProduct
            ? String(pean_generated_ean + 1)
            : String(pean_generated_ean + 7)
        }
      }

      await pean.insertProductEanTable({
        ean: data.ean || eanGenerated,
        prd_id: id,
        generated: !!generated,
        weightProduct: data.weightProduct!,
        generated_ean: Number(eanGenerated) || 0,
      })
      return { type: 'success' }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)

ipcMain.handle(
  IPC.PRODUCT.DELETE,
  async (
    _,
    data: dto.deleteProductTableDTO,
  ): Promise<dto.DeleteProductResponse> => {
    try {
      await prd.deleteProductTable(data)
      await pean.delteProductEanByProductIdTable({ prd_id: data.id })
      return { type: 'success' }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)

ipcMain.handle(
  IPC.PRODUCT.FETCH,
  async (
    _,
    data: dto.getProductByIdTableDTO,
  ): Promise<dto.FetchProductResponse> => {
    try {
      const result = await prd.getProductTable(data)
      return { type: 'success', data: result }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)

ipcMain.handle(
  IPC.PRODUCT.FETCH_ALL,
  async (): Promise<dto.FetchAllProductsResponse> => {
    try {
      const result = await prd.getAllProductTable()
      return { type: 'success', data: result }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)

ipcMain.handle(
  IPC.PRODUCT.FETCH_ALL_ACTIVE,
  async (): Promise<dto.FetchAllProductsResponse> => {
    try {
      const result = await prd.getAllProductActiveTable()
      return { type: 'success', data: result }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)

ipcMain.handle(
  IPC.PRODUCT.FETCH_ALL_BY_NAME,
  async (
    _,
    data: dto.getProductListTableDTO,
  ): Promise<dto.FetchAllProductsResponse> => {
    try {
      const result = await prd.getAllProductByNameTable(data)
      return { type: 'success', data: result }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)

ipcMain.handle(
  IPC.PRODUCT.FETCH_LIST,
  async (
    _,
    data: dto.getListProductTableDTO,
  ): Promise<dto.FetchAllProductsResponse> => {
    try {
      const result = await prd.getListProductTable(data)
      return { type: 'success', data: result }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)

ipcMain.handle(
  IPC.PRODUCT.UPDATE,
  async (
    _,
    data: dto.updateProductTableDTO,
  ): Promise<dto.UpdateProductResponse> => {
    try {
      await prd.updateProductTable(data)
      return { type: 'success' }
    } catch (e: any) {
      return { type: 'error', message: e }
    }
  },
)
