import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import api from "./glomodel/api";
import Mui from 'vue-awesome-mui';
import "@/assets/scss/style.scss";
import { Lazyload, Image as VanImage } from "vant";

Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.use(Lazyload).use(VanImage);
Vue.use(Mui);

/* Mui html5实用方法
<script>
  export default {
    methods:{
      plusReady () {
        const win = plus.webview.create();
        win.show();
      },
    },
    created () {
      // 扩展API是否准备好，如果没有则监听“plusready"事件
      if (window.plus) {
        this.plusReady()
      } else {
        document.addEventListener('plusready', this.plusReady, false) 
      }
    }
  }
</script>
*/

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
