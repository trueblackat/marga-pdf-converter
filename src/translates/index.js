import localStorageDb from '@/utils/localStorageDB.utils';
import dayjs from 'dayjs';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en';
import ru from './ru';

Vue.use(VueI18n);

export const fallbackLocaleCode = 'en';

export const languages = [
  {
    code: 'ru',
    label: 'Русский',
  },
  {
    code: 'en',
    label: 'English',
  },
];

const startupLocaleCode = localStorageDb.get('locale')?.code || fallbackLocaleCode;

dayjs.locale(startupLocaleCode);

export default new VueI18n({
  locale: startupLocaleCode,
  messages: { en, ru },
});
