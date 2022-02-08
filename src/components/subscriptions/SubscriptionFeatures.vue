<template>
  <transition-group
    class="subscription-features"
    name="list"
    tag="div"
  >
    <div
      v-for="feature in features"
      :key="`feature-${feature}`"
      class="subscription-features-item"
    >
      <svg-icon
        class="subscription-features-item__icon"
        name="check"
      />

      <span class="subscription-features-item__name">{{ feature }}</span>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'SubscriptionFeatures',

  props: {
    features: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.subscription-features-item {
  font-size: $base-font-size;
  line-height: 22px;
  display: flex;
  align-items: flex-start;
  transition: $base-animation;

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
