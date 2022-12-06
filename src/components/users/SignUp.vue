<template>
  <v-card class="mx-auto px-6 py-8" max-width="700">
    <v-form v-model="signupForm.form">
      <v-row>
        <!-- FIRST NAME -->
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-label>{{ t("form.firstName") }}</v-label>
          <v-text-field
            v-model="signupForm.firstName"
            :rules="formRules.firstName"
            clearable
          ></v-text-field>
        </v-col>
        <!-- LAST NAME -->
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-label>{{ t("form.lastName") }}</v-label>
          <v-text-field
            v-model="signupForm.lastName"
            :rules="formRules.lastName"
            clearable
          ></v-text-field>
        </v-col>
        <!-- ADDRESS -->
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-label>{{ t("form.address") }}</v-label>
          <v-text-field
            v-model="signupForm.address"
            :rules="formRules.address"
            clearable
          ></v-text-field>
        </v-col>
        <!-- EMAIL -->
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-label>{{ t("form.email") }}</v-label>
          <v-text-field
            v-model="signupForm.email"
            :rules="formRules.email"
            clearable
          ></v-text-field>
        </v-col>
        <!-- PASSWORD -->
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-label>{{ t("form.password") }}</v-label>
          <v-text-field
            v-model="signupForm.password"
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
          <!-- SIGN IN -->
          <v-btn color="primary" size="large" @click="btnSignInClick">
            {{ t("btns.signIn") }}
          </v-btn>

          <!-- SIGN UP -->
          <v-btn
            :disabled="!signupForm.form"
            color="primary"
            size="large"
            @click="signUp"
          >
            {{ t("btns.signUp") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { v4 as uuidV4 } from "uuid";
import { createUser } from "@/utils/users";
import { User } from "@/types";
import sha256 from "sha256";
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    // Import translation instance
    const { t } = useI18n();

    // Create router instance
    const router = useRouter();

    // Declared sign up form type
    type formType = {
      form: boolean;
      firstName: string | null;
      lastName: string | null;
      address: string | null;
      email: string | null;
      password: string | null;
    };

    // Declared form fields
    const signupForm = ref({
      form: false,
      firstName: null,
      lastName: null,
      address: null,
      email: null,
      password: null,
    } as formType);

    const formRules = {
      firstName: [
        (value: string) => {
          // Check if first name is empty
          if (!value || value.trim().length === 0) {
            return t("form.messages.valueIsRequired");
          }

          return true;
        },
      ],
      lastName: [
        (value: string) => {
          // Check if last name is empty
          if (!value || value.trim().length === 0) {
            return t("form.messages.valueIsRequired");
          }

          return true;
        },
      ],
      address: [
        (value: string) => {
          // Check if address is empty
          if (!value || value.trim().length === 0) {
            return t("form.messages.valueIsRequired");
          }

          return true;
        },
      ],
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
      signupForm.value.firstName = null;
      signupForm.value.lastName = null;
      signupForm.value.address = null;
      signupForm.value.email = null;
      signupForm.value.password = null;
    };

    // Sign-up button handler
    const signUp = async () => {
      // Check if form is not valid
      if (
        signupForm.value.form !== true ||
        !signupForm.value.email ||
        !signupForm.value.password
      ) {
        return false;
      }

      // Generate hash of password
      const hash = sha256(signupForm.value.password);

      // Prepare payload
      const payload: User = {
        id: uuidV4(),
        firstName: signupForm.value.firstName,
        lastName: signupForm.value.lastName,
        address: signupForm.value.address,
        email: signupForm.value.email,
        password: hash,
        created: new Date(),
      };

      // Send create user request
      await createUser(payload).then((response) => {
        // Reset Form
        resetForm();

        // Redirect to home page
        redirectToPage("/");
      });
    };

    // Redirect to home page
    const redirectToPage = (path: string) => {
      // Redirect to home page
      router.push({ path: path });
    };

    // Sign in button handler
    const btnSignInClick = () => {
      // redirect to "Sign In" page
      redirectToPage("/signin");
    };

    return {
      t,
      signupForm,
      formRules,
      signUp,
      btnSignInClick,
    };
  },
};
</script>

<style></style>
