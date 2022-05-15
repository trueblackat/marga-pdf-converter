import { FILE_PROCESSING_MODES, FILE_PROCESSING_MODES_TYPES } from '@/constants/system.constants';
import { fallbackLocaleCode, languages } from '@/translates';
import localStorageDb from '@/utils/localStorageDB.utils';
import { cloneDeep } from 'lodash';

export default {
  namespaced: true,

  state: () => ({
    fileProcessingMode: FILE_PROCESSING_MODES_TYPES.convert,
    locale: localStorageDb.get('locale') || cloneDeep(languages
      .find((item) => item.code === fallbackLocaleCode)),
    loading: false,
  }),

  mutations: {
    SET_FILE_PROCESSING_MODE(state, mode) {
      state.fileProcessingMode = mode;
    },

    SET_LOCALE(state, locale) {
      state.locale = locale;
      localStorageDb.put('locale', locale);
      // reload page
      window.vm.$router.go();
    },

    SET_LOADING(state, data) {
      state.loading = data;
    },
  },

  actions: {
    setFileProcessingMode({ commit }, mode) {
      commit('SET_FILE_PROCESSING_MODE', mode);
    },

    setLocale({ commit, state }, langCode) {
      if (state.locale.code === langCode) return;

      const newLocale = languages.find((item) => item.code === langCode);

      commit('SET_LOCALE', newLocale);
    },
  },

  getters: {
    selectedFileProcessingModeData: (state) => FILE_PROCESSING_MODES[state.fileProcessingMode],
  },
};
