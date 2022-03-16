import { SUBSCRIPTIONS_MOCK } from '@/constants/system.constants';

export default {
  namespaced: true,

  state: () => ({
    subscriptions: Object.freeze(SUBSCRIPTIONS_MOCK),
    selectedSubscriptionId: 3,
    loading: false,
  }),

  mutations: {
    SET_SUBSCRIPTIONS(state, subscriptions) {
      state.subscriptions = subscriptions;
    },

    SET_SELECTED_SUBSCRIPTION_ID(state, id) {
      state.selectedSubscriptionId = id;
    },

    SET_LOADING(state, data) {
      state.loading = data;
    },
  },

  actions: {
    setSubscriptions({ commit }, payload) {
      commit('SET_SUBSCRIPTIONS', payload);
    },

    setSelectedSubscriptionId({ commit }, id) {
      commit('SET_SELECTED_SUBSCRIPTION_ID', id);
    },
  },

  getters: {
    getSubscriptionById: (state) => (id) => state.subscriptions.find((item) => item.id === id),
    getSelectedSubscription: (state) => state.subscriptions
      .find((item) => item.id === state.selectedSubscriptionId),
  },
};
