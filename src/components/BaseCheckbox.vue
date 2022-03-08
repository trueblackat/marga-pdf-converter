<template>
  <label
    :class="[
      'checkbox',
      { 'checkbox--is-disabled': isDisabled },
    ]"
  >
    <input
      v-model="localIsChecked"
      class="checkbox__element"
      type="checkbox"
      :disabled="isDisabled"
    >

    <span class="checkbox__icon">
      <svg-icon name="check-small" />
    </span>

    <span
      v-if="label"
      class="checkbox__label"
    >
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',

  model: {
    event: 'change',
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },

    label: {
      type: String,
      default: '',
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    localIsChecked: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('change', value);
      },
    },
  },
};
</script>

<style lang="scss">
.checkbox {
  $parent: &;

  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &__element {
    display: none;

    &:checked + #{$parent}__icon .svg-icon {
      opacity: 1;
    }
  }

  &__icon {
    width: 22px;
    height: 22px;
    border-radius: 5px;
    background: $color-theme;
    color: $c-white;
    padding: 3px;
    flex-shrink: 0;

    .svg-icon {
      opacity: 0;
      width: 100%;
      height: 100%;
      transition: opacity $base-animation;
    }
  }

  &__label {
    flex-shrink: 0;
    margin-left: 10px;
    font-size: 13px;
    line-height: 15px;
    white-space: nowrap;
  }

  &--is-disabled {
    cursor: not-allowed;

    #{$parent}__icon {
      background: $c-gray-5;
    }
  }
}
</style>
