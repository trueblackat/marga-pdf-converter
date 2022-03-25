<template>
  <draggable
    :list="sortedPages"
    tag="section"
    class="document-pages-list"
    @end="onDragEnd"
  >
    <document-page
      v-for="(page, pageIndex) in pages"
      :key="`page-${page}-${pageIndex}`"
      :preview-image="page.preview"
      :page-number="pageIndex + 1"
      @page-toggle-selected="onPageSelectToggle(pageIndex, $event)"
    />
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import DocumentPage from '@/components/document-editor/DocumentPage.vue';

export default {
  name: 'DocumentDraggablePagesList',

  components: { DocumentPage, draggable },

  props: {
    pages: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      selectedPages: this.pages.map(() => false),
      sortedPages: [],
    };
  },

  watch: {
    pages: {
      immediate: true,
      handler() {
        this.sortedPages = this.pages;
      },
    },
  },

  methods: {
    onPageSelectToggle(pageIndex, isSelected) {
      this.$set(this.selectedPages, pageIndex, isSelected);

      const selectedPagesIndexes = Object.keys(this.selectedPages)
        .filter((index) => this.selectedPages[index]);

      this.$emit('selected-pages-change', selectedPagesIndexes.map((item) => +item));
    },

    onDragEnd() {
      this.$emit('on-drag-end', this.sortedPages);
    },
  },
};
</script>

<style lang="scss">
.document-pages-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--document-page-width));
  gap: 40px 30px;
}
</style>
