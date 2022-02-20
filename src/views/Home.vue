<template>
  <div class="home-page container">
    <file-uploader class="home-page__uploader" />

    <file-processing-mode-selector class="home-page__features" />
  </div>
</template>

<script>
import FileProcessingModeSelector from '@/components/FileProcessingModeSelector.vue';
import FileUploader from '@/components/uploaders/FileUploader.vue';

export default {
  name: 'HomePage',

  components: { FileProcessingModeSelector, FileUploader },
};
</script>

<style lang="scss">
.home-page {
  display: flex;
  flex-direction: column;

  &__uploader {
    padding-top: $base-gap * 2;
    margin-bottom: 170px;
    flex-grow: 1;
  }

  &__features {
    flex-shrink: 0;
  }
}
</style>
