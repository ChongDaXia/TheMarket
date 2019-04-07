<template>
    <div>
        <div>图标页面</div>
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.drawLine ()
  },
  methods: {
    drawLine () {
      let myChart=this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          text: '数据统计'
        },
        tooltip: {

        },
        legend: {
          data: ['数据来源']
        },
        xAxis: {
          data: ['啊','哦','额','哈']
        },
        yAxis: {
         
        },
        series: {
          name: '访问量',
          type: 'line',
          data: [500,200,360,100]
        }
      })
    }
  }
}
</script>

