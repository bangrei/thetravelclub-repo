<template>
  <div class="form-wrapper">
    <div class="form-header">
      After Sales Request Form
    </div>
    <div class="embed-form" data-fc-key="cesepha"></div>
  </div>
</template>
<script>
export default {
  name: "LuggageForm",
  data(){
    return {
      brands: [
        "DELSEY","BRIGGS & RILLEY","WORLD TRAVELLER","TRAVELLERS CHOICE",
        "HEDGREN","TRAVELON","JANSPORT","HERSCHEL","EAGLE CREEK","XD DESIGN",
        "SARKROOTS","OSPREY","QUIKSILVER (BAG ONLY)","ACE","PEUGEOT","GREGORY",
        "PIQUADRO","HELLOLULU","RAWROW","FPM","PROTECA","THE NORTH FACE",
        "OTHERS"
      ],
      selectedBrand: "",
      customerName: "",
      contact: "",
      city: "",
      emailAddress: "",
      collectionName: "",
      purchasedFrom: "",
      size: "",
      wheels: null,
      zipper: null,
      sideHandle: null,
      shell: null,
      topHandle: null,
      tsaLock: null,
      mainZipper: null,
      trolleyHandle: null,
      sideBumper: null,
      pockerZipper: null,
      drawstrings: null,
      magneticButtons: null,
      buckles: null,
      rubberGuardProtector: null,
      velcro: null,
      others: null,
      additionalRequest: "",
      message: "",
      frontImage: null,
      damageImage: null,
      receiptImage: null,
      innerlabelImage: null,
      agreeTnc: false,
      processing: false,

    }
  },
  computed: {
    frontImageFilename(){
      if(!this.frontImage) return "";
      return this.frontImage.name;
    },
    damageImageFilename(){
      if(!this.damageImage) return "";
      return this.damageImage.name;
    },
    receiptImageFilename(){
      if(!this.receiptImage) return "";
      return this.receiptImage.name;
    },
    innerlabelImageFilename(){
      if(!this.innerlabelImage) return "";
      return this.innerlabelImage.name;
    },
  },
  methods: {
    showAlert(type, icon, message) {
      this.$store.dispatch("notification/updateNotification", {
        show: true,
        type: type,
        icon: icon,
        message: message,
        autoClose: true,
      });
    },
    submitForm(e){
      try{
        e.preventDefault();
        this.processing = true;
        if(!this.agreeTnc){
          this.showAlert("alert", "error_outline", "Please acknowledge the Privacy Policy agreement!");
          return;
        }
      } catch(err){
        this.showAlert("alert", "error_outline", `Something went wrong! ${err}`);
      } finally {
        this.processing = false;
        this.clearForm();
      }
    },
    clearForm(){
      this.selectedBrand = "";
      this.customerName = "";
      this.contact = "";
      this.city = "";
      this.emailAddress = "";
      this.collectionName = "";
      this.purchasedFrom = "";
      this.size = "";
      this.wheels = null;
      this.zipper = null;
      this.sideHandle = null;
      this.shell = null;
      this.topHandle = null;
      this.tsaLock = null;
      this.mainZipper = null;
      this.trolleyHandle = null;
      this.sideBumper = null;
      this.pockerZipper = null;
      this.drawstrings = null;
      this.magneticButtons = null;
      this.buckles = null;
      this.rubberGuardProtector = null;
      this.velcro = null;
      this.others = null;
      this.additionalRequest = "";
      this.message = "";
      this.frontImage = null;
      this.damageImage = null;
      this.receiptImage = null;
      this.innerlabelImage = null;
    },
    async uploadImage(event, fieldName) {
      if (!event.target.files) {
        this[fieldName] = null;
        return;
      }
      const maxSize = 2 * 1024 * 1024;
      const file = event.target.files[0];
      if (file.size > maxSize) {
        event.target.value = "";
        this[fieldName] = null;
        this.showAlert("alert", "error_outline", "File size must not exceed 2 MB.");
      }
      this[fieldName] = event.target.files[0];
    },
  }
}
</script>
<style scoped lang="scss">
.embed-form {
  width: 100%;
  max-width: 700px;
  margin-inline: auto;
}
.form-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 24px;
  form {
    padding: 16px;
    border: 1px solid $secondary-color-20;
    background: $white;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    max-width: 700px;
    margin-inline: auto;
    &:is(.disabled){
      opacity: 0.5;
      pointer-events: none;
    }
  }
  .form-title {
    font-weight: bold;
    text-align: left;
    width: fit-content;
    margin-top: 10px;
  }
  .form-input {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    &:is(.has-hint){
      gap: 0px !important;
    }
    .form-input-label {
      display: inline;
      font-size: 14px;
      font-weight: 500;
      .required {
        margin-left: 4px;
        color: red;
      }
    }
    .form-input-hint {
      font-size: small;
      color: $secondary-color-50;
      margin-bottom: 6px;
      display: block;
    }
    .input-wrapper {
      width: 100%;
      border-radius: 10px;
      border: 1px solid $secondary-color-20;
      overflow: hidden;
      padding-inline: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    &:is(.file-input){
      .input-wrapper {
        cursor: pointer;
        position: relative;
        height: 60px;
        background: $secondary-color-10;
        border: 1px dashed $secondary-color-30 !important;
      }
      input {
        cursor: pointer;
        opacity: 0;
        width: 100%;
        position: absolute;
        height: 60px;
      }
    }
    select, input {
      width: 100%;
      height: 40px;
      outline: none;
      border: none;
      font-size: 14px;
    }
    textarea {
      margin-top: 8px;
      width: 100%;
      height: 100px;
      outline: none;
      border: none;
      font-size: 14px;
    }
    .placeholder {
      color: $secondary-color-50;
      pointer-events: none;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      gap: 10px;
    }
  }
  button {
    background: $yellow-main;
    border: none;
    outline: none;
    color: $secondary-color-80;
    padding: 8px 32px;
    border-radius: 999px;
    cursor: pointer;
    width: fit-content;
    margin-inline: auto;
    font-weight: bold;
    margin-bottom: 24px;
  }
}
.form-header {
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 16px;
}
.form-inline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
.form-tnc {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  .form-tnc-desc {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
    text-align: left;
    font-size: 14px;
  }
}
.checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: fit-content;
  margin-bottom: 16px;
  font-size: 14px;
}
@media (min-width: 672px) {
  .form-inline {
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
  }
}
</style>