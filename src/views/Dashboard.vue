<template>
  <div>
    <!-- HEADER -->
    <Header :title="t('pageTitles.dashboard')"></Header>

    <!-- USERS --->
    <div>
      <Users @userSelected="userSelected" />
    </div>

    <div>
      <Issues
        :selectedUser="selectedUser"
        v-if="selectedUser && Object.keys(selectedUser).length > 0"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Header from "@/components/Header.vue";
import Users from "@/components/users/Users.vue";
import Issues from "@/components/issues/Issues.vue";
import { useI18n } from "vue-i18n";
import { User } from "@/types";
import { ref } from "vue";

export default {
  name: "Dashboard",
  components: {
    Header,
    Users,
    Issues,
  },
  setup() {
    // Create translation instance
    const { t } = useI18n();

    // Declared to store selected user details
    const selectedUser = ref({} as User | null);

    // Handle user selection event
    const userSelected = (user: User) => {
      // Reset selected val which will force the component to load
      selectedUser.value = null;

      // Reset new value
      setTimeout(() => {
        selectedUser.value = user;
      }, 200);
    };

    return {
      t,
      userSelected,
      selectedUser,
    };
  },
};
</script>
<style lang="stylus" scoped></style>
