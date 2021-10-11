<template>
  <div id="divFooterMain">
    <van-tabbar id="tabbarFooterA" v-model="active" active-color="#1989FA">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/Job">服务</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/Vip">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "Footer",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  props: {
    index: { type: Number, default: 0 },
  },
  data() {
    return {
      active: this.index,
    };
  },
};
</script>
<style lang="scss" scoped></style>
