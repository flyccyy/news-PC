<template>
  <el-select v-model="channel_id" placeholder="请选择" @change="$emit('channelChange',channel_id)">
    <el-option label='所有频道' value=''></el-option>
    <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "channel",
  // props:['channel_id'],
  data() {
    return {
      channelList: [],
      channel_id: ""
    };
  },
  created() {
    this.$axios.get("/mp/v1_0/channels").then(res => {
      this.channelList = res.data.data.channels;
    });
  }
};
</script>

<style>
</style>