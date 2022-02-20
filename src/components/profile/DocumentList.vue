<template>
  <section class="document-list">
    <!--    <header class="document-list__heading">-->
    <!--      123-->
    <!--    </header>-->

    <div
      v-if="files.length"
      class="document-list__inner"
    >
      <document
        class="document-list__add-file"
        size="Макс. 50 Mb"
        name="Добавить файл"
        date="Сегодня"
      >
        <file-uploader-block />
      </document>

      <document
        v-for="file in files"
        :key="`file-${file.id}`"
        :name="file.name"
        :link="file.link"
        :date="file.date"
        :preview-link="file.previewLink"
        :size="file.size"
        :pages-count="file.pagesCount"
      />
    </div>
  </section>
</template>

<script>
import Document from '@/components/profile/Document.vue';
import FileUploaderBlock from '@/components/uploaders/FileUploaderBlock.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'DocumentList',

  components: { FileUploaderBlock, Document },

  data() {
    return {
      documents: [],
    };
  },

  computed: {
    ...mapState('files', ['files']),
  },

  created() {
    if (!this.files.length) {
      this.getFiles();
    }
  },

  methods: {
    ...mapActions('files', ['getFiles']),
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
    align-items: start;
  }

  &__add-file {
    .document__name {
      color: $color-theme;
    }
  }
}
</style>
