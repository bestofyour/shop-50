 <template>
   <div class="roles">
     <!-- 路径导航 -->
   <el-breadcrumb separator="/">
   <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
   <el-breadcrumb-item><a href="/index">权限管理</a></el-breadcrumb-item>
   <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="showAddDialog" size="small" class="addBtn" plain>添加角色</el-button>
    <el-table :data="rolesList" >
      <el-table-column  type="expand">
         <template v-slot:default="{row}">
         <el-row class="l1" v-for="l1 in row.children" :key="l1.id" >
           <el-col :span="6"><el-tag closable @close="delRights(row,l1.id)">{{l1.authName}}</el-tag></el-col>
           <el-col :span="18">
             <el-row class="l2" v-for="l2 in l1.children" :key="l2.id">
               <el-col :span="6"><el-tag @close="delRights(row,l2.id)" type="success" closable>{{l2.authName}}</el-tag></el-col>
               <el-col :span="18">
                 <el-tag class="l3" @close="delRights(row,l3.id)" type="danger" closable v-for="l3 in l2.children" :key="l3.id">{{l3.authName}}</el-tag>
               </el-col>
             </el-row>
           </el-col>
         </el-row>
        </template>
      </el-table-column>
      <el-table-column  type="index"></el-table-column>
      <el-table-column   label="角色名称" prop="roleDesc"></el-table-column>
      <el-table-column  label="描述" prop="roleName"></el-table-column>
      <el-table-column  label="操作">
        <template v-slot:default="{row}">
         <el-button type="primary"  icon="el-icon-edit" @click="showEditDiglog(row)" plain size="small"></el-button>
         <el-button type="danger" icon="el-icon-delete" @click="delRoles(row)" plain size="small"></el-button>
         <el-button type="warning" icon="el-icon-check" @click="showTree(row)" plain size="small">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配角色列表 -->
    <el-dialog
      title="分配权限"
      :visible.sync="treeVisible"
      width="40%"
      >
      <el-tree node-key="id" ref="tree" :data="data" :props="defaultProps" show-checkbox default-expand-all></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="treeVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignRights" >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加，编辑用户信息 -->
    <el-dialog
      :title="titleDialog"
      :visible.sync="saveDialog"
      width="40%"
      @close="closeAddFrom"
      >
       <el-form ref="addFrom" :rules="rules" :model="addFrom" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model="addFrom.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input placeholder="请输入角色描述" v-model="addFrom.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveDialog = false">取 消</el-button>
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </span>
    </el-dialog>
   </div>
 </template>

<script>
export default {
  data () {
    return {
      rolesList: [],
      treeVisible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: '',
      saveDialog: false,
      titleDialog: '添加用户',
      addFrom: {
        roleName: '',
        id: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: ['blur', 'change'] }
        ],
        roleDesc: [
          { required: true, message: '请输入角色名称', trigger: ['blur', 'change'] }
        ]
      },
      showid: ''

    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      try {
        const { data } = await this.$axios.get('roles')
        console.log(data)
        if (data.meta.status === 200) {
          this.rolesList = data.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async delRights (row, ridId) {
      const { data } = await this.$axios.delete(`roles/${row.id}/rights/${ridId}`)
      if (data.meta.status === 200) {
        this.$message.success(data.meta.msg)
        // this.getRolesList()
        // 不需要更新展示的数据 只需要更新后台的数据就行了
        row.children = data.data
      } else {
        this.$message.success(data.meta.msg)
      }
    },
    async showTree (row) {
      this.treeVisible = true
      this.roleId = row.id
      const { data } = await this.$axios.get('rights/tree')
      if (data.meta.status === 200) {
        this.data = data.data
        const ids = []
        row.children.forEach(l1 => {
          l1.children.forEach(l2 => {
            l2.children.forEach(l3 => {
              ids.push(l3.id)
            })
          })
        })
        this.$refs.tree.setCheckedKeys(ids)
      } else {
        this.$message.error(data.meta.msg)
      }
    },
    async assignRights () {
      try {
        const halfs = this.$refs.tree.getHalfCheckedKeys()
        const ids = this.$refs.tree.getCheckedKeys()
        const rids = [...halfs, ...ids].join(',')
        const { data } = await this.$axios.post(`roles/${this.roleId}/rights`, { rids })
        if (data.meta.status === 200) {
          this.$message.success(data.meta.msg)
          this.treeVisible = false
          this.getRolesList()
        } else {
          this.$message.error(data.meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async delRoles (row) {
      try {
        await this.$confirm('确认要删除此选项吗?', '温馨提示', {
          type: 'warning'
        })
        const { data } = await this.$axios.delete(`roles/${row.id}`)
        if (data.meta.status === 200) {
          this.$message.success(data.meta.msg)
          this.getRolesList()
        } else {
          this.$message.error(data.meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async showEditDiglog (row) {
      this.saveDialog = true
      this.titleDialog = '编辑用户'
      this.$nextTick(() => {
        this.showid = row.id
        this.addFrom.roleName = row.roleName
        this.addFrom.roleDesc = row.roleDesc
      })
    },
    showAddDialog () {
      this.saveDialog = true
      this.titleDialog = '添加用户'
    },
    async closeDialog () {
      const method = this.titleDialog === '添加用户' ? 'post' : 'put'
      const url = this.titleDialog === '添加用户' ? 'roles' : `roles/${this.showid}`
      await this.$refs.addFrom.validate()
      const { data } = await this.$axios[method](url, this.addFrom)
      if (data.meta.status === 200) {
        this.$message.success('you are right')
        this.getRolesList()
        this.saveDialog = false
      } else {
        this.$message.error(data.meta.msg)
      }
    },
    closeAddFrom () {
      this.$refs.addFrom.resetFields()
    }
  }
}
</script>

 <style lang="scss" scoped>
 .roles {
   .addBtn {
     margin-bottom: 10px
   }
   .l1 {
     margin-bottom: 10px;
     border-bottom: 1px solid #ccc;
     padding: 10px 0;
   }
   .l2 {
     margin-bottom: 10px;
     margin-right: 10px
   }
   .l3 {
    margin-bottom: 10px;
     margin-right: 10px
   }
 }
 </style>
