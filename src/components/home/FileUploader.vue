<template>
  <section class="file-uploader">
    <div class="file-uploader__inner">
      <h1 class="file-uploader__title">
        Выберите файл
      </h1>

      <h2 class="file-uploader__subtitle">
        для редактирования
      </h2>

      <button
        class="button button--size-xl button--type-filled button--with-icon"
        @click="openFileDialog"
      >
        <svg-icon name="plus" />
        <span>Добавить файл</span>
      </button>

      <input
        ref="input"
        class="file-uploader__input"
        type="file"
        multiple
        @change="onInputChange"
      >
    </div>
  </section>
</template>

<script>
import api from '@/api';
import { getFileAsBase64 } from '@/utils/files.utils';

export default {
  name: 'FileUploader',

  methods: {
    openFileDialog() {
      this.$refs.input.click();
    },

    async onInputChange(event) {
      const { files } = event.target;
      const fileEncodingPromises = Array.from(files).map((file) => getFileAsBase64(file));
      const encodedFiles = await Promise.all(fileEncodingPromises);
      const uploadPromises = encodedFiles.map((item) => api.documents.upload(item.name, item.body));

      try {
        const uploadedFiles = await Promise.all(uploadPromises);

        console.info(`${uploadedFiles.length} файлов загружено!`);
      } catch (e) {
        console.log(e);
      }
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

  &__input {
    display: none;
  }

  .button {
    width: 100%;
  }
}
</style>
