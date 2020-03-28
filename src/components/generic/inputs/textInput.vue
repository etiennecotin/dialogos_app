<template>
  <div class="text-input">
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      :class="{ error: validateInput == null ? null : !validateInput }"
    />
  </div>
</template>

<script>
export default {
  name: "textInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "Your placeholder"
    }
  },
  data() {
    return {
      inputValue: "",
        // eslint-disable-next-line no-useless-escape
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  computed: {
    validateInput: function() {
      if (this.inputValue !== "") {
        switch (this.type) {
          case "email":
            return this.reg.test(this.inputValue);
          default:
            return true;
        }
      }
      return null;
    }
  },
  watch: {
    inputValue(val) {
      // console.log('old =>'+oldVal+ '| new => ' + val)
      this.$emit("inputValue", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.text-input {
  margin: 10px 0;
  input {
    background-color: transparent;
    outline: none;
    border: 0;
    border-bottom: 2px solid $yellow;
    transition: border-color 0.3s;
    caret-color: $white;
    height: 25px;
    color: $white;
    &:focus {
      border-color: $green;
      border-image-slice: 1;
    }
    &.error {
      border-color: $red;
      border-image-slice: 1;
    }
  }
}
</style>
