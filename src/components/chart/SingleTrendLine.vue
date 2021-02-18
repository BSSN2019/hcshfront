<template>
  <div style="border:0px solid #000000">
    <div :id="trendId" :style="{width: trendWidth , height: trendHeight}" style="border:0px solid #FF0000"></div>
  </div>
</template>

<script>

export default {
    name: 'SingleTrendLine',
    components: {
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
        },
        change0ToNull: {
            type: Boolean,
            default: false,
            require: false
        },
        showDataZoom: {
            type: Boolean,
            default: false,
            require: false
        }
    },
    data () {
        return {
            trendChart: null,
            trendLineColors: ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'],
            chartLegend: {
                show: this.trendLegendVisible,
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
                left: 'center',
                show: this.trendShowTitle,
                textStyle: {
                    fontSize: 13
                }
            },
            chartTooltip: {
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
            chartGrid: {
                left: '100',
                right: '30',
                top: '50',
                height: '80%',
                borderColor: '#CCCCCC',
                show: true
            },
            chartDataZoom: [{ // 滚动条
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                bottom: 0,
                start: 50,
                end: 100
            }],
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
                        color: '#556677',
                        fontSize: 10
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
                        color: '#556677',
                        fontSize: 10
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
                smooth: false,
                yAxisIndex: 0,
                showSymbol: true,
                lineStyle: {
                    color: '',
                    width: 2
                },
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '',
                    color: '#FFFFFF'
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
        drawLine (title, seriesName, lineColor, data) {
            this.chartSeries = []
            this.chartTitle.text = title
            let lineXData = []
            let lineYData = []
            for (let i = 0; i < data.length; i++) {
                lineXData.push(data[i].valueTime)
                if (data[i].value == null) {
                    if (this.changeNullTo0) {
                        lineYData.push({ value: [ data[i].valueTime, 0 ] })
                    } else {
                        lineYData.push({ value: [ data[i].valueTime, null ] })
                    }
                } else if (data[i].value === 0) {
                    if (this.change0ToNull) {
                        lineYData.push({ value: [ data[i].valueTime, null ] })
                    } else {
                        lineYData.push({ value: [ data[i].valueTime, 0 ] })
                    }
                } else {
                    lineYData.push({ value: [ data[i].valueTime, parseFloat(data[i].value).toFixed(2) ] })
                }
            }
            this.chartXAxisTemplate.data = lineXData
            this.chartXAxis.push(this.chartXAxisTemplate)

            this.chartSeriesTemplate.data = lineYData
            this.chartSeriesTemplate.name = seriesName
            if (!this.showDataZoom) { this.chartDataZoom = [] }
            this.chartSeriesTemplate.lineStyle.color = lineColor
            this.chartSeriesTemplate.itemStyle.borderColor = lineColor

            this.chartSeries.push(this.chartSeriesTemplate)

            let chartOption = {
                title: this.chartTitle,
                legend: this.chartLegend,
                tooltip: this.chartTooltip,
                dataZoom: this.chartDataZoom,
                grid: this.chartgrid,
                xAxis: this.chartXAxis,
                yAxis: this.chartYAxis,
                series: this.chartSeries
            }
            this.trendChart.setOption(chartOption, true)
        },
        clearChart () {
            this.trendChart.clear()
        }
    }
}
</script>

<style scoped>

</style>
