import { createWindow } from '../../factories/windows/create'
// import { displayName } from '../../../../package.json'
import { join } from 'path'
import { ENVIRONMENT } from '@shared/constants/environment'
import { BrowserWindow } from 'electron'

export async function mainWindow() {
  const window = createWindow({
    id: 'main',
    title: 'Janela Principal',
    width: 950,
    height: 800,
    show: false,
    minWidth: 950,
    minHeight: 700,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false,
    },
  })

  window.webContents.on('did-finish-load', () => {
    if (ENVIRONMENT.IS_DEV) {
      window.webContents.openDevTools({ mode: 'detach' })
    }

    window.show()
  })

  window.on('ready-to-show', () => {
    window.maximize()
  })

  window.on('close', () =>
    BrowserWindow.getAllWindows().forEach((window) => window.destroy()),
  )

  return window
}
