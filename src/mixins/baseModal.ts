import { defineEmits, ref } from "vue";

export default function () {
  // Declared close event name
  const closeModalEvent = "hide";

  // Declared to store dialog state
  let showModal = ref(true);

  // Used to reset modal state
  const hideModal = () => {
    showModal.value = false;
  };

  // Defined emit event
  // const emit = defineEmits(["hide"]);

  // Decalred to emit hide event
  // const emitHideEvent = () => {
  //   // Emit hide event
  //   emit("hide");
  // };

  return {
    showModal,
    hideModal,
    closeModalEvent,
  };
}
