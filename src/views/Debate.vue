<template>
  <div class="container">
    <div class="debate">
      <div class="temporalInformations">
        <timers />
        <timeline />
      </div>
      <p class="sectionTitle">
        Présentation de Charle Henri sur les cœurs assistés mécaniquement
      </p>
      <div class="sectionContainer">
        <liveQuestions />
      </div>
      <interactionBar :debate-name="debate.debateInformations.name" />
      <debatInformations
        :debateInformations="debate.debateInformations"
        v-if="debateIsload"
      />
    </div>
  </div>
</template>

<script>
import { initHeader } from "@/mixins/setHeader";
import { mapGetters } from "vuex";
import debatInformations from "@/components/debate/debateInformations/index";
import liveQuestions from "@/components/debate/liveQuestions/index";
import interactionBar from "@/components/debate/interactionBar/index";
import timers from "@/components/debate/timers/index";
import timeline from "@/components/debate/timeline/index";

export default {
  name: "Debate",
  mixins: [initHeader],
  components: {
    debatInformations,
    timers,
    timeline,
    liveQuestions,
    interactionBar
  },
  props: ["debateId"],
  data() {
    return {
      debateIsload: false
    };
  },
  async created() {
    try {
      const debateName = await this.$store.dispatch("getDebate", this.debateId);
      //wait store is set
      this.debateIsload = true;
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

<style lang="scss" scoped>
.container {
  height: calc(100vh - 140px);
  .debate {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .temporalInformations {
      flex: 1;
    }
    .sectionTitle {
      color: $yellow;
      font-size: 1.25em;
      font-family: $serif-font;
      font-weight: 700;
      text-align: left;
      padding: 0 20px;
      margin: 10px 0;
    }
    .sectionContainer {
      padding: 0 20px;
      display: flex;
      flex: 10;
      flex-wrap: wrap;
      overflow: auto;
    }
  }
}
</style>
