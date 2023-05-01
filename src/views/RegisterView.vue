//login组件
<template>
  <div class="box">
    <h3>注册页面</h3>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone_number">
        <el-input type="number" v-model="ruleForm.pthone_number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        checkPass: '',
        pthone_number: '',
        ddt: '' 
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/api/register/", {"phone_number": this.ruleForm.pthone_number, "password":this.ruleForm.password})
            .then(res => {
              this.ddt = res.data
              this.$message({
                type: 'success',
                message: '注册成功',
              })
              this.$router.push('/login')
              
            })
            .catch(error =>{
              this.ddt = error.data
              this.$message.error('账号名重复！')
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