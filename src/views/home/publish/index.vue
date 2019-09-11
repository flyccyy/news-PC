<template>
  <el-form ref="publishForm" :model="publishForm" label-width="60px">
    <el-form-item label="标题">
      <el-input v-model="publishForm.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <quillEditor v-model="publishForm.content"></quillEditor>
    </el-form-item>
    <el-form-item label="封面">
      <el-radio-group v-model="publishForm.cover.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
      <channel></channel>
    </el-form-item>
    <el-form-item>
      <el-button size="small">保存草稿</el-button>
      <el-button size="small" type="primary">发布...</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import channel from "../../../components/channel";
export default {
  name: "publish",
  components: {
    quillEditor,
    channel
  },
  data() {
    return {
      publishForm: {
        title: "",
        content: "",
        cover: {
          type: 1,
          images: []
        }
      }
    };
  }
};
</script>

<style>
.ql-editor {
  height: 400px;
}
</style>