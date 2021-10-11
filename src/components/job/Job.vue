<template>
  <div id="divJobMain">
    <van-nav-bar
      title="服务"
    ></van-nav-bar>
    <p>JOB</p>
    <v-footer :index="1"></v-footer>
  </div>
</template>
<script>
import { NavBar } from "vant";
import Footer from "@/glomodel/Footer";
export default {
  name: "Home",
  components: {
    [NavBar.name]: NavBar,
    "v-footer": Footer,
  },
  data() {
    return {
      valueA: "ABCD",
    };
  },
  methods: {
    onClickLeft() {
      //https://www.codeleading.com/article/68564172792/
      this.$toast("aaa");
    },
  },
};
</script>
<style lang="sass" scoped></style>
