export const APP_NAME = 'PDFEditor';

export const documentFormats = {
  pdf: {
    label: 'pdf',
    code: 1,
  },
  docx: {
    label: 'docx',
    code: 2,
  },
  doc: {
    label: 'doc',
    code: 3,
  },
  xlsx: {
    label: 'xlsx',
    code: 4,
  },
  xls: {
    label: 'xls',
    code: 5,
  },
  jpeg: {
    label: 'jpeg',
    code: 6,
  },
  png: {
    label: 'png',
    code: 7,
  },
  getCodeByKey(findingType) {
    return this[findingType]?.code;
  },
};

export const documentTypes = {
  loaded: {
    label: 'loaded',
    code: 0,
  },
  created: {
    label: 'created',
    code: 1,
  },
  getCodeByKey(findingType) {
    return this[findingType]?.code;
  },
};

export const documentStatuses = {
  processed: {
    label: 'processed',
    code: 0,
  },
  downloadable: {
    label: 'downloadable',
    code: 1,
  },
  archived: {
    label: 'archived',
    code: 2,
  },
  getCodeByKey(findingType) {
    return this[findingType]?.code;
  },
};

export const DOCUMENT_PREVIEWS_PER_PAGE = 20;

export const SOCIALS = [
  // {
  //   code: 'instagram',
  //   label: 'Instagram',
  //   url: '#',
  // },
  {
    code: 'telegram',
    label: 'Telegram',
    url: '#',
  },
  // {
  //   code: 'facebook',
  //   label: 'Facebook',
  //   url: '#',
  // },
  {
    code: 'github',
    label: 'Github',
    url: '#',
  },
];
