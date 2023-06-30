import { IPC } from '@shared/constants/ipc'
import { FetchAllOriginsResponse } from '@shared/types/orig'
import { ipcMain } from 'electron'
import * as org from '../models/origmgr'

ipcMain.handle(
  IPC.ORIGIN.FETCH_ALL,
  async (): Promise<FetchAllOriginsResponse> => {
    const result = await org.selectAllOrigTable()
    return { data: result }
  },
)
