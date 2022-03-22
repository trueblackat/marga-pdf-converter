<template>
  <section
    class="file-uploader"
  >
    <div class="file-uploader__inner">
      <h1 class="file-uploader__title">
        {{ selectedFileProcessingModeData.title }}
      </h1>

      <h2 class="file-uploader__subtitle">
        {{ selectedFileProcessingModeData.caption }}
      </h2>

      <button
        class="button button--size-xl button--type-filled button--with-icon"
        @click="openFileDialog"
      >
        <svg-icon name="plus" />

        <span>{{ $t('actions.addFile') }}</span>
      </button>

      <file-uploader-input-element
        ref="input"
        :single-mode="singleMode"
        @uploading="$emit('uploading', $event)"
        @uploaded="$emit('uploaded', $event)"
      />
    </div>
  </section>
</template>

<script>
import FileUploaderInputElement from '@/components/uploaders/FileUploaderInputElement.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'FileUploader',

  components: { FileUploaderInputElement },

  props: {
    singleMode: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters('system', ['selectedFileProcessingModeData']),
  },

  methods: {
    openFileDialog() {
      this.$refs.input.click();
    },
  },
};
</script>

<style lang="scss">
.file-uploader {
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 570px;
    margin: 0 auto;
  }

  &__title {
    font-weight: 500;
    font-size: 48px;
    line-height: 55px;
    margin-bottom: 10px;
  }

  &__subtitle {
    font-weight: 300;
    font-size: 28px;
    line-height: 32px;
    color: $c-gray-5;
    margin-bottom: 67px;
  }

  .button {
    width: 100%;
  }
}
</style>
