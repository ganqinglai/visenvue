import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/home/Home.vue"),
    meta: { MustLogin: true }, // 必须登录才能访问
  },
  {
    path: "/job",
    name: "job",
    component: () => import("@/components/job/Job.vue"),
    meta: { MustLogin: true }, // 必须登录才能访问
  },
  {
    path: "/vip",
    name: "vip",
    component: () => import("@/components/vip/Vip.vue"),
    meta: { MustLogin: true }, // 必须登录才能访问
  },    
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/login/Login.vue"),
  },
];

const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
  let getFlag = localStorage.getItem("Flag");
  if (getFlag === "Y") {
    next();
  } else {
    if (to.meta.MustLogin) {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

export default router;
