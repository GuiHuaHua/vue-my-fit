<template>
    <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="login-container">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="user.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选择角色" prop="type">
        <el-select v-model="user.type" placeholder="请选择登陆角色">
          <el-option label="教练" value="T"></el-option>
          <el-option label="学员" value="S"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="user.age"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="telephone">
        <el-input v-model="user.telephone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('user')">提交</el-button>
        <el-button @click="resetForm('user')">重置</el-button>
      </el-form-item>
    </el-form>
</template>
<script>
  export default {
    name:'Register',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.checkPass !== '') {
            this.$refs.user.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateTele = (rule,value,callback)=>{
        // "[1]"代表第1位为数字1，"[358]"代表第二位可以为3、5、8中的一个，"\\d{9}"代表后面是可以是0～9的数字，有9位。
        var telRegex = "^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\\d{8}$";
        if (value === '') {
          callback(new Error('请输入手机号'));
        }else{
          if(value.search(telRegex) == -1){
            callback(new Error('手机号码格式不正确！'));
          }
        }
      };
      return {
        user: {
          userName: '',
          password: '',
          checkPass: '',
          age: 18,
          telephone: '',
          email: '',
          type:'S'
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur' }
          ],
          password: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { type: 'number', message: '年龄必须为数字值',trigger: 'blur' }
          ],
          telephone: [
            { required: true,validate:validateTele, message: '请输入手机号', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let success = (response)=>{
              if(response.data.code == -1){
                this.$message.error(response.data.message);
              }else{
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
              }
            }

            this.$utils.axiosMethod({
              method:"POST",
              url:this.baseUrl+"/user/register",
              data:this.user,
              callback:success
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
