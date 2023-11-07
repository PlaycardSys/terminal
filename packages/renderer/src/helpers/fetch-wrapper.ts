import {useSnackbarStore} from '/@/stores/components/snackbar.store';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};

function request(method: string) {
  return async (url: string, body?: Record<string, unknown>) => {
    const baseUrl = `${import.meta.env.VITE_API_URL}`;
    url = baseUrl + url;

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, requestOptions);

    if (response?.ok) {
      return await handleResponse(response);
    } else {
      const snackbarStore = useSnackbarStore();
      snackbarStore.error(`Desculpe, ocorreu um erro !\nTente novamente (cod ${response?.status})`);
      return [];
    }
  };
}

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  return data;
}
