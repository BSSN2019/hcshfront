<style scoped>
    h2{
        text-align: center;
        padding: 30px;
        font-size: 18px;
    }
    #chart_example{
        width: 50%;
        height: 500px;
        border: 1px solid red;
        margin: 0 auto;
    }
</style>
<template>
  <div>
    <h2>vue中插入Echarts示例</h2>
    <a-button @click="reload"></a-button>
    <div id="chart_example">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data () {
        return {
            trendChart: null,
            chartOption: {
                color: ['#f44'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                        axisTick: {
                            alignWithLabel: true
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
                        name: '线条1',
                        type: 'line',
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                    },
                    {
                        name: '线条2',
                        type: 'line',
                        data: [11, 10, 9, 8, 7, 7, 7, 8, 9, 10, 11, 12, 13, 22, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                    }

                ]
            }

        }
    },
    mounted () {
        this.trendChart = echarts.init(document.getElementById('chart_example'))
        this.trendChart.setOption(this.chartOption, true)
        // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        window.addEventListener('resize', function () { this.trendChart.resize() })
    },
    methods: {
        reload () {
            this.chartOption.series[0].data = []
            this.chartOption.series[1].data = []
            for (let i = 0; i < 24; i++) {
                this.chartOption.series[0].data.push(10*Math.random() +Math.random())
                this.chartOption.series[1].data.push(Math.random())
            }

            this.trendChart.setOption(this.chartOption, true)
        }
    },
    watch: {},
    created () {

    }
}
</script>
