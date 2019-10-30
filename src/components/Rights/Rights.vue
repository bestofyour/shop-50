<template>
  <div class="right">
    <!-- 路径导航 -->
   <el-breadcrumb separator="/">
   <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
   <el-breadcrumb-item><a href="/index">权限管理</a></el-breadcrumb-item>
   <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 列表 -->
    <el-table :data="rightsList">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="权限列表" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="层级" >
       <template v-slot:default="{row}">
        <span v-if="row.level==='0'">一级</span>
        <span v-if="row.level==='1'">二级</span>
        <span v-if="row.level==='2'">三级</span>
       </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRightsList()
  },
  methods: {
    async getRightsList () {
      try {
        const res = await this.$axios.get(`rights/list`)
        if (res.status === 200) {
          this.rightsList = res.data.data
        } else {
          this.$message.warning(res.data.meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
