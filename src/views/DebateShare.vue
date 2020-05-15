<template>
  <div class="debate-share">
    <div>
      <div ref="qrcode"></div>
      <h1>Scannez le QR code pour rejoindre le débat</h1>
    </div>
  </div>
</template>

<script>
import { VanillaQR } from "@/assets/jsLib/vanillaQR";
export default {
  name: "DebateShare",
  props: ["debateId"],
  mounted() {
    this.generateQrCode();
  },
  methods: {
    generateQrCode() {
      const url = `${window.location.origin}/debate/${this.debateId}`;
      const qr = new VanillaQR({
        url: url,
        size: 280,
        colorLight: "#292929",
        colorDark: "#D7BB61",
        //output to table or canvas
        toTable: false,
        //Ecc correction level 1-4
        ecclevel: 1,
        //Use a border or not
        noBorder: true,
        //Border size to output at
        borderSize: 0
      });

      this.$refs.qrcode.appendChild(qr.domElement);
    }
  }
};
</script>

<style lang="scss" scoped>
.debate-share {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  h1 {
    font-size: 22px;
    margin-top: 20px;
  }
}
</style>
