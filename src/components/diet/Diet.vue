<template>
  <div class="demo-image">
    <div style="display: inline-block" v-for="diet in dietList" :key="diet">
      <span class="demonstration" style="position: absolute;">{{ diet.date }}</span>
      <el-image
        style="width: 200px; height: 200px;padding: 10px;"
        :src="'data:image/png;base64,'+diet.base64Str"
        fit="contain"></el-image>
    </div>
    <div>
      <el-upload
        :action="actionUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSubmit"
        :before-upload="handleUpload"
        :http-request="myUpload">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dietList:[],
        dialogImageUrl: '',
        dialogVisible: false,
        actionUrl: this.baseUrl+'/diet/insertDiet',
        fileReader: ''
      }
    },
    created:function(){
      if (!window.FileReader) {
        console.error('Your browser does not support FileReader API!')
      }
      this.fileReader = new FileReader();
      this.getDietList();
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        debugger;
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSubmit(response, file, fileList){
        debugger;
      },
      handleUpload(file){
        debugger;
      },
      getDietList(){
        let sf = this;
        let userId = this.$store.state.currentUser;
        sf.$axios.get(sf.baseUrl+'/diet/getDietList?userId='+userId).then(res=>{
          sf.dietList = res.data;
        })
      },
      myUpload(content) {
/*        let sf = this;
        let success = (response)=>{
          if(response.data.code == -1){
            sf.$message.error(response.data.message);
          }else{
            this.$message({
              message: response.data.message,
              type: 'success'
            });
          }
        }

        sf.$utils.axiosMethod({
          method:"post",
          url:content.action,
          data:content.file,
          callback:success
        });*/
        debugger;
        let sf = this;
        let file = content.file;
        let filename = file.name;
        if (file) {
          this.fileReader.readAsDataURL(file)
        }
        this.fileReader.onload = () =>{
          let base64Str = this.fileReader.result;

          let success = (response)=>{
            if(response.data.code == -1){
              sf.$message.error(response.data.message);
            }else{
              this.$message({
                message: response.data.message,
                type: 'success'
              });
            }
          }
          let diet = {};
          diet['base64Str'] = base64Str.split(',')[1];
          diet['name'] = filename;
          diet['userId'] = sf.$store.state.currentUser;

          sf.$utils.axiosMethod({
            method:"post",
            url:content.action,
            data:diet,
            callback:success
          });
        }

      }
    }
  }

</script>
