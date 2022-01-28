import httpClient from '@/api/httpClient';
import { booleanToNumber } from '@/utils/api.utils';
import { documentStatuses, documentTypes, documentFormats } from '@/constants/base.constants';

/*
  Список запросов
  Swagger - http://18.191.201.80/api/swagger/
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
 * @return {Promise} - массив документов
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
}) => {
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

const create = () => httpClient.get('/documents');

export default {
  getList,
  create,
};
