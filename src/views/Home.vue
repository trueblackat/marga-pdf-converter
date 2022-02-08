<template>
  <div class="home-page container">
    <file-uploader class="home-page__uploader" />
  </div>
</template>

<script>
import FileUploader from '@/components/FileUploader.vue';

export default {
  name: 'HomePage',

  components: { FileUploader },
};
</script>

<style lang="scss">
.home-page {
  &__uploader {
    padding-top: $base-gap * 2;
    margin-bottom: 170px;
  }
}
</style>
