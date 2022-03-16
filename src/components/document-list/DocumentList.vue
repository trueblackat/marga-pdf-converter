<template>
  <section
    v-loading="loading"
    class="document-list"
  >
    <document
      class="document-list__add-file"
      :size="$t('documents.maxSize')"
      :name="$t('actions.addFile')"
      :date="$t('today')"
      :is-clickable="false"
    >
      <file-uploader-block />
    </document>

    <document
      v-for="file in sortedFiles"
      :id="file.id"
      :key="`file-${file.id}`"
      :name="file.name"
      :link="file.link"
      :date="file.date"
      :preview-link="file.previewLink"
      :size="file.size"
      :pages-count="file.pagesCount"
      @document-click="onDocumentClick(file.id, $event)"
    />
  </section>
</template>

<script>
import Document from '@/components/document-list/Document.vue';
import FileUploaderBlock from '@/components/uploaders/FileUploaderBlock.vue';
import { FILE_PROCESSING_MODES_TYPES } from '@/constants/system.constants';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'DocumentList',

  components: { FileUploaderBlock, Document },

  computed: {
    ...mapGetters('files', ['sortedFiles']),
    ...mapState('files', ['loading']),
    ...mapState('system', ['fileProcessingMode']),
  },

  methods: {
    ...mapActions('files', ['deleteFile', 'addToConvertQueue']),

    onDocumentClick(fileId, { canSplit, canConvert }) {
      if (canConvert && this.fileProcessingMode === FILE_PROCESSING_MODES_TYPES.convert) {
        this.addToConvertQueue(fileId);
        this.$router.push({ name: 'ConvertDocuments' });
      }

      if (canSplit && this.fileProcessingMode === FILE_PROCESSING_MODES_TYPES.split) {
        this.$router.push({ name: 'SplitDocument', params: { fileId } });
      }
    },

    deleteAll() {
      this.sortedFiles.forEach((item) => {
        this.deleteFile(item.id);
      });
    },
  },
};
</script>

<style lang="scss">
.document-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 165px);
  gap: 30px;
  align-items: start;

  &__add-file {
    .document__name {
      color: $color-theme;
    }
  }
}
</style>
