```html
<sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
  <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
    Publish
  </el-button>
  <el-button v-loading="loading" type="warning" @click="draftForm">
    Draft
  </el-button>
</sticky>
```