<template>
  <div
    :class="[
      'file-uploader-block',
      { 'file-uploader-block--is-title-showed': isTitleShowed },
    ]"
    @click="openFileDialog"
  >
    <svg-icon name="plus-light" />

    <div
      v-if="isTitleShowed && title"
      class="file-uploader-block__title"
    >
      {{ title }}
    </div>

    <file-uploader-input-element
      ref="input"
      @uploaded="$emit('uploaded', $event)"
    />
  </div>
</template>

<script>
import FileUploaderInputElement from '@/components/uploaders/FileUploaderInputElement.vue';

export default {
  name: 'FileUploaderBlock',

  components: { FileUploaderInputElement },

  props: {
    title: {
      type: String,
      default: '',
    },

    isTitleShowed: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    openFileDialog() {
      this.$refs.input.click();
    },
  },
};
</script>

<style lang="scss">
.file-uploader-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 2px dashed $color-theme;
  background: $color-theme-hover-light;
  border-radius: $base-border-radius;
  color: $color-theme;
  cursor: pointer;

  &__title {
    font-weight: 500;
    font-size: 143%;
    line-height: 175%;
    margin-top: 7.5%;
  }

  .svg-icon {
    width: 34px;
    height: 34px;
  }

  &--is-title-showed {
    .svg-icon {
      width: 18%;
      height: 13%;
    }
  }
}
</style>
