/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
declare module '*.css';

import { WindowAction } from './types/WindowAction'

export interface IElectronAPI {
  windowAction: (action: WindowAction) => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
