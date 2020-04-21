<template>
  <div class="container">
    <transition name="fade">
      <div class="debateLoader" v-if="!debateIsLoad">
        <circleLoader />
      </div>
    </transition>
    <transition name="fade">
      <div class="debate" v-if="debateIsLoad">
        <div class="temporalInformations">
          <timers />
          <timeline
            :sections="sections"
            :debateDuration="debate.debateInformations.duration"
            :startedAt="debate.startedAt"
            @selectSection="selectSection"
          />
        </div>
        <p class="sectionTitle">
          {{ actualSectionSelected.name }}
          <button @click="scrollToBottom">scroll bot</button>
        </p>
        <div class="sectionContainer" ref="sectionContainer">
          <liveQuestions
            :section-id="actualSectionSelected.uid"
            :sectionQuestions="actualSectionSelected.questions"
            @scrollToBottom="scrollToBottom"
          />
        </div>
        <interactionBar
          :debate-name="debate.debateInformations.name"
          :debateEnded="isFinish"
        />
        <debateInformations
          :debateInformations="debate.debateInformations"
          v-if="debateIsLoad"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { initHeader } from "@/mixins/setHeader";
import { mapGetters } from "vuex";
import debateInformations from "@/components/debate/debateInformations/index";
import liveQuestions from "@/components/debate/liveQuestions/index";
import interactionBar from "@/components/debate/interactionBar/index";
import timers from "@/components/debate/timers/index";
import timeline from "@/components/debate/timeline/index";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import circleLoader from "@/components/generic/loader/circleLoader";

export default {
  name: "Debate",
  mixins: [initHeader],
  components: {
    debateInformations: debateInformations,
    timers,
    timeline,
    liveQuestions,
    interactionBar,
    circleLoader
  },
  props: ["debateId"],
  data() {
    return {
      debateIsLoad: false,
      selectSectionNumber: null
    };
  },
  async created() {
    gsap.registerPlugin(ScrollToPlugin);
    try {
      const debateName = await this.$store.dispatch("getDebate", this.debateId);
      //wait store is set
      this.debateIsLoad = true;
      this.setHeader(debateName, false);
    } catch (e) {
      // console.log(e);
    }
  },
  computed: {
    ...mapGetters(["debate", "actualSection"]),
    debateLoaded() {
      return this.debateIsLoad && this.sections;
    },
    sections() {
      return this.debate.sections;
    },
    actualSectionSelected() {
      if (this.selectSectionNumber) {
        return this.sections.find(
          item => item.order === this.selectSectionNumber
        );
      }
      return this.actualSection;
    },
    isFinish() {
      let startedDate = new Date(this.debate.startedAt.seconds * 1000); // date object
      let actualDate = new Date(); // date object

      const currentTime = Math.trunc(
        (actualDate.getTime() - startedDate.getTime()) / 1000
      );

      let time = parseInt(currentTime / 60);
      return time > this.debate.debateInformations.duration;
    }
  },
  beforeDestroy() {
    this.$store.dispatch("unsubscribeDebate");
  },
  methods: {
    scrollToBottom() {
      const liveQuestions = this.$refs.sectionContainer;
      if (liveQuestions) {
        gsap.to(liveQuestions, {
          duration: 2,
          scrollTo: { y: "max" }
        });
      }
    },
    selectSection(sectionNumber) {
      this.selectSectionNumber = sectionNumber;
    }
  },
  watch: {
    debateLoaded(val) {
      if (val) {
        this.scrollToBottom();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.container {
  height: calc(100vh - 140px);
  .debateLoader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
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
