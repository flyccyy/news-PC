<template>
  <div>
    <div class="upload-wrap" @click="dialogVisible = true">
      <p v-if="!isShowImg">点击选择图片</p>
      <i v-if="!isShowImg" class="iconfont icon-image_upload"></i>
      <img :src="imageUrl" alt="" v-if="isShowImg" style="width:100%;height:100%">
    </div>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="上传图片" name="first">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="header"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="媒体库" name="second">
          <media @uploadImgMedia="imageUrl=$event"></media>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import media from "./media.vue";
export default {
  components: {
    media
  },
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      imageUrl: "",
      isShowImg:false,
      header: {
        Authorization: `Bearer ${
          JSON.parse(window.sessionStorage.getItem("user_info")).token
        }`
      }
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = res.data.url;
    },
    toSure() {
      this.isShowImg=true;
      this.$emit("uploadImgMedia", this.imageUrl);
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.upload-wrap {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  align-items: center;
  p {
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .iconfont {
    font-size: 120px;
    color: #eee;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>