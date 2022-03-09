<template>
  <section
    v-loading="loading"
    class="page-profile profile container container--tiny"
  >
    <template v-if="isUserInfoExited">
      <h1 class="page-profile__title title">
        Профиль
      </h1>

      <div class="profile-statistic-wrapper">
        <div
          v-for="item in statistic"
          :key="`stat-${item.label}`"
          class="profile-statistic-item"
        >
          <div class="profile-statistic-item__title">
            {{ item.label }}
          </div>

          <div class="profile-statistic-item__count">
            {{ item.count }}
          </div>
        </div>
      </div>

      <div class="profile-info-wrapper">
        <div class="profile-subscription">
          <div class="profile-subscription__title">
            Срок подписки истекает:
          </div>
          <div class="profile-subscription__date">
            <span>19</span>
            <span>сентября</span>
          </div>
          <button
            class="button button--type-filled"
            @click="onSubscriptionButtonClick"
          >
            Продлить подписку
          </button>
        </div>

        <div class="profile-info">
          <div class="profile-info__name">
            <user-avatar :username="user.login" />

            <span>{{ user.login }}</span>
          </div>

          <div class="profile-info__data">
            <span>Электронная почта</span>

            <span>{{ user.email }}</span>

            <button
              v-if="isEmailConfirmed"
              class="text-button text-button--inverted"
            >
              изменить
            </button>

            <button
              v-if="!isEmailConfirmed"
              class="text-button text-button--inverted"
              @click="showPopupConfirmEmail"
            >
              подтвердить
            </button>

            <span>Пароль</span>

            <span>
              {{ passwordUpdatedTime }}
            </span>

            <button
              class="text-button text-button--inverted"
              @click="showPopupChangePassword"
            >
              изменить
            </button>
          </div>
        </div>
      </div>
    </template>

    <popup
      ref="popupConfirmEmail"
      title="Подтвердить почту"
    >
      <email-confirm-form @success="$refs.popupConfirmEmail.close()" />
    </popup>

    <popup
      ref="popupChangeEmail"
      title="Изменить почту"
    >
      <email-change-form />
    </popup>

    <popup
      ref="popupChangePassword"
      title="Сменить пароль"
    >
      <password-change-form @success="$refs.popupChangePassword.close()" />
    </popup>

    <popup
      ref="popupRemindPassword"
      title="Забыли пароль"
    >
      <password-remind-form
        caption="Введите Вашу почту чтобы, мы смогли вам отправить проверочный код"
      />
    </popup>
  </section>
</template>

<script>
import EmailChangeForm from '@/components/popup/forms/EmailChangeForm.vue';
import EmailConfirmForm from '@/components/popup/forms/EmailConfirmForm.vue';
import PasswordChangeForm from '@/components/popup/forms/PasswordChangeForm.vue';
import PasswordRemindForm from '@/components/popup/forms/PasswordRemindForm.vue';
import Popup from '@/components/popup/Popup.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import dayjs from 'dayjs';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Profile',

  components: {
    PasswordRemindForm,
    PasswordChangeForm,
    EmailChangeForm,
    EmailConfirmForm,
    Popup,
    UserAvatar,
  },

  computed: {
    ...mapState('user', ['user', 'loading']),
    ...mapGetters('user', ['isUserInfoExited']),

    statistic() {
      return this.isUserInfoExited
        ? {
          load: {
            label: 'Залито файлов',
            count: this.user.load_count,
          },
          convert: {
            label: 'Сконвертированно файлов',
            count: this.user.convert_count,
          },
          merge: {
            label: 'Объединено файлов',
            count: this.user.merge_count,
          },
          split: {
            label: 'Разделено файлов',
            count: this.user.split_count,
          },
        }
        : {};
    },

    isEmailConfirmed() {
      return this.user.email_confirmed ?? false;
    },

    passwordUpdatedTime() {
      return this.isUserInfoExited
        ? dayjs().to(dayjs.utc(this.user.password_updated))
        : '';
    },
  },

  watch: {
    isUserInfoExited: {
      immediate: true,

      handler(value) {
        if (value && this.$route.query.action === 'confirmEmail') {
          this.$refs.popupConfirmEmail.show();
        }
      },
    },
  },

  methods: {
    onSubscriptionButtonClick() {
      this.$eventBus.$emit('show-paywall');
    },

    showPopupConfirmEmail() {
      this.$refs.popupConfirmEmail.show();
    },

    showPopupChangePassword() {
      this.$refs.popupChangePassword.show();
    },
  },
};
</script>

<style lang="scss">
.page-profile {
  &__title {
    text-align: center;
    margin-bottom: 60px;
  }
}

.profile-statistic-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.profile-statistic-item {
  text-align: center;

  &__title {
    font-size: 12px;
    line-height: 16px;
    color: $c-gray-5;
  }

  &__count {
    font-weight: 300;
    font-size: 64px;
    line-height: 74px;
    color: $color-text;
  }
}

.profile-info-wrapper {
  display: grid;
  gap: 30px;
  grid-template-columns: minmax(270px, auto) minmax(300px, 1fr);
}

.profile-subscription {
  width: 270px;
  flex-shrink: 0;
  border-radius: $base-border-radius;
  background: $c-gray-4;
  padding: 25px 40px;
  text-align: center;

  &__title {
    margin-bottom: 15px;
    font-size: 15px;
    line-height: 19px;
  }

  &__date {
    opacity: 0.8;
    margin-bottom: 25px;

    span {
      display: block;

      &:first-child {
        font-size: 64px;
        line-height: 74px;
      }

      &:last-child {
        font-size: 19px;
        line-height: 22px;
      }
    }
  }

  .button {
    width: 100%;
  }
}

.profile-info {
  border-radius: $base-border-radius;
  border: 1px solid $color-border;
  padding: 0 40px 36px;

  &__name {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 25px 0;
    border-bottom: 1px solid $color-border;
    margin-bottom: 30px;

    .user-avatar {
      width: 70px;
      height: 70px;
      margin-right: 30px;
      flex-shrink: 0;
    }

    span {
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__data {
    display: grid;
    grid-template-columns: minmax(40px, min-content) 1fr min-content;
    align-items: start;
    gap: 30px 20px;
    font-size: 13px;
    line-height: 15px;
    white-space: nowrap;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .text-button {
      text-align: left;
      width: 100%;
    }
  }
}
</style>
