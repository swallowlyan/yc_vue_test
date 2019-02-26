<template>
  
</template>

<script>
export default {
  name:'kong',
  data(){
    return{
      address:'0',
    }
  },
  created(){
    this.address = this.$route.query.address;
    // if(this.k.indexOf('kong') != -1){
    //   window.history.go(-1);
    // }else{
      this.$router.push({
        path:this.address
      })
    // }
    // window.history.go(-1);
    
    console.log(this.address)
  }
}
</script>
<style lang="less" scoped>

</style>

