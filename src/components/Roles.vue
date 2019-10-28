 <template>
   <div class="roles">
     <!-- 路径导航 -->
   <el-breadcrumb separator="/">
   <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
   <el-breadcrumb-item><a href="/index">权限管理</a></el-breadcrumb-item>
   <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
   </div>
 </template>

<script>
export default {
  data () {
    return {
      rolesList: []
    }
  }
}
</script>

 <style>

 </style>
