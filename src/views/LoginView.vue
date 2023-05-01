//login组件
<template>
  <div class="box">
    <h3>登录页面</h3>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone_number">
        <el-input type="number" v-model="ruleForm.pthone_number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <div class="item-button">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
        pthone_number: ''
      },
      rules: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/api/login/", { "phone_number": this.ruleForm.pthone_number, "password": this.ruleForm.password })
            .then(res => {
              this.$message({type: 'success', message: '登录成功'})
              localStorage.setItem("elementToken", 'Bearer ' + res.data.token)
              this.$router.push("/index")
            })
            .catch(error => {
              this.ddt = error.data
              this.$message.error('账号密码不对！')
            })

        }
      });
    },
  }
}
</script>

<style>
.box {
  width: 500px;
  height: 320px;
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
</style>