<template>
  <div class="app-header">
    <h1 class="text-primary">{{ title }}</h1>
    <hr class="bg-primary" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
});
</script>

<style></style>
