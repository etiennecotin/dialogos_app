<template>
  <div class="container">
    <H1 class="app-title">Dialogos</H1>
    <p class="text-bold">Inscription</p>

    <InputText
      :type="'password'"
      :placeholder="'Password'"
      @inputValue="value => (password = value)"
    />
    <p>Mot de passe oublié ?</p>

    <div>
      <input type="checkbox" id="rememberMe" v-model="rememberMe" />
      <label for="rememberMe">Se souvenir de moi</label>
    </div>

    <NextSolidButton @click.native="validRegister" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mixin } from "@/mixins/checkFormEmail";
import NextSolidButton from "@/components/generic/buttons/nextSolidButton";
import InputText from "@/components/generic/inputs/textInput";

export default {
  name: "Register",
  mixins: [mixin],
  components: {
    NextSolidButton,
    InputText
  },
  data() {
    return {
      password: "",
      rememberMe: false
    };
  },
  computed: {
    ...mapGetters(["isEmailExist"])
  },
  methods: {
    async validRegister() {
      try {
        await this.$store.dispatch("registerUser", {
          password: this.password
        });
        this.$router.push({ name: "home" });
      } catch (e) {
        //  TODO gérer les erreurs et supprimer le suser si ça n'a pas fonctionné
        console.log(e.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 36px;
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
