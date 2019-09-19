<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-radio-group v-model="isCollect" size="medium"  @change="toCollect">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>

      <el-upload
        class="upload-demo"
        style="float: right; "
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :on-success="upSuccess"
        name="image"
        :headers="header"
        :show-file-list="false"
      >
        <el-button size="small" type="primary" >点击上传</el-button>
      </el-upload>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in imgList" :key="item.id">
        <el-card class="box-card media-card" :body-style="{padding:'0px'}">
          <div class="imgdiv">
            <img :src="item.url" alt />
          </div>
          <div class="btn-wrap">
            <el-row>
              <el-col :span="12">
                <el-tooltip class="item" effect="dark" :content="item.is_collected?'取消收藏':'收藏'" placement="top">
                  <el-button type="text" class="el-icon-star-off" :class="item.is_collected?'el-icon-star-on':'el-icon-star-off'" @click="collectEvent(item)"></el-button>
                </el-tooltip>
              </el-col>
              <el-col :span="12">
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-button type="text" class="el-icon-delete" @click="toDel(item)"></el-button>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 必须加上page-size这个属性，否则显示的页码数不对 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="12"
      :total="total"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "pubmedia",
  data() {
    return {
      isCollect: "全部",
      imgList: [],
      total: 0,
      is_collected:false,
      header:{
        Authorization:`Bearer ${JSON.parse(window.sessionStorage.getItem('user_info')).token}`
      }
    };
  },
  methods: {
    upSuccess(){
      this.getImgList();
    },
    toDel(item){
      this.$axios.delete('/mp/v1_0/user/images/'+item.id).then(res=>{
        this.getImgList();
      })
    },
    //点击收藏的单选框
    toCollect(){
      this.getImgList();
    },
    collectEvent(item){
      item.is_collected = !item.is_collected;
      // this.getImgList();
      this.$axios.put('/mp/v1_0/user/images/'+item.id,{
        collect:item.is_collected
      }).then(res=>{
        // console.log(res);
        if(res.data.message.toLowerCase()=='ok'){
          this.getImgList();
        }
      }).catch(err=>{
          item.is_collected = !item.is_collected;
      })
    },
    handleCurrentChange(page) {
      this.getImgList(page);
    },
    getImgList(page = 1) {
      this.$axios
        .get("/mp/v1_0/user/images", {
          params: {
            page,
            per_page: 12,
            collect:this.isCollect == '收藏'
          }
        })
        .then(res => {
          console.log(res);
          this.imgList = res.data.data.results;
          this.total = res.data.data.total_count;
        });
    }
  },
  created() {
    this.getImgList();
  }
};
</script>

<style lang="less" scoped>
.media-card {
  margin-bottom: 15px;
  .imgdiv {
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .btn-wrap {
    background-color: #f8f9f9;
    text-align: center;
  }
}
</style>