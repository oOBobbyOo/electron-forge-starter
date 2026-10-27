/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
declare module '*.css';

export interface IElectronAPI {
  windowAction: (action: string) => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
