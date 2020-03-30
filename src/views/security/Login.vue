<template>
  <div class="container">
    <H1 class="app-title">Dialogos</H1>
    <p class="text-bold">Inscription et connexion</p>

    <InputText
      :type="'email'"
      :placeholder="'Email'"
      @inputValue="value => (email = value)"
    />

    <NextSolidButton @click.native="checkEmail" />
  </div>
</template>

<script>
import NextSolidButton from "@/components/generic/buttons/nextSolidButton";
import InputText from "@/components/generic/inputs/textInput";

export default {
  name: "Login",
  components: {
    NextSolidButton,
    InputText
  },
  data() {
    return {
      email: ""
    };
  },
  methods: {
    async checkEmail() {
      try {
        const userExist = await this.$store.dispatch("checkUserExist", this.email);
        if (userExist) {
          this.$router.push({ name: "loginPaswword" });
        } else {
          this.$router.push({ name: "register" });
        }
      } catch (e) {
        //  TODO gérer les erreurs
        // console.log(e.message);
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
