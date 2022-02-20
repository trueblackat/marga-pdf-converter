import { FILE_PROCESSING_MODES, FILE_PROCESSING_MODES_TYPES } from '@/constants/system.constants';

export default {
  namespaced: true,

  state: () => ({
    fileProcessingMode: FILE_PROCESSING_MODES_TYPES.convert,
    loading: false,
  }),

  mutations: {
    SET_FILE_PROCESSING_MODE(state, mode) {
      state.fileProcessingMode = mode;
    },

    SET_LOADING(state, data) {
      state.loading = data;
    },
  },

  actions: {
    setFileProcessingMode({ commit }, mode) {
      commit('SET_FILE_PROCESSING_MODE', mode);
    },
  },

  getters: {
    selectedFileProcessingModeData: (state) => FILE_PROCESSING_MODES[state.fileProcessingMode],
  },
};
