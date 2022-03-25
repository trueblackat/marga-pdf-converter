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
  pluralizationRules: {
    ru: (choice, choicesLength) => {
      if (choice === 0) {
        return 0;
      }

      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;

      if (choicesLength < 4) {
        return (!teen && endsWithOne) ? 1 : 2;
      }
      if (!teen && endsWithOne) {
        return 1;
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
      }

      return (choicesLength < 4) ? 2 : 3;
    },
  },
});
