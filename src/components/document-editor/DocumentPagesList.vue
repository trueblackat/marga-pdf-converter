<template>
  <section class="document-pages-list">
    <document-page
      v-for="(page, pageIndex) in pages"
      :key="`page-${page}-${pageIndex}`"
      :preview-image="page"
      :page-number="pageIndex + 1"
      is-selectable
      @page-toggle-selected="onPageSelectToggle(pageIndex, $event)"
    />
  </section>
</template>

<script>
import DocumentPage from '@/components/document-editor/DocumentPage.vue';

export default {
  name: 'DocumentPagesList',

  components: { DocumentPage },

  props: {
    pages: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      selectedPages: this.pages.map(() => false),
    };
  },

  methods: {
    onPageSelectToggle(pageIndex, isSelected) {
      this.$set(this.selectedPages, pageIndex, isSelected);

      const selectedPagesIndexes = Object.keys(this.selectedPages)
        .filter((index) => this.selectedPages[index]);

      this.$emit('selected-pages-change', selectedPagesIndexes.map((item) => +item));
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
