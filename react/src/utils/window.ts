import { BrowserWindow, IpcMainInvokeEvent } from 'electron'

export function handleWindowAction(event: IpcMainInvokeEvent, action: string) {
  const win = BrowserWindow.fromWebContents(event.sender)

  if (!win) {
    console.error('No window found for the given web contents.')
    return
  }

  if (action === 'minimize') {
    win.minimize()
    return
  }

  if (action === 'maximize') {
    win.isMaximized() ? win.unmaximize() : win.maximize()
    return
  }

  if (action === 'close') {
    win.close()
    return
  }
}
