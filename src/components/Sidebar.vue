<template>
  <v-container class="nav-sidebar bg-primary px-0 py-0">
    <v-card class="rounded-0" theme="lightTheme">
      <!-- SIDEBAR BUTTONS -->
      <v-item-group class="text-center">
        <!-- PROFILE -->
        <div>
          <v-btn class="nav-sidebar-btn-profile rounded-0" color="primary">
            <v-avatar size="48" color="white">
              <span class="white--text text-h6">
                {{ userInitials }}
              </span>
            </v-avatar>
          </v-btn>
          <v-divider class="py-0 my-0"></v-divider>
        </div>
        <!-- HOME -->
        <div>
          <v-btn stacked color="primary" class="rounded-0" href="/">
            <font-awesome-icon
              :icon="['fa', 'house']"
              class="fa-2x mb-2"
            ></font-awesome-icon>
            {{ t("sidebar.home") }}
          </v-btn>
          <v-divider class="py-0 my-0"></v-divider>
        </div>
        <!-- LOGOUT -->
        <div>
          <v-btn
            stacked
            color="primary"
            class="rounded-0"
            @click="btnLogoutClick"
          >
            <font-awesome-icon
              :icon="['fa', 'arrow-up-from-bracket']"
              class="fa-2x mb-2"
            ></font-awesome-icon>
            {{ t("sidebar.logout") }}
          </v-btn>
          <v-divider class="py-0 my-0"></v-divider>
        </div>
      </v-item-group>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { ActionModule, ActionTypes } from "@/store/users/action-types";
import { GetterTypes } from "@/store/users/getter-types";
import { User } from "@/store/users/types";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    // Create the translation instance
    const { t } = useI18n();

    // Create store instance
    const store = useStore();

    // Create router instance
    const router = useRouter();

    // Grab authorization details
    const authDetails: User =
      store.getters[`${ActionModule}/${GetterTypes.GET_AUTH_DETAILS}`];

    // Decalred to store login user initials
    let userInitials = ref("");

    if (authDetails && Object.keys(authDetails).length > 0) {
      const firstNameInitial = authDetails.firstName
        ? Array.from(authDetails.firstName)[0]
        : "";
      const lastNameInitial = authDetails.lastName
        ? Array.from(authDetails.lastName)[0]
        : "";

      // Set login user initials
      userInitials.value = (firstNameInitial + lastNameInitial).toUpperCase();
    }

    // Logout button click handler
    const btnLogoutClick = () => {
      // Reset auth user details
      store.dispatch(`${ActionModule}/${ActionTypes.SET_AUTH_DETAILS}`, null);

      // Redirect to "sign in" page
      router.push({ path: "/signin" });
    };

    return {
      t,
      authDetails,
      userInitials,
      btnLogoutClick,
    };
  },
};
</script>
<style lang="stylus">
.nav-sidebar
  position: fixed;
  top: 0px;
  bottom: 0px;
  width: 85px !important;
  overflow: hidden;

  .nav-sidebar-btn-profile
    display: block;
    width: 100%;
    padding: 12px 3px;
    text-align: center;
    overflow: hidden;
    height: auto !important;

  .v-btn__content
    display: block;
</style>
