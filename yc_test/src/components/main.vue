<template>
  <div class="admin">
    <el-container>
      <el-header height="90">
        <el-row class="topTitle">
          <el-col :span="3" style="height: 100%">
            <img src="../assets/images/logo.png"  alt="logo" >
            <div class="division"></div>
          </el-col>
          <el-col :span="3">
            <h3>供应链全景视图</h3>
          </el-col>
        </el-row>
        <el-row class="topBar">
          <el-dropdown trigger="click">
            <el-button type="text" style="color: #ffffff">
              <i class="fa fa-bars"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <a id="changePwd_btn" @click="changePwdDialog">
                <div>
                  <i class="fa fa-key"></i>修改密码
                </div>
              </a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a @click="logOut">
                <div>
                  <i class="fa fa-sign-out"></i>退出
                </div>
              </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-header>
      <el-container>
      <el-aside width="auto">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="fa fa-user"></i>
              <span slot="title">高管视图</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <router-link :to="{name: 'key_indicators'}" href="javascript:">
                  公司运营指标
                </router-link>
              </el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="4" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          <el-button type="primary" :icon="collapseMenuIcon" circle  @click="collapseMenu"></el-button>
        </el-menu>
      </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer></el-footer>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="ifChangePwdShow" label-width="120px" width="35%" @close="cancleSubmit('pwdForm')">
      <el-form :model="pwdForm" ref="pwdForm" :rules="pwdRules">
        <el-form-item label="原始密码" prop="oldPwd">
          <el-col :span="20">
          <el-input v-model="pwdForm.oldPwd" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-col :span="20">
          <el-input v-model="pwdForm.newPwd" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-col :span="20">
          <el-input v-model="pwdForm.confirmPwd" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleSubmit('pwdForm')">取 消</el-button>
        <el-button type="primary" @click="submitPwd('pwdForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { urls} from "../assets/js/config";
export default {
  name: 'admin',
  data(){
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      centerSrc:"",
      menuHtml:"",
      frameworkPath:urls.frameworkPath,
      baseUrl:urls.baseRequestUrl,
      currentCode:"",
      currentName:"",
      currentYear:"",
      ifJump:false,
      reportsList:[],
      isCollapse: true,
      collapseMenuIcon:"fa fa-angle-double-right",
      ifChangePwdShow:false,
      pwdForm:{
        oldPwd:"",
        newPwd:"",
        confirmPwd:""
      },
      pwdRules: {
        oldPwd: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPwd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    // this.getMenu();
    this.centerSrc=urls.baseRequestUrl+"/item/homePage";
  },
  methods:{
    //伸缩菜单
    collapseMenu(){
      this.isCollapse=!this.isCollapse;
      if(this.isCollapse){
        this.collapseMenuIcon="el-icon-d-arrow-right";
      }else{
        this.collapseMenuIcon="fa fa-angle-double-left";
      }
    },
    //获取菜单
    getMenu(){
      this.$axios.get("/api/sf/menu/findByParent/TREE_ROOT_NODE")
        .then(Parent => {
          console.info(Parent);
          Parent=eval("("+Parent+")");
          if(Parent.data.length>0){//一级菜单
            Parent.data.forEach((e,index)=>{
              e.child=[];
              this.$axios.get(this.frameworkPath + "/menu/childrenWithUsername?id="+e.id)
                .then(child=>{
                  child=eval("("+child+")");
                  if(child.length>0){
                    e.child=child;
                    child.forEach((n,index)=>{
                      n.child=[];
                      this.$axios.get(this.frameworkPath + "/menu/childrenWithUsername?id="+n.id)
                        .then(thirdChild=>{
                          thirdChild=eval("("+thirdChild+")");
                          if(thirdChild.length>0){
                            n.child=thirdChild;
                          }
                        });
                    });
                  }
                });
            });
            ///拼接菜单
            let html="",menuLevel1=0,menuLevel2=0,menuLevel3=0;
            Parent.data.forEach((e,index)=>{//一级菜单
              if(e.child.length>0&&e.isReport!=="1"){
                html+="<el-submenu index='"+menuLevel1+"'><template slot='title'>" +
                  "<i class='"+e.iconCls+"'></i>" +
                  "<span slot='title'>"+e.name+"</span></template>";
                e.child.forEach((n,index2)=>{//二级菜单
                  if(n.child.length>0&&n.isReport!=="1"){
                    html+="<el-submenu index='"+menuLevel1+"-"+menuLevel2+"'>" +
                      "<i class='"+n.iconCls+"'></i>" +"<span slot='title'>"+n.name+"</span>";
                    n.child.forEach((k,index3)=>{//三级菜单
                      if(k.isReport==="1"){
                        html+="<el-menu-item index='"+menuLevel1+"-"+menuLevel2+"-"+menuLevel3+"'>"+
                        +'<a class="J_menuItem" @click="toOtherPage('+"'"+this.baseUrl+k.link+"','"+k.id+"','1'"+')">'+k.name+'</a>'+"</el-menu-item>";
                      }else{
                        html+="<el-menu-item index='"+menuLevel1+"-"+menuLevel2+"-"+menuLevel3+"'>"+
                          '<a class="J_menuItem" @click="toOtherPage(\'+"\'"+this.baseUrl+k.link+"\',\'"+k.id+"\',\'0\'"+\')">\'+k.name+\'</a>'+"</el-menu-item>";
                      }
                    });
                    html+="</el-submenu>";
                  }else{
                    if(n.isReport==="1"){
                      html+="<el-submenu index='"+menuLevel1+"-"+menuLevel2+"'>"
                        +"<i class='"+n.iconCls+"'></i>" +"<span slot='title'>"
                        +'<a class="J_menuItem" @click="toOtherPage(\'+"\'"+this.baseUrl+n.link+"\',\'"+n.id+"\',\'1\'"+\')">\'+n.name+"</a>'
                        +"</span></el-submenu>";
                    }else{
                      html+="<el-submenu index='"+menuLevel1+"-"+menuLevel2+"'>"
                        +"<i class='"+n.iconCls+"'></i>" +"<span slot='title'>"
                        +'<a class="J_menuItem" @click="toOtherPage(\'+"\'"+this.baseUrl+n.link+"\',\'"+n.id+"\',\'0\'"+\')">\'+n.name+"</a>'
                        +"</span></el-submenu>";
                    }
                  }
                });
                html+="</el-submenu>";
              }else{
                if(e.isReport==="1"){
                  html+="<el-submenu index='"+menuLevel1+"'><template slot='title'>" +
                    "<i class='"+e.iconCls+"'></i>"
                    +'<a class="J_menuItem"  @click="toOtherPage('+"'"+this.baseUrl+e.link+"','"+e.id+"','1'"+')">'+e.name+'</a>';
                    +"</template></el-submenu>";
                }else{
                  html+="<el-submenu index='"+menuLevel1+"'><template slot='title'>" +
                    "<i class='"+e.iconCls+"'></i>"
                    +'<a class="J_menuItem"  @click="toOtherPage('+"'"+this.baseUrl+e.link+"','"+e.id+"','0'"+')">'+e.name+'</a>';
                  +"</template></el-submenu>";
                }
              }
            });
            console.info(html);
            this.menuHtml=html;
          }
        })
        .catch(res => {
          console.info(res);
          this.erro = 1;
          console.log("失败");
        });
    },
    //menu页面切换
    toOtherPage(src,id,ifReports){
      this.currentCode="";
      this.currentYear="";
      this.currentName="";
      this.reportsList=[];
      if(ifReports){
        this.$axios.get(this.frameworkPath + "/menu/childrenWithUsername?id="+id)
          .then(menu=>{
            let menuList=eval("("+menu+")");
            if(menuList.length>0){
              this.reportsList=menuList;
            }
          })
          .catch(res => {
            this.erro = 1;
            console.log("失败");
          });
      }
      this.centerSrc=url;
    },
    //退出
    logOut:function(){
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功退出!'
        });
        this.$router.push({
          path:"/login"
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
    //修改密码model
    changePwdDialog(){
      this.ifChangePwdShow=true;
    },
    submitPwd(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
            //doSubmit
          this.$refs[formName].resetFields();
          this.ifChangePwdShow=false;
        }else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancleSubmit(formName){
      this.$refs[formName].resetFields();
      this.ifChangePwdShow=false;
    },
    //传参跳转至响应页面
    ParamToDetail(code,year,name,url){
      this.currentCode=code;
      this.currentYear=year;
      this.currentName=name;
      this.ifJump=true;
      this.centerSrc=url;
    }
  },
  components:{
    urls
  }
}
</script>
<style>
  @import "../assets/css/main.css";
</style>

