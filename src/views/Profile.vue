<template>
  <section class="page-profile container">
    <h1 class="page-profile__title title">
      Профиль
    </h1>

    <document-list class="page-profile__document-list" />
  </section>
</template>

<script>
import DocumentList from '@/components/profile/DocumentList.vue';

export default {
  name: 'Profile',

  components: { DocumentList },
};
</script>

<style lang="scss">
.page-profile {
  display: grid;
  grid-template-columns: 1fr minmax(300px, 370px);
  grid-template-rows: 41px 1fr;
  gap: 30px;
  grid-template-areas:
    "title title"
    "document-list profile";

  &__title {
    text-align: center;
    grid-area: title;
  }

  &__document-list {
    grid-area: document-list;
  }

  &__profile {
    grid-area: profile;
  }
}
</style>
