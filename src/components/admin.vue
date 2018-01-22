<template>
<div>
<el-header>
	<div class="header-left">
		<img src="../assets/logo.png" alt="">
		<el-radio-group v-model="isCollapse">
			<el-radio-button v-if="isCollapse===true" :label="false"><i class="el-icon-d-arrow-right"></i></el-radio-button>
			<el-radio-button v-else :label="true"><i class="el-icon-d-arrow-left"></i></el-radio-button>
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
import {mapActions} from 'vuex'
export default {
  components: {
    Tab
  },
  computed: {
    isCollapse: {
      get () {
        return this.$store.state.isCollapse
      },
      set (value) {
        this.$store.commit('SET_COLLAPSE', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'selectPlay' // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    ])
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
.header-left img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-radio-button__inner{
  padding: 5px;
}
</style>
