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
