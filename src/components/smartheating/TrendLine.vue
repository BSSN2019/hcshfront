<template>
  <div>
    <div :id="trendId" :style="{width: trendWidth , height: trendHeight}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

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
            default: '250px',
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
            chartLegend: {
                show: true,
                top: '5%',
                right: '5%',
                itemWidth: 6,
                itemGap: 20,
                textStyle: {
                    color: '#556677'
                }
            },
            chartTitle: {
                text: this.trendTitle,
                top: '20px',
                left: 'center',
                show: true
            },
            chartTooltip: {
                trigger: 'axis',
                backgroundColor: '#fff',
                textStyle: {
                    color: '#5c6c7c'
                },
                padding: [10, 10],
                extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
            },
            chartGrid: {
                left: '5%',
                right: '5%',
                top: '2%',
                bottom: '20%'
            },
            chartXAxis: [],
            chartXAxisTemplate: {
                type: 'time',
                data: [],
                axisLine: {
                    lineStyle: {
                        color: '#DCE2E8'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#556677'
                    },
                    margin: 15
                },
                axisPointer: {
                    label: {
                        padding: [11, 5, 7],
                        backgroundColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#fff' // 0% 处的颜色
                            }, {
                                offset: 0.9,
                                color: '#fff' // 0% 处的颜色
                            }, {
                                offset: 0.9,
                                color: '#33c0cd' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#33c0cd' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                },
                boundaryGap: false,
                splitLine: {
                    show: false
                }
            },
            chartYAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#DCE2E8'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#556677'
                    }
                },
                splitLine: {
                    show: false
                },
                max: function (value) { return Math.ceil(value.max * 1.5) }
            }],
            chartSeries: [],
            chartSeriesTemplate: {
                name: '',
                type: 'line',
                data: [],
                symbolSize: 1,
                symbol: 'circle',
                smooth: true,
                yAxisIndex: 0,
                showSymbol: false,
                lineStyle: {
                    color: '',
                    width: 3
                },
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '',
                    color: ''
                }
            }
        }
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
        },

        drawOneLine (seriesName, lineColor, data) {
            let lineXData = []
            let lineYData = []
            for (let i = 0; i < data.length; i++) {
                if (data[i].samplevalue == null) {
                    lineXData.push(data[i].time)
                    if (this.changeNullTo0) {
                        lineYData.push(0)
                    } else {
                        lineYData.push(null)
                    }
                } else {
                    lineXData.push(data[i].time)
                    lineYData.push({
                        value: [ data[i].time, parseFloat(data[i].samplevalue).toFixed(2) ]
                    })
                }
            }
            this.chartXAxisTemplate.data = lineXData
            this.chartXAxis.push(this.chartXAxisTemplate)

            this.chartSeriesTemplate.data = lineYData
            this.chartSeriesTemplate.name = seriesName

            this.chartSeriesTemplate.lineStyle.color = lineColor
            this.chartSeriesTemplate.itemStyle.color = lineColor
            this.chartSeriesTemplate.itemStyle.borderColor = lineColor

            this.chartSeries.push(this.chartSeriesTemplate)

            let chartOption = {
                title: this.chartTitle,
                legend: this.chartLegend,
                tooltip: this.chartTooltip,
                grid:
              {
                  left: '30',
                  right: '10',
                  top: '50',
                  height: '60%',
                  borderColor: '#CCCCCC',
                  show: true
              },
                xAxis: this.chartXAxis,
                yAxis: this.chartYAxis,
                series: this.chartSeries
            }
            this.trendChart.clear()
            this.trendChart.setOption(chartOption,true)
        },
        drawMultiLine (parameters, data) {
            this.trendChart.dispose()
            this.trendChart = this.$echarts.init(document.getElementById(this.trendId))
            this.chartXAxis = []
            this.chartSeries = []
            let chartXAxis
            this.chartXAxis = []
            this.chartSeries = []
            for (let lineIndex = 0; lineIndex < data.length; lineIndex++) {
                chartXAxis = { ...this.chartXAxisTemplate }
                let lineXData = []
                let lineYData = []
                for (let i = 0; i < data[lineIndex].length; i++) {
                    if (data[lineIndex][i].samplevalue == null) {
                        lineXData.push(data[lineIndex][i].time)
                        if (this.changeNullTo0) {
                            lineYData.push(data[lineIndex][i].time, 0)
                        } else {
                            lineYData.push(data[lineIndex][i].time, null)
                        }
                    } else {
                        lineXData.push(data[lineIndex][i].time)
                        lineYData.push({
                            value: [ data[lineIndex][i].time, parseFloat(data[lineIndex][i].samplevalue).toFixed(2) ]
                        })
                    }
                }
                chartXAxis.data = lineXData
                this.chartXAxis.push(chartXAxis)

                let chartSeries = {
                    name: parameters[lineIndex].name,
                    type: 'line',
                    smooth: this.trendLineSmooth,
                    symbolSize: 4,
                    lineStyle: { color: parameters[lineIndex].linecolor, width: 2 },
                    itemStyle: { borderWidth: 1, borderColor: parameters[lineIndex].linecolor, color: parameters[lineIndex].linecolor },
                    data: lineYData
                }
                this.chartSeries.push(chartSeries)
                chartXAxis = null
                chartSeries = null
            }

            let chartTooltip =
              {
                  trigger: 'axis',
                  backgroundColor: '#fff',
                  textStyle: {
                      color: '#5c6c7c'
                  },
                  padding: [10, 10],
                  extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
              }

            let chartOption = {
                title: this.chartTitle,
                legend: this.chartLegend,
                tooltip: chartTooltip,
                grid: this.chartGrid,
                xAxis: this.chartXAxis,
                yAxis: this.chartYAxis,
                series: this.chartSeries
            }
            this.trendChart.clear()
            this.trendChart.setOption(chartOption, true)
        }
    }
}
</script>

<style scoped>

</style>
