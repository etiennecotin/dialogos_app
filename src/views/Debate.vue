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
            @debateEnded="onDebateEnd"
          />
        </div>
        <p class="sectionTitle">
          <span v-if="!debateEnded || !onCurrent">{{
            actualSectionSelected.name
          }}</span>
        </p>
        <div class="sectionContainer" ref="sectionContainer">
          <debate-finish v-if="debateEnded && onCurrent" />
          <not-started v-if="!isStarted" />
          <liveQuestions
            v-if="(!debateEnded || !onCurrent) && isStarted"
            :section-id="actualSectionSelected.uid"
            :sectionQuestions="actualSectionSelected.questions"
            @scrollToBottom="scrollToBottom"
          />
        </div>
        <interactionBar
          :debate-name="debate.debateInformations.name"
          :debateEnded="debateEnded || !isStarted"
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
import debateFinish from "@/components/debate/debateFinish";
import notStarted from "@/components/debate/notStarted";
import liveQuestions from "@/components/debate/liveQuestions/index";
import interactionBar from "@/components/debate/interactionBar/index";
import timers from "@/components/debate/timers/index";
import timeline from "@/components/debate/timeline/index";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import circleLoader from "@/components/generic/loader/circleLoader";
import { checkDateDifference } from "@/helpers/dateHelper";

export default {
  name: "Debate",
  mixins: [initHeader],
  components: {
    debateInformations: debateInformations,
    timers,
    timeline,
    liveQuestions,
    interactionBar,
    circleLoader,
    debateFinish,
    notStarted
  },
  props: ["debateId"],
  data() {
    return {
      debateIsLoad: false,
      debateEnded: false,
      selectSectionNumber: null
    };
  },
  async created() {
    gsap.registerPlugin(ScrollToPlugin);
    try {
      const debate = await this.$store.dispatch("getDebate", this.debateId);

      //wait store is set
      this.debateIsLoad = true;
      this.setHeader(debate.name, false);
      this.setActualDebate(debate);
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
    isStarted() {
      let startedDate = new Date(this.debate.startedAt.seconds * 1000); // date object
      let actualDate = new Date(); // date object

      const currentTime = Math.trunc(
        (actualDate.getTime() - startedDate.getTime()) / 1000
      );
      let time = parseInt(currentTime / 60);
      return time > 0;
    },
    onCurrent() {
      return this.selectSectionNumber === null;
    }
  },
  beforeDestroy() {
    this.$store.dispatch("unsubscribeDebate");
  },
  methods: {
    setActualDebate(debate) {
      const currentTime = checkDateDifference(debate.startedAt);
      if (currentTime < debate.duration && currentTime > 0) {
        this.$store.dispatch("setActualDebate", {
          actualDebateId: debate.uid,
          startedAt: debate.startedAt,
          duration: debate.duration
        });
      }
    },
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
    },
    onDebateEnd() {
      this.debateEnded = true;
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
