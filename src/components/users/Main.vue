<template>
  <div id="main">
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router="true" default-active="1-4-1" class="el-menu-vertical-demo" :collapse="false">
          <el-menu-item index="/Main">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu>
            <template slot="title">
              <i class="el-icon-service"></i>
              <span slot="title">我的教练</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/myTrainer/trainerInfo">教练信息</el-menu-item>
              <el-menu-item index="/myTrainer/allClassRequest">上课申请</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu>
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">我的训练</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/myTraining/todayTraining">今日训练</el-menu-item>
              <el-menu-item index="/myTraining/historyTraining">历史训练</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu>
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">我的饮食</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/myTraining/myDiet">饮食记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{userName}}</span>
          <el-badge :value="200" :max="99" class="item" style="background: none;margin: 0px 6px;">
            <el-button size="small">消息</el-button>
          </el-badge>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name:"Main",
    data(){
      return {
        userName:this.$store.state.userName
      }
    }
  }

</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
