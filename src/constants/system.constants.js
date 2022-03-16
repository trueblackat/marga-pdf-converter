import i18n from '@/translates';

export const FILE_PROCESSING_MODES_TYPES = {
  convert: 'convert',
  merge: 'merge',
  split: 'divide',
};

export const FILE_PROCESSING_MODES = {
  [FILE_PROCESSING_MODES_TYPES.convert]: {
    code: FILE_PROCESSING_MODES_TYPES.convert,
    title: i18n.t('modes.convert.title'),
    subTitle: i18n.t('modes.convert.subTitle'),
    caption: i18n.t('modes.convert.caption'),
    icon: 'convert-pdf',
  },
  [FILE_PROCESSING_MODES_TYPES.merge]: {
    code: FILE_PROCESSING_MODES_TYPES.merge,
    title: i18n.t('modes.merge.title'),
    subTitle: i18n.t('modes.merge.subTitle'),
    caption: i18n.t('modes.merge.caption'),
    icon: 'merge-pdf',
  },
  [FILE_PROCESSING_MODES_TYPES.split]: {
    code: FILE_PROCESSING_MODES_TYPES.split,
    title: i18n.t('modes.split.title'),
    subTitle: i18n.t('modes.split.subTitle'),
    caption: i18n.t('modes.split.caption'),
    icon: 'split-pdf',
  },
};

export const SERVER_GET_FILES_INTERVAL = 1000;

export const subscriptionsMock = [
  {
    id: 1,
    stripeId: 'price_1Kdd32EXuMQd7RgJKWKi7Yo3',
    title: i18n.t('subscriptionsData.one.title'), // 1 month premium subscription
    features: i18n.t('subscriptionsData.one.features', { returnObjects: true }),
    price: i18n.t('subscriptionsData.one.price'),
    priceCaption: i18n.t('subscriptionsData.one.priceCaption'),
    priceDiscount: i18n.t('subscriptionsData.one.priceDiscount'),
    isHot: false,
  },
  {
    id: 2,
    stripeId: 'price_1KddtXEXuMQd7RgJnR3s3cCB',
    title: i18n.t('subscriptionsData.three.title'), // 1 month premium subscription
    features: i18n.t('subscriptionsData.three.features', { returnObjects: true }),
    price: i18n.t('subscriptionsData.three.price'),
    priceCaption: i18n.t('subscriptionsData.three.priceCaption'),
    priceDiscount: i18n.t('subscriptionsData.three.priceDiscount'),
    isHot: false,
  },
  {
    id: 3,
    stripeId: 'price_1KddwhEXuMQd7RgJyhz9fwjy',
    title: i18n.t('subscriptionsData.year.title'), // 1 month premium subscription
    features: i18n.t('subscriptionsData.year.features', { returnObjects: true }),
    price: i18n.t('subscriptionsData.year.price'),
    priceCaption: i18n.t('subscriptionsData.year.priceCaption'),
    priceDiscount: i18n.t('subscriptionsData.year.priceDiscount'),
    isHot: true,
  },
];
