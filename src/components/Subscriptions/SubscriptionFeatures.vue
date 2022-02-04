<template>
  <div class="features">
    <div
      v-for="feature in features"
      :key="`feature-${feature}`"
      class="features__item"
    >
      <img
        src="@/assets/images/check.svg"
        alt="check"
      >

      <span>{{ feature }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SubscriptionFeatures',
  props: {
    features: {
      type: Array,
      required: true,
      validator: (value) => !!value.length,
    },
  },
};
</script>

<style lang="scss">
.features {
  &__item {
    font-size: $base-font-size;
    line-height: 22px;
    display: flex;
    align-items: flex-start;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    img {
      opacity: 0.42;
      margin-right: 8px;
    }
  }
}

</style>
