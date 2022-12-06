<template>
  <v-dialog
    v-model="showModal"
    transition="dialog-top-transition"
    max-width="600"
  >
    <v-card>
      <v-card-title class="bg-primary">
        <h4>{{ t("issues.newIssue") }}</h4>
      </v-card-title>
      <v-card-item>
        <v-form v-model="issueForm.form">
          <v-row>
            <!-- TITLE -->
            <v-col cols="12" sm="12" md="8" lg="8" xl="9">
              <v-label>{{ t("form.title") }}</v-label>
              <v-text-field
                v-model="issueForm.title"
                :rules="formRules.title"
                clearable
              ></v-text-field>
            </v-col>
            <!-- STATUS -->
            <v-col cols="12" sm="12" md="4" lg="4" xl="3">
              <v-label>{{ t("form.type") }}</v-label>
              <div>
                <v-select
                  v-model="issueForm.type"
                  :items="issueTypeOptions"
                  item-title="title"
                  item-value="value"
                  :rules="formRules.type"
                  return-object
                >
                </v-select>
              </div>
            </v-col>
            <!-- DESCRIPTION -->
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-label>{{ t("form.description") }}</v-label>
              <v-textarea
                v-model="issueForm.description"
                rows="3"
                :rules="formRules.description"
                clearable
              ></v-textarea>
            </v-col>
            <!-- KEYWORDS -->
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-label>{{ t("form.keywords") }}</v-label>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="issueForm.keyword"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-btn
                    color="primary"
                    @click="addKeyword"
                    :disabled="
                      !issueForm.keyword ||
                      issueForm.keyword.trim().length === 0
                    "
                    size="x-large"
                    >{{ t("btns.add") }}
                  </v-btn>
                </v-col>
              </v-row>
              <div v-if="issueForm.keywords.length > 0">
                <v-spacer></v-spacer>
                <!-- KEYWORDS -->
                <v-chip-group active-class="primary--text" column>
                  <v-chip
                    v-for="(keyword, index) in issueForm.keywords"
                    :key="index"
                  >
                    <span class="px-2">{{ keyword }}</span>
                    <span>
                      <v-btn
                        size="x-small"
                        @click="removeKeyword(index)"
                        rounded
                      >
                        <font-awesome-icon
                          :icon="['fa', 'xmark']"
                        ></font-awesome-icon>
                      </v-btn>
                    </span>
                  </v-chip>
                </v-chip-group>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-item>
      <v-divider></v-divider>

      <!-- FOOTER-->
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- CANCEL BUTTON -->
        <v-btn color="secondary" @click="close" text>
          {{ t("btns.cancel") }}
        </v-btn>

        <!-- CREATE BUTTON -->
        <v-btn
          color="primary"
          @click="btnCreateIssueClick"
          text
          :disabled="!issueForm.form"
        >
          {{ t("btns.create") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import baseModal from "@/mixins/baseModal";
import baseForm from "@/mixins/form";
import { useI18n } from "vue-i18n";
import { Issue, IssueType, IssueStatus } from "@/types";
import { SelectOption } from "@/interfaces";
import { createIssue } from "@/utils/issues";
import { v4 as uuidV4 } from "uuid";
import { ActionModule, ActionTypes } from "@/store/issues/action-types";
import { GetterTypes } from "@/store/issues/getter-types";
import { useStore } from "vuex";

export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    // Import base model refs
    const { showModal, hideModal, closeModalEvent } = baseModal();

    // Import translation instance
    const { t } = useI18n();

    // Get user id from props
    const userId = props.userId;

    // Declared store instance
    const store = useStore();

    // Watch show modal
    watch(showModal, (newValue) => {
      // Check if modal is closing
      if (newValue !== true) {
        // Handle close event
        close();
      }
    });

    // Declared issues as computed property
    let issues = computed({
      get: () => store.getters[`${ActionModule}/${GetterTypes.GET_ISSUES}`],
      set: (val) => {
        store.dispatch(`${ActionModule}/${ActionTypes.SET_ISSUES}`, val);
      },
    });

    // Declared issue form type
    type IssueFormModal = {
      form: boolean;
      title: string | null;
      type: SelectOption | null;
      description: string | null;
      keyword: string | null;
      keywords: Array<string>;
    };

    // Defined status options
    const issueTypeOptions = Object.entries(IssueType).map(
      ([code, title], index) => {
        return {
          value: code,
          title: title,
        } as SelectOption;
      }
    );

    // Decalred issue form modal
    const issueForm = ref({
      form: false,
      title: null,
      type: null,
      description: null,
      keyword: null,
      keywords: [],
    } as IssueFormModal);

    // Defined form rules
    const formRules = {
      title: [
        (value: string) => {
          // Check if title is empty
          if (!value || value.trim().length === 0) {
            return t("form.messages.valueIsRequired");
          }
          // Check if title length > 50
          if (value.length > 50) {
            return t("form.messages.maxChar50");
          }
          return true;
        },
      ],
      type: [
        (value: Object) => {
          // Check if type is not selected
          if (!value) {
            return t("form.messages.valueIsRequired");
          }

          return true;
        },
      ],
      description: [
        (value: string) => {
          // Check if description is not selected
          if (!value || value.trim().length === 0) {
            return t("form.messages.valueIsRequired");
          }

          // Check if title length > 100
          if (value.length > 100) {
            return t("form.messages.maxChar100");
          }

          return true;
        },
      ],
    };

    // Handle add keyword to issue keywords list
    const addKeyword = () => {
      // Check if keyword is empty
      if (
        !issueForm.value.keyword ||
        issueForm.value.keyword.trim().length === 0
      ) {
        return false;
      }

      // Add keyword into keywords list
      issueForm.value.keywords?.push(issueForm.value.keyword);

      // Reset keyword
      issueForm.value.keyword = null;
    };

    // Handle remove keyword from issue keywords list
    const removeKeyword = (index: number) => {
      issueForm.value.keywords = issueForm.value.keywords.filter(
        (keyword, keywordIndex) => keywordIndex !== index
      );
    };

    // Create issue handler
    const btnCreateIssueClick = async () => {
      // Check if form is not valid
      if (issueForm.value.form === false) {
        return;
      }

      // Create new issue payload
      const newIssue: Issue = {
        id: uuidV4(),
        user_id: userId,
        title: issueForm.value.title,
        type: issueForm.value.type ? issueForm.value.type.value : null,
        created: new Date(),
        status: IssueStatus.open,
        description: issueForm.value.description,
        keywords: issueForm.value.keywords,
      };

      // Create issue
      await createIssue(newIssue).then((response) => {
        // Check if response is "success"
        if (response && response.data) {
          // Add issue into issue list
          store.dispatch(`${ActionModule}/${ActionTypes.ADD_ISSUE}`, newIssue);

          // Close modal
          close();
        }
      });
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
      showModal,
      hideModal,
      t,
      issueForm,
      close,
      issueTypeOptions,
      btnCreateIssueClick,
      formRules,
      addKeyword,
      removeKeyword,
    };
  },
};
</script>

<style></style>
