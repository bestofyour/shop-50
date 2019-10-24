<template>
  <el-container class="index">
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="tltie">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          unique-opened
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="user">
                <i class="el-icon-s-custom"></i>
              <span>用户界面</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-user-solid"></i>
              <span>角色列表</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-2">
                <i class="el-icon-s-tools"></i>
              <span>权限列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('是否退出该系统？', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('token')
          this.$router.push('login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.index {
  height: 100%;
}
.el-header {
  background-color: #ccc;
  display: flex;
  .logo {
    width: 180px;
    height: 40px;
    padding-top: 10px;
  }
  .tltie {
    flex: 1;
    line-height: 60px;
    text-align: center;
    color: #545c64;
  }
  .logout {
    width: 180px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      text-align: right;
      line-height: 60px;
      color: #545c64;
    }
  }
}
.el-aside {
  background-color: #545c64;
  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #ecf0f1;
}
</style>
