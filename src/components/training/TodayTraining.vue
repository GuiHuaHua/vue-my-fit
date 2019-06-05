<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="教练">
            <span>{{ props.row.trainerName }}</span>
          </el-form-item>
          <el-form-item label="地点">
            <span>{{ props.row.location}}</span>
          </el-form-item>
          <el-form-item label="卡路里">
            <span>{{ props.row.calorie}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      prop="trainingTime">
    </el-table-column>
    <el-table-column
      label="运动类型"
      prop="trainingType">
    </el-table-column>
    <el-table-column
      label="时长"
      prop="timeSpan">
    </el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData: [{
          trainingTime: '14:20',
          trainingType: '力量训练',
          location: '健身房',
          trainerName: '测试教练',
          timeSpan: '1H',
          calorie: '约300Cal',
        },{
          trainingTime: '14:20',
          trainingType: '力量训练',
          location: '健身房',
          trainerName: '测试教练',
          timeSpan: '1H',
          calorie: '约300Cal',
        },{
          trainingTime: '14:20',
          trainingType: '力量训练',
          location: '健身房',
          trainerName: '测试教练',
          timeSpan: '1H',
          calorie: '约300Cal',
        },{
          trainingTime: '14:20',
          trainingType: '力量训练',
          location: '健身房',
          trainerName: '测试教练',
          timeSpan: '1H',
          calorie: '约300Cal',
        }]
      }
    }
  }
</script>
