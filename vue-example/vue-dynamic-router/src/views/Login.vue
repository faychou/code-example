<template>
  <div class="login">
    <span class="iconfont icon-icon-test"></span>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form
          :model="loginRuleForm"
          :rules="rules"
          ref="loginRuleForm"
          label-width="100px"
          class="loginForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="loginRuleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpass">
            <el-input type="password" v-model="loginRuleForm.userpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitLoginForm('loginRuleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Notification } from 'element-ui';

export default {
  name: "Login",
  data() {
    return {
      loginRuleForm: {
        username: "",
        userpass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        userpass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions([
      "LoginSync"
    ]),
    submitLoginForm(formName) {
      Notification({
        title: '标题',
        message: '这是提示文案'
      });

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.LoginSync(this.loginRuleForm.username)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .loginForm {
    padding: 20px;
    box-shadow: 0 0 5px #eee;
    margin-top: 50px;
  }
    
</style>