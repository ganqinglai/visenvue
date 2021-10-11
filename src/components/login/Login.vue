<template>
  <div class="divLoginMain">
    <!--van-image :src="require('@/assets/img/logo.png')"/-->
    <div id="divLoginTop"></div>
    <div id="divLoginButtonA">
      <van-field
        v-model="valueUserid"
        type="text"
        label="账号"
        label-width="3em"
        placeholder="请输入账号"
        clearable
      ></van-field>
      <van-field
        v-model="valuePassword"
        type="password"
        label="密码"
        label-width="3em"
        maxlength="6"
        placeholder="请输入密码"
        clearable
      ></van-field>
      <div id="div5">
        <van-button type="default" style="width: 50%" size="small" @click="spLogin"
          >注册</van-button
        >        
        <van-button type="info" style="width: 50%" size="small" @click="spLogin"
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Field, Image } from "vant";
export default {
  name: "Login",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Image.name]: Image,
  },
  data() {
    return {
      valueUserid: "",
      valuePassword: "",
    };
  },
  methods: {
    spLogin() {
      let data = { id: this.valueUserid, pwd: this.valuePassword };
      let [id, pwd] = this.$api.sftest(data);
      if (!this.$api.isEmpty(id) || !this.$api.isEmpty(pwd)) {
        let data = {
          username: this.valueUserid,
          pwd: this.valuePassword,
        };
        this.$api.SpPost("/login/auth", data).then((res) => {
          console.log(res.data);
          if (res.data.result === 0) {
            localStorage.setItem("Flag", "Y");
            this.$router.push("./");
          } else {
            this.$toast.clear();
            this.$toast(res.data.msg);
            return;
          }
        });
      } else {
        this.$toast("密码不能为空!");
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
