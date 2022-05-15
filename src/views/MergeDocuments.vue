<template>
  <div
    v-loading="loading"
    class="merge-document-page container"
  >
    <div class="merge-document-page__header">
      <ScaleSlider />

      <h1 class="title">
        {{ $t('actions.mergePages') }}
      </h1>

      <button
        class="button button--type-filled"
        :disabled="selectedPages.length < 2"
        @click="onMergeDocumentsButtonClick"
      >
        {{ $t('actions.merge') }}
      </button>
    </div>

    <div
      v-if="selectedPages.length"
      class="merge-document-item merge-document-item--gray-back"
    >
      <div class="merge-document-item__header">
        <h3>Рабочая область</h3>

        <span>{{ $tc('documents.pages', selectedPages.length) }}</span>
      </div>

      <document-draggable-pages-list
        :pages="selectedPages"
        @on-drag-end="selectedPages = $event"
      />
    </div>

    <div
      v-for="document in mergeQueueData"
      :key="`document-${document.id}`"
      v-loading="document.loading"
      class="merge-document-item"
    >
      <div class="merge-document-item__header">
        <h3>{{ document.name }}</h3>

        <span>{{ document.size }}</span>

        <span>{{ $tc('documents.pages', document.total) }}</span>
      </div>

      <document-pages-list
        :pages="document.previews"
        @selected-pages-change="onPageSelect($event, document)"
      />

      <div class="split-document-page__load-more-button">
        <button
          v-if="document.previewPageNumber < document.previewPageCount"
          class="button"
          @click="document.loadNextPreviews.apply(document)"
        >
          Загрузить еще
        </button>
      </div>
    </div>

    <file-uploader-block @uploaded="onUpload" />
  </div>
</template>

<script>
import api from '@/api';
import DocumentDraggablePagesList
from '@/components/document-editor/DocumentDraggablePagesList.vue';
import DocumentPagesList from '@/components/document-editor/DocumentPagesList.vue';
import ScaleSlider from '@/components/document-editor/ScaleSlider.vue';
import FileUploaderBlock from '@/components/uploaders/FileUploaderBlock.vue';
import { getAbsoluteFileApiLink } from '@/utils/misc.utils';
import { cloneDeep, difference } from 'lodash';
import { mapActions, mapState } from 'vuex';
import { DOCUMENT_PREVIEWS_PER_PAGE } from '@/constants/base.constants';

const mapDocument = (document) => ({
  id: document.id,
  total: document.pagesCount,
  size: document.size,
  name: document.name,
  previewPageNumber: 1,
  previewPageCount: Math.ceil(document.pagesCount / DOCUMENT_PREVIEWS_PER_PAGE),
  previews: [],
  loading: true,
  async getPreviews(previewPageNumber = this.previewPageNumber) {
    this.loading = true;

    try {
      const offset = DOCUMENT_PREVIEWS_PER_PAGE * (previewPageNumber - 1);
      const { previews } = await api.documents
        .getItemPreviews(this.id, DOCUMENT_PREVIEWS_PER_PAGE, offset);

      this.previews
        .push(...previews
          .map((previewsItem) => getAbsoluteFileApiLink(previewsItem.link.substring(1))));
    } catch (e) {
      console.error(e);

      this.$notify.error({
        title: this.$t('messages.somethingWrongTitle'),
        message: this.$t('messages.somethingWrongText'),
      });
    } finally {
      this.loading = false;
    }
  },
  loadNextPreviews() {
    this.previewPageNumber += 1;
    this.getPreviews();
  },
});

export default {
  name: 'MergeDocuments',

  metaInfo() {
    return {
      titleTemplate: `%s - ${this.$t('pageNames.mergeDocuments')}`,
    };
  },

  components: {
    DocumentDraggablePagesList, FileUploaderBlock, ScaleSlider, DocumentPagesList,
  },

  data() {
    return {
      mergeQueueData: [],
      selectedPages: [],
    };
  },

  computed: {
    ...mapState('files', { isFilesLoading: 'loading', mergeQueue: 'mergeQueue' }),

    previewPagesCount() {
      return this.total
        ? Math.ceil(this.total / DOCUMENT_PREVIEWS_PER_PAGE)
        : 1;
    },

    isLoadMoreButtonShowed() {
      return this.pageNumber < this.previewPagesCount;
    },

    loading() {
      return this.isPreviewLoading || this.isFilesLoading;
    },
  },

  watch: {
    mergeQueue: {
      immediate: true,
      handler() {
        this.generateMergeQueueData();
      },
    },
  },

  mounted() {
    if (!this.mergeQueue.length) {
      this.$router.push({ name: 'MyFiles' });
    }
  },

  beforeRouteLeave(to, from, next) {
    this.clearMergeQueue();

    next();
  },

  methods: {
    ...mapActions('files', ['addToMergeQueue', 'mergeDocuments', 'clearMergeQueue']),

    async generateMergeQueueData() {
      const mergeQueueData = this.mergeQueue.map((item) => mapDocument(item));

      mergeQueueData.forEach((item) => !item.previews.length && item.getPreviews());

      this.mergeQueueData = mergeQueueData;
    },

    onUpload(uploadFiles) {
      uploadFiles.forEach((item) => {
        this.addToMergeQueue(item.id);
      });
    },

    onPageSelect(selectedPagesIndexes, file) {
      let clonedSelectedPages = cloneDeep(this.selectedPages);

      const indexesOfCurrentFile = clonedSelectedPages
        .filter((item) => item.fileId === file.id)
        .map((item) => item.index);
      const indexesOfCurrentFileToDelete = difference(indexesOfCurrentFile, selectedPagesIndexes);
      const indexesOfCurrentFileToAdd = difference(selectedPagesIndexes, indexesOfCurrentFile);

      const selectedPagesToAdd = selectedPagesIndexes
        .filter((index) => indexesOfCurrentFileToAdd.includes(index))
        .map((index) => ({
          fileId: file.id,
          preview: file.previews[index],
          index,
        }));

      clonedSelectedPages = clonedSelectedPages
        .filter((item) => !(item.fileId === file.id && indexesOfCurrentFileToDelete
          .includes(item.index)));

      clonedSelectedPages.push(...selectedPagesToAdd);

      this.selectedPages = clonedSelectedPages;
    },

    async onMergeDocumentsButtonClick() {
      const params = this.selectedPages.map((item) => ({
        id: item.fileId,
        page_number: item.index,
      }));

      await this.mergeDocuments(params);
      await this.$router.push({ name: 'MyFiles' });
    },
  },
};
</script>

<style lang="scss">
.merge-document-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 80px;
  }

  .file-uploader-block {
    height: 280px;
  }
}

.merge-document-item {
  padding-bottom: 40px;
  margin-bottom: 25px;
  border-bottom: 1px solid $c-gray-3;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      font-weight: 500;
      font-size: 19px;
      line-height: 22px;
      flex-grow: 1;
    }

    span {
      font-weight: 400;
      font-size: 15px;
      line-height: 17px;
      color: $c-gray-5;
      width: 140px;
      text-align: right;
    }
  }

  &--gray-back {
    position: relative;
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 80px;

    &:before {
      content: "";
      position: absolute;
      top: -25px;
      left: -$base-gap * 2;
      width: calc(100% + #{$base-gap * 4});
      height: calc(100% + 65px);
      background: $c-gray-4;
      z-index: -1;
      border-radius: $base-border-radius;
    }
  }
}
</style>
