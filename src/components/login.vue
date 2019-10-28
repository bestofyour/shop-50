<template>
  <div class="login">
    <el-form ref="form" status-icon :model="form" :rules="rules" label-width="80px">
      <img class="pic" src="../assets/cat.jpg" alt />
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" prop="password" type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sumbitBtn" class="loginBtn">登录</el-button>
        <el-button @click="resetBtn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    resetBtn () {
      this.$refs.form.resetFields()
    },
    async sumbitBtn () {
      //    const res = await this.$axios.post('login', this.form)
      //   if (res.status === 200) {
      //   this.$message.success(res.data.meta.msg)
      //   localStorage.setItem('token', res.data.data.token)
      //  this.$router.push('/index')
      //  }
      // }

      this.$refs.form.validate(flag => {
        if (!flag) return
        this.$axios.post('http://localhost:8888/api/private/v1/login', this.form).then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            localStorage.setItem('token', res.data.data.token)
            this.$router.push('/index')
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" >
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
}
.el-form {
  width: 400px;
  padding: 20px;
  padding-top: 80px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 200px;
  border-radius: 20px;
  position: relative;
  .pic {
    width: 140px;
    height: 120px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -60px;
    border-radius: 50%;
    border: 5px solid #fff;
  }
  .loginBtn {
    margin-right: 50px;
  }
}
</style>
