import { API_URL, timeout } from '@/constants/api.constants';
import localStorageDb from '@/utils/localStorageDB.utils';
import axios from 'axios';

const getAuthToken = () => localStorageDb.get('token');
const httpClient = axios.create({
  baseURL: API_URL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authInterceptor = (config) => {
  const localConfig = config;
  const token = getAuthToken();

  if (token) {
    localConfig.headers.Authorization = `Bearer ${getAuthToken()}`;
  } else {
    delete localConfig.headers.Authorization;
  }

  return localConfig;
};

const responseInterceptor = (response) => response.data;

const errorInterceptor = async (error) => {
  // TODO: проверить статус при ошибках
  switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message);
      window.vm.$notify.error({
        title: `Error: ${error.response.status}`,
        message: window.vm.$t('messages.somethingWrongText'),
      });
      break;

    case 401:
      window.vm.$notify.error({
        title: window.vm.$t('messages.unauthorizedTitle'),
        message: window.vm.$t('messages.unauthorizedText'),
      });
      await window.vm.$store.dispatch('auth/logout');
      break;

    default:
      console.error(error.response.status, error.message);
      window.vm.$notify.error({
        title: `Error: ${error.response.status}`,
        message: window.vm.$t('messages.somethingWrongText'),
      });
  }

  return Promise.reject(error);
};

httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
