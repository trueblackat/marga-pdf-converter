<template>
  <div class="subscriptions-page container">
    <h1 class="title page-title">
      {{ $t('subscriptions') }}
    </h1>

    <div class="subscriptions-page__inner">
      <subscription-item
        v-for="subscription in subscriptions"
        :key="`subscribe-${subscription.id}`"
        :title="subscription.title"
        :features="subscription.features"
        :price="subscription.price"
        :price-caption="subscription.priceCaption"
        :price-discount="subscription.priceDiscount"
        :is-hot="subscription.isHot"
        @select="onSubscribeSelect(subscription.id)"
      />
    </div>
  </div>
</template>

<script>
import SubscriptionItem from '@/components/subscriptions/SubscriptionItem.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Subscriptions',

  metaInfo() {
    return {
      titleTemplate: `%s - ${this.$t('pageNames.subscriptions')}`,
    };
  },

  components: {
    SubscriptionItem,
  },

  computed: {
    ...mapState('subscriptions', ['subscriptions']),
  },

  methods: {
    ...mapActions('subscriptions', ['setSelectedSubscriptionId']),

    onSubscribeSelect(id) {
      this.setSelectedSubscriptionId(id);
      this.$eventBus.$emit('show-paywall');
    },
  },
};
</script>

<style lang="scss">
.subscriptions-page {
  &__inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}
</style>
