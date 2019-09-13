<template>
  <el-container class="home-wrapper">
    <el-aside width="230px" class="home-aside-wrap">
      <el-container class="home-aside-container">
        <el-header class="home-aside-header">
          <img src="../../assets/img/home_logo.png" alt width="120" height="30" />
        </el-header>
        <el-main class="home-aside-main">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#3f4557"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>内容管理</span>
              </template>
              <el-menu-item index="/publish">发布文章</el-menu-item>
              <el-menu-item index="/article">内容列表</el-menu-item>
              <el-menu-item index="1-3">评论列表</el-menu-item>
              <el-menu-item index="/media">素材管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>粉丝管理</span>
              </template>
              <el-menu-item index="3-1">粉丝概况</el-menu-item>
              <el-menu-item index="3-2">粉丝画像</el-menu-item>
              <el-menu-item index="3-3">粉丝列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="/account">
              <i class="el-icon-setting"></i>
              <span slot="title">账户信息</span>
            </el-menu-item>
          </el-menu>
        </el-main>
      </el-container>
    </el-aside>
    <el-main class="home-main-wrap">
      <el-container class="home-main-container">
        <el-header class="home-main-header">
          <el-row class="home-main-header-row">
            <el-col :span="10">
              <span>江苏传智播客教育科技股份有限公司</span>
            </el-col>
            <el-col :span="4" :offset="10">
              <el-dropdown class="home-main-header-drop"  @command="handleCommand">
                <span class="el-dropdown-link">
                  <img :src="$store.state.userForm.photo" width="40" alt />
                  <span>{{$store.state.userForm.name}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>github地址</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name:'home',
  methods: {
    handleCommand(command){
      window.sessionStorage.removeItem('user_info');
      this.$router.push('/login')
    }
  },
  created(){
    let obj = JSON.parse(window.sessionStorage.getItem('user_info'));
    this.$store.commit('changeUser',obj)
  }
};
</script>

<style lang="less">
.home-wrapper {
  height: 100%;
  .home-aside-wrap {
    height: 100%;
    background-color: #323745;
    .home-aside-container {
      height: 100%;
      .home-aside-header {
        background-color: #2d2d30;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .home-aside-main {
        padding: 0;
      }
    }
  }
  .home-main-wrap {
    padding: 0;
    .home-main-container {
      height: 100%;
      .home-main-header {
        background-color: pink;
        .home-main-header-row {
          height: 100%;
          display: flex;
          align-items: center;
          .home-main-header-drop {
            .el-dropdown-link{
              display: flex;
              align-items: center;
              img {
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>