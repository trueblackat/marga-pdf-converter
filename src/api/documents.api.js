import httpClient from '@/api/httpClient';
import { documentFormats, documentStatuses, documentTypes } from '@/constants/base.constants';
import { booleanToNumber } from '@/utils/api.utils';

/*
  Список запросов
  Swagger - https://pdf.marga.app/api/swagger/
*/

/**
 * Получение списка документов с учетов фильтров
 * @param ordering {string} - сортировка
 * @param id {string} - UUID документа
 * @param ownerId {string} - UUID пользователя
 * @param format {string} - формат документа (pdf, docx, doc, xlsx, xls, jpeg, png)
 * @param documentType {string} - тип документа (loaded, created)
 * @param status {string} - статус документа (processing, downloadable, archived)
 * @param name {string} - название файла
 * @param isBodyIncluded {boolean} - включить ли в выдачу тело документа?
 * @return {Promise<array>} - массив документов
 */
const getList = ({
  ordering,
  id,
  ownerId,
  format,
  documentType,
  status,
  name,
  isBodyIncluded,
} = {}) => {
  const params = {
    ordering, // TODO: узнать какие бывают сортировки
    id,
    owner_id: ownerId,
    format: documentFormats.getCodeByKey(format),
    document_type: documentTypes.getCodeByKey(documentType),
    status: documentStatuses.getCodeByKey(status),
    name,
    body: booleanToNumber(isBodyIncluded),
  };

  return httpClient.get('/documents', { params });
};

/**
 * Получение информации о документе по id
 * @param id {string} - id документа
 * @return {Promise<object>}
 */
const getItem = (id) => httpClient.get(`/documents/${id}`);

/**
 * Загрузка документа
 * @param name {string} - имя файла
 * @param body {string} - тело файла в base64
 * @return {Promise<object>} - созданный документ
 */
const uploadItem = (name, body) => httpClient.post('/documents/', { name, body });

/**
 * Удаление документа по id
 * @param id {string} - id документа
 * @return {Promise<any>}
 */
const deleteItem = (id) => httpClient.delete(`/documents/${id}`);

export default {
  getList,
  uploadItem,
  getItem,
  deleteItem,
};
