import api from '@/api';
import { getEncodedFiles, getMappedFiles } from '@/utils/files.utils';

export default {
  namespaced: true,

  state: () => ({
    files: [],
    loading: false,
  }),

  mutations: {
    SET_FILES(state, files) {
      state.files = files;
    },

    SET_LOADING(state, data) {
      state.loading = data;
    },
  },

  actions: {
    /**
     * Загрузка массива файлов
     * @param commit
     * @param state
     * @param files {File[]} - массив файлов
     * @return {Promise<void>}
     */
    async uploadFiles({ commit, state }, files) {
      const encodedFiles = await getEncodedFiles(files);
      const uploadPromises = encodedFiles.map((item) => api.documents.upload(item.name, item.body));

      try {
        commit('SET_LOADING', true);

        const uploadedFiles = await Promise.all(uploadPromises);
        const mappedFiles = getMappedFiles(uploadedFiles);

        commit('SET_FILES', [...state.files, ...mappedFiles]);

        console.info(`${uploadedFiles.length} файлов загружено!`);
      } catch (e) {
        console.log(e);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async getFiles({ commit }) {
      try {
        commit('SET_LOADING', true);

        const files = await api.documents.getList();
        const mappedFiles = getMappedFiles(files);

        commit('SET_FILES', mappedFiles);
      } catch (e) {
        console.log(e);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },

  getters: {
    sortedFiles: (state) => state.files.sort((a, b) => b.timestamp - a.timestamp),
  },
};
