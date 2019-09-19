<template>
  <el-select :value="channel_id" placeholder="请选择" @change="$emit('channelChange',$event)">
    <el-option label='所有频道' value=''></el-option>
    <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "channel",
  props:['channel_id'],
  model:{
    prop:'channel_id', //父组件中传入的参数名，就算写了model,在子组件中都需要用props接收
    event:'channelChange'
  },
  data() {
    return {
      channelList: [],
    };
  },
  created() {
    this.$axios.get("/mp/v1_0/channels").then(res => {
      console.log(res);
      this.channelList = res.data.data.channels;
    });
  }
};
</script>

<style>
</style>