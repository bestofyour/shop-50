<template>
  <div class="user">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/index">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户界面</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索区域 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
    <el-button slot="append" icon="el-icon-search" @click="serverBtn"></el-button>
    </el-input>
    <!-- 添加按钮 -->
  <el-button type="success" plain class="addBtn" @click="showDialog">添加用户</el-button>
    <!-- 对话框 -->
    <el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
   @close="resetDialog"
  width="50%"
  >
    <el-form ref="form"  :rules="rules" :model="form" label-width="80px" id="form">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
        </el-form-item>
  </el-form>
  <template v-slot:footer>
   <span class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addBtn">确 定</el-button>
  </span>
  </template>
</el-dialog>
    <!-- 表格区域 -->
    <el-table :data="list" style="width: 100%" >
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="用户状态" width="180" >
        <template v-slot:default="obj" >
        <el-switch
          @change="changeList(obj.row.id,obj.row.mg_state)"
          v-model="obj.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot:default="obj">
        <el-button size="small" @click="editList(obj.row)" icon="el-icon-edit" plain type="primary"></el-button>
        <el-button size="small"  @click="delList(obj.row.id)" icon="el-icon-message" plain type="danger"></el-button>
        <el-button size="small"  @click="editList(obj.row.id)" icon="el-icon-delete" plain type="info"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 3, 4, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 编辑用户信息 -->
      <el-dialog
    title="提示"
    :visible.sync="editDialog"
    width="40%"
    class="editDialog"
    >
   <el-form ref="editForm"  :rules="rules" :model="editForm" label-width="80px" id="form">
      <el-form-item label="用户名" >
         <el-tag type="info">{{editForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="editForm.email">{{editForm.email}}</el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input placeholder="请输入手机号" v-model="editForm.mobile">{{editForm.mobile}}</el-input>
        </el-form-item>
   </el-form>
          <template v-slot:footer>
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </template>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      query: '',
      pagenum: 1,
      pagesize: 6,
      flag: '',
      total: 1,
      dialogVisible: false,
      editDialog: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {
        email: '',
        mobile: '',
        username: '',
        id: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['change', 'blur'] }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    async getList () {
      try {
        const res = await this.$axios.get('users', {
          params: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
        console.log(res)

        if (res.status === 200) {
          this.list = res.data.data.users
          this.total = res.data.data.total
        }
      } catch (e) {
        console.log(e)
      }
      // this.$axios.get('users', {
      //   params: {
      //     query: this.query,
      //     pagenum: this.pagenum,
      //     pagesize: this.pagesize
      //   }
      // })
      //   .then(res => {
      //     console.log(res.data.data)
      //     this.list = res.data.data.users
      //     this.total = res.data.data.total
      //     console.log(this.list)
      //   })
    },
    editList (row) {
      this.editDialog = true
      this.editForm.id = row.id
      console.log(row.id, row.email)
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
    },
    async editUser () {
      try {
        await this.$refs.editForm.validate()
        const res = await this.$axios.put(`users/${this.editForm.id}`, this.editForm)
        if (res.status === 200) {
          this.$message.success(res.data.meta.msg)
          this.getList()
        } else {
          this.$message.warning(res.data.meta.msg)
        }
        this.editDialog = false
      } catch (e) {
        console.log(e)
      }
    },
    async delList (id) {
      try {
        const meta = await this.$axios.delete(`users/${id}`)
        console.log(meta)
        if (meta.status === 200) {
          this.getList()
          this.$message({
            type: 'warning',
            message: meta.data.meta.msg
          })
        } else {
          this.$message({
            type: 'danger',
            message: meta.data.meta.msg
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getList()
    },
    async changeList (id, type) {
      // console.log(id, type)
      try {
        const res = await this.$axios.put(`users/${id}/state/${type}`)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        } else {
          this.$message(res.data.meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    serverBtn () {
      this.getList()
    },
    showDialog () {
      this.dialogVisible = true
    },
    async addBtn () {
      try {
        await this.$refs.form.validate()
        let res = await this.$axios.post('users', this.form)
        if (res.status === 201) {
          this.$message.success(res.data.meta.msg)
          this.total++
          this.getList()
          this.pagenum = Math.ceil(this.total / this.pagesize)
        } else {
          this.$message.warning(res.data.meta.msg)
        }
        this.isShow = false
      } catch (e) {
        console.log(e)
      }
    },
    resetDialog () {
      this.$refs.form.resetFields()
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped >
.el-breadcrumb {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
  .input-with-select {
    width: 300px;
    margin-bottom: 10px;
  }
  .addBtn {
    margin: 0 20px;
  }
  #app {
    .user {
      #form {
       padding: 10px 0;
       margin-top: 10px
  }
    }
    .editDialog {
      body {
         padding: 0;
      }
    }
  }
</style>
