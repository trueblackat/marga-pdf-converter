<template>
  <div class="home-page">
    <the-header />
    <file-uploader />
  </div>
</template>

<script>
import FileUploader from '@/components/FileUploader.vue';
import TheHeader from '@/components/the/TheHeader.vue';

export default {
  name: 'HomePage',

  components: { TheHeader, FileUploader },
};
</script>
