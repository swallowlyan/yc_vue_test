<template>
<div class="key_indicators">
  <el-breadcrumb separator="/">
    <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
    <el-breadcrumb-item>高管视图</el-breadcrumb-item>
    <el-breadcrumb-item>公司运营指标</el-breadcrumb-item>
  </el-breadcrumb>
  <h5 class="content_title">公司运营关键指标</h5>
  <el-form ref="searchForm" :model="searchForm" :rules="searchRules" label-width="80px">
    <el-form-item label="分厂选择" prop="factory">
      <el-select v-model="searchForm.factory" multiple placeholder="请选择分厂">
        <el-option
          v-for="item in factories"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="产线选择" prop="line">
      <el-select v-model="searchForm.line" multiple placeholder="请选择产线">
        <el-option
          v-for="item in lines"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="time">
      <el-date-picker v-model="searchForm.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
    export default {
        name: "key_indicators",
      data(){
          return {
            searchForm:{
              factory:"",
              line:"",
              time:""
            },
            searchRules:{
              factory: [
                { required: true, message: '请选择分厂', trigger: 'blur' }
              ],
              line: [
                { required: true, message: '请选择产线', trigger: 'blur' }
              ],
              time: [
                { required: true, message: '请选择时间', trigger: 'blur' }
              ]
            },
            factories: [
              {
              value: 'all',
              label: '系统总览'
            },{
              value: 'casting',
              label: '铸造厂'
            },{
              value: 'gold',
              label: '金加工厂'
            },{
              value: 'assembly',
              label: '装配厂'
            },{
              value: 'debug',
              label: '调试厂'
            }],
            lines: [
              {
                value: 'all',
                label: '系统总览'
              },{
                value: 'casting',
                label: '铸造厂'
              },{
                value: 'gold',
                label: '金加工厂'
              },{
                value: 'assembly',
                label: '装配厂'
              },{
                value: 'debug',
                label: '调试厂'
              }],
          }
      },
      methods:{
        searchSubmit(){

        }
      }
    }
</script>

<style scoped>

</style>
