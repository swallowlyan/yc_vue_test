<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0px;
  }
  .el-header{
    padding: 0px;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: 100%;
}
  .title-division {
    float: left;
    width: 3px;
    height: 20px;
    background: #525252;
    margin: 0px 10px;
  }
  .pageTitle>h5{
    margin: 0px;
    float: left;
  }
</style>
