<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__block">
        <router-link
          class="footer__logo"
          to="/"
        >
          <svg-icon name="logo" />
        </router-link>

        <p class="footer__rights">
          {{ $t('footer.rights', { year: currentYear }) }}
        </p>
      </div>

      <div class="footer__block">
        <h4 class="footer__title">
          {{ $t('footer.socialLinks') }}
        </h4>

        <div class="footer__inlines">
          <a
            v-for="social in socials"
            :key="`social-${social.code}`"
            class="text-button"
            :href="social.url"
            target="_blank"
          >
            {{ social.label }}
          </a>
        </div>
      </div>

      <div class="footer__block">
        <h4 class="footer__title">
          {{ $t('footer.mobileApps') }}
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
import { SOCIALS } from '@/constants/base.constants';

export default {
  name: 'TheFooter',

  data() {
    return {
      socials: Object.freeze(SOCIALS),
    };
  },

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

  &__logo {
    .svg-icon {
      width: 162px;
      height: 24px;
      color: $color-theme;
    }
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
