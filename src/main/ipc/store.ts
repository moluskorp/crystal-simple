import { IPC } from "@shared/constants/ipc";
import { ipcMain } from "electron";
import * as str from '@shared/types/store'
import * as db from '../models/strmgr'

ipcMain.handle(IPC.STORES.CHECK_EXISTS, async (): Promise<str.CheckStoreExistsResponse> => {
  try {
    const store = await db.getStoreTable()
    if(store) {
      return {exists: true, type: 'success'}
    }
    return {exists: false, type: 'success'}
  }catch(e: any) {
    return {
      type: 'error',
      message: e.message
    }
  }
})

ipcMain.handle(IPC.STORES.CREATE, async(_, data:str.CreateStoreRequest ): Promise<str.CreateStoreResponse> => {
  try{
    await db.insertStoreTable(data)
    return {type: 'success'}
  }catch(e: any){
    return {type: 'error', message: e.message}
  }
})

ipcMain.handle(IPC.STORES.UPDATE, async(_, data: str.UpdateStoreRequest): Promise<str.UpdateStoreResponse> => {
  try {
    await db.updateStoreTable(data)
    return {type: 'success'}
  }catch(e: any) {
    return {type: 'error', message: e.message}
  }
})

ipcMain.handle(IPC.STORES.GET, async(): Promise<str.GetStoreResponse> => {
  try{
    const data = await db.getStoreTable()
    return {type: 'success', data}
  }catch(e: any) {
    return {type: 'error', message: e.message}
  }
})