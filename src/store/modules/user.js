import api from '@/api';
import dayjs from 'dayjs';

export default {
  namespaced: true,

  state: () => ({
    user: {},
    loading: false,
  }),

  mutations: {
    SET_USER(state, userData) {
      state.user = userData;
    },

    CLEAR_USER(state) {
      state.user = {};
    },

    SET_LOADING(state, data) {
      state.loading = data;
    },
  },

  actions: {
    async getCurrentUserInfo({ commit }) {
      try {
        commit('SET_LOADING', true);

        const user = await api.auth.getCurrentUserInfo();

        if (user) {
          commit('SET_USER', user);
          commit('SET_LOADING', false);
        }
      } catch (error) {
        commit('SET_LOADING', false);
        console.error(error);
      }
    },

    clearUser({ commit }) {
      commit('CLEAR_USER');
    },

    setUser({ commit }, userData) {
      commit('SET_USER', userData);
    },
  },

  getters: {
    isUserInfoExited: (state) => !!Object.keys(state.user).length,

    userCurrentSubscribe: (state) => {
      if (!!state.user.tariff && dayjs(state.user.tariff_finished).isValid()) {
        return {
          dayUntil: dayjs(state.user.tariff_finished).format('D'),
          monthUntil: dayjs(state.user.tariff_finished).format('MMMM'),
        };
      }

      return false;
    },
  },
};
