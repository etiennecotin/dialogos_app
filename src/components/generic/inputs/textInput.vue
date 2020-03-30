<template>
  <div class="text-input">
    <label class="text-bold" :for="fieldId">{{textLabel}}</label>
    <input
      :id="fieldId"
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
      default: "text",
      require: true
    },
    placeholder: {
      type: String,
      default: "Your placeholder",
      require: true
    },
    fieldId: {
      type: String,
      require: true
    },
    textLabel: {
      type: String,
      default: "Your Label",
      require: true
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
  display: flex;
  flex-direction: column;
  label {
    margin: 10px 0;
    font-size: 20px;
    text-align: left;
  }
  input {
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: 100;
    margin: 5px 0;
    background-color: transparent;
    outline: none;
    border: 0;
    border-bottom: 2px solid $yellow;
    transition: border-color 0.3s;
    caret-color: $white;
    height: 30px;
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
