import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createFileRoute, createURLRoute } from 'electron-router-dom'

import './ipc'
import { runMigrations } from './migrations'
import { makeAppWithSingleInstanceLock } from './app/instance'
import { makeAppSetup } from './app/setup'
import { mainWindow } from './windows/Main'

let loadingWindow: BrowserWindow | null

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  await makeAppSetup(mainWindow)
})

// async function createLoadingWindow(): Promise<void> {
//   loadingWindow = new BrowserWindow({
//     width: 400,
//     height: 200,
//     show: true,
//     autoHideMenuBar: true,
//     webPreferences: {
//       preload: join(__dirname, '../preload/index.js'),
//       sandbox: false,
//       webSecurity: false,
//     },
//   })

//   loadingWindow.on('ready-to-show', () => {
//     loadingWindow!.maximize()
//   })

//   loadingWindow.webContents.setWindowOpenHandler((details) => {
//     shell.openExternal(details.url)
//     return { action: 'deny' }
//   })

//   const devServerURL = createURLRoute(
//     process.env.ELECTRON_RENDERER_URL!,
//     'loading',
//   )

//   const fileRoute = createFileRoute(
//     join(__dirname, '../renderer/index.html'),
//     'loading',
//   )

//   if (is.dev && process.env.ELECTRON_RENDERER_URL!) {
//     await loadingWindow.loadURL(devServerURL)
//   } else {
//     await loadingWindow.loadFile(...fileRoute)
//   }
// }

// app.whenReady().then(async () => {
//   electronApp.setAppUserModelId('com.electron')
//   app.on('browser-window-created', (_, window) => {
//     optimizer.watchWindowShortcuts(window)
//   })

//   // await createLoadingWindow()

//   await runMigrations()

//   if (loadingWindow) {
//     loadingWindow.close()

//     loadingWindow = null
//   }

//   // createWindow()

//   app.on('activate', function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })
