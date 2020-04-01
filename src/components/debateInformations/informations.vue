<template>
  <div id="informations">
    <h1>Debate name</h1>
    <h2>Débatteurs</h2>
    <div v-for="debater in debaters" :key="debater.uid">
      <p></p>{{debater.firstName}}
    </div>
    <h2>Descriptions</h2>
    <p class="descsription">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "informations",
  props: {
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
    margin: 10px 0;
  }
  .descsription {
    text-align: left;
    line-height: 1.5;
    letter-spacing: 1px;
  }
}
</style>
