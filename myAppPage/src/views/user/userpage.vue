<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content">姓名</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.name}}</div></el-col>
      <el-col :span="6"><div class="grid-content">性别</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.gender}}</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content">年龄</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.age}}</div></el-col>
      <el-col :span="6"><div class="grid-content">生日</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.birthday}}</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content">姓名</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.name}}</div></el-col>
      <el-col :span="6"><div class="grid-content">性别</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.gender | genderFilter}}</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content">vip等级</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.viplevel}}</div></el-col>
      <el-col :span="6"><div class="grid-content">账户余额</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.account}}</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content">手机号</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.mobile}}</div></el-col>
      <el-col :span="6"><div class="grid-content">地址</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.address}}</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content">邮箱</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.email}}</div></el-col>
      <el-col :span="6"><div class="grid-content">个人描述</div></el-col>
      <el-col :span="6"><div class="grid-content">{{usersInfo.description}}</div></el-col>
    </el-row>
    <div class="btn">
      <router-link :to="{path: '/'}">
        <el-button size="small">返回</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userCenter',
  data () {
    return {
      usersInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  filters: {
    genderFilter (gender) {
      return {1: '男', 2: '女'}[gender]
    }
  },
  computed: {
    checkId () {
      return this.$route.query.id
    }
  },
  methods: {
    getUserInfo () {
      var _this = this
      this.$http.get('http://localhost:3000/users/getUserInfo?id=' + _this.checkId).then(function (response) {
        _this.usersInfo = response.data.data[0]
      }).catch(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row{
    .el-col{
      height: 40px;
      border: 1px solid #f5f5f5;
      margin-left: -1px;
      margin-top: -1px;
      .grid-content{
        padding: 10px;
      }
    }
  }
  .btn{
    padding: 10px;
  }
</style>
