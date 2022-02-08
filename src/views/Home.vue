<template>
  <div class="home-page container">
    <file-uploader class="home-page__uploader" />

    <uploader-features class="home-page__features" />
  </div>
</template>

<script>
import FileUploader from '@/components/home/FileUploader.vue';
import UploaderFeatures from '@/components/home/UploaderFeatures.vue';

export default {
  name: 'HomePage',

  components: { UploaderFeatures, FileUploader },
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
