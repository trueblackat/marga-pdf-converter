export const FILE_PROCESSING_MODES_TYPES = {
  convert: 'convert',
  merge: 'merge',
  split: 'divide',
};

export const FILE_PROCESSING_MODES = {
  [FILE_PROCESSING_MODES_TYPES.convert]: {
    code: FILE_PROCESSING_MODES_TYPES.convert,
    title: 'Конвертировать файл',
    subTitle: 'из .DOC, .DOCX, .JPG или .EXEL в .PDF',
    caption: 'Выберите файл для конвертирования',
    icon: 'convert-pdf',
  },
  [FILE_PROCESSING_MODES_TYPES.merge]: {
    code: FILE_PROCESSING_MODES_TYPES.merge,
    title: 'Объединить файлы',
    subTitle: 'из нескольких .PDF в один',
    caption: 'Выберите файл для объединения',
    icon: 'merge-pdf',
  },
  [FILE_PROCESSING_MODES_TYPES.split]: {
    code: FILE_PROCESSING_MODES_TYPES.split,
    title: 'Разделить файл',
    subTitle: 'из одного .PDF в два или больше',
    caption: 'Выберите файл для разделения',
    icon: 'split-pdf',
  },
};

export const SERVER_GET_FILES_INTERVAL = 1000;
