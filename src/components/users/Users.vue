<template>
  <v-card class="mb-4">
    <v-card-title class="bg-primary">
      <h4>{{ t("users.users") }}</h4>
    </v-card-title>
    <v-card-item>
      <div v-if="localUsers.length > 0">
        <v-table>
          <thead>
            <tr>
              <th>{{ t("form.firstName") }}</th>
              <th>{{ t("form.lastName") }}</th>
              <th>{{ t("form.email") }}</th>
              <th>{{ t("form.address") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in ref(localUsers).value"
              :key="index"
              @click="userRowSelected(user)"
              :class="
                selectedUser && selectedUser.id === user.id ? 'bg-light' : ''
              "
            >
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.address }}</td>
            </tr>
          </tbody>
        </v-table>
        <!-- PAGINATION -->
        <div class="text-center">
          <v-pagination
            v-model="pagination.page"
            :length="pagination.pages"
            color="primary"
          ></v-pagination>
        </div>
      </div>
      <v-card-text v-else class="text-center">
        {{ t("messages.noRecordFound") }}
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import { getUsers } from "@/utils/users";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { User, Pagination } from "@/types";

export default {
  setup(props, context) {
    const { t } = useI18n();

    // Declared to store selected issue to edit
    let users = ref([] as Array<User>);

    // Declared to store selectd user details
    let selectedUser = ref({} as User | null);

    // Declared pagination
    let pagination = ref({
      page: 1,
      pages: 0,
      pageSize: 10,
    } as Pagination);

    // Check if component is mounted
    onMounted(() => {
      // load Users
      loadUsers();
    });

    // Declared to filter users by pagination
    let localUsers = computed(() => {
      // Check if no user has been found
      if (users.value.length === 0) {
        return [];
      }

      return users.value.slice(
        (pagination.value.page - 1) * pagination.value.pageSize,
        pagination.value.page * pagination.value.pageSize
      );
    });

    // load users
    const loadUsers = async () => {
      await getUsers().then((response) => {
        if (
          response &&
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          // Set users
          users.value = response.data as Array<User>;

          // Set pagination for users
          pagination.value.pages = Math.ceil(
            users.value.length / pagination.value.pageSize
          );
        } else {
          users.value = [];

          // Set pagination for issues
          pagination.value.pages = 0;
        }
      });
    };

    // Handle user roww selection
    const userRowSelected = (user: User) => {
      // Set selected user details
      selectedUser.value = user;

      // Emit event to parent
      context.emit("userSelected", user);
    };

    return {
      t,
      ref,
      localUsers,
      selectedUser,
      userRowSelected,
      pagination,
    };
  },
};
</script>

<style></style>
