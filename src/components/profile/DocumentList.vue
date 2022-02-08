<template>
  <section class="document-list">
    <header class="document-list__heading">
      123
    </header>

    <div class="document-list__inner">
      <document
        v-for="document in documents"
        :key="`document-${document.id}`"
        :name="document.name"
        :link="document.link"
        :date="document.date"
        :preview-link="document.previewLink"
        :size="document.size"
        :pages-count="document.pagesCount"
      />
    </div>
  </section>
</template>

<script>
import api from '@/api/';
import Document from '@/components/profile/Document.vue';
import humanFileSize from '@/utils/humanFileSize';
import dayjs from 'dayjs';
import capitalize from 'lodash/capitalize';
import pick from 'lodash/pick';

export default {
  name: 'DocumentList',

  components: { Document },

  data() {
    return {
      documents: [],
    };
  },

  created() {
    this.getDocuments();
  },

  methods: {
    async getDocuments() {
      const documents = await api.documents.getList();

      this.documents = documents.map((item) => ({
        ...pick(item, ['id', 'name']),
        date: capitalize(dayjs(item.created).format('MMMM D, YYYY')),
        link: `${process.env.VUE_APP_API_HOST}${item.link.substring(1)}`,
        previewLink: `${process.env.VUE_APP_API_HOST}${item.preview_link.substring(1)}`,
        size: humanFileSize(item.size),
        pagesCount: item.num_pages,
      }));
    },
  },
};
</script>

<style lang="scss">
.document-list {
  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__inner {
    display: grid;
    grid-template-columns: repeat(auto-fill, 165px);
    gap: 30px;
  }
}
</style>
