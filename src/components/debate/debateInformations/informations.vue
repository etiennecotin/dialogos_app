<template>
  <div id="informations">
    <h1>{{ debateName }}</h1>
    <h2>Débatteurs</h2>
    <debaterList :debaterList="debaters" />
    <h2>Descriptions</h2>
    <p class="descsription">{{ description }}</p>
  </div>
</template>

<script>
import debaterList from "@/components/debate/debateInformations/debaterList";
export default {
  name: "informations",
  components: {
    debaterList
  },
  props: {
    debateName: {
      type: String
    },
    description: {
      type: String
    },
    debaters: {
      type: Array
    }
  },
  data() {
    return {
      descriptionData: null
    };
  }
};
</script>

<style lang="scss" scoped>
#informations {
  padding: 20px 25px;
  @media (min-width: 640px) {
    height: calc(74vh - 80px);
    overflow: auto;
    position: relative;
  }
  h1 {
    text-align: left;
    font-weight: bold;
    color: $yellow;
    font-size: 27px;
    font-family: $serif-font;
    margin: 10px 0;
  }
  h2 {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
    margin: 25px 0 16px 0;
  }
  .descsription {
    text-align: left;
    line-height: 1.5;
    letter-spacing: 1px;
  }
}
</style>
