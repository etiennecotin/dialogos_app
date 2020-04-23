<template>
  <div>
    <button class="modal-footer" :disabled="!enableSubmit" @click="submit">
      <circleArrowLight :disable="!enableSubmit" />
      <span class="validation-text" v-show="enableSubmit">Appuyer pour envoyer</span>
    </button>
  </div>
</template>

<script>
import circleArrowLight from "@/components/icons/circleArrowLight";
export default {
  name: "submitButton",
  components: {
    circleArrowLight
  },
  props: {
    enableSubmit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-footer {
  margin-top: 20%;
  display: flex;
  transition: 0.3s;
  align-items: center;
  background-color: transparent;
  border: none;
  .validation-text {
    margin-left: 20px;
    color: $grey;
  }
}
</style>
