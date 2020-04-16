<template>
  <div>
    <textarea
      name="textarea"
      id="textarea"
      placeholder="Votre question"
      v-model="textareaValue"
      ref="textarea"
      :style="inputStyle"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "textareaInput",
  data() {
    return {
      textareaValue: "",
      textareaHeight: "25px"
    };
  },
  computed: {
    inputStyle() {
      return {
        "min-height": this.textareaHeight
      };
    }
  },
  methods: {
    resize() {
      this.textareaHeight = `${this.$refs.textarea.scrollHeight}px`;
    }
  },
  watch: {
    textareaValue() {
      this.resize();
      this.$emit("inputChange", this.textareaValue);
    }
  }
};
</script>

<style lang="scss" scoped>
#textarea {
  width: 100%;
  height: 25px;
  min-height: 25px;
  background-color: transparent;
  border: none;
  font-family: $sans-serif-font;
  resize: none;
  border-bottom: 1px solid $white;
  overflow: hidden;
  outline: none;
  padding-bottom: 10px;
  color: $white;
}
</style>
