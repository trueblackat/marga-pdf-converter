<template>
  <div
    v-loading="loading"
    class="home-page container"
  >
    <file-uploader
      class="home-page__uploader"
      single-mode
      @uploading="loading = $event"
      @uploaded="onUpload"
    />

    <file-processing-mode-selector
      class="home-page__features"
    />
  </div>
</template>

<script>
import FileProcessingModeSelector from '@/components/FileProcessingModeSelector.vue';
import FileUploader from '@/components/uploaders/FileUploader.vue';
import { FILE_PROCESSING_MODES_TYPES } from '@/constants/system.constants';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'HomePage',

  components: { FileProcessingModeSelector, FileUploader },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState('system', ['fileProcessingMode']),
    ...mapGetters('system', ['selectedFileProcessingModeData']),
  },

  methods: {
    ...mapActions('files', ['addToConvertQueue']),

    onUpload(files = []) {
      const fileId = this.selectedFileProcessingModeData.multipleOnly
        ? files.map((item) => item.id)
        : files[0].id;

      if (this.selectedFileProcessingModeData.code === FILE_PROCESSING_MODES_TYPES.convert) {
        this.addToConvertQueue(fileId);
        this.$router.push({ name: 'ConvertDocuments' });
      }

      if (this.selectedFileProcessingModeData.code === FILE_PROCESSING_MODES_TYPES.merge) {
        // TODO: сделать режим merge
      }

      if (this.selectedFileProcessingModeData.code === FILE_PROCESSING_MODES_TYPES.split) {
        this.$router.push({ name: 'SplitDocument', params: { fileId } });
      }
    },
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
