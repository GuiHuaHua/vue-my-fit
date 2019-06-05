<template>
  <el-container style="margin: 10px auto;width: 360px;">
    <el-row type="block" justify="left">
      <h2 style="color:#f5bb9f">Fit-私教管理</h2>
      <hr/>
      <el-tabs type="border-card">
        <el-tab-pane label="登陆">
          <el-form :model="user" :rules="rules" ref="user" label-width="80px" class="login-container">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="user.userName" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="user.password" type="password" ></el-input>
            </el-form-item>
            <el-form-item label="选择角色">
              <el-select v-model="user.type" placeholder="请选择登陆角色">
                <el-option label="教练" value="T"></el-option>
                <el-option label="学员" value="S"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login('user')" plain>登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <Register></Register>
        </el-tab-pane>
      </el-tabs>
      <hr/>
    </el-row>
    <el-footer style="color:#409EFF;"></el-footer>
  </el-container>
</template>
<style>
  .login-container{
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: .3s;
    padding: 20px;
  }
  hr{
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #DCDFE6;
  }
</style>

<script>
  import Register from "./Register";
  export default {
    components: {Register},
    methods: {
      login (formName) {
        //this.$router.replace('/')
        var sf = this;
        sf.$refs[formName].validate((valid) => {
          if(valid){
            let success = (response)=>{
              if(response.data.code == -1){
                sf.$message.error(response.data.message);
              }else{
                debugger;
                sessionStorage.setItem("userId",response.data.object.userId);
                sessionStorage.setItem("userName",response.data.object.userName);
                sessionStorage.setItem("token",response.data.token);
                sf.$store.dispatch("setUser",response.data.object.userId);
                sf.$store.dispatch("setUserName",response.data.object.userName);
                sf.$store.dispatch("setToken",response.data.token);
                sf.$router.push('/Main');
              }
            }

            sf.$utils.axiosMethod({
              method:"POST",
              url:sf.baseUrl+"/user/login",
              data:this.user,
              callback:success
            });
          }
        });
      }
    },
    data () {
      return {
        user: {
          userName:"",
          password:"",
          type:"S"
        },
        rules: {
          userName: [
            { required: true, message: '用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码', trigger: 'blur' }
          ]
        }
      }
    }
  }
</script>
