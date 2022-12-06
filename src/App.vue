<template>
  <v-app theme="lightTheme">
    <v-main>
      <div id="main-sidebar">
        <Sidebar v-if="ref(isUserLoggedIn).value === true ? true : false" />
      </div>
      <div
        id="main-content"
        :class="ref(isUserLoggedIn).value === true ? 'loggedIn' : ''"
      >
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { ActionModule } from "@/store/users/action-types";
import { GetterTypes } from "@/store/users/getter-types";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { User } from "./types";

export default {
  components: {
    Sidebar,
  },
  setup() {
    // Declared store instance
    const store = useStore();

    // Declared flag to check if user is looged in
    let isUserLoggedIn = computed(() => {
      // Grab authorization details
      const authDetails: User =
        store.getters[`${ActionModule}/${GetterTypes.GET_AUTH_DETAILS}`];

      // Check if logged in user
      if (authDetails && Object.keys(authDetails).length > 0) {
        return true;
      }
      return false;
    });

    return {
      isUserLoggedIn,
      ref,
    };
  },
};
</script>
<style lang="stylus" scoped>
#main-sidebar
  width: 85px;

#main-content.loggedIn
  padding-left: 85px;
</style>
