<template>
  <div class="home-page">
    <file-uploader />
  </div>
</template>

<script>
import FileUploader from '@/components/FileUploader.vue';

export default {
  name: 'HomePage',

  components: { FileUploader },
};
</script>
