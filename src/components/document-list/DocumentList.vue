<template>
  <section class="document-list">
    <!--    <header class="document-list__heading">-->
    <!--      123-->
    <!--    </header>-->

    <div
      v-loading="loading"
      class="document-list__inner"
    >
      <document
        class="document-list__add-file"
        size="Макс. 50 Mb"
        name="Добавить файл"
        date="Сегодня"
        is-cliclable="false"
      >
        <file-uploader-block />
      </document>

      <document
        v-for="file in sortedFiles"
        :key="`file-${file.id}`"
        :name="file.name"
        :link="file.link"
        :date="file.date"
        :preview-link="file.previewLink"
        :size="file.size"
        :pages-count="file.pagesCount"
        @document-click="onDocumentClick(file.id, $event)"
      />
    </div>
  </section>
</template>

<script>
import Document from '@/components/document-list/Document.vue';
import FileUploaderBlock from '@/components/uploaders/FileUploaderBlock.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'DocumentList',

  components: { FileUploaderBlock, Document },

  data() {
    return {
      documents: [],
    };
  },

  computed: {
    ...mapGetters('files', ['sortedFiles']),
    ...mapState('files', ['loading']),
  },

  created() {
    if (!this.sortedFiles.length) {
      this.getFiles();
    }
  },

  methods: {
    ...mapActions('files', ['getFiles', 'deleteFile']),

    onDocumentClick(fileId, { canSplit }) {
      if (canSplit) {
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
