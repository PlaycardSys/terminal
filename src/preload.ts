// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('config', {
    loadConfig: () => ipcRenderer.invoke('get-config-app'),
});

contextBridge.exposeInMainWorld('electron', {
    getResourcePath: (relativePath: string) => ipcRenderer.invoke('get-resource-path', relativePath),
});