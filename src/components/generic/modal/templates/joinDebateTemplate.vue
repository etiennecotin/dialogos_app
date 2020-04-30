<template>
  <div class="join-debate">
    <InputText
      type="email"
      placeholder="code débat"
      fieldId="join-debat-input"
      textLabel="Rentrez le code du débat"
      @inputValue="value => (debateCode = value)"
    />
  </div>
</template>

<script>
import InputText from "@/components/generic/inputs/textInput";
export default {
  name: "joinDebateTemplate",
  components: {
    InputText
  },
  data() {
    return {
      debateCode: null
    };
  }
};
</script>

<style lang="scss" scoped>
.join-debate {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
}
</style>
