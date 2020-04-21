<template>
  <div class="live-questions">
    <div class="wait-questions" v-show="waiting">
      <ripple />
    </div>
    <div class="questions-wrapper" v-show="!waiting">
      <question
        v-for="(question, index) in orderQuestions"
        :author="question.author"
        :question="question.name"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import ripple from "@/components/generic/loader/rippleLoader";
import question from "@/components/debate/liveQuestions/question";

export default {
  name: "liveQuestions",
  components: {
    ripple,
    question
  },
  props: {
    sectionId: {
      type: String
    },
    sectionQuestions: {
      type: Array
    }
  },
  mounted() {
    this.$store.dispatch("listenQuestions", this.sectionId);
  },
  computed: {
    waiting() {
      return !(this.sectionQuestions.length > 0);
    },
    orderQuestions() {
      return this.sortByKey(
        this.sectionQuestions.filter(item => item.validate),
        "validateDate"
      );
    }
  },
  methods: {
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        const x = a[key];
        const y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
  },
  watch: {
    sectionQuestions() {
      this.$emit("scrollToBottom");
    },
    sectionId(val) {
      this.$store.dispatch("listenQuestions", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.live-questions {
  width: 100%;
  /*height: 100%;*/
  /*display: flex;*/
  /*flex: 1;*/
  /*padding-bottom: 30px;*/
  /*flex: 1 1 auto;*/
  .wait-questions {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .questions-wrapper {
    height: 100%;
    display: flex;
    max-height: 100%;
    overflow: auto;
    justify-content: flex-start;
    align-items: flex-end;
    flex-wrap: wrap;
    /*flex-grow: 1;*/
  }
}
</style>
