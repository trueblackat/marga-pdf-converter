<template>
  <div class="features">
    <div
      v-for="feature in features"
      :key="`feature-${feature}`"
      class="features-item"
    >
      <svg-icon
        class="features-item__icon"
        name="check"
      />

      <span class="features-item__name">{{ feature }}</span>
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
.features-item {
  font-size: $base-font-size;
  line-height: 22px;
  display: flex;
  align-items: flex-start;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &__icon {
    margin-right: 8px;
    flex-shrink: 0;
    color: $color-theme;
  }
}

</style>
