<template>
  <div style="display: flex">
    <div style="width: 78%;height: 500px;margin-right: 20px;">
        <div  v-for="(num, index) in 8" :key="num">
          <h3><a href="#">{{index}}测试测试测试</a></h3>
          <p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试11111111111111111111111111111</p>
          <el-row justify="right" style="text-align: right">
            <time class="time">{{ currentDate }}</time>
          </el-row>
        </div>
    </div>
    <el-row style="width: 360px;" justify="left">
        <div style="padding: 5px;">
          <img :src="trainer.picture" class="image"/>
          <span class="demonstration">星级：</span>
          <el-rate v-model="value"  disabled show-score text-color="#ff9900" score-template="{value}" style="width: 300px;display: inline-block;" ></el-rate>
        </div>
        <div style="padding: 5px;">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="基本信息" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="健身经历" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="健身成就" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="会员评价" name="4">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
    </el-row>
  </div>
</template>
<style>
  p{
    text-align: left;
  }
  a{
    text-decoration: none;
    color: #000;
  }
</style>

<script>
  export default {
    data() {
      return {
        trainer:{
          trainerId:this.$route.params.trainerId
        },
        value: 4.6,
        activeName:'1',
        currentDate:this.getCurrentDate()
      }
    },
    created:function(){
      this.getTrainerDetail();
    },
    methods: {
      getTrainerDetail(){
        let sf = this;
        let trainerId = sf.$route.params.trainerId;
        let url = sf.baseUrl+'/trainer/getTrainerDetail?trainerId='+trainerId;
        sf.$axios.get(url).then(res=>{
          sf.trainer = res.data;
        })
      },
      getCurrentDate(){
        return this.$utils.dateFormat("yyyy-MM-dd hh:mm:ss",new Date());
      }
    }
  };
</script>
