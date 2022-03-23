<template>
  <div class="stepper">
    <div
      v-for="(step, index) in steps"
      :key="`step-${step.id}`"
      :class="[
        'stepper-item',
        { 'stepper-item--is-current': step.id === currentStepId },
        { 'stepper-item--is-disabled': step.disabled }
      ]"
      @click="setStep(step)"
    >
      <div class="stepper-item__title">
        {{ $t('subscriptionsData.step') }} {{ index + 1 }}
      </div>

      <div class="stepper-item__label">
        {{ step.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stepper',

  model: {
    prop: 'currentStepId',
    event: 'change',
  },

  props: {
    currentStepId: {
      type: String,
      required: true,
    },

    steps: {
      type: Array,
      required: true,
    },
  },

  methods: {
    setStep(step) {
      if (!step.disabled && step.id !== this.currentStepId) {
        this.$emit('change', step.id);
      }
    },
  },
};
</script>

<style lang="scss">
.stepper {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid $c-gray-3;
  margin-bottom: 30px;
}

.stepper-item {
  $stepperItemClass: &;

  user-select: none;
  flex-grow: 1;
  cursor: pointer;

  &__title {
    font-weight: 500;
    margin-bottom: 3px;
    font-size: 11px;
    line-height: 13px;
    color: $color-theme;
  }

  &__label {
    font-size: 13px;
    line-height: 15px;
    color: $color-text;
  }

  &__title,
  &__label {
    transition: color $base-animation;
  }

  &--is-disabled {
    cursor: not-allowed;

    #{$stepperItemClass}__title,
    #{$stepperItemClass}__label {
      color: $c-gray-8;
    }
  }
}
</style>
