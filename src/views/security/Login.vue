<template>
  <div class="container">
    <H1 class="app-title">Dialogos</H1>

    <InputText
      :type="'email'"
      :placeholder="'Email'"
      :fieldId="'email'"
      :textLabel="'Inscription et connexion'"
      @inputValue="value => (email = value)"
    />

    <NextSolidButton @click.native="checkEmail" />

    <div class="bottom-action">
      <joinDebateButton
        content="Rejoindre un débat"
        @click.native="openJoinDebate"
      />
    </div>

    <modal
      v-show="showModalJoinDebate"
      debate-name="Rejoindre un débat"
      @closeModal="closeModal"
    >
      <join-debate-template />
    </modal>
  </div>
</template>

<script>
import NextSolidButton from "@/components/generic/buttons/nextSolidButton";
import InputText from "@/components/generic/inputs/textInput";
import joinDebateButton from "@/components/generic/buttons/bottomButton";
import modal from "@/components/generic/modal/index";
import joinDebateTemplate from "@/components/generic/modal/templates/joinDebateTemplate";

export default {
  name: "Login",
  components: {
    NextSolidButton,
    InputText,
    joinDebateButton,
    modal,
    joinDebateTemplate
  },
  data() {
    return {
      email: "",
      showModalJoinDebate: false
    };
  },
  methods: {
    openJoinDebate() {
      this.showModalJoinDebate = true;
    },
    closeModal() {
      this.showModalJoinDebate = false;
    },
    async checkEmail() {
      try {
        const userExist = await this.$store.dispatch(
          "checkUserExist",
          this.email
        );
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
  .bottom-action {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
