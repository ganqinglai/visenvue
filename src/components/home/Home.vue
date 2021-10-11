<template>
  <div id="divHomeMain">
    <van-nav-bar id="navbarVip" title="首页"></van-nav-bar>
    <van-notice-bar
      color="#1989FA"
      left-icon="volume-o"
      text="在代码阅读过程中唯一标准。"
    />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <p>{{ valueA }}</p>
    <v-UploaderImage></v-UploaderImage>
    <p>{{ valueA }}</p>
    <v-UploaderImageNew></v-UploaderImageNew>
    <van-button type="info" style="display: inline;" @click="spSave"
      >保存</van-button
    >
    <van-button plain type="info" style="display: inline;" @click="spCancel"
      >退出</van-button
    >
    <div id="divfooter">

    </div>
    <v-footer :index="0"></v-footer>
  </div>
</template>
<script>
import {
  Button,
  Field,
  Image,
  NavBar,
  NoticeBar,
  Swipe,
  SwipeItem,
} from "vant";
import Footer from "@/glomodel/Footer";
import UploaderImage from "@/components/home/UploaderImg";
import UploaderImageNew from "@/components/home/UploaderImgnew";

export default {
  name: "Home",
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Image.name]: Image,
    [NavBar.name]: NavBar,
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    "v-footer": Footer,
    "v-UploaderImage": UploaderImage,
    "v-UploaderImageNew": UploaderImageNew,
  },
  data() {
    return {
      valueA: "ABCD",
      images: [
        require("@/assets/img/rsda10.jpg"),
        require("@/assets/img/rsda20.jpg"),
        require("@/assets/img/rsda30.jpg"),
        require("@/assets/img/rsda50.jpg"),
      ],
    };
  },
  methods: {
    spCancel() {
      localStorage.setItem("Flag", "N");
      this.$router.push("/login");
    },
    spSave() {
      // https://blog.csdn.net/yuan_618859/article/details/103241877 订阅号实例
    },
  },
};
</script>
<style lang="sass" scoped></style>
