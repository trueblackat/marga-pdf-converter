<template>
  <section class="file-processing-mode-selector">
    <div
      v-for="type in $options.FILE_PROCESSING_MODES"
      :key="`type-${type.code}`"
      :class="[
        'file-processing-mode-selector__item',
        { 'file-processing-mode-selector__item--selected': type.code === fileProcessingMode },
      ]"
      @click="setFileProcessingMode(type.code)"
    >
      <svg-icon :name="type.icon" />

      <div class="text">
        <span>{{ type.title }}</span>

        <span>{{ type.subTitle }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { FILE_PROCESSING_MODES } from '@/constants/system.constants';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'FileProcessingModeSelector',

  FILE_PROCESSING_MODES,

  computed: {
    ...mapState('system', ['fileProcessingMode']),
  },

  methods: {
    ...mapActions('system', ['setFileProcessingMode']),
  },
};
</script>

<style lang="scss">
.file-processing-mode-selector {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;

  &__item {
    display: flex;
    align-items: center;
    border: 1px solid $color-theme;
    border-radius: $base-border-radius;
    padding: 25px;
    cursor: pointer;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: $base-animation-time;
    transition-timing-function: $base-animation-function;

    .svg-icon {
      width: 86px;
      height: 86px;
      flex-shrink: 0;
    }

    .text {
      padding-left: 20px;

      span {
        display: block;

        &:first-child {
          font-weight: 500;
          font-size: 15px;
          line-height: 17px;
          margin-bottom: 15px;
        }

        &:last-child {
          font-size: 13px;
          line-height: 19px;
        }
      }
    }

    &--selected {
      background-color: $c-white !important;
      box-shadow: $base-shadow;
      border-color: $c-white;
    }

    &:hover {
      background-color: $color-theme-hover-light;
    }
  }
}
</style>
