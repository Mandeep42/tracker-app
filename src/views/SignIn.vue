<template>
  <div>
    <!-- HEADER -->
    <Header :title="t('pageTitles.signIn')"></Header>

    <!-- SIGN UP FORM -->
    <v-sheet class="bg-light px-5 py-10">
      <sign-in />
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import SignIn from "@/components/users/SignIn.vue";
import { useI18n } from "vue-i18n";

export default {
  components: {
    Header,
    SignIn,
  },
  setup() {
    // Create translation instance
    const { t } = useI18n();
    return { t };
  },
};
</script>

<style></style>
