<template>
  <div class="content" :style="{'paddingLeft':isCollapse?'64px':'200px'}">
    <el-container>
      <div id="bedroom"></div>
    </el-container>
  </div>
</template>
<style>
  .el-aside {
    color: #333;
  }
  .content{
    padding-left: 180px;
    padding-top: 60px;
  }
</style>

<script>
import echarts from 'echarts'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      chart: null,
      opinion: ['学习氛围差', '学习氛围一般', '学习氛围很好'],
      opinionData: [
        {value: 26, name: '学习氛围差'},
        {value: 31, name: '学习氛围一般'},
        {value: 8, name: '学习氛围很好'}
      ]
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawPie('bedroom')
    })
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  methods: {
    drawPie (id) {
      this.chart = echarts.init(document.getElementById(id))
      this.chart.setOption({
        title: {
          text: '用户调查注册数',
          left: 'center',
          top: 10,
          textStyle: {
            fontSize: 20,
            fontFamily: 'Helvetica',
            fontWeight: 400
          }
        },
        tooltip: {
          trigger: 'item',
          formatte: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 5,
          top: 10,
          data: this.opinion
        },
        series: [
          {
            name: '当前的范围',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '60%'],
            avoidLabelOverlap: false,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '24',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.opinionData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffset: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
#bedroom {
  position: relative;
  left: 50%;
  margin-left: -400px;
  margin-bottom: 70px;
  width: 800px;
  height: 600px;
  border: solid #D01257 1px;
  box-shadow: 0 0 8px #FB90B7;
  border-radius: 10px;
}
</style>
