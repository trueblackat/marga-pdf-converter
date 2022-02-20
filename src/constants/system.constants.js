export const FILE_PROCESSING_MODES_TYPES = {
  convert: 'convert',
  merge: 'merge',
  divide: 'divide',
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
  [FILE_PROCESSING_MODES_TYPES.divide]: {
    code: FILE_PROCESSING_MODES_TYPES.divide,
    title: 'Разделить файл',
    subTitle: 'из одного .PDF в два или больше',
    caption: 'Выберите файл для разделения',
    icon: 'divide-pdf',
  },
};
