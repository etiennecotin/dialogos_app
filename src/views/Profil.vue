<template>
  <div>
    <p>Profil</p>
    <input
      type="file"
      accept="image/*"
      @change="fileSelected"
      enctype="multipart/form-data"
      id="file-input"
    />
    <img
      v-if="imagePreviewUrl"
      :src="imagePreviewUrl"
      :alt="selectedFile.name"
    />
    <button @click="uploadImage" :disabled="!selectedFile">
      Mettre à jour la photo
    </button>
    <p v-if="uploadInProgress">{{ uploadAdvancement }}</p>
    <p v-if="uploaded">Votre photo a bien été mise à jour</p>
  </div>
</template>

<script>
import { initHeaderFromRouteParams } from "@/mixins/setHeader";
import { mapGetters } from "vuex";
export default {
  name: "Profil",
  mixins: [initHeaderFromRouteParams],
  data() {
    return {
      uploaded: false,
      uploadStarted: false,
      selectedFile: null,
      imagePreviewUrl: null
    };
  },
  computed: {
    ...mapGetters(["uploadAdvancement"]),
    uploadInProgress() {
      return (
        this.uploadAdvancement !== 100 && !this.uploaded && this.uploadStarted
      );
    }
  },
  methods: {
    fileSelected(evt) {
      evt.preventDefault();
      // console.log(evt);
      this.selectedFile = evt.target.files[0];
      // console.log(this.selectedFile);
      this.imagePreviewUrl = URL.createObjectURL(this.selectedFile);
    },
    async uploadImage() {
      this.uploadStarted = true;
      this.uploaded = false;
      this.uploaded = await this.$store.dispatch(
        "changeUserProfilPicture",
        this.selectedFile
      );
      this.uploadStarted = false;
    }
  }
};
</script>

<style scoped></style>
