<template>
  <div class="app-container">
    <div class="toolbar">
      <el-button @click="addUserHandle" type="primary" size="small">添加用户</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column fixed align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年龄">
        <template slot-scope="scope">
          <span>{{scope.row.age}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.gender | genderFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="生日">
        <template slot-scope="scope">
          <span>{{scope.row.birthday}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="vip等级">
        <template slot-scope="scope">
          <span>{{scope.row.viplevel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="个人描述">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户余额">
        <template slot-scope="scope">
          <span>{{scope.row.account / 100}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="地址">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <router-link :to="{path: 'user', query: { id: scope.row.id }}"><el-button type="text" size="small">查看</el-button></router-link>
          <el-button type="text" size="small" @click="editUserHandle(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="delUserHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false">
      <el-form label-width="80px" :model="addUser" :inline="true" ref="addUser">
        <el-form-item label="姓名">
          <el-input v-model="addUser.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="addUser.gender"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="addUser.age"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="addUser.mobile"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addUser.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addUser.email"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="addUser.birthday"></el-input>
        </el-form-item>
        <el-form-item label="vip等级">
          <el-input v-model="addUser.viplevel"></el-input>
        </el-form-item>
        <el-form-item label="存款">
          <el-input v-model="addUser.account"></el-input>
        </el-form-item>
        <el-form-item label="个人描述" prop="description">
          <el-input type="textarea" :rows="2" v-model="addUser.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSubmitAdd">确 定</el-button>
  </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      title="提示"
      :visible.sync="editVisible"
      :close-on-click-modal="false">
      <el-form label-width="80px" :model="editUser" :inline="true" ref="editUser">
        <el-form-item label="姓名">
          <el-input v-model="editUser.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="editUser.gender"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="editUser.age"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editUser.mobile"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editUser.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editUser.email"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="editUser.birthday"></el-input>
        </el-form-item>
        <el-form-item label="vip等级">
          <el-input v-model="editUser.viplevel"></el-input>
        </el-form-item>
        <el-form-item label="存款">
          <el-input v-model="editUser.account"></el-input>
        </el-form-item>
        <el-form-item label="个人描述" prop="description">
          <el-input type="textarea" :rows="2" v-model="editUser.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSubmitedit">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editId: 0,
      dialogVisible: false,
      editVisible: false,
      tableData: [],
      addUser: {
        name: '',
        gender: '',
        age: '',
        birthday: '',
        viplevel: '',
        description: '',
        account: '',
        mobile: '',
        address: '',
        email: ''
      },
      editUser: {
        id: '',
        name: '',
        gender: '',
        age: '',
        birthday: '',
        viplevel: '',
        description: '',
        account: '',
        mobile: '',
        address: '',
        email: ''
      }
    }
  },
  filters: {
    genderFilter (gender) {
      return {1: '男', 2: '女'}[gender]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      var _this = this
      var url = 'http://localhost:3000/users/getUserList'
      this.$http.get(url).then(function (response) {
        _this.tableData = response.data.data
      }).catch(function (response) {
        console.log(response)
      })
    },
    getUserInfo (id) {
      var _this = this
      this.$http.get('http://localhost:3000/users/getUserInfo?id=' + id).then(function (response) {
        _this.editUser = response.data.data[0]
      }).catch(function (response) {
        console.log(response)
      })
    },
    addUserHandle () {
      this.dialogVisible = true
    },
    handleSubmitAdd () {
      var _this = this
      this.$http.post('http://localhost:3000/users/addUser', this.qs.stringify(this.addUser), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        _this.getData()
        _this.dialogVisible = false
      }).catch(function (response) {
        console.log(response)
      })
    },
    editUserHandle (id) {
      this.editId = id
      this.getUserInfo(id)
      this.editVisible = true
    },
    handleSubmitedit () {
      var _this = this
      this.$http.post('http://localhost:3000/users/editUser', this.qs.stringify(this.editUser), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        _this.getData()
      }).catch(function (response) {
        console.log(response)
      })
      _this.editVisible = false
    },
    delUserHandle (id) {
      var _this = this
      this.$http.get('http://localhost:3000/users/deleteUser?id=' + id).then(function (response) {
        _this.getData()
      }).catch(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user_center{
    color: #fff;
    text-decoration: none;
  }
  .toolbar{
    padding: 10px;
    text-align: left;
  }
</style>
