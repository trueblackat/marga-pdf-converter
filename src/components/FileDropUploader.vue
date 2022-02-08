<template>
  <div
    class="file-drop-uploader"
    @drop="onDrop"
    @dragover.prevent
  >
    <div class="file-drop-uploader__caption">
      drop here
    </div>

    <input
      type="file"
      class="file-drop-uploader__input-file"
      multiple
      @change="onInputChange"
    >
  </div>
</template>

<script>
export default {
  name: 'FileDropUploader',

  data() {
    return {
      files: [],
    };
  },

  methods: {
    onDrop(ev) {
      ev.preventDefault();

      const files = [];

      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i += 1) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === 'file') {
            const file = ev.dataTransfer.items[i].getAsFile();

            files.push(file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.files.length; i += 1) {
          files.push(ev.dataTransfer.files[i]);
        }
      }

      this.checkFiles(files);
    },

    onInputChange(ev) {
      const { files } = ev.target;

      this.checkFiles(Array.from(files));
    },

    checkFiles(files) {
      console.log(files);
    },
  },
};
</script>

<style lang="scss">
.file-drop-uploader {
  height: 400px;
  background: gray;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
