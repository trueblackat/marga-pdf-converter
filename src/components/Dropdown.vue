<template>
  <transition name="fade">
    <div
      v-if="isShowed"
      :class="[
        'dropdown',
        `dropdown--${bounding}`,
      ]"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dropdown',

  model: {
    prop: 'isShowed',
    event: 'change',
  },

  props: {
    isShowed: {
      type: Boolean,
      required: true,
    },

    bounding: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value),
    },
  },
};
</script>

<style lang="scss">
.dropdown {
  position: absolute;
  top: calc(100% + 10px);
  border-radius: $base-border-radius;
  box-shadow: $base-shadow;
  padding: 15px 20px;
  background: $c-white;
  white-space: nowrap;

  .text-button {
    display: block;
    padding: 0;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &--left {
    left: 0;
  }

  &--right {
    right: 0;
  }
}
</style>
