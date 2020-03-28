import { mapGetters } from "vuex";

export const mixin = {
  mounted() {
    if (!this.isEmailExist) {
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    ...mapGetters(["isEmailExist"])
  }
};
