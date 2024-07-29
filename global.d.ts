interface Config {
  API_URL: string;
  IS_MOVIE: boolean;
  TYPE_READER: string;
}

interface Window {
  config: {
    loadConfig: () => Promise<Config>;
  };

  electron: {
    getResourcePath: (relativePath: string) => string;
  };
}