<template>
  <div
    v-loading="loading"
    class="home-page container"
  >
    <file-uploader class="home-page__uploader" />

    <file-processing-mode-selector
      class="home-page__features"
      @uploading="loading = $event"
    />
  </div>
</template>

<script>
import FileProcessingModeSelector from '@/components/FileProcessingModeSelector.vue';
import FileUploader from '@/components/uploaders/FileUploader.vue';

export default {
  name: 'HomePage',

  components: { FileProcessingModeSelector, FileUploader },

  data() {
    return {
      loading: false,
    };
  },
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
