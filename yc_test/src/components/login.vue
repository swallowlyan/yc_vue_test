<template>
  <div class="signin">
    <el-row class="signin-top">
      <el-col :span="4">
        <div class="grid-content logo">
          <img src="../assets/images/logo_weichai.png">
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <h4>扬柴供应链全景视图</h4>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content signinpanel">
          <el-col :span="6" :offset="9">
            <div class="grid-content loginContent">
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px" class="loginForm">
              <h2>用户登录</h2>
              <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="verificationCode">
                <el-col :span="12">
                  <el-input v-model="loginForm.verificationCode"></el-input>
                </el-col>
                <el-col :span="12">
                  <img class="ycode" :src="codeImg" @click="changeCode()" alt="换一张"
                       style="cursor:pointer;">
                </el-col>
              </el-form-item>
              <el-form-item class="submitContent">
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </div></el-col>
          <div class="signup-footer">
            <div class="pull-left">
              © 2018 扬柴供应链全景视图
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { Base64 } from "../assets/js/login/base64";
  import { urls, oauth2 } from "../assets/js/config";
export default {
  name: 'login',
  data(){
    return {
      codeImg:"",
      loginForm:{
        username:"",
        password:"",
        verificationCode:""
      },
      loginRules: {
        username:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password:[{ required: true, message: '请输入密码', trigger: 'blur' }],
        verificationCode:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
      }
    }
  },
  created(){
    this.codeImg=urls.baseRequestUrl+"/genVerCode";
  },
  methods:{
    //随机验证码
    changeCode:function(){
      let num=(new Date()).valueOf();
      this.codeImg=urls.baseRequestUrl+'/genVerCode?timestamp?'+num;
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(urls.baseRequestUrl+"/login",
        {username:this.loginForm.username,
          password:this.loginForm.password,
          verificationCode:this.loginForm.verificationCode} )
            .then(Parent => {
                console.info(Parent);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  components:{
    Base64,
    urls,
    oauth2
  }
}
function updateAll(){
  let formData={}
  this.$http.post(urls.baseRequestUrl + "", formData)
    .then(data => {
      console.log("data===",data.usertype);
      if(data.usertype == 'SUPER'){
        if (data.access_token) {
          localStorage.setItem("access_token",Base64.encode(data.access_token));
          localStorage.setItem("username", Base64.encode(this.inp_name));
          this.$router.push({
            path: "/index"
          });
        }
      }else{
        //alert框
        this.alert_options.type = 'error';
        this.$refs.alert1.alert()
      }
    })
    .catch(res => {
      this.erro = 1;
      console.log("失败");
    });
}
</script>
<style>
  @import "../assets/css/login.min.css";
</style>

