<template>
  <input
    ref="element"
    type="file"
    accept="image/*, application/pdf, application/docx"
    multiple
    style="display: none"
    @change="onInputChange"
  >
</template>

<script>
// TODO: описать accept возможные типы загрузки файлов
import { mapActions } from 'vuex';

export default {
  name: 'FileUploaderInputElement',

  methods: {
    ...mapActions('files', ['uploadFiles']),

    click() {
      this.$refs.element.click();
    },

    async onInputChange(event) {
      const { files } = event.target;

      const uploadedFiles = await this.uploadFiles(files);

      this.$emit('uploaded', uploadedFiles);
    },
  },
};
</script>
