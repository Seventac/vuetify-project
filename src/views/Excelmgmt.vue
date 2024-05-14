<template>
  <v-sheet class="d-flex flex-wrap bg d-flex-mobile">
    <v-sheet class="flex-1-1 ma-2 pa-2 bg-color">
      <h1>Excel 管理</h1>
    </v-sheet>
    <v-sheet class="flex-1-1-100 ma-0 pa-0 bg-color d-inline-flex d-flex align-self-baseline">
      <excel-upload-export/>
    </v-sheet>
    <!--TODO 做文件管理列表中的excel数据预览展示-->
    <v-sheet class="flex-1-1 ma-2 pa-1 bg-color">
      <vue-excel-editor v-model="jsondata" v-if="jsondata.length">
        <vue-excel-column field="user" label="User ID" type="string" width="80px"/>
        <vue-excel-column field="name" label="Name" type="string" width="150px"/>
        <vue-excel-column field="phone" label="Contact" type="string" width="130px"/>
        <vue-excel-column field="gender" label="Gender" type="select" width="50px" :options="['F','M','U']"/>
        <vue-excel-column field="age" label="Age" type="number" width="70px"/>
        <vue-excel-column field="birth" label="Date Of Birth" type="date" width="80px"/>
      </vue-excel-editor>
    </v-sheet>
    <!-- TODO 文件管理列表，可拖拽文件进行分类 -->
    <v-sheet class="flex-1-1 ma-2 pa-1 bg-color">
<!--      <file-list/>-->
    </v-sheet>
  </v-sheet>
</template>

<script>
import {ref} from 'vue';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import ExcelUploadExport from "../components/commons/ExcelUploadExport.vue";
import ExcelEditor from "../components/commons/ExcelEditor";


export default {
  name: "ExcelMgmt",
  components: {
    ExcelUploadExport,
    ExcelEditor,
    // FileList

  },
  setup() {
    const jsondata = ref([
      {user: 'hc', name: 'Harry Cole', phone: '1-415-2345678', gender: 'M', age: 25, birth: '1997-07-01'},
    ]);
    //导入的excel文件数据
    const importedData = ref([]);
    const filename = ref(null)


    // TODO 将父组件导入excel值中的文件名进行传递
    // const items = ref([
    //   {type: 'subheader', title: '上传后的临时文件'},
    //   {
    //     title: 'Item #1',
    //     value: 1,
    //   },
    //   {type: 'divider'},
    //   {type: 'subheader', title: '分类文件夹'},
    //   {
    //     title: 'Item #1',
    //     value: 1,
    //   },
    // ])

    const exportData = () => {
      const ws = XLSX.utils.json_to_sheet(jsondata.value);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
      saveAs(new Blob([wbout], {type: 'application/octet-stream'}), 'data.xlsx');
    };

    const handleFileUpload = async (event) => {
      try {
        const file = event.target.files[0];
        if (!file || file.size > 500 * 1024) return; // 文件大小限制，用户上传的文件大小不能超过 500 KB
        filename.value = file.name
        const reader = new FileReader();
        const showProgress = (percentage) => {
          console.log(`文件读取进度: ${percentage}%`);
        };
        reader.onload = (e) => {
          showProgress(100);
          const data = new Uint8Array(reader.result);
          const workbook = XLSX.read(data, {type: 'array'});
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          importedData.value = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        };
        reader.onerror = (e) => {
          console.error('文件读取或解析出错:', e);
          // 可以添加UI提示用户文件处理出错
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error('文件读取或解析出错:', error);
        // 可以添加UI提示用户文件处理出错
      }
    };
    return {
      importedData,
      exportData,
      handleFileUpload,
      jsondata,

      // items,
    };
  },
};
</script>

<style scoped>
.bg {
  background-image: url("../assets/backgroundImg/excel_picture.jfif");
  background-size: cover;
  overflow: auto;
}

.bg-color {
  background-color: transparent;
}

/* 媒体查询，适用于移动端 */
@media (max-width: 768px) {
  .d-flex-mobile {
    display: flex;
    flex-direction: column; /* 改为垂直方向 */
  }
}


</style>
