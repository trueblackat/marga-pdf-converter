<template>
  <div
    class="file-uploader-block"
    @click="openFileDialog"
  >
    <svg-icon name="plus-light" />

    <file-uploader-input-element ref="input" />
  </div>
</template>

<script>
import FileUploaderInputElement from '@/components/uploaders/FileUploaderInputElement.vue';

export default {
  name: 'FileUploaderBlock',

  components: { FileUploaderInputElement },

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
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 2px dashed $color-theme;
  background: $color-theme-hover-light;
  border-radius: $base-border-radius;
  color: $color-theme;

  .svg-icon {
    width: 34px;
    height: 34px;
  }
}
</style>
