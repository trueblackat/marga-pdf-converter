<template>
  <div class="subscriptions-page">
    <h1 class="subscriptions-page__title title">
      Подписки
    </h1>

    <div class="subscriptions-page__inner container">
      <subscribe-item
        v-for="subscribe in subscribes"
        :key="`subscribe-${subscribe.id}`"
        :title="subscribe.title"
        :features="subscribe.features"
        :price="subscribe.price"
        :price-caption="subscribe.priceCaption"
        :price-discount="subscribe.priceDiscount"
        :is-hot="subscribe.isHot"
        @select="onSubscribeSelect(subscribe.id)"
      />
    </div>
  </div>
</template>

<script>
import SubscribeItem from '@/components/SubscribeItem.vue';

const subscribes = [
  {
    id: 1,
    title: 'на 1 месяц',
    features: [
      'Единый аккаунт для всех ваших устройств',
    ],
    price: '4,99$/month',
    priceCaption: '',
    priceDiscount: '',
    isHot: false,
  },
  {
    id: 2,
    title: 'на 3 месяца',
    features: [
      'Единый аккаунт для всех ваших устройств',
      'Хранилище файлов',
    ],
    price: '4,55$/month',
    priceCaption: '13,65$ за 3 месяца',
    priceDiscount: '',
    isHot: false,
  },
  {
    id: 3,
    title: 'на год',
    features: [
      'Единый аккаунт для всех ваших устройств',
      'Хранилище файлов',
      'Редактирование неограниченное количества файлов в день',
    ],
    price: '4$/month',
    priceCaption: '48$ за 1 год ',
    priceDiscount: '-25%',
    isHot: true,
  },
];

export default {
  name: 'SubscriptionsPage',

  components: {
    SubscribeItem,
  },

  data() {
    return {
      subscribes: Object.freeze(subscribes),
    };
  },

  methods: {
    onSubscribeSelect(subscribeId) {
      console.log(subscribeId);
    },
  },
};
</script>

<style lang="scss">
.subscriptions-page {
  &__title {
    text-align: center;
    margin-bottom: $base-gap * 2;
  }

  &__inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}
</style>
