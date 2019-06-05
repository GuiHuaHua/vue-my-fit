<template>
  <div>
    <el-row v-if="!isGenerated">
      <el-steps :active="1" finish-status="success">
        <el-step title="新建"></el-step>
        <el-step title="提交"></el-step>
        <el-step title="审批"></el-step>
      </el-steps>
    </el-row>
    <el-row/>
    <el-row>
      <el-form :model="classRequest" :rules="rules" ref="classRequest" label-width="100px" class="demo-ruleForm" type="block" justify="right">
        <el-form-item label="选择教练" prop="trainerName" >
          <el-select v-model="classRequest.trainerName" placeholder="请选择教练" required :disabled="!isGenerated">
            <el-option v-for="(trainer, index) in trainerList" :key="trainer.trainerId" :label="trainer.userName" :value="trainer.trainerId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程类型" prop="classType" >
          <el-select v-model="classRequest.classType" placeholder="请选择课程类型" required :disabled="!isGenerated">
            <el-option label="基础力量" value="baseStrength"></el-option>
            <el-option label="拉伸" value="stretching"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间" required prop="classTime" >
          <el-date-picker
            v-model="classRequest.classTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" :disabled="!isGenerated">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否接受调剂" prop="isadjust" >
          <el-switch v-model="classRequest.isadjust" :disabled="!isGenerated"></el-switch>
        </el-form-item>
        <el-form-item label="期望部位" prop="bodypartList" >
          <el-checkbox-group v-model="classRequest.bodypartList" :disabled="!isGenerated">
            <el-checkbox v-for="part in bodyParts" :label="part" :key="part">{{part}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" prop="status" >
          <el-select v-model="classRequest.status" placeholder="状态" disabled>
            <el-option label="新建" value="generated"></el-option>
            <el-option label="提交" value="submitted"></el-option>
            <el-option label="通过" value="passed"></el-option>
            <el-option label="拒绝" value="rejected"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note" :disabled="!isGenerated">
          <el-input type="textarea" v-model="classRequest.note"></el-input>
        </el-form-item>
        <el-form-item v-if="isGenerated">
          <el-button type="primary" @click="saveForm('classRequest')">保存草稿</el-button>
          <el-button type="primary" @click="submitForm('classRequest')" v-if="classRequest.requestId!=null">提交</el-button>
          <el-button @click="resetForm('classRequest')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>

  </div>
</template>

<script>
  import axios from 'axios'
  const partOptions = ['胸', '背', '腿', '肩','手臂','腹部'];
  export default {
    name:"ClassRequest",
    data() {
      return {
        classRequest: {
          trainerName:"",
          trainerId:null,
          classType:"",
          classTime:[],
          isadjust:false,
          bodypartList:[],
          status:'generated',
          note:""
        },
        rules: {
          region: [
            { required: true, message: '请选择课程类型', trigger: 'change' }
          ]
        },
        bodyParts:partOptions,
        trainerList: []
      };
    },
    created:function(){
      this.getClassRequestInfo();
      this.getTrainerList();
    },
    methods: {
      saveForm(formName) {
        this.submit(formName,"save");
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName){
        this.submit(formName,"submit");
      },
      submit(formName,action){
        var sf = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let success = (response)=>{
              if(response.data.code == -1){
                sf.$message.error(response.data.message);
              }else{
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.$router.push('/myTrainer/allClassRequest');
              }
            }

            sf.$utils.axiosMethod({
              method:"post",
              url:sf.baseUrl+"/training/submitClassRequest?action="+action,
              data:sf.classRequest,
              callback:success
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    getClassRequestInfo(){
        debugger;
      let sf = this;
      let requestId = sf.$route.query.requestId;
      if(requestId){
        let url = sf.baseUrl+'/training/getClassRequestInfo?requestId='+requestId;
        axios.get(url).then(res=>{
          sf.classRequest = res.data;
        })
      }else{
        let trainerId = sf.$route.query.trainerId;
        sf.classRequest.trainerId = trainerId;
        sf.classRequest.trainerName = sf.$route.query.userName;
        sf.classRequest.classTime.push(sf.getCurrentDate());
      }

    },
      isGenerated(){
        return this.classRequest.status === 'generated';
      },
      getTrainerList(){
        debugger;
        let sf = this;
        let userId = this.$store.state.currentUser;
        axios.get(sf.baseUrl+'/trainer/getTrainerList?userId='+userId).then(res=>{
          sf.trainerList = res.data;
        })
      },
      getCurrentDate(){
        return this.$utils.dateFormat("yyyy-MM-dd hh:mm:ss",new Date());
      }
    }
  }
</script>
