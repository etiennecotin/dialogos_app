<template>
  <div>
    <textareaInput @inputChange="value => (question = value)" />
    <submitButton :enableSubmit="activeSubmit" @submit="submitQuestion" />
  </div>
</template>

<script>
import textareaInput from "@/components/generic/inputs/textareaInput";
import submitButton from "@/components/generic/modal/submitButton";
// import modal from "@/components/generic/modal/index";

export default {
  name: "questionModalTemplate",
  components: {
    textareaInput,
    submitButton
  },
  data() {
    return {
      question: ""
    };
  },
  computed: {
    activeSubmit() {
      return this.question.length > 0;
    }
  },
  methods: {
    submitQuestion() {
      this.$store.dispatch("sendQuestion", this.question);
    }
  }
};
</script>

<style scoped></style>
