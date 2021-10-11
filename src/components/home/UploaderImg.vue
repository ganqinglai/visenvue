<template>
  <div class="contain">
    <p class="p-header">上传照片最多可选取2张：</p>
    <div class="posting-uploader">
      <!--div
          class="posting-uploader-item"
          v-for="(item, index) in postData"
          :key="index"
        >
          <img :src="item.content" alt="图片" class="imgPreview" />
          <van-icon name="close" @click="delImg(index)" class="delte" />
        </div-->
      <!--van-uploader :after-read="onRead" :accept="'image/*'">
        <img src="../../assets/img/add.png" alt="等待传图" class="imgPreview" />
      </van-uploader-->
      <van-uploader
        v-model="fileList"
        :multiple="true"
        :before-read="beforeRead"
        :after-read="afterRead"
        :max-count="2"
        upload-icon="plus"
      >
        <!-- 注：这里是自定义上传样式  :before-delete="delUploadImg" -->
        <!-- <p>
        <van-icon
          name="plus"
          color="#07c160"
          size=".5rem"
        />
        上传照片
      </p> -->
      </van-uploader>
    </div>
    <van-button type="info" style="width:50%;" @click="spUploadImg"
      >保存</van-button
    >
  </div>
</template>

<script>
import { Button, Uploader, Icon } from "vant";
export default {
  name: "UploaderImage",
  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon,
  },
  props: {
    UUIDStr: String,
    imageList: Array,
  },
  data() {
    return {
      postData: [],
      fileList: [],
      fileObj: Array,
    };
  },
  mounted() {
    //this.postData = this.imageList;
  },
  watch: {
    /*
    imageList(value) {
      this.postData = value;
    },
    */
  },
  methods: {
    /*
    delImg(index) {
      console.log(index);

      if (isNaN(index) || index >= this.postData.length) {
        return false;
      }
      let tmp = [];
      for (let i = 0, len = this.postData.length; i < len; i++) {
        if (this.postData[i] !== this.postData[index]) {
          tmp.push(this.postData[i]);
        }
      }
      this.postData = tmp;

    },
    oversize() {},
    onRead(file) {
      console.log("a");
      //this.postData.push(file); // postData是一个数组
      let fd = new FormData();
      fd.append("guid", "AAAA");
      fd.append("imgs", file.file);
      console.log("b");
      this.$api
        .SpPost("/img/add", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.result + ":" + res.data.msg);
          //this.imgUrlListValue.push(res.data.urls[0].image); //这里上传到指定的图片服务器，成功后会返回图片的url
        })
        .catch((err) => {
          //alert(err);
          console.log(err);
        });
    },
    */
    // 返回布尔值
    beforeRead(file) {
      if (file instanceof Array) {
        //判断是否是数组
        file.forEach((v) => {
          this.checkFile(v);
        });
      } else {
        this.checkFile(file);
      }
      return true;
    },
    //图片类型检查
    checkFile(file) {
      const format = ["jpg", "png", "jpeg", "gif"];
      const index = file.name.lastIndexOf(".");
      const finalName = file.name.substr(index + 1);
      if (!format.includes(finalName.toLowerCase())) {
        this.$toast("请上传" + format.join(",") + "格式图片");
        return false;
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.fileObj = file;
      /*
      if (file instanceof Array) {
        file.map((v) => {
          v.status = "uploading";
          v.message = "上传中...";
          this.uploadImg(v);
        });
      } else {
        file.status = "uploading";
        file.message = "上传中...";
        this.uploadImg(file);
      }
      */
    },
    //上传
    uploadImg(file) {
      /*
      const formData = new FormData();
      formData.append("file", file.file);
      axios
        .post(this.uploadUrl, formData, {
          headers: this.headers,
        })
        .then((res) => {
          if (res.data) {
            if (file instanceof Array) {
              //判断是否是数组
              file.map((v, i) => {
                v.status = "success";
                v.message = "";
                v.url = res.data[i];
              });
            } else {
              file.status = "success";
              file.message = "";
              file.url = res.data.uploadUrl;
            }
          }
        })
        .catch((err) => {
          this.$notify({
            type: "warning",
            message: "上传失败",
          });
        });
        */
      if (file.length > 1) {
        for (let i = 0; i < file.length; i++) {
          console.log(file[i]);
          console.log(file[i].name + ":" + file[i].size);
          console.log("-------------------------");
          //console.log(this.$api.compressImg(file[i]));
        }
      } else {
        console.log(file);
        console.log(file.name + ":" + file.size);
        console.log("-------------------------");
        //console.log(this.$api.compressImg(file));
      }
      //https://www.jianshu.com/p/66bf30c2a778  --2021-09-07图片压缩上传
      let fd = new FormData();
      fd.append("guid", "BBBB");
      fd.append("imgs", file.file);
      this.$api
        .SpPost("/img/add", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.result + ":" + res.data.msg);
          file.status = "success";
          file.message = "";
          //this.imgUrlListValue.push(res.data.urls[0].image); //这里上传到指定的图片服务器，成功后会返回图片的url
        })
        .catch((err) => {
          console.log(err);
          file.status = "failed";
          file.message = "上传失败";
        });
    },
    spUploadImg(file) {
      file = this.fileObj;
      if (file instanceof Array) {
        file.map((v) => {
          v.status = "uploading";
          v.message = "上传中...";
          this.uploadImg(v);
        });
      } else {
        file.status = "uploading";
        file.message = "上传中...";
        this.uploadImg(file);
      }
    },
    /*
    //删除
    delUploadImg(item) {
      this.fileList = this.fileList.filter((v) => v.url != item.url);
    },
    */
    spImgbase64() {
      //this.spUploadImg(file);
      //https://blog.csdn.net/weixin_43426860/article/details/89319281
      //https://www.cnblogs.com/zhazhanitian/p/14355216.html重要
      //https://blog.csdn.net/huzecom/article/details/90232774 --nginx图片路径配置
    },
    /*
 async beforeRead(file){//async await 解决异步问题，
  var formData = new FormData();//创建新的form
  if(file.length){   //file.length为真的时候说明是多图上传  要循环多图将file对象放进form中
   for(let i=0;i<file.length;i++){
    var f = await this.$api.compressImg(file[i]) //await只能放在async函数里 await会等待异步方法的返回值拿到以后在执行后面的方法
   formData.set('file'+i,f)
   }
  }else{
   let f = await this.$api.compressImg(file)
   formData.set('file0',f)
  }
 }
    */
  },
};
</script>

<style lang="scss" scoped>
.upload-img-5 {
  margin: 5px 0 90px 0;
}
.upload-img-1 {
  margin: 5px 0 15px 0;
}
.imgPreview {
  height: 5px;
  width: 5px;
}
</style>
