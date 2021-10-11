<template>
  <div id="divVipMain">
    <van-nav-bar id="navbarVip" title="会员"></van-nav-bar>
    <p>Vip</p>
    <van-field
      v-model="valueGuid"
      type="text"
      label="账号"
      label-width="3em"
      placeholder=""
      clearable
    ></van-field>
    <van-field
      v-model="valueImgid"
      type="text"
      label="图片"
      label-width="3em"
      placeholder=""
      clearable
    ></van-field>
    <van-button type="info" style="display: inline;" @click="spGetImage"
      >获取图片</van-button
    >
    <img class="imgaaa" :src="icon1" />
    <img class="imgaaa" :src="icon2" />
    <img class="imgaaa" :src="icon3" />
    <v-footer :index="2"></v-footer>
  </div>
</template>
<script>
import { Button, Field, NavBar } from "vant";
import Footer from "@/glomodel/Footer";
export default {
  name: "Home",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    "v-footer": Footer,
  },
  data() {
    return {
      valueA: "ABCD",
      valueGuid: "BBBB",
      valueImgid: "a.gif",
      icon1: "",
      icon2: "",
      icon3: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$toast("aaa");
    },
    spGetImage() {
      this.icon1 = "http://290e2b3d.nat123.fun/BBBB/" + this.valueImgid;
      this.icon2 = "http://290e2b3d.nat123.fun/BBBB/b.jpg";
      this.icon3 = "http://290e2b3d.nat123.fun/BBBB/c.gif";
      /*      
      this.icon = "";
      let data = {
        guid: this.valueGuid,
        imgid: this.valueImgid,
      };
      this.$api.SpPost("/imgshow", data).then((res) => {
        console.log(res.data);
        if (res.data.result === 0) {
          this.icon = res.data.img;
        } else {
          this.$toast.clear();
          this.$toast(res.data.msg);
          return;
        }
      });
      */
    },
  },
  created() {
    this.spGetImage();
  },
};
</script>
<style lang="sass" scoped></style>
