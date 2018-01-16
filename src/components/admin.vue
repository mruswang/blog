<template>
<div>
<el-header>
	<div class="header-left">
		<img src="../assets/logo.png" alt="">
		<el-radio-group v-model="isCollapse">
			<el-radio-button :label="false">展开</el-radio-button>
			<el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>
	</div>
<div>
<el-dropdown>
<i class="el-icon-setting" style="margin-right: 15px"></i>
<el-dropdown-menu slot="dropdown">
<el-dropdown-item>查看</el-dropdown-item>
<el-dropdown-item>新增</el-dropdown-item>
<el-dropdown-item>删除</el-dropdown-item>
</el-dropdown-menu>
</el-dropdown>
<span>王小虎</span>
</div>
</el-header>
<Tab></Tab>
<router-view/>
</div>
</template>

<script>
import Tab from 'components/tab'
export default {
  components: {
    Tab
  }
}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;top: 0;
  left: 0;
  width: 100%;
  z-index: 15;
}
.header-left{
	display: flex;
  align-items: center;
}
#app img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
