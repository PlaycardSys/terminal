import { ipcMain } from "electron";
import path from "path";
import { promises as fs } from 'fs';

interface Config {
  API_URL: string;
  IS_MOVIE: boolean;
  TYPE_READER: string;
}

function getResourcePath() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === "production"
        ? process.resourcesPath // Live Mode
        : __dirname; // Development Mode
}

export function handleGetResourcePath() {
  ipcMain.handle("get-resource-path", (e, relativePath) => {
    return path.join(getResourcePath(), relativePath);
  });
}

export function handleLoadConfig() {
    ipcMain.handle("get-config-app", async (): Promise<Config> => {
        const configPath = path.join(getResourcePath(), 'json/config.json');
        const data = await fs.readFile(configPath, "utf-8");
        return JSON.parse(data) as Config;
    });
}
