<template>
  <div class="inputRadio">
    <p class="title">{{ title }}</p>
    <div class="inputFields">
      <label v-for="(value, index) in values" :key="index" :for="value + index">
        <input
          type="radio"
          :id="value + index"
          :value="index"
          v-model="picked"
        />
        <span>{{ value }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "radioInput",
  props: {
    title: {
      type: String,
      default: "Your title"
    },
    values: {
      type: Array
    }
  },
  data() {
    return {
      picked: null
    };
  },
  watch: {
    picked() {
      this.$emit("inputChange", this.picked);
    }
  }
};
</script>

<style lang="scss" scoped>
.inputRadio {
  margin-top: 30px;
  &:first-child {
    margin-top: 40px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
  }
  .inputFields {
    display: flex;
    justify-content: start;
    margin-top: 15px;
    flex-wrap: wrap;
    label {
      display: flex;
      align-items: center;
      margin-left: 15px;
      padding-bottom: 15px;
      flex: 1;
      justify-content: center;
      &:first-child {
        margin-left: 0;
        flex: none;
        justify-content: start;
      }
      span {
        margin-left: 25px;
        color: $yellow;
        font-weight: 300;
        position: relative;
      }
      input {
        z-index: -1;
        position: absolute;
        opacity: 0;

        & ~ span {
          &:before {
            will-change: opacity, box-shadow;
            animation: sparkles 700ms ease-in-out;
            content: "";
            position: absolute;
            top: 50%;
            left: -15px;
            transform: translate(-50%, -50%);
            width: 18px;
            height: 18px;
            border-radius: 10px;
            background-color: transparent;
            border: 1px solid $white;
          }
        }
        &:checked ~ span {
          &:before {
            border: 1px solid $yellow;
          }
          &:after {
            content: "";
            position: absolute;
            top: 50%;
            left: -15px;
            transform: translate(-50%, -50%);
            width: 12px;
            height: 12px;
            border-radius: 10px;
            background-color: $yellow;
          }
        }
      }
    }
  }
}
</style>
