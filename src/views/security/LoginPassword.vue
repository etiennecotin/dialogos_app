<template>
  <div class="container">
    <H1 class="app-title">Dialogos</H1>
    <p class="text-bold">Connexion à votre compte</p>

    <InputText
      :type="'password'"
      :placeholder="'Mot de passe'"
      @inputValue="value => (password = value)"
    />

    <NextSolidButton @click.native="checkLogin" />
  </div>
</template>

<script>
import NextSolidButton from "@/components/generic/buttons/nextSolidButton";
import InputText from "@/components/generic/inputs/textInput";
import { mixin } from "@/mixins/checkFormEmail";

export default {
  name: "LoginPassword",
  mixins: [mixin],
  components: {
    NextSolidButton,
    InputText
  },
  data() {
    return {
      password: ""
    };
  },
  methods: {
    async checkLogin() {
      try {
        await this.$store.dispatch("login", this.password);
        this.$router.push({ name: "home" });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 36px;
  /*height: calc(100vh - 60px);*/
  height: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;
  .app-title {
    font-family: $serif-font;
    font-size: 70px;
    letter-spacing: -1px;
    color: $yellow;
    font-weight: bold;
  }
}
</style>
