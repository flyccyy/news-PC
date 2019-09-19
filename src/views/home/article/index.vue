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
        <el-form-item label="频道">
          <channel @channelChange="articleForm.channel_id=$event"></channel>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="articleForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <span>
      共找到
      <b>{{total}}</b>条符合条件的内容
    </span>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="cover.images[0]" label="封面" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.cover.images[0]" alt width="60" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status | formatStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="doEdit(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="doDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="1"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
import channel from "../../../components/channel";
export default {
  name: "articleList",
  components: {
    channel
  },
  data() {
    return {
      articleForm: {
        status: "",
        channel_id: "",
        date: ""
      },
      tableData: [],
      total: 0
    };
  },
  methods: {
    doEdit(row){
      this.$router.push('/publish/'+row.id)
    },
    handleCurrentChange(page) {
      this.loadListData(page);
    },
    searchData() {
      this.loadListData();
    },
    doDel(row) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete("/mp/v1_0/articles/" + row.id).then(res => {
            this.loadListData();
          });
        })
        .catch(() => {});
    },
    loadListData(page = 1) {
      this.$axios
        .get("/mp/v1_0/articles", {
          params: {
            status:
              this.articleForm.status === ""
                ? undefined
                : this.articleForm.status,
            channel_id:
              this.articleForm.channel_id === ""
                ? undefined
                : this.articleForm.channel_id,
            begin_pubdate: this.articleForm.date[0],
            end_pubdate: this.articleForm.date[1],
            page
          }
        })
        .then(res => {
          this.tableData = res.data.data.results;
          this.total = res.data.data.total_count;
        });
    }
  },
  created() {
    this.loadListData();
  },

  filters: {
    formatStatus(status) {
      switch (status) {
        case 0:
          return "草稿";
        case 1:
          return "待审核";
        case 2:
          return "审核通过";
        case 3:
          return "审核失败";
      }
    }
  }
};
</script>

<style>
</style>