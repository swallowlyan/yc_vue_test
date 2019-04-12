<template>
<div class="key_indicators">
  <el-breadcrumb separator="/">
    <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
    <el-breadcrumb-item>高管视图</el-breadcrumb-item>
    <el-breadcrumb-item>公司运营指标</el-breadcrumb-item>
  </el-breadcrumb>
  <h5 class="content_title">公司运营关键指标</h5>
  <el-form ref="searchForm" :model="searchForm" :rules="searchRules" :inline="true" label-width="80px">
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
    <el-form-item label="选择时间" prop="time">
      <el-date-picker v-model="searchForm.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" @click="searchSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-tabs type="border-card">
    <el-tab-pane label="安全指标">
      <el-row class="pageTitle">
        <div class="title-division"></div>
        <h5>指标概览</h5>
      </el-row>
      <el-row>
        <el-col :span="6"><div class="grid-content bg-purple">
          <div class="content">
            <div style="color:gray;text-align: center">
              <h2 id="indicators_title">扬柴  生产系统</h2>
              <h2 class="indicators">安全指标</h2>
            </div>
          </div>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light">
          <div class="content">
            <small>上月<span class="indicators"></span>达标率</small>
            <h1 id="rate">50.00%</h1>
          </div>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          <el-col :span="12">
            <div id="rateRing" style="height: 300px;">
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-top: 25px">
              <h2 style="font-size: 18px;font-weight: bolder;color: gray;margin-top: 10px">未达标指标<span id="unReachNum" style="color: #E51C23">1项</span></h2>
              <h2 style="font-size: 18px;font-weight: bolder;color: gray;margin-top: 10px">达标指标 <span id="reachNum" style="color:#259B24">1项</span></h2>
            </div>
          </el-col>
        </div></el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="交付指标">配置管理</el-tab-pane>
    <el-tab-pane label="成本指标">角色管理</el-tab-pane>
    <el-tab-pane label="质量指标">定时任务补偿</el-tab-pane>
  </el-tabs>
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
      mounted(){
          this.drawRing();
      },
      methods:{
        searchSubmit(){

        },
        drawRing(){
          let myChart = this.$echarts.init(document.getElementById("rateRing"));
          let option = {
            title: {
              text: "同厂产线级指标横向对比",
              x: "center",
              bottom: "0",
              textStyle:{
                fontSize:13,
                fontWeight:'normal'
              }
            },
            grid:{
              left:"70"
            },
            tooltip: {
              trigger: 'axis'
            },
            toolbox: {
              show: false
            },
            legend: {
              data: ['指标'],
              show:false
            },
            xAxis: [
              {
                type: 'category',
                data: ["test1","test2","test3","test4"],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '同厂产线级指标横向对比',
                type: 'bar',
                barWidth:'55%',
                data: [100,210,213,203],
                itemStyle: {
                }
              }
            ]
          };
          // myChart.clear();//清空防止缓存
          myChart.setOption(option);
          window.onresize = myChart.resize;
        }
      },

    }
</script>

<style>

</style>
