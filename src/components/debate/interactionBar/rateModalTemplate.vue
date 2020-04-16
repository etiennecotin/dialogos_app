<template>
  <div>
    <radioInput
      title="Qualité de l'argumentaire ?"
      :values="['Construit', 'Riche', 'Faible']"
    />
    <radioInput
      title="Pertinence de la question ?"
      :values="['Enrichissante', 'Utile', 'Inutile']"
    />
    <radioInput
      title="Dynamisme ?"
      :values="['Sans intéruption', 'Mouvmenté', 'Silencieux']"
    />
  </div>
</template>

<script>
import radioInput from "@/components/generic/inputs/radioInput";
export default {
  name: "rateModalTemplate",
  components: {
    radioInput
  }
};
</script>

<style scoped></style>
