import api from '@/api';
import { getEncodedFiles, getMappedFiles, waitFileReady } from '@/utils/files.utils';

export default {
  namespaced: true,

  state: () => ({
    files: [],
    loading: false,
    convertQueue: [],
  }),

  mutations: {
    SET_FILES(state, files) {
      state.files = files;
    },
    SET_CONVERT_QUEUE(state, files) {
      state.convertQueue = files;
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
     * @return {Promise<array>} - массив загруженных файлов
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

        // TODO: обновить статистику юзера

        commit('SET_FILES', [...state.files, ...mappedFiles]);

        return Promise.resolve(mappedFiles);
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
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

    async splitDocument({ commit, state }, { fileId, pages }) {
      try {
        commit('SET_LOADING', true);

        const newDocument = await api.documents.splitItem(fileId, pages);

        // Периодически спрашивать сервер "а не загрузились ли файлы?"
        const readyToShowFiles = await waitFileReady([newDocument.id]);
        const mappedFiles = getMappedFiles(readyToShowFiles);

        // TODO: обновить статистику юзера

        commit('SET_FILES', [...state.files, ...mappedFiles]);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    addToConvertQueue({ commit, state }, fileId) {
      const fileToAdd = state.files.find((item) => item.id === fileId);
      const newQueue = [...state.convertQueue, fileToAdd];

      commit('SET_CONVERT_QUEUE', newQueue);
    },

    removeFromConvertQueue({ commit, state }, fileId) {
      const filteredQueue = state.convertQueue.filter((item) => item.id !== fileId);

      commit('SET_CONVERT_QUEUE', filteredQueue);
    },

    clearConvertQueue({ commit }) {
      commit('SET_CONVERT_QUEUE', []);
    },

    async convertAllInQueue({ state, commit }, isMergeMode = false) {
      try {
        commit('SET_LOADING', false);

        const convertIds = state.convertQueue.map((item) => item.id);
        let result = [];

        if (isMergeMode) {
          const mergedFile = await api.documents.mergeItems(convertIds);
          const readyToShowFiles = await waitFileReady([mergedFile.id]);
          result = getMappedFiles(readyToShowFiles);
        } else {
          const convertPromises = convertIds.map((id) => api.documents.convertItem(id));
          const convertedFiles = await Promise.all(convertPromises);
          const convertedIds = convertedFiles.map((item) => item.id);
          const readyToShowFiles = await waitFileReady(convertedIds);
          result = getMappedFiles(readyToShowFiles);
        }

        // TODO: обновить статистику юзера

        commit('SET_FILES', [...state.files, ...result]);

        return Promise.resolve(result);
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },

  getters: {
    sortedFiles: (state) => state.files.sort((a, b) => b.timestamp - a.timestamp),
  },
};
