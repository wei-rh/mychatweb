//login组件
<template>
  <div class="box">
    <h3>重置密码</h3>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone_number">
        <el-input type="number" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      
      <div class="item-button">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <div class="toregister"><router-link to="/register" class="link" >已有账号？去登录</router-link></div>
      </div>
     
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        password: '',
        username: ''
      },
      rules: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/api/newpass/", { "username": this.ruleForm.username, "password": this.ruleForm.password })
            .then(res => {
              this.$message({type: 'success', message: '登录成功'})
              localStorage.setItem("elementToken", 'Bearer ' + res.data.token)
              localStorage.setItem("refresh", res.data.refresh)
              localStorage.setItem("is_vip", res.data.is_vip)
              this.$router.push("/index")
            })
            .catch(error => {
              console.log(error.response)
              this.$message.error('账号密码不对！')
            })

        }
      });
    },
  }
}
</script>

<style>
.link{
  text-decoration: none;
}

.item-button button div{
  width: 220px;
  margin: 0 150px;
}

.box {
  width: 500px;
  height: 210px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 5px #eee;
}

h3 {
  text-align: center;
}

.item-button button {
  width: 220px;
  margin: 0 150px;

}

.item-button .toregister {
  display: block;
  float: right;
  margin-top: 15px;
}


.item-button .to_left {
  display: block;
  float: left;
  margin-top: 15px;
}
</style>