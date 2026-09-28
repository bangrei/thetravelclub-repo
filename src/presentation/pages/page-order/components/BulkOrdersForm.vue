<template>
  <form class="form-container" @submit="submitForm($event)">
    <div class="form-head">
      <div class="head-title">Bulk Order Inquiry</div>
      <div class="head-content">
        <div class="head-content-text">Elevate your next giveaway with The Travel Club</div>
        <div class="head-content-text">Share your vision and budget with us, and we'll curate a selection of products for you.</div>
      </div>
    </div>
    <div class="form-body">
      <div class="form-body-title">Contact</div>
      <div class="form-body-content">
        <div class="form-input">
          <label for="name">Name <small class="required">*</small></label>
          <input type="text" name="name" v-model="name" @keyup="onKeyup('name')" required>
          <small class="input-error" v-show="error.name != ''">{{ error.name }}</small>
        </div>
        <div class="form-input">
          <label for="email">Email <small class="required">*</small></label>
          <input type="email" name="email" v-model="email" @keyup="onKeyup('email')" required>
          <small class="input-error" v-show="error.email != ''">{{ error.email }}</small>
        </div>
        <div class="form-input">
          <label for="mobile">Mobile Number <small class="required">*</small></label>
          <input type="text" name="mobile" v-model="mobile" @keyup="onKeyup('mobile')" required>
          <small class="input-error" v-show="error.mobile != ''">{{ error.mobile }}</small>
        </div>
      </div>
      <div class="form-body-title">Order Information</div>
      <div class="form-body-content">
        <div class="form-radio">
          <div class="form-radio-title">Is this Personal or Business? <small class="required">*</small></div>
          <label for="personal">
            <input type="radio" id="personal" name="accountType" value="personal" v-model="accountType"/> Personal
          </label>
          <label for="business">
            <input type="radio" id="business" name="accountType" value="business" v-model="accountType"/> Business
          </label>
          <small class="input-error" v-show="error.accountType != ''">{{ error.accountType }}</small>
        </div>
      </div>
    </div>
    <div class="form-footer">
      <button type="submit">{{ processing ? 'Processing...' : 'Submit Form' }}</button>
    </div>
  </form>
</template>
<script>
import utility from '../../../mixins/utility';
export default {
  name: "BulkOrdersForm",
  mixins: [utility],
  data(){
    return {
      name: "",
      email: "",
      mobile: "",
      accountType: "",
      processing: false,
      error: {
        name: "",
        email: "",
        mobile: "",
        accountType: ""
      }
    }
  },
  watch: {
    accountType(){
      this.error.accountType = '';
    }
  },
  methods: {
    onKeyup(field){
      let value = this[field];
      if(value.trim() == '') {
        this.error[field] = "This field is required!";
      } else {
        if(field == 'email' && !this.isValidEmail(value)){
          this.error[field] = 'Invalid email address';
        }
        this.error[field] = '';
      }
    },
    submitForm(event){
      event.preventDefault();
      if(this.processing) return;
      if(this.name == "") {
        this.error.name = "Full name is required!";
        return
      }
      if(this.email == "") {
        this.error.email = "Email address is required!";
        return
      } else if(!this.isValidEmail(this.email)){
        this.error.email = 'Invalid email address!';
        return;
      }
      if(this.mobile == "") {
        this.error.mobile = "Mobile number is required!";
        return
      }
      if(this.accountType == "") {
        this.error.accountType = "Is this Personal or Business?";
        return;
      }
      let message = "";
      let isSuccess = true;
      try {
        this.processing = true;
        this.$emit('form-submitted', event);
        message = "Your order was successfully submitted.";
      } catch(err){
        isSuccess = false;
        message = `Something went wrong! ${err}`;
      } finally {
        setTimeout(() => {
          let type = isSuccess ? "success" : "alert";
          let icon = isSuccess ? "check_circle" : "error_outline";
          this.showNotification(type, icon, message);
          this.processing = false;
          this.resetForm();
        }, 5000);
      }
    },
    resetForm(){
      this.name = "";
      this.email = "";
      this.mobile = "";
      this.accountType = "";
    }
  }
}
</script>
<style scoped lang="scss">
.form-container {
  width: 100%;
  max-width: 650px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  padding-block: 32px;
  color: $secondary-color-80;
}
.form-head {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  .head-title {
    background: $yellow-main;
    padding: 8px 24px;
    font-weight: bold;
    font-size: 16px;
    width: 100%;
    text-align: left;
  }
  .head-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
    gap: 24px;
    line-height: 22px;
  }
}
.form-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  .form-body-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-inline: 24px;
    gap: 24px;
  }
  .form-body-title {
    background: $yellow-main;
    padding: 8px 24px;
    font-weight: bold;
    font-size: 16px;
    width: 100%;
    text-align: left;
  }
  .form-input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 4px;
    label {
      font-size: 14px;
    }
    .input-error {
      min-height: 10px;
      display: block;
      color: red;
      font-size: 10px;
    }
    .required {
      color: red;
      font-size: 12px;
    }
    input {
      width: 100%;
      border: 1px solid transparent;
      outline: none;
      height: 40px;
      padding-inline: 16px;
      &:focus {
        border-color: $secondary-color-20;
      }
    }
  }
  .form-radio {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 4px;
    .form-radio-title {
      font-size: 14px;
    }
    .required {
      color: red;
      font-size: 12px;
    }
    .input-error {
      min-height: 10px;
      display: block;
      color: red;
      font-size: 10px;
    }
    label {
      font-size: 14px;
      padding-left: 0;
      cursor: pointer;
    }
  }
}
.form-footer {
  width: 100%;
  padding: 32px 24px;
  background: $yellow-main;
  color: $secondary-color-80;
  font-weight: bold;
  button {
    padding: 8px 32px;
    border-radius: 999px;
    border: 1px solid transparent;
    font-weight: bold;
    width: 100%;
    color: $white;
    background: $secondary-color-80;
    cursor: pointer;
    outline: none;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>