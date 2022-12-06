<template>
  <div>
    <!-- HEADER -->
    <Header :title="t('pageTitles.signUp')"></Header>

    <!-- SIGN UP FORM -->
    <v-sheet class="bg-light px-5 py-10">
      <sign-up />
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import SignUp from "@/components/users/SignUp.vue";
import { useI18n } from "vue-i18n";

export default {
  components: {
    Header,
    SignUp,
  },
  setup() {
    // Create translation instance
    const { t } = useI18n();
    return { t };
  },
};
</script>

<style></style>
