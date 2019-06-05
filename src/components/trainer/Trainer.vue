<template>
  <div>
    <el-row>
      <el-col :span="4" v-for="(trainer, index) in trainerList" :key="trainer.trainerId" :offset="index > 0 ? 2 : 0">
        <el-popover placement="top-start" width="200" trigger="hover">
          <el-row type="flex">
            <el-button type="primary" size="mini" @click="viewScheduleByTrainerId(trainer.trainerId,trainer.userName)">
              查看课表<i class="el-icon-time el-icon--right"></i></el-button>
            <el-button type="primary" size="mini" @click="requestClassing(trainer.trainerId,trainer.userName)">申请上课<i
              class="el-icon-upload el-icon--right"></i></el-button>
          </el-row>
          <el-card :body-style="{ padding: '0px' }" slot="reference">
            <img :src="trainer.picture" class="image"/>
            <div style="padding: 14px;">
              <span>{{trainer.userName}}</span>
              <div class="bottom clearfix">
                <span>{{trainer.description}}</span>
                <el-button type="text" class="button" @click="transferForDetail(trainer.trainerId)">详情</el-button>
              </div>
            </div>
          </el-card>
        </el-popover>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="10">
      </el-pagination>
    </el-row>
  </div>

</template>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    height: 20em;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        trainerList: [],
        visible: false,
        currentPage: 1,
        pageSize: 10
      };
    },
    created: function () {
      this.getTrainerList();
    },
    methods: {
      getTrainerList() {
        let sf = this;
        let userId = this.$store.state.currentUser;
        axios.get(sf.baseUrl + '/trainer/getTrainerList?userId=' + userId + '&pageNum=' + sf.currentPage + '&pageSize=' + sf.pageSize).then(res => {
          debugger;
          sf.trainerList = res.data.list;
        })
      },
      transferForDetail(trainerId) {
        this.$router.push("/myTrainer/trainerDetail/" + trainerId);
      },
      viewScheduleByTrainerId(trainerId) {
        alert(trainerId);
      },
      requestClassing(trainerId, userName) {
        this.$router.push({path: '/myTrainer/classRequest', query: {trainerId: trainerId, userName: userName}});
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getTrainerList();
      }
    }
  }
</script>
