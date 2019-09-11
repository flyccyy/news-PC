<template>
  <div class="login-wrapper">
    <div class="login-form-wrap">
      <div class="login-logo">
        <img src="../../assets/img/login_logo.png" alt />
      </div>
      <div class="login-form">
        <el-form :rules="rules" ref="loginForm" :model="loginForm">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="16">
                <el-input v-model="loginForm.code"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-button
                  class="send-code"
                  :disabled="sec!=60"
                  @click="sendCode"
                >{{sec==60?'发送验证码':sec}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="checked">
            <el-checkbox v-model="loginForm.checked" class="login-check"></el-checkbox>
            <span>
              我已阅读并同意
              <a href="javascript:void(0)">用户协议</a>和
              <a href="javascript:void(0)">隐私条款</a>
            </span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="login('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        mobile: "13911111111",
        code: "246810",
        checked: false
      },
      sec: 60,
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { len: 11, message: "手机号长度为11位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 6, message: "验证码长度为6位", trigger: "blur" }
        ],
        checked: [{ pattern: /true/, message: "请勾选", trigger: "change" }]
      }
    };
  },
  methods: {
    //发送验证码
    sendCode() {
      this.sec--;
      let timeId = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timeId);
          this.sec = 60;
        }
      }, 1000);
    },
    //点击登录按钮事件
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/mp/v1_0/authorizations", {
              mobile: this.loginForm.mobile,
              code: this.loginForm.code
            })
            .then(res => {
              console.log(res)
                this.$message.success("登录成功");
              let user = JSON.stringify(res.data.data);
              window.sessionStorage.setItem("user_info", user);
              this.$router.push("/home");
            })
            .catch(err => {
              this.$message.error("手机号或验证码错误");
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.login-wrapper {
  height: 100%;
  background: url("../../assets/img/login_bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form-wrap {
    width: 480px;
    height: 360px;
    background-color: #fff;
    border-radius: 15px;
    padding: 0 40px 40px;
    .login-logo {
      display: flex;
      justify-content: center;
      padding: 16px 0;
    }
    .send-code {
      width: 116px;
    }
    .login-check {
      margin-right: 10px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>