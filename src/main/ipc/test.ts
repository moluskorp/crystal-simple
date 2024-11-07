import { is } from '@electron-toolkit/utils'
import { IPC } from '@shared/constants/ipc'
import { app, ipcMain } from 'electron'
import path from 'node:path'

ipcMain.handle(IPC.TEST.RUN, async (): Promise<string> => {
  const localPath = app.getPath('exe')
  const finalPath = is.dev
    ? path.join(localPath, '..', '..', '..', '..')
    : path.join(localPath, '..')
  // const index = localPath.lastIndexOf('\\')
  // const newPath = localPath.substring(0, index)
  // const finalPath = is.dev ? path.join(newPath, '..', '..', '..') : newPath
  return finalPath
})
