import { runMigrations } from '../migrations'
import { IPC } from '@shared/constants/ipc'
import { ErrorResponse } from '@shared/types/error'
import { ipcMain } from 'electron'

ipcMain.handle(IPC.MIGRATION.RUN, async (): Promise<ErrorResponse> => {
  try {
    await runMigrations()

    return { type: 'success' }
  } catch (err: any) {
    return {
      type: 'error',
      message: err.message,
    }
  }
})
