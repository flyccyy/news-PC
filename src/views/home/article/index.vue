<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="articleForm" :model="articleForm">
        <el-form-item label="状态">
          <el-radio-group v-model="articleForm.status">
            <el-radio label>全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道"></el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="articleForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
        <span>共找到<b>54684</b>条符合条件的内容</span>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      articleForm: {
        status: ""
      }
    };
  }
};
</script>

<style>
</style>