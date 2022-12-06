<template>
  <v-card class="mx-auto px-6 py-8" max-width="500">
    <v-form v-model="loginForm.form">
      <v-row>
        <!-- EMAIL -->
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <v-label>{{ t("form.email") }}</v-label>
          <v-text-field
            v-model="loginForm.email"
            :rules="formRules.email"
            clearable
          ></v-text-field>
        </v-col>
        <!-- PASSWORD -->
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <v-label>{{ t("form.password") }}</v-label>
          <v-text-field
            v-model="loginForm.password"
            :rules="formRules.password"
            type="password"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <div class="d-flex justify-space-between w-100">
          <!-- SIGN UP/ REGISTER -->
          <v-btn color="primary" size="large" @click="btnRegisterClick">
            {{ t("btns.register") }}
          </v-btn>

          <!-- SIGN IN -->
          <v-btn
            :disabled="!loginForm.form"
            color="primary"
            size="large"
            @click="signIn"
          >
            {{ t("btns.signIn") }}
          </v-btn>
        </div>
      </v-card-actions>
      <!-- ERROR MESSAGE -->
      <div v-if="errorMsg && errorMsg.length > 0" class="text-danger">
        {{ errorMsg }}
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { loginUser } from "@/utils/users";
import { User } from "@/types";
import sha256 from "sha256";
import { useStore } from "vuex";
import { ActionModule, ActionTypes } from "@/store/users/action-types";
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    // Import translation instance
    const { t } = useI18n();

    // Declared store instance
    const store = useStore();

    // Create router instance
    const router = useRouter();

    // Declared to store error message
    let errorMsg = ref<string | null>();

    // Declared sign up form type
    type formType = {
      form: boolean;
      email: string | null;
      password: string | null;
    };

    // Prepare payload
    const loginForm = ref({
      email: null,
      password: null,
    } as formType);

    const formRules = {
      email: [
        (value: string) => {
          // Check if title is empty
          if (!value || value.trim().length === 0) {
            return t("form.messages.valueIsRequired");
          }

          // Check if email is valid
          const result = /.+@.+\..+/.test(value);

          // Check if email is not valid
          if (result === false) {
            return t("form.messages.invalidEmail");
          }

          return true;
        },
      ],
      password: [
        (value: string) => {
          // Check if title is empty
          if (!value || value.trim().length === 0) {
            return t("form.messages.valueIsRequired");
          }
          // Check if password length less than 8
          if (value.trim().length < 8) {
            return t("form.messages.passwordTooShort");
          }

          return true;
        },
      ],
    };

    // Reset sign-up form
    const resetForm = () => {
      loginForm.value.email = null;
      loginForm.value.password = null;
    };

    // Sign-up button handler
    const signIn = async () => {
      // Reset message
      errorMsg.value = null;

      // Check if form is not valid
      if (
        loginForm.value.form !== true ||
        !loginForm.value.email ||
        !loginForm.value.password
      ) {
        return false;
      }

      // Generate hash of password
      const hash = sha256(loginForm.value.password);

      // Send create user request
      await loginUser(loginForm.value.email, hash).then((response) => {
        if (response && response.data && response.data.length > 0) {
          // prepared user details
          const userDetails: User = {
            ...response.data[0],
            password: null,
          };

          // Set user details
          store.dispatch(
            `${ActionModule}/${ActionTypes.SET_AUTH_DETAILS}`,
            userDetails
          );

          // Reset Form
          resetForm();

          // Redirect to home page
          redirectToPage("/");
        } else {
          // Set error message
          errorMsg.value = t("form.messages.invalidLogin");
        }
      });
    };

    // Redirect to home page
    const redirectToPage = (path: string) => {
      // Redirect to home page
      router.push({ path: path });
    };

    // Register button click handler
    const btnRegisterClick = () => {
      // Redirect to home page
      redirectToPage("/signup");
    };

    return {
      t,
      loginForm,
      formRules,
      signIn,
      errorMsg,
      btnRegisterClick,
    };
  },
};
</script>

<style></style>
