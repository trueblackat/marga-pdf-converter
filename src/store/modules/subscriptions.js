import { SUBSCRIPTIONS_MOCK } from '@/constants/system.constants';

export default {
  namespaced: true,

  state: () => ({
    subscriptions: Object.freeze(SUBSCRIPTIONS_MOCK),
    selectedSubscriptionId: 3,
  }),

  mutations: {
    SET_SUBSCRIPTIONS(state, subscriptions) {
      state.subscriptions = subscriptions;
    },

    SET_SELECTED_SUBSCRIPTION_ID(state, id) {
      state.selectedSubscriptionId = id;
    },
  },

  actions: {
    setSelectedSubscriptionId({ commit }, id) {
      commit('SET_SELECTED_SUBSCRIPTION_ID', id);
    },
  },

  getters: {
    getSelectedSubscription: (state) => state.subscriptions
      .find((item) => item.id === state.selectedSubscriptionId),
  },
};
