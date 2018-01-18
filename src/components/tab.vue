<template>
  <div class="tab">
    <el-menu default-active="zi-list" router class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span slot="title">资讯管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="zi-list">资讯列表</el-menu-item>
          <el-menu-item index="zi-interest">资讯兴趣</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  }
}
</script>

<style>
.tab{
  height: 100%;
  position: fixed;
  left: 0;
  top: 60px;
  background-color: #fff;
  border-right: 1px solid #ddd;
  z-index: 10;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
