<script setup lang="ts">
import { ref, watch } from "vue";
// import Store from "@/mixins/store.vue";

// Define props
const props = defineProps({
  user_id: {
    type: String,
    required: true,
  },
});

// Declared to store dialog state
let showModal = ref(true);

const store = ref();
store.value.store().dispatch();

watch(showModal, (newValue) => {
  // Emit event if dialog is closing
  if (newValue !== true) {
    // emitHideEvent();
  }
});

// Decalred function to
const hide = () => {
  // Reset modal state
  showModal.value = false;
};

// type-based
// const emit = defineEmits<{
//   (e: "change", id: number): void;
//   (e: "update", value: string): void;
// }>();



// Defined emit events only if use "<script lang='ts' setup></script>" WITH "SETUP"
const emit = defineEmits(["hide"]);
emit("hide");
</script>
