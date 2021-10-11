<template>
  <div>
    <van-uploader
      v-model="fileList"
      :multiple="true"
      :before-read="beforeRead"
      :after-read="afterRead"
      :max-count="2"
      upload-icon="plus"
    >
    </van-uploader>
    <van-button type="info" block style="width:50%;" @click="uploadImg"
      >保存</van-button
    >
    <div>
      <van-image id="image1" :src="imgaaaa"></van-image>
      <van-image id="image1" :src="imgbbbb"></van-image>
    </div>
    <van-button type="info" block style="width:50%;" @click="getImg"
      >获取图片</van-button
    >
  </div>
</template>

<script>
import { Button, Uploader, Icon } from "vant";
export default {
  name: "UploaderImageNew",
  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon,
  },
  data() {
    return {
      postData: [],
      fileList: [],
      //fileObj: Array,
      fileObj: [],
      imgBase64: [],
      imgaaaa: "",
      imgbbbb: "",
    };
  },
  methods: {
    afterRead(file) {
      // 大于1.5MB的jpeg和png图片都缩小像素上传
      if (
        /\/(?:jpeg|png|gif)/i.test(file.file.type) &&
        file.file.size > 100000
      ) {
        let canvas = document.createElement("canvas"); // 创建Canvas对象(画布)
        let context = canvas.getContext("2d"); // 获取对应的CanvasRenderingContext2D对象(画笔)
        let img = new Image(); // 创建新的图片对象
        img.src = file.content; // 指定图片的DataURL(图片的base64编码数据)
        img.onload = () => {
          // 监听浏览器加载图片完成，然后进行进行绘制
          /*
          canvas.width = 400;
          canvas.height = 332;          
          context.drawImage(img, 0, 0, 400, 332);
          */
          let w = img.width;
          let h = img.height;
          if (w > 300 || h > 300) {
            // 按比例压缩图片
            if (w > h) {
              const scale = h / w;
              w = 300;
              h = w * scale;
            } else if (w < h) {
              const scale = w / h;
              h = 300;
              w = h * scale;
            }
          }
          canvas.width = w;
          canvas.height = h;
          context.clearRect(0, 0, w, h);
          context.drawImage(img, 0, 0, w, h);
          console.log(w + ':' + h);
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          file.content = canvas.toDataURL(file.file.type, 0.8);
          // 最后将base64编码的图片保存到数组中，留待上传。
          if (this.imgBase64.length < 3) {
            this.imgBase64.push(file.content);
            console.log(this.imgBase64);
          } else {
            alert("最多上传2张图片");
          }
        };
      } else {
        // 不做处理的jpg和png以及gif直接保存到数组
        if (this.imgBase64.length < 3) {
          this.imgBase64.push(file.content);
          console.log(this.imgBase64);
        } else {
          alert("最多上传2张图片");
        }
      }
      /*
      console.log(file.file.name);      
      console.log(file.file.size);      
      console.log(file.file.type);      
      console.log(file.content);  
      */
    },

    beforeRead(file) {
      let regex = /(.jpg|.jpeg|.png|.bmp|.gif)$/;
      if (!regex.test(file.type)) {
        this.$toast("图片格式不支持上传");
        return false;
      } else {
        return true;
      }
    },
    //上传
    uploadImg() {
      //https://www.jianshu.com/p/66bf30c2a778  --2021-09-07图片压缩上传
      let data = {
        guid: this.$api.sfUUID(),
        imga: this.imgBase64[0],
        imgb: this.imgBase64[1],
      };
      console.log(data);

      this.$api
        .SpPost("/img/add", data)
        .then((res) => {
          console.log(res.data.result + ":" + res.data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getImg() {
      let data = { guid: "46ed3ea86d2242079e15a5e47ad8ef20" };
      this.$api
        .SpPost("/img/query", data)
        .then((res) => {
          console.log(
            res.data.result + ":" + res.data.msg + ":" + res.data.rData.imgA
          );
          this.imgaaaa = res.data.rData.imgA;
          this.imgbbbb = res.data.rData.imgB;
        })
        .catch((err) => {
          console.log(err);
        });
      /*
      getImg(src){
      var img_url =src
      var img = new Image()
      img.src=img_url
      this.pictureHeight.height = Math.ceil(img.height/img.width * 460)+'px'
      },
      //首先通过这个方法算出图片的高度/宽度比，460是我设置的宽度，计算得出需要的高度，然后修改容器的高
      //度，图片通过height:100%;width:100%撑开，这样图片就不会失真了        
      */
    },
  },
};
</script>

<style lang="sass" scoped></style>
