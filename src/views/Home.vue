<template>
  <div class="container">
    <p class="upcoming-debates">Vos prochains débats</p>

    <debateList :debatesList="nextDebatesCollection" />

    <div class="bottom-actions">
      <div class="create-debate">
        <classicButton content="Créer un débat" />
      </div>

      <router-link
        v-if="inDebate"
        :to="{ name: 'debate', params: { uid: inDebate.actualDebateId } }"
        class="return-to-debate-link"
      >
        <bottomButton>
          <div class="on-live"></div>
          <span class="return-to-live">Retourner au débat en cours</span>
        </bottomButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import { initHeaderFromRouteParams } from "@/mixins/setHeader";
import debateList from "@/components/generic/debateList/index";
import classicButton from "@/components/generic/buttons/classicButton";
import bottomButton from "@/components/generic/buttons/bottomButton";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  mixins: [initHeaderFromRouteParams],
  components: {
    debateList,
    classicButton,
    bottomButton
  },
  data() {
    return {
      debatesLoaded: false
    };
  },
  computed: {
    ...mapGetters(["inDebate", "nextDebatesCollection", "userInfos"])
  },
  methods: {
    async getNextDebate() {
      await this.$store.dispatch("getUserNextDebate");
      this.debatesLoaded = true;
    }
  },
  watch: {
    userInfos() {
      //  Wait user infos for get debates
      this.getNextDebate();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 20px;
  .upcoming-debates {
    font-size: 27px;
    font-weight: bold;
    margin: 10px 0;
    text-align: left;
  }
  .bottom-actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .create-debate {
      padding: 10px 20px;
    }
    .return-to-debate-link {
      text-decoration: none;
      .on-live {
        width: 10px;
        height: 10px;
        background-color: $red;
        border-radius: 10px;
        margin-right: 20px;
      }
      .return-to-live {
        font-weight: 600;
      }
    }
  }
}
</style>
