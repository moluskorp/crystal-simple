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
