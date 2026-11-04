import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  nativeImage,
  Tray,
} from 'electron'
import started from 'electron-squirrel-startup'
import path from 'node:path'

import { WINDOW_ACTION } from './types/WindowAction'
import { handleWindowAction } from './utils/window'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const isMac = process.platform === 'darwin'
let tray: Tray

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // 无边框窗口
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  // 解决窗口显示时没有视觉闪烁
  // @see https://www.electronjs.org/zh/docs/latest/api/browser-window
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // 仅在开发环境打开 DevTools，打包后的正式版本不打开
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  // 创建 "Always on Top" 菜单项
  const alwaysOnTopMenuItem: MenuItemConstructorOptions = {
    label: 'Always on Top',
    type: 'checkbox',
    click: (menuItem, window) => {
      window?.setAlwaysOnTop(menuItem.checked)
    },
    icon: isMac
      ? nativeImage.createMenuSymbol('pin')
      : nativeImage.createFromPath(`${app.getAppPath()}/assets/images/pin.png`),
  }

  // 获取应用菜单, 并在窗口菜单中添加 "Always on Top" 选项
  const appWindow =
    Menu.getApplicationMenu()?.items.map((item: MenuItem) => {
      if (item.role?.toLocaleLowerCase() === 'windowmenu') {
        return new MenuItem({
          role: 'windowMenu',
          submenu: Menu.buildFromTemplate([alwaysOnTopMenuItem, ...(item.submenu?.items ?? [])]),
        })
      }
      return item
    }) ?? []

  // 在应用菜单中添加帮助菜单
  const menuTemplate: MenuItemConstructorOptions[] = [
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          },
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate([...appWindow, ...menuTemplate])
  Menu.setApplicationMenu(menu)

  const logo = nativeImage.createFromPath(`${app.getAppPath()}/assets/images/logo.png`)
  if (isMac) {
    logo.setTemplateImage(true)
  }

  tray = new Tray(logo)
  const contextMenu = Menu.buildFromTemplate([{ role: 'quit' }])
  tray.setContextMenu(contextMenu)

  // 监听窗口操作事件
  ipcMain.on(WINDOW_ACTION, handleWindowAction)

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
