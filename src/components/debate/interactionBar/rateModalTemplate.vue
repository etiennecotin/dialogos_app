<template>
  <div>
    <radioInput
      title="Qualité de l'argumentaire ?"
      :values="['Construit', 'Riche', 'Faible']"
      @inputChange="item => (quality = item)"
    />
    <radioInput
      title="Pertinence de la question ?"
      :values="['Enrichissante', 'Utile', 'Inutile']"
      @inputChange="item => (pertinence = item)"
    />
    <radioInput
      title="Dynamisme ?"
      :values="['Sans intéruption', 'Mouvmenté', 'Silencieux']"
      @inputChange="item => (dynamic = item)"
    />
    <submitButton :enableSubmit="activeSubmit" @submit="submitQuestion" />
  </div>
</template>

<script>
import radioInput from "@/components/generic/inputs/radioInput";
import submitButton from "@/components/generic/modal/submitButton";
export default {
  name: "rateModalTemplate",
  components: {
    radioInput,
    submitButton
  },
  data() {
    return {
      quality: null,
      pertinence: null,
      dynamic: null
    };
  },
  computed: {
    activeSubmit() {
      return !!(this.quality && this.pertinence && this.dynamic);
    }
  },
  methods: {
    submitQuestion() {
      // this.$store.dispatch("sendQuestion", this.question);
    }
  }
};
</script>

<style scoped></style>
