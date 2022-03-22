<template>
  <input
    ref="element"
    type="file"
    :accept="accept"
    multiple
    style="display: none"
    @change="onInputChange"
  >
</template>

<script>
import api from '@/api';

// TODO: описать accept возможные типы загрузки файлов
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FileUploaderInputElement',

  computed: {
    ...mapGetters('user', ['isUserInfoExited']),
    ...mapGetters('system', ['selectedFileProcessingModeData']),

    accept() {
      // http://htmlbook.ru/html/value/mime
      return this.selectedFileProcessingModeData.pdfOnly
        ? 'application/pdf'
        : 'image/jpeg, image/png, application/msword, application/excel';
    },
  },

  methods: {
    ...mapActions('files', ['uploadFiles']),
    ...mapActions('auth', ['tokenWork']),

    click() {
      this.$refs.element.click();
    },

    async onInputChange(event) {
      try {
        this.$emit('uploading', true);

        if (!this.isUserInfoExited) {
          // создание анонимного пользователя, если незалогинен
          await this.tokenWork({ requestMethod: api.auth.registerAnonymous });
        }

        const { files } = event.target;

        const uploadedFiles = await this.uploadFiles(files);

        this.$emit('uploaded', uploadedFiles);
      } catch (e) {
        console.error(e);
      } finally {
        this.$emit('uploading', false);
      }
    },
  },
};
</script>
