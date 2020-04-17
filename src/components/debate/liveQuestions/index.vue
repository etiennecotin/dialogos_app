<template>
  <div class="live-questions">
    <div class="wait-questions" v-show="waiting">
      <ripple />
    </div>
    <div class="questions-wrapper" v-show="!waiting">
      <question
        author="Jean bon"
        question="Quel est votre point de vu sur les pratiques de transhumanisme curatif
        ou d'amélioration et leur égalité l'une par rapport à l'autre?"
      />
      <question
        author="Arti cho"
        question="Quel est votre point de vu sur les pratiques de transhumanisme curatif
        ou d'amélioration et leur égalité l'une par rapport à l'autre?"
      />
      <question
        author="Etienne Cotin"
        question="Quel est votre point de vu sur les pratiques de transhumanisme curatif
        ou d'amélioration et leur égalité l'une par rapport à l'autre?"
      />
      <question
        author="Etienne Cotin"
        question="Quel est votre point de vu sur les pratiques de transhumanisme curatif
        ou d'amélioration et leur égalité l'une par rapport à l'autre?"
      />
      <question
        author="Etienne Cotin"
        question="Quel est votre point de vu sur les pratiques de transhumanisme curatif
        ou d'amélioration et leur égalité l'une par rapport à l'autre?"
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
  data() {
    return {
      waiting: false
    };
  }
};
</script>

<style lang="scss" scoped>
.live-questions {
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
    /*height: 100%;*/
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
