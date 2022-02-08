<template>
  <section class="uploader-features">
    <div class="uploader-features__item">
      <svg-icon name="convert-pdf" />

      <div class="text">
        <span>Конвертировать файл</span>

        <span>из .DOC, .DOCX, .JPG или .EXEL</span>
      </div>
    </div>

    <div class="uploader-features__item">
      <svg-icon name="merge-pdf" />

      <div class="text">
        <span>Объединить файлы</span>

        <span>из нескольких .PDF в один</span>
      </div>
    </div>

    <div class="uploader-features__item">
      <svg-icon name="divide-pdf" />

      <div class="text">
        <span>Разделить файл</span>

        <span>из одного .PDF в два или больше</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UploaderFeatures',
};
</script>

<style lang="scss">
.uploader-features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;

  &__item {
    display: flex;
    align-items: center;
    border: 1px solid $color-border;
    border-radius: $base-border-radius;
    padding: 25px;

    .svg-icon {
      width: 86px;
      height: 86px;
      flex-shrink: 0;
    }

    .text {
      padding-left: 20px;

      span {
        display: block;

        &:first-child {
          font-weight: 500;
          font-size: 15px;
          line-height: 17px;
          margin-bottom: 15px;
        }

        &:last-child {
          font-size: 13px;
          line-height: 19px;
        }
      }
    }
  }
}
</style>
