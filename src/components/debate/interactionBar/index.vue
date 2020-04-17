<template>
  <div class="interactBar">
    <interactionButton
      btn-content="Evaluer"
      @click.native="openModal('showModalRate')"
    />
    <interactionButton
      btn-content="Intéragir"
      @click.native="openModal('showModalInteract')"
    />
    <interactionButton
      btn-content="Infos"
      @click.native="openModal('showModalInfos')"
    />

    <modal
      v-show="showModalRate"
      :debate-name="debateName"
      modal-title="Evaluer la section en cours"
      :showFooter="true"
      @closeModal="closeModal('showModalRate')"
    >
      <rate-modal-template />
    </modal>

    <modal
      v-show="showModalInteract"
      :debate-name="debateName"
      modal-title="Posez votre question"
      :showFooter="true"
      @closeModal="closeModal('showModalInteract')"
    >
      <question-modal-template />
    </modal>

    <modal
      v-show="showModalInfos"
      :debate-name="debateName"
      modal-title="Questions du public"
      @closeModal="closeModal('showModalInfos')"
    >
      <debate-infos-modal-template />
    </modal>
  </div>
</template>

<script>
import interactionButton from "@/components/generic/buttons/InteractionButton";
import modal from "@/components/generic/modal/index";
import QuestionModalTemplate from "@/components/debate/interactionBar/questionModalTemplate";
import rateModalTemplate from "@/components/debate/interactionBar/rateModalTemplate";
import debateInfosModalTemplate from "@/components/debate/interactionBar/debateInfosModalTemplate";

export default {
  name: "interactionBar",
  components: {
    QuestionModalTemplate,
    rateModalTemplate,
    debateInfosModalTemplate,
    interactionButton,
    modal
  },
  props: {
    debateName: {
      type: String,
      default: "Empty debate name"
    }
  },
  data() {
    return {
      showModalRate: false,
      showModalInteract: false,
      showModalInfos: false
    };
  },
  methods: {
    openModal(modalToShow) {
      this[modalToShow] = true;
    },
    closeModal(modalToClose) {
      this[modalToClose] = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.interactBar {
  display: flex;
  margin: 5px 0;
  padding: 0 20px;
  flex: 1;
}
</style>
