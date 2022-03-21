<template>
  <div
    v-loading="loading"
    class="split-document-page container"
  >
    <div class="split-document-page__header">
      <ScaleSlider />

      <h1 class="title">
        {{ $t('actions.splitFile') }}
      </h1>

      <button
        class="button button--type-filled"
        :disabled="!selectedPagesIndexes.length"
        @click="onSplitDocumentsButtonClick"
      >
        {{ $t('actions.split') }}
      </button>
    </div>

    <document-pages-list
      :pages="previews"
      @selected-pages-change="selectedPagesIndexes = $event"
    />

    <div class="split-document-page__load-more-button">
      <button
        v-if="isLoadMoreButtonShowed"
        class="button"
        @click="loadNextPreview"
      >
        Загрузить еще
      </button>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import DocumentPagesList from '@/components/document-editor/DocumentPagesList.vue';
import ScaleSlider from '@/components/document-editor/ScaleSlider.vue';
import { getAbsoluteFileApiLink } from '@/utils/misc.utils';
import { mapActions, mapState } from 'vuex';
import { DOCUMENT_PREVIEWS_PER_PAGE } from '@/constants/base.constants';

export default {
  name: 'SplitDocument',

  components: { ScaleSlider, DocumentPagesList },

  props: {
    fileId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      previews: [],
      total: 0,
      pageNumber: 1,
      selectedPagesIndexes: [],
      isPreviewLoading: false,
    };
  },

  computed: {
    ...mapState('files', { isFilesLoading: 'loading' }),

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

  created() {
    this.getPreviews();
  },

  methods: {
    ...mapActions('files', ['splitDocument']),

    async onSplitDocumentsButtonClick() {
      await this.splitDocument({ fileId: this.fileId, pages: this.selectedPagesIndexes });
      await this.$router.push({ name: 'MyFiles' });
    },

    loadNextPreview() {
      this.pageNumber += 1;

      this.getPreviews();
    },

    async getPreviews() {
      this.isPreviewLoading = true;

      try {
        const offset = DOCUMENT_PREVIEWS_PER_PAGE * (this.pageNumber - 1);
        const { previews, count: total } = await api.documents
          .getItemPreviews(this.fileId, DOCUMENT_PREVIEWS_PER_PAGE, offset);

        this.previews.push(...previews.map((item) => (item.status === 1
          ? getAbsoluteFileApiLink(item.link.substring(1))
          : false
        )));
        this.total = total;
      } catch (e) {
        console.error(e);
      } finally {
        this.isPreviewLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.split-document-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  &__load-more-button {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
