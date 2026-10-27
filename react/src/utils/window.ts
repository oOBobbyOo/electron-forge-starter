import { BrowserWindow, dialog, IpcMainInvokeEvent } from 'electron'

import { WindowAction } from '../types/WindowAction'

export function handleWindowAction(event: IpcMainInvokeEvent, action: string) {
  const win = BrowserWindow.fromWebContents(event.sender)

  if (!win) {
    dialog.showErrorBox('Window Error', 'No window found for the action.')
    return
  }

  if (action === WindowAction.MINIMIZE) {
    win.minimize()
    return
  }

  if (action === WindowAction.MAXIMIZE) {
    win.isMaximized() ? win.unmaximize() : win.maximize()
    return
  }

  if (action === WindowAction.CLOSE) {
    win.close()
    return
  }
}
