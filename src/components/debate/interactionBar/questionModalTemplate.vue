<template>
  <div>
    <!--    <modal-->
    <!--      v-show="showModalInteract"-->
    <!--      :debate-name="debateName"-->
    <!--      modal-title="Posez votre question"-->
    <!--      :showFooter="true"-->
    <!--      @closeModal="closeModal('showModalInteract')"-->
    <!--    >-->
    <textareaInput @inputChange="value => (question = value)" />
    <!--    </modal>-->
  </div>
</template>

<script>
import textareaInput from "@/components/generic/inputs/textareaInput";
// import modal from "@/components/generic/modal/index";

export default {
  name: "questionModalTemplate",
  components: {
    // modal,
    textareaInput
  },
  data() {
    return {
      question: ""
    };
  }
};
</script>

<style scoped></style>
