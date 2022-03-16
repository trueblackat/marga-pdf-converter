const subscriptionsMock = [
  {
    id: 1,
    title: 'на 1 месяц', // 1 month premium subscription
    features: [
      'Единый аккаунт для всех ваших устройств',
      'Хранилище файлов',
      'Выгрузка неограниченного количества файлов в день',
    ],
    price: '4,99$/month',
    priceCaption: '',
    priceDiscount: '',
    isHot: false,
    stripeId: 'price_1Kdd32EXuMQd7RgJKWKi7Yo3',
  },
  {
    id: 2,
    title: 'на 3 месяца', // 3 months premium subscription
    features: [
      'Единый аккаунт для всех ваших устройств',
      'Хранилище файлов',
      'Выгрузка неограниченного количества файлов в день',
    ],
    price: '4,99$/month',
    priceCaption: '13,65$ за 3 месяца',
    priceDiscount: '',
    isHot: false,
    stripeId: 'price_1KddtXEXuMQd7RgJnR3s3cCB',
  },
  {
    id: 3,
    title: 'на год', // 1 year premium subscription
    features: [
      'Единый аккаунт для всех ваших устройств',
      'Хранилище файлов',
      'Выгрузка неограниченного количества файлов в день',
    ],
    price: '3,99$/month',
    priceCaption: '48$ за 1 год ',
    priceDiscount: '-25%',
    isHot: true,
    stripeId: 'price_1KddwhEXuMQd7RgJyhz9fwjy',
  },
];

export default {
  namespaced: true,

  state: () => ({
    subscriptions: Object.freeze(subscriptionsMock),
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
