import { ENVIRONMENT } from '@shared/constants/environment'
import { WindowProps } from '@shared/types/WindowProps'
import { BrowserWindow } from 'electron'
import { createFileRoute, createURLRoute } from 'electron-router-dom'
import { join } from 'path'

export function createWindow({ id, ...settings }: WindowProps) {
  const window = new BrowserWindow(settings)

  const devServerURL = createURLRoute(process.env.ELECTRON_RENDERER_URL!, id)

  const fileRoute = createFileRoute(
    join(__dirname, '../renderer/index.html'),
    id,
  )

  ENVIRONMENT.IS_DEV
    ? window.loadURL(devServerURL)
    : window.loadFile(...fileRoute)

  window.on('closed', window.destroy)

  return window
}
