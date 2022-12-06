<template>
  <v-dialog
    v-model="showModal"
    transition="dialog-top-transition"
    max-width="600"
  >
    <v-card>
      <v-card-title class="bg-primary">
        <h4>{{ t("issues.deleteIssue") }}</h4>
      </v-card-title>
      <v-card-item>
        {{ t("form.messages.issueDeleteConfirm") }}
      </v-card-item>
      <!-- FOOTER-->
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- CANCEL BUTTON -->
        <v-btn color="secondary" @click="close" text>
          {{ t("btns.cancel") }}
        </v-btn>

        <!-- EDIT BUTTON -->
        <v-btn color="primary" @click="btnDeleteIssueClick" text>
          {{ t("btns.delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import baseModal from "@/mixins/baseModal";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { ActionModule, ActionTypes } from "@/store/issues/action-types";
import { Issue } from "@/types";
import { deleteIssue } from "@/utils/issues";

export default {
  props: {
    selectedIssue: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    // Import base model refs
    const { showModal, hideModal, closeModalEvent } = baseModal();

    // Import translation instance
    const { t } = useI18n();

    // Declared store instance
    const store = useStore();

    // Grab selected issue
    const selectedIssue = { ...props.selectedIssue } as Issue;

    // Delete button click handler
    const btnDeleteIssueClick = async () => {
      // Update issue
      await deleteIssue(selectedIssue).then((response) => {
        // Check if response is "success"
        if (response && response.data) {
          // Edit issue in issue list
          store.dispatch(
            `${ActionModule}/${ActionTypes.EDIT_ISSUE}`,
            selectedIssue.id
          );

          // Close modal
          close();
        }
      });

      // Delete selected issue
      store.dispatch(
        `${ActionModule}/${ActionTypes.DELETE_ISSUE}`,
        selectedIssue.id
      );

      // Close modal
      close();
    };

    // Handle cancel button event
    const close = () => {
      // Call base modal to reset modal state
      hideModal();

      // Emit hide event
      emitHideEvent();
    };

    // Emit hide event to parent
    const emitHideEvent = () => {
      context.emit(closeModalEvent);
    };

    return {
      t,
      showModal,
      hideModal,
      closeModalEvent,
      close,
      btnDeleteIssueClick,
    };
  },
};
</script>
