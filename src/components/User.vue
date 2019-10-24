<template>
  <div class="user">
    <!-- 面包屑导航 -->
    <!--搜索区域 -->
    <!-- 表格区域 -->
    <el-table :data="list" style="width: 100%" >
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="用户状态" width="180" >
        <template v-slot:default="obj" >
        <el-switch
          v-model="obj.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <el-button size="small" @click="editList(obj.row.id)" icon="el-icon-edit" plain type="primary"></el-button>
        <el-button size="small" icon="el-icon-message" plain type="danger"></el-button>
        <el-button size="small" icon="el-icon-delete" plain type="info"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: [],
      query: '',
      pagenum: 1,
      pagesize: 6,
      flag: ''
    }
  },
  methods: {
    getList () {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          headers: { Authorization: localStorage.getItem('token') },
          params: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
        .then(res => {
          console.log(res.data.data)
          this.list = res.data.data.users
          console.log(this.list)
        })
    },
    editList (id) {
      console.log(id)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style>
</style>
