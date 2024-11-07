import { is } from '@electron-toolkit/utils'
import { IPC } from '@shared/constants/ipc'
import { ipcMain } from 'electron'

ipcMain.handle(IPC.IS.DEV, async (): Promise<boolean> => {
  return is.dev
})
