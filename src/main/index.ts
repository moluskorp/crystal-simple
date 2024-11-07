import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createFileRoute, createURLRoute } from 'electron-router-dom'

import icon from '../../resources/icon.png?asset'
import './ipc'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 950,
    height: 800,
    show: false,
    minWidth: 950,
    minHeight: 700,
    skipTaskbar: true,
    roundedCorners: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const devServerURL = createURLRoute(
    process.env.ELECTRON_RENDERER_URL!,
    'main',
  )

  const fileRoute = createFileRoute(
    join(__dirname, '../renderer/index.html'),
    'main',
  )

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(devServerURL)
  } else {
    mainWindow.loadFile(...fileRoute)
  }
}

async function start() {
  await app.whenReady()
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // await executeMigration()

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}

start()

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
