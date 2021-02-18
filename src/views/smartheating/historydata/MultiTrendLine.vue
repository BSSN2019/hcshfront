<template>
  <div>
    <div :id="trendId" :style="{width: trendWidth , height: trendHeight}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

const colorList = ['#c82d31', '#bd6b08', '#9c9800', '#007f54', '#00686b','#625ba1','#194f97']

export default {
    name: 'MultiTrendLine',
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
            default: '200px',
            required: false
        },
        trendLegendVisible: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    data () {
        return {
        /** 日期和时间格式 */
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'YYYY-MM-DD HH:mm:ss',
            minuteFormat: 'HH:mm',
            /** 图表对象 */
            trendChart: null,
            /** 图表配置项 */
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
                        data: [
                            '00:00',
                            '00:15',
                            '00:30',
                            '00:45',
                            '01:00',
                            '01:15',
                            '01:30',
                            '01:45',
                            '02:00',
                            '02:15',
                            '02:30',
                            '02:45',
                            '03:00',
                            '03:15',
                            '03:30',
                            '03:45',
                            '04:00',
                            '04:15',
                            '04:30',
                            '04:45',
                            '05:00',
                            '05:15',
                            '05:30',
                            '05:45',
                            '06:00',
                            '06:15',
                            '06:30',
                            '06:45',
                            '07:00',
                            '07:15',
                            '07:30',
                            '07:45',
                            '08:00',
                            '08:15',
                            '08:30',
                            '08:45',
                            '09:00',
                            '09:15',
                            '09:30',
                            '09:45',
                            '10:00',
                            '10:15',
                            '10:30',
                            '10:45',
                            '11:00',
                            '11:15',
                            '11:30',
                            '11:45',
                            '12:00',
                            '12:15',
                            '12:30',
                            '12:45',
                            '13:00',
                            '13:15',
                            '13:30',
                            '13:45',
                            '14:00',
                            '14:15',
                            '14:30',
                            '14:45',
                            '15:00',
                            '15:15',
                            '15:30',
                            '15:45',
                            '16:00',
                            '16:15',
                            '16:30',
                            '16:45',
                            '17:00',
                            '17:15',
                            '17:30',
                            '17:45',
                            '18:00',
                            '18:15',
                            '18:30',
                            '18:45',
                            '19:00',
                            '19:15',
                            '19:30',
                            '19:45',
                            '20:00',
                            '20:15',
                            '20:30',
                            '20:45',
                            '21:00',
                            '21:15',
                            '21:30',
                            '21:45',
                            '22:00',
                            '22:15',
                            '22:30',
                            '22:45',
                            '23:00',
                            '23:15',
                            '23:30',
                            '23:45'
                        ],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 7,
                            rotate: 30,
                          textStyle: {
                            color: 'rgba(107,107,107,0.7)'
                          }
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
                        },
                        max: function (value) { return Math.ceil(value.max * 1.2) }
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'line',
                        data: [],
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
                        data: [],
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
                        data: [],
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
                        data: [],
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
        },
        drawLine (title, seriesName, lineColor, data) {
            let lineYData
            this.chartOption.title.text = title
            for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
                lineYData = []
                for (let i = 0; i < data[dataIndex].length; i++) {
                    lineYData.push(data[dataIndex][i].value)
                }
                this.chartOption.series[dataIndex].name = seriesName[dataIndex]
                if (lineColor[dataIndex] === null) {
                    this.chartOption.series[dataIndex].lineStyle.normal.color = colorList[dataIndex]
                    this.chartOption.series[dataIndex].itemStyle.color = colorList[dataIndex]
                } else {
                    this.chartOption.series[dataIndex].lineStyle.normal.color = lineColor[dataIndex]
                    this.chartOption.series[dataIndex].itemStyle.color = lineColor[dataIndex]
                }
                this.chartOption.series[dataIndex].data = []
                this.chartOption.series[dataIndex].data = lineYData
            }
            this.trendChart.setOption(this.chartOption, true)
        }
    }
}
</script>

<style scoped>

</style>
