<template>
  <el-table ref="filterTable" :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column prop="requestDate" label="申请日期" sortable width="180" column-key="date">
    </el-table-column>
    <el-table-column prop="classTypeName" label="课程类型" width="180">
    </el-table-column>
    <el-table-column prop="trainerName" label="教练" :formatter="formatter">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.trainerName }}</p>
          <p>联系电话: {{ scope.row.telephone }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.trainerName }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" width="100" :filters="[{ text: '新建', value: 'generated' }, { text: '提交', value: 'submitted' }, { text: '通过', value: 'passed' },{ text: '拒绝', value: 'rejected' }]" :filter-method="filterTag" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status === 'primary' ? 'info' : 'success'" disable-transitions>{{scope.row.statusName}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情
        </el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">取消
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'AllClassRequest',
    data() {
      return {
        tableData: []
      }
    },
    created:function(){
      this.getRequestData();
    },
    methods: {
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.trainerName;
      },
      filterTag(value, row) {
        return row.status === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleEdit(index, row) {
        debugger;
        let requestId = row.requestId;
        this.$router.push({path:'/myTrainer/classRequest',query:{requestId:requestId}});
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      getRequestData(){
        let sf = this;
        axios.get(sf.baseUrl+'/training/getRequestByUser').then(res=>{
          sf.tableData = res.data;
        })
      }

    }
  }
</script>
