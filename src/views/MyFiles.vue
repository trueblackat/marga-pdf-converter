<template>
  <section class="page-my-files container">
    <h1 class="page-my-files__title title">
      {{ $t('myFiles') }}
    </h1>

    <file-processing-mode-selector
      class="page-my-files__file-processing-mode-selector"
      is-small
    />

    <document-list />
  </section>
</template>

<script>
import DocumentList from '@/components/document-list/DocumentList.vue';
import FileProcessingModeSelector from '@/components/FileProcessingModeSelector.vue';

export default {
  name: 'MyFiles',

  metaInfo() {
    return {
      titleTemplate: `%s - ${this.$t('pageNames.myFiles')}`,
    };
  },

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
