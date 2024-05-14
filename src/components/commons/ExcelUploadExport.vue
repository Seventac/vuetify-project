<template>
  <!-- 使用flex布局，确保子元素垂直居中 -->
  <v-file-input
    class="ma-1 v-file-input_input"
    variant="outlined"
    label="请上传.xlsx或.xls文件"
    @change="handleFileUpload"
    accept=".xlsx, .xls"
  />
  <v-btn @click="exportData" class="bg-light-blue ma-1 btn">
    导出为Excel
  </v-btn>
</template>

<script>
import * as XLSX from "xlsx";
import {ref} from 'vue';

export default {
  name: "ExcelUploadExport",
  setup(){
    const jsondata = ref([
      {user: 'hc', name: 'Harry Cole', phone: '1-415-2345678', gender: 'M', age: 25, birth: '1997-07-01'},
      {user: 'sm', name: 'Simon Minolta', phone: '1-123-7675682', gender: 'M', age: 20, birth: '1999-11-12'},
      {user: 'ra', name: 'Raymond Atom', phone: '1-456-9981212', gender: 'M', age: 19, birth: '2000-06-11'},
      {user: 'ag', name: 'Mary George', phone: '1-556-1245684', gender: 'F', age: 22, birth: '2002-08-01'},
      {user: 'kl', name: 'Kenny Linus', phone: '1-891-2345685', gender: 'M', age: 29, birth: '1990-09-01'}
    ])

    //导入的excel文件数据
    const importedData = ref([]);

    const filename = ref(null)


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
        reader.onload = () => {
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
    return{
      exportData,
      handleFileUpload,
    }
  }
}
</script>

<style scoped>
.v-file-input_input {
  height: 40px; /* 根据需要调整高度 */
  line-height: 1.5; /* 垂直居中 */
  max-width: 250px;
  min-width: 200px;
}
.v-input--density-default {
  --v-input-control-height: 30px;
  --v-input-padding-top: 1px;
}

.btn{
  height: 40px;
}
</style>
