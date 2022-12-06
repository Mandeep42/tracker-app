<template>
  <div>
    <v-card>
      <v-card-title class="bg-primary">
        <v-row justify="space-between">
          <v-col>
            <h4>{{ t("modules.issues") }}</h4>
          </v-col>
          <v-col class="text-right">
            <v-btn variant="outlined" @click="showNewIssueModal = true" exact>
              <font-awesome-icon :icon="['fa', 'plus']" />&nbsp;
              {{ t("btns.add") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-item>
        <div v-if="localIssues.length > 0">
          <v-table>
            <thead>
              <tr>
                <th>{{ t("form.title") }}</th>
                <th>{{ t("form.type") }}</th>
                <th>{{ t("form.date") }}</th>
                <th>{{ t("form.status") }}</th>
                <th>{{ t("form.description") }}</th>
                <th>{{ t("form.keywords") }}</th>
                <th>{{ t("form.actions") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(issue, index) in ref(localIssues).value" :key="index">
                <td>{{ issue.title }}</td>
                <td>{{ issue.type }}</td>
                <td>{{ new Date(issue.date).toLocaleDateString("en-US") }}</td>
                <td>{{ issue.status }}</td>
                <td>{{ issue.description }}</td>
                <td>
                  <v-chip-group active-class="primary--text" column>
                    <v-chip
                      v-for="(keyword, index) in issue.keywords"
                      :key="index"
                    >
                      <span>{{ keyword }}</span>
                    </v-chip>
                  </v-chip-group>
                </td>
                <td>
                  <!-- EDIT BUTTON -->
                  <v-btn
                    color="warning"
                    class="mr-3"
                    @click="btnEditClicked(issue)"
                    exact
                  >
                    <font-awesome-icon
                      :icon="['fa', 'pencil']"
                    ></font-awesome-icon>
                  </v-btn>
                  <!-- DELETE BUTTON -->
                  <v-btn color="danger" @click="btnDeleteClicked(issue)">
                    <font-awesome-icon
                      :icon="['fa', 'trash']"
                    ></font-awesome-icon>
                  </v-btn>
                </td>
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

    <!-- ADD NEW ISSUE MODAL -->
    <new-issue-modal
      v-if="showNewIssueModal"
      :userId="selectedUser.id"
      @hide="hideAddIssueModal"
    ></new-issue-modal>

    <!-- EDIT ISSUE MODAL -->
    <edit-issue-modal
      v-if="
        showEditIssueModal &&
        selectedIssue &&
        Object.keys(selectedIssue).length > 0
      "
      :selectedIssue="selectedIssue"
      @hide="hideEditIssueModal"
    ></edit-issue-modal>

    <!-- DELETE ISSUE MODAL -->
    <delete-issue-modal
      v-if="
        showDeleteIssueModal &&
        selectedIssue &&
        Object.keys(selectedIssue).length > 0
      "
      :selectedIssue="selectedIssue"
      @hide="hideDeleteIssueModal"
    ></delete-issue-modal>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { onMounted, ref, computed, reactive, toRaw, watch } from "vue";
import { userIssues } from "@/utils/issues";
import { useI18n } from "vue-i18n";
import { Issue, Pagination, User } from "@/types";
import { isArray } from "@vue/shared";
import { ActionModule, ActionTypes } from "@/store/issues/action-types";
import { GetterTypes } from "@/store/issues/getter-types";
import NewIssueModal from "@/components/issues/New.vue";
import EditIssueModal from "@/components/issues/Edit.vue";
import DeleteIssueModal from "@/components/issues/Delete.vue";

export default {
  components: {
    NewIssueModal,
    EditIssueModal,
    DeleteIssueModal,
  },
  props: {
    selectedUser: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // Grab selected user details
    const selectedUser = props.selectedUser as User;

    // Declared to store new issue modal state
    let showNewIssueModal = ref(false);

    // Declared to store edit issue modal state
    let showEditIssueModal = ref(false);

    // Declared to store delete issue modal state
    let showDeleteIssueModal = ref(false);

    // Declared to store selected issue to edit
    let selectedIssue = ref({} as Issue | null);

    // Import translation instance
    const { t } = useI18n();

    // Declared store instance
    const store = useStore();

    // Declared issues as computed property
    let issues = computed({
      get: () => store.getters[`${ActionModule}/${GetterTypes.GET_ISSUES}`],
      set: (val) => {
        store.dispatch(`${ActionModule}/${ActionTypes.SET_ISSUES}`, val);
      },
    });

    // Declared pagination
    let pagination = ref({
      page: 1,
      pages: 0,
      pageSize: 10,
    } as Pagination);

    // Check if component has been mounted
    onMounted(() => {
      // load user issues
      loadIssues();
    });

    // Declared to filter users by pagination
    let localIssues = computed(() => {
      // Check if no user has been found
      if (issues.value.length === 0) {
        return [];
      }

      const paginationIssues = issues.value.slice(
        (pagination.value.page - 1) * pagination.value.pageSize,
        pagination.value.page * pagination.value.pageSize
      );

      return paginationIssues.sort(function (a: any, b: any) {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
    });

    // Declared to reset new issue modal state
    const hideAddIssueModal = () => {
      showNewIssueModal.value = false;
    };

    // Edit button handler
    const btnEditClicked = (issue: Issue) => {
      // Set selected issue
      selectedIssue.value = Object.assign({}, issue) as Issue;

      // Display edit modal
      showEditIssueModal.value = true;
    };

    // Declared to reset edit issue modal state
    const hideEditIssueModal = () => {
      // Reset edit modal state
      showEditIssueModal.value = false;

      // Reset selected issue
      selectedIssue.value = null;
    };

    // Edit button handler
    const btnDeleteClicked = (issue: Issue) => {
      // Set selected issue
      selectedIssue.value = Object.assign({}, issue) as Issue;

      // Display edit modal
      showDeleteIssueModal.value = true;
    };

    // Declared to reset delete issue modal state
    const hideDeleteIssueModal = () => {
      // Reset deelte modal state
      showDeleteIssueModal.value = false;

      // Reset selected issue
      selectedIssue.value = null;
    };

    // Load user issues
    const loadIssues = async () => {
      // Check if selected user is not defined
      if (!selectedUser.id) {
        return false;
      }

      // Load selected user issues
      await userIssues(selectedUser.id).then((data) => {
        if (data && isArray(data) && data.length > 0) {
          // Set issues
          issues.value = data as Array<Issue>;

          // Set pagination for issues
          pagination.value.pages = Math.ceil(
            issues.value.length / pagination.value.pageSize
          );
        } else {
          issues.value = [];

          // Set pagination for issues
          pagination.value.pages = 0;
        }
      });
    };

    return {
      t,
      showNewIssueModal,
      hideAddIssueModal,
      btnEditClicked,
      showEditIssueModal,
      hideEditIssueModal,
      btnDeleteClicked,
      showDeleteIssueModal,
      hideDeleteIssueModal,
      selectedIssue,
      localIssues,
      ref,
      loadIssues,
      pagination,
    };
  },
};
</script>

<style></style>
