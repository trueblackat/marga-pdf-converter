<template>
  <div
    class="scale-slider"
  >
    <button
      class="scale-slider__button"
      :title="$t('actions.scaleDown')"
      @click="minus"
    >
      <svg-icon name="minus-bold" />
    </button>

    <input
      v-model.number="value"
      type="range"
      class="scale-slider__element"
      :title="$t('actions.scaleSet')"
      :min="min"
      :step="step"
      :max="max"
    >

    <button
      class="scale-slider__button"
      :title="$t('actions.scaleUp')"
      @click="plus"
    >
      <svg-icon
        name="plus-bold"
      />
    </button>
  </div>
</template>
<script>

export default {
  name: 'ScaleSlider',

  props: {
    step: {
      type: Number,
      default: 0.1, // 10/100
    },

    min: {
      type: Number,
      default: 0.5,
    },

    max: {
      type: Number,
      default: 1.5,
    },
  },

  data() {
    return {
      value: 1,
    };
  },

  watch: {
    value: {
      immediate: true,

      handler(value) {
        document.documentElement.style.setProperty('--document-page-width', `${170 * value}px`);
        document.documentElement.style.setProperty('--document-page-width-wide', `${270 * value}px`);
      },
    },
  },

  methods: {
    minus() {
      if (this.value > this.min) {
        this.value -= this.step;
      }
    },

    plus() {
      if (this.value < this.max) {
        this.value += this.step;
      }
    },
  },
};
</script>

<style lang="scss">
.scale-slider {
  display: flex;
  align-items: center;

  &__button {
    width: 12px;
    height: 12px;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: $c-gray-5;

    .svg-icon {
      width: 100%;
      height: 100%;
    }
  }

  &__element {
    appearance: none;
    margin: 0 10px;
    width: 94px;

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: $c-gray-7;
      border-radius: 1px;
    }

    &::-webkit-slider-thumb {
      box-shadow: $base-shadow-small;
      height: 20px;
      width: 20px;
      border-radius: 10px;
      background: $c-white;
      cursor: pointer;
      appearance: none;
      margin-top: -9px;
    }

    &:focus {
      &::-webkit-slider-runnable-track,
      &::-ms-fill-lower,
      &::-ms-fill-upper {
        background: $c-gray-7;
      }
    }

    &::-moz-range-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: $c-gray-7;
      border-radius: 1px;
    }

    &::-moz-range-thumb {
      box-shadow: $base-shadow-small;
      height: 20px;
      width: 20px;
      border-radius: 10px;
      background: $c-white;
      cursor: pointer;
    }

    &::-ms-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    &::-ms-fill-lower,
    &::-ms-fill-upper {
      background: $c-gray-7;
      border-radius: 2px;
    }

    &::-ms-thumb {
      margin-top: 1px;
      box-shadow: $base-shadow-small;
      height: 20px;
      width: 20px;
      border-radius: 10px;
      background: $c-white;
      cursor: pointer;
    }
  }

}
</style>
