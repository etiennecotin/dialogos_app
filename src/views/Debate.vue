<template>
  <div>
    <p>In debate dyna: {{ debateId }}</p>
    <debatInformations />
  </div>
</template>

<script>
import { initHeader } from "@/mixins/setHeader";
import { mapGetters } from "vuex";
import debatInformations from "@/components/debateInformations/index";

export default {
  name: "Debate",
  mixins: [initHeader],
  components: {
    debatInformations
  },
  props: ["debateId"],
  async created() {
    try {
      const debateName = await this.$store.dispatch("getDebate", this.debateId);
      this.setHeader(debateName, false);
    } catch (e) {
      // console.log(e);
    }
  },
  computed: {
    ...mapGetters(["debate"])
  }
};
</script>

<style scoped></style>
