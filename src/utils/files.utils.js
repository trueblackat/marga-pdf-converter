import api from '@/api';
import { SERVER_GET_FILES_INTERVAL } from '@/constants/system.constants';
import humanFileSize from '@/utils/humanFileSize';
import { sleep } from '@/utils/misc.utils';
import dayjs from 'dayjs';
import capitalize from 'lodash/capitalize';
import pick from 'lodash/pick';

/**
 * Кодирование файла в base64
 * @param file {File} - файл в исходном формате
 * @return {Promise<string>} - файл в base64 без мета-составляющей
 */
const getFileAsBase64 = (file) => new Promise(((resolve, reject) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    resolve({ name: file.name, body: reader.result.split(',')[1] });
  };

  reader.onerror = (error) => {
    reject(error);
  };
}));

/**
 * Маппинг файлов
 * @param files {object[]} - файлы с сервера
 * @return {object[]} - замаппеные файлы
 */
export const getMappedFiles = (files) => files.map((item) => ({
  ...pick(item, ['id', 'name']),
  timestamp: dayjs(item.created).valueOf(),
  date: capitalize(dayjs(item.created).format('MMMM D, YYYY')),
  link: `${process.env.VUE_APP_API_HOST}${item.link.substring(1)}`,
  previewLink: `${process.env.VUE_APP_API_HOST}${item.preview_link.substring(1)}`,
  size: humanFileSize(item.size),
  pagesCount: item.num_pages,
}));

/**
 * Кодирование массива файлов в base64
 * @param files {File[]} - массив файлов
 * @return {Promise<string[]>} - массив кодированных файлов в виде "base64"
 */
export const getEncodedFiles = async (files) => {
  const fileEncodingPromises = Array.from(files).map((file) => getFileAsBase64(file));
  const encodedFiles = await Promise.all(fileEncodingPromises);

  return Promise.resolve(encodedFiles);
};

/**
 * Ожидание готовности файлов
 * @param ids {array} - массив id файлов
 * @return {Promise<array>} - массив загруженных файлов, готовыми к показу
 */
export const waitFileReady = async (ids) => {
  await sleep(SERVER_GET_FILES_INTERVAL);

  const promises = ids.map((id) => api.documents.getItem(id));
  const uploadedFilesInfo = await Promise.all(promises);

  const isReady = uploadedFilesInfo
    .every((item) => item.link_status === 1 && item.preview_status === 1);

  if (!isReady) {
    await waitFileReady(ids);
  }

  return Promise.resolve(uploadedFilesInfo);
};
