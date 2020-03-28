<template>
  <div class="container">
    <p>Register</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mixin } from "@/mixins/checkFormEmail";

export default {
  name: "Register",
  mixins: [mixin],
  mounted() {
    if (!this.isEmailExist) {
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    ...mapGetters(["isEmailExist"])
  }
};
</script>

<style scoped></style>
