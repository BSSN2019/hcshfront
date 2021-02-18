<template>
  <div>
    <div :id="trendId" :style="{width: trendWidth , height: trendHeight}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']

export default {
    name: 'TrendLineOld',
    components: {
        echarts
    },
    props: {
        trendId: {
            type: String,
            default: 'trendline',
            required: true
        },
        trendTitle: {
            type: String,
            default: '',
            required: false
        },
        trendWidth: {
            type: String,
            default: '100%',
            required: false
        },
        trendHeight: {
            type: String,
            default: '300px',
            required: false
        },
        trendLineSmooth: {
            type: Boolean,
            default: true,
            required: false
        },
        trendXAxisName: {
            type: String,
            default: '时间',
            required: false
        },
        trendYAxisName: {
            type: String,
            default: '数值',
            required: false
        },
        trendXAxisRotate: {
            type: Number,
            default: 0,
            required: false
        },
        trendShowTitle: {
            type: Boolean,
            default: false,
            required: false
        },
        trendLegendVisible: {
            type: Boolean,
            default: true,
            required: false
        },
        chartType: {
            type: String,
            default: 'line',
            require: false
        },
        changeNullTo0: {
            type: Boolean,
            defalut: false,
            require: false
        }
    },
    data () {
        return {
            trendChart: null,
            trendLineColors: ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'],
            chartOption: {
                color: ['#f44'],
                title: {
                    text: '',
                    top: '10px',
                    left: 'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                legend: {
                    icon: 'circle',
                    top: '5%',
                    right: '10%',
                    itemWidth: 6,
                    itemGap: 20,
                    textStyle: {
                        color: '#556677'
                    }
                },
                grid: {
                    left: '5%',
                    right: '10%',
                    top: '15%',
                    bottom: '6%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        label: {
                            show: true,
                            backgroundColor: '#fff',
                            color: '#556677',
                            borderColor: 'rgba(0,0,0,0)',
                            shadowColor: 'rgba(0,0,0,0)',
                            shadowOffsetY: 0
                        },
                        lineStyle: {
                            width: 0
                        }
                    },
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#5c6c7c'
                    },
                    padding: [10, 10],
                    extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(107,107,107,0.7)'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'line',
                        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 8,
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#4bacc6'
                            }
                        },
                        itemStyle: {
                            color: '#4bacc6',
                            borderColor: '#fff',
                            borderWidth: 2
                        }
                    },
                    {
                        name: '',
                        type: 'line',
                        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 13,
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#9bbb59'
                            }
                        },
                        itemStyle: {
                            color: '#9bbb59',
                            borderColor: '#fff',
                            borderWidth: 2
                        }
                    }

                ]
            } }
    },
    created () {
    },
    mounted () {
        this.initChart()
    },
    watch: {
        chartOption: {
            handler (newVal, oldVal) {
                if (this.trendChart) {
                    if (newVal) {
                        this.trendChart.setOption(newVal, true)
                    } else {
                        this.trendChart.setOption(oldVal, true)
                    }
                } else {
                    this.initChart()
                }
            },
            deep: true // 对象内部属性的监听
        }
    },
    methods: {
        initChart () {
            this.trendChart = this.$echarts.init(document.getElementById(this.trendId))
            this.trendChart.clear()
            // window.addEventListener('resize', function () { this.trendChart.resize() })
        },
        drawLine (title, parameters, data) {
            let lineXData = []
            let lineYData1 = []
            let lineYData2 = []

            for (let i = 0; i < data.length; i++) {
                lineXData.push(data[i].valueTime)
                lineYData1.push(data[i].value1)
                lineYData2.push(data[i].value2)
            }
            this.chartOption.title.text = title
            this.chartOption.series[0].name = parameters[0].name
            this.chartOption.series[0].data = []
            this.chartOption.series[0].data = lineYData1
            this.chartOption.series[1].name = parameters[1].name
            this.chartOption.series[1].data = []
            this.chartOption.series[1].data = lineYData2
            this.trendChart.setOption(this.chartOption, true)
        }
    }
}
</script>

<style scoped>

</style>
