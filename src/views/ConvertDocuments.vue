<template>
  <div
    v-loading="loading"
    class="convert-document-page container"
  >
    <div class="convert-document-page__header">
      <ScaleSlider
        :min="0.7"
        :max="1.3"
      />

      <h1 class="title">
        {{ $t('actions.convertToPdf') }}
      </h1>

      <div class="convert-document-page__buttons">
        <base-checkbox
          v-model="isMergeMode"
          label="В один файл"
          :is-disabled="convertQueue.length <= 1"
        />

        <button
          class="button button--type-filled"
          @click="convertFiles"
        >
          {{ $t('actions.convert') }}
        </button>
      </div>
    </div>

    <div class="convert-document-page__body">
      <document-big
        v-for="file in convertQueue"
        :key="`file-to-convert-${file.id}`"
        :file-name="file.name"
        :preview-image="file.previewLink"
        :file-size="file.size"
        @delete="removeFromConvertQueue(file.id)"
      />

      <file-uploader-block
        is-title-showed
        @uploaded="onUpload"
      />
    </div>
  </div>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import DocumentBig from '@/components/document-editor/DocumentBig.vue';
import ScaleSlider from '@/components/document-editor/ScaleSlider.vue';
import FileUploaderBlock from '@/components/uploaders/FileUploaderBlock.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ConvertDocument',

  components: {
    BaseCheckbox, FileUploaderBlock, DocumentBig, ScaleSlider,
  },

  data() {
    return {
      isMergeMode: false,
    };
  },

  computed: {
    ...mapState('files', ['loading', 'convertQueue']),
  },

  watch: {
    convertQueue: {
      immediate: true,
      handler(value) {
        if (!value.length) {
          this.$router.back();
        }
      },
    },
  },

  methods: {
    ...mapActions('files', [
      'splitDocument',
      'clearConvertQueue',
      'addToConvertQueue',
      'removeFromConvertQueue',
      'convertAllInQueue',
    ]),

    onUpload(uploadFiles) {
      uploadFiles.forEach((item) => {
        this.addToConvertQueue(item.id);
      });
    },

    async convertFiles() {
      await this.convertAllInQueue(this.isMergeMode);
      await this.$router.push({ name: 'MyFiles' });
    },
  },

  beforeRouteLeave(to, from, next) {
    this.clearConvertQueue();

    next();
  },
};
</script>

<style lang="scss">
.convert-document-page {
  &__header {
    display: grid;
    grid-template-columns: 310px auto 310px;
    margin-bottom: 40px;

    h1 {
      text-align: center;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;

    & > *:first-child {
      margin-right: 30px;
    }
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--document-page-width-wide));
    gap: 40px 30px;
  }
}
</style>
