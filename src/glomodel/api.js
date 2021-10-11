import { Toast } from "vant";
import Vue from "vue";
import axios from "axios";
// const qs = require("qs");
// https://www.jianshu.com/p/f12cf6e0547d
// https://www.cnblogs.com/chaoyuehedy/p/9931146.html  --2021-04-20
// https://www.cnblogs.com/panax/p/10942889.html       --2021-04-20
// https://blog.csdn.net/qq_37939251/article/details/112863133

Vue.use(Toast);

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

async function SpPost(url, data) {
  const response = await axios({
    method: "post",
    //baseURL: "/",
    baseURL:
      process.env.NODE_ENV === "development"
        ? "/api"
        : "http://10ca3d1.nat123.fun:32959/api", //"https://330d88ca.nat123.fun/",
    url,
    data: data, //qs.stringify(data), //
    timeout: 50000,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  return response;
}

function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

function sftest(data) {
  //let dataList = JSON.stringify(data); //JSON.parse(data);
  let [id, pwd] = [data.id, data.pwd];
  if (isEmpty(id) || isEmpty(pwd)) {
    return [];
  } else {
    return [id, pwd];
  }
}

function sfUUID() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export default {
  sftest,
  isEmpty,
  SpPost,
  sfUUID,  
};
