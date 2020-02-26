<template>
  <div id="myChart" :style="{width: '300px', height: '200px'}"></div>
</template>

<script>
    export default {
        name: 'bar',
        data () {
            return {
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {},

                    xAxis: {
                        data: ["接口1","接口2","接口3","接口4"]
                    },
                    yAxis: {},
                    series: [{
                        type: 'bar',
                        data: [5, 20, 30, 10,]
                    }]
                });
            }
        }
    }
</script>
