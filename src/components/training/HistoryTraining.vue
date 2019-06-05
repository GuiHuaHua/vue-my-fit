<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我的运动数据</span>
            <el-button style="float: right; padding: 3px 0;color: #909399" type="text" >今日安排<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </div>
          <div class="text item">
            <h4>累计运动时间：1000分钟</h4>
            <h4>消耗(千卡)：2000</h4>
            <h4>累计(天)：20</h4>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light" id="myChart" style="width: 600px;height: 300px;"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card bg-purple" style="width:250px;display: inline-block;position: absolute;left: 0px;">
          <div slot="header" class="clearfix">
            <span>力量训练</span>
          </div>
          <div class="text item">
            <h4>累计运动时间：1000分钟</h4>
            <h4>消耗(千卡)：2000</h4>
            <h4>累计(天)：20</h4>
          </div>
        </el-card>
        <el-card class="box-card bg-purple-dark" style="width:250px;display: inline-block;">
          <div slot="header" class="clearfix">
            <span>有氧训练</span>
          </div>
          <div class="text item">
            <h4>累计运动时间：1000分钟</h4>
            <h4>消耗(千卡)：2000</h4>
            <h4>累计(天)：20</h4>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="margin-top: 20px;">
          目标:增肌 2kg，减脂 4kg，体重54kg
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #e2e6e4;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .text {
    font-size: 14px;
    text-align: left;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
<script>
  import Chart from 'echarts'

  export default {
    name: 'hello',
    data() {
      return {
        chart: null,
        option :{
          title : {
            text: '健身KPI',
            subtext: '看看你擅长的是什么'
          },
          tooltip : { // 气泡提示配置
            trigger: 'axis' // 触发类型，默认数据触发，可选为：'axis'
          },
          legend: { //图例配置
            orient : 'vertical',
            x : 'right',
            y : 'bottom',
            data:['时间分配','卡路里']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          polar : [
            {
              indicator : [
                { text: '力量', max: 6000},
                { text: '跑步', max: 16000},
                { text: '行走', max: 30000},
                { text: '瑜伽', max: 38000},
                { text: '骑行', max: 52000},
                { text: '体能训练', max: 25000}
              ]
            }
          ],
          calculable : true,
          series : [
            {
              name: '预算 vs 开销（Budget vs spending）', // 系列名称
              type: 'radar', // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
              data : [
                {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name : '时间分配'
                },
                {
                  value : [5000, 14000, 28000, 31000, 42000, 21000],
                  name : '卡路里'
                }
              ]
            }
          ]
        }
      }
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        this.chart = Chart.init(document.getElementById('myChart'));
        // 把配置和数据放这里
        this.chart.setOption(this.option)
      }
    }
  }
</script>
