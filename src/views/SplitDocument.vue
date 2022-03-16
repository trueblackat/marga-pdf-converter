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
  </div>
</template>

<script>
import api from '@/api';
import DocumentPagesList from '@/components/document-editor/DocumentPagesList.vue';
import ScaleSlider from '@/components/document-editor/ScaleSlider.vue';
import { getAbsoluteFileApiLink } from '@/utils/misc.utils';
import { mapActions, mapState } from 'vuex';

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
      selectedPagesIndexes: [],
    };
  },

  computed: {
    ...mapState('files', ['loading']),
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

    async getPreviews() {
      const { previews } = await api.documents.getItemPreviews(this.fileId);

      this.previews = previews.map((item) => (item.status === 1
        ? getAbsoluteFileApiLink(item.link.substring(1))
        : false
      ));
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
}
</style>
