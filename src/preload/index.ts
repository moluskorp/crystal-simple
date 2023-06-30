import { contextBridge, ipcRenderer } from 'electron'
import {
  GetGroupTableDTO,
  deleteGroupTableDTO,
  getListGroupTableDTO,
  insertGroupTableDTO,
  updateGroupTableDTO,
  CreateGroupResponse,
  FetchAllGroupsResponse,
  FetchGroupResponse,
  FetchListGroupsResponse,
  selectGroupByIdTableDTO,
  SelectGroupResponse,
} from '../shared/types/group'

import { IPC } from '../shared/constants/ipc'
import {
  CreateTaxeResponse,
  FetchAllTaxesResponse,
  FetchTaxeResponse,
  UpdateTaxeRespone,
  getTaxeTableByNcmDTO,
  insertTaxeTableDTO,
  updateTaxeTableDTO,
} from 'src/shared/types/taxes'
import { FetchAllOriginsResponse } from 'src/shared/types/orig'
import {
  CreateProductResponse,
  DeleteProductResponse,
  FetchAllProductsResponse,
  FetchProductResponse,
  UpdateProductResponse,
  deleteProductTableDTO,
  getListProductTableDTO,
  getProductByIdTableDTO,
  getProductListTableDTO,
  insertProductTableDTO,
  updateProductTableDTO,
} from 'src/shared/types/product'
import {
  CreateProductEanResponse,
  DeleteProductEanResponse,
  FetchAllProductEanResponse,
  UpdateProductEanResponse,
  deleteProductEanTableDTO,
  getProductEanByEanTableDTO,
  getProductEanByProductIdTableDTO,
  insertProductEanTableDTO,
  updateProductEanTableDTO,
} from 'src/shared/types/productean'

declare global {
  export interface Window {
    api: typeof api
  }
}

const api = {
  group: {
    create(req: insertGroupTableDTO): Promise<CreateGroupResponse> {
      return ipcRenderer.invoke(IPC.GROUP.CREATE, req)
    },
    fetchAll(): Promise<FetchAllGroupsResponse> {
      return ipcRenderer.invoke(IPC.GROUP.FETCH_ALL)
    },
    fetchAllActive(): Promise<FetchAllGroupsResponse> {
      return ipcRenderer.invoke(IPC.GROUP.FETCH_ALL_ACTIVE)
    },
    fetchList(req: getListGroupTableDTO): Promise<FetchListGroupsResponse> {
      return ipcRenderer.invoke(IPC.GROUP.FETCH_LIST, req)
    },
    fetch(req: GetGroupTableDTO): Promise<FetchGroupResponse> {
      return ipcRenderer.invoke(IPC.GROUP.FETCH, req)
    },
    update(req: updateGroupTableDTO): Promise<void> {
      return ipcRenderer.invoke(IPC.GROUP.UPDATE, req)
    },
    delete(req: deleteGroupTableDTO): Promise<void> {
      return ipcRenderer.invoke(IPC.GROUP.DELETE, req)
    },
    select(req: selectGroupByIdTableDTO): Promise<SelectGroupResponse> {
      return ipcRenderer.invoke(IPC.GROUP.SELECT, req)
    },
  },
  origin: {
    fetchAll(): Promise<FetchAllOriginsResponse> {
      return ipcRenderer.invoke(IPC.ORIGIN.FETCH_ALL)
    },
  },
  product: {
    create(req: insertProductTableDTO): Promise<CreateProductResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT.CREATE, req)
    },
    fetchAll(): Promise<FetchAllProductsResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT.FETCH_ALL)
    },
    fetchActives(): Promise<FetchAllProductsResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT.FETCH_ALL_ACTIVE)
    },
    fetchAllByName(
      req: getProductListTableDTO,
    ): Promise<FetchAllProductsResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT.FETCH_ALL_BY_NAME, req)
    },
    fetchList(req: getListProductTableDTO): Promise<FetchAllProductsResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT.FETCH_LIST, req)
    },
    fetch(req: getProductByIdTableDTO): Promise<FetchProductResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT.FETCH, req)
    },
    delete(req: deleteProductTableDTO): Promise<DeleteProductResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT.DELETE, req)
    },
    update(req: updateProductTableDTO): Promise<UpdateProductResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT.UPDATE, req)
    },
  },
  productEan: {
    create(req: insertProductEanTableDTO): Promise<CreateProductEanResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT_EAN.CREATE, req)
    },
    fetchAll(): Promise<FetchAllProductEanResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT_EAN.FETCH_ALL)
    },
    fetchByPrdId(
      req: getProductEanByProductIdTableDTO,
    ): Promise<FetchAllProductEanResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT_EAN.FETCH_BY_PRD_ID, req)
    },
    fetchByEan(
      req: getProductEanByEanTableDTO,
    ): Promise<FetchAllProductEanResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT_EAN.FETCH_BY_EAN, req)
    },
    delete(req: deleteProductEanTableDTO): Promise<DeleteProductEanResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT_EAN.DELETE, req)
    },
    update(req: updateProductEanTableDTO): Promise<UpdateProductEanResponse> {
      return ipcRenderer.invoke(IPC.PRODUCT_EAN.UPDATE, req)
    },
  },
  taxe: {
    create(req: insertTaxeTableDTO): Promise<CreateTaxeResponse> {
      return ipcRenderer.invoke(IPC.TAXE.CREATE, req)
    },
    fetchAll(): Promise<FetchAllTaxesResponse> {
      return ipcRenderer.invoke(IPC.TAXE.FETCH_ALL)
    },
    fetch(req: getTaxeTableByNcmDTO): Promise<FetchTaxeResponse> {
      return ipcRenderer.invoke(IPC.TAXE.FETCH, req)
    },
    update(req: updateTaxeTableDTO): Promise<UpdateTaxeRespone> {
      return ipcRenderer.invoke(IPC.TAXE.UPDATE, req)
    },
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
