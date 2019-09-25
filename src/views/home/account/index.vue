<template>
  <el-container>
    <el-aside width="430px">
      <el-form ref="accountForm" :model="accountForm" label-width="80px" :label-position="'top'">
        <el-form-item label="媒体名称">
          <el-input v-model="accountForm.name"></el-input>
        </el-form-item>
        <el-form-item label="媒体简介">
          <el-input v-model="accountForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="头条号id">
          <el-input v-model="accountForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定手机">
          <el-input v-model="accountForm.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="accountForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProfile">保存更新</el-button>
        </el-form-item>
      </el-form>
    </el-aside>
    <el-main>
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :http-request="customUpload"
      >
        <img v-if="accountForm.photo" :src="accountForm.photo" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      accountForm: {
        name: "",
        id: "",
        intro: "",
        email: "",
        mobile: "",
        photo:''
      },
      imageUrl:''
    };
  },
  created() {
    this.$axios.get("/mp/v1_0/user/profile").then(res => {
      console.log(res);
      this.accountForm = res.data.data;
    });
  },
  methods: {
      customUpload(data){
        let fd = new FormData();
        fd.append('photo',data.file);
        this.$axios.patch('/mp/v1_0/user/photo',fd).then(res=>{
          this.accountForm.photo = res.data.data.photo
          this.$store.commit('changeUser',this.accountForm)
        })
      },
      handleAvatarSuccess(data){
        this.imageUrl = data.file;
      },
      saveProfile(){
        this.$axios.patch('/mp/v1_0/user/profile',{
          data:{
            name:this.accountForm.name,
            intro:this.accountForm.intro,
            email:this.accountForm.emaile
          }
        }).then(res=>{
          console.log(res)
          this.$message.success('修改成功')
          this.$store.commit('changeUser',this.accountForm)
        })
      }
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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