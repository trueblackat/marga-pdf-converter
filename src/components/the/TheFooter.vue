<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__block">
        <div class="footer__logo">
          <img
            src="@/assets/images/logo.svg"
            alt="pdfeditor"
          >
        </div>

        <p class="footer__rights">
          pdf editor {{ currentYear }}  ©  all right received
        </p>
      </div>

      <div class="footer__block">
        <h4 class="footer__title">
          Social
        </h4>

        <div class="footer__inlines">
          <a
            class="text-button"
            href="#"
            target="_blank"
          >
            Instagram
          </a>

          <a
            class="text-button"
            href="#"
            target="_blank"
          >
            Telegram
          </a>

          <a
            class="text-button"
            href="#"
            target="_blank"
          >
            Facebook
          </a>

          <a
            class="text-button"
            href="#"
            target="_blank"
          >
            Github
          </a>
        </div>
      </div>

      <div class="footer__block">
        <h4 class="footer__title">
          Mobile
        </h4>

        <div class="footer__inlines">
          <a
            class="footer__mobile-link"
            href="#"
            target="_blank"
          >
            <img
              src="@/assets/images/appstore.svg"
              alt="appstore"
            >
          </a>

          <a
            class="footer__mobile-link"
            href="#"
            target="_blank"
          >
            <img
              src="@/assets/images/googleplay.svg"
              alt="appstore"
            >
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',

  computed: {
    currentYear() {
      const now = new Date();

      return now.getFullYear();
    },
  },
};
</script>

<style lang="scss">
.footer {
  box-shadow: $base-shadow;
  padding: $base-gap * 2 0;
  border-top: 1px solid $color-border;

  &__inner {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-template-columns: minmax(240px, 1.5fr) minmax(350px, 2fr) 270px;
    gap: $base-gap;
  }

  &__block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__inlines {
    display: flex;
    align-items: center;
  }

  &__title {
    margin-bottom: $base-gap / 2;
  }

  &__mobile-link {
    flex-shrink: 0;

    &:not(:last-child) {
      margin-right: $base-gap / 2;
    }

    img {
      width: 130px;
    }
  }

  .text-button {
    &:not(:last-child) {
      margin-right: 35px;
    }
  }
}
</style>
