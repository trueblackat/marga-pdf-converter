import api from '@/api';
import { getEncodedFiles, getMappedFiles, waitFileReady } from '@/utils/files.utils';

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
      const uploadPromises = encodedFiles
        .map((item) => api.documents.uploadItem(item.name, item.body));

      try {
        commit('SET_LOADING', true);

        const uploadedFiles = await Promise.all(uploadPromises);
        const uploadFilesIds = uploadedFiles.map((item) => item.id);

        // Периодически спрашивать сервер "а не загрузились ли файлы?"
        const readyToShowFiles = await waitFileReady(uploadFilesIds);
        const mappedFiles = getMappedFiles(readyToShowFiles);

        commit('SET_FILES', [...state.files, ...mappedFiles]);
      } catch (e) {
        console.error(e);
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
        console.error(e);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async deleteFile({ commit, state }, id) {
      try {
        await api.documents.deleteItem(id);

        const filteredFiles = state.files.filter((item) => item.id !== id);

        commit('SET_FILES', filteredFiles);
      } catch (e) {
        console.error(e);
      }
    },
  },

  getters: {
    sortedFiles: (state) => state.files.sort((a, b) => b.timestamp - a.timestamp),
  },
};
