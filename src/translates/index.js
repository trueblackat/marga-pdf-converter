import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en';
import ru from './ru';

Vue.use(VueI18n);

export const languages = [
  {
    code: 'en',
    label: 'English',
  },
  {
    code: 'ru',
    label: 'Русский',
  },
];

export default new VueI18n({
  locale: 'ru',
  messages: { en, ru },
});
