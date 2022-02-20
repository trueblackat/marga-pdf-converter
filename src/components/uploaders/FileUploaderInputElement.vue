<template>
  <input
    ref="element"
    type="file"
    accept="image/*"
    multiple
    style="display: none"
    @change="onInputChange"
  >
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'FileUploaderInputElement',

  methods: {
    ...mapActions('files', ['uploadFiles']),

    click() {
      this.$refs.element.click();
    },

    onInputChange(event) {
      const { files } = event.target;

      this.uploadFiles(files);
    },
  },
};
</script>
