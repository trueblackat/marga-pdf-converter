<template>
  <section class="page-my-files container">
    <h1 class="page-my-files__title title">
      Мои файлы
    </h1>

    <file-processing-mode-selector
      class="page-my-files__file-processing-mode-selector"
      is-small
    />

    <document-list />
  </section>
</template>

<script>
import FileProcessingModeSelector from '@/components/FileProcessingModeSelector.vue';
import DocumentList from '@/components/profile/DocumentList.vue';

export default {
  name: 'Profile',

  components: { FileProcessingModeSelector, DocumentList },
};
</script>

<style lang="scss">
.page-my-files {
  &__title {
    text-align: center;
  }

  &__title,
  &__file-processing-mode-selector {
    margin-bottom: 40px;
  }
}
</style>
