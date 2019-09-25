<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态" width="180">
        <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
      </el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>
      <el-table-column prop="fans_comment_count" label="评论粉丝数" width="180"></el-table-column>
      <el-table-column label="允许评论" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" plain>修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      tableData: [],
      //   comment_switch: false,
      total: 0,
      page: 1,
      pageSize: 10
    };
  },
  methods: {
    loadData() {
      this.$axios
        .get("/mp/v1_0/articles", {
          params: {
            page: this.page,
            per_page: this.pageSize,
            response_type: "comment"
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.data.results;
          this.total = res.data.data.total_count;
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.loadData();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.loadData();
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
</style>