<template>
  <div>
    <div :id="trendId" :style="{width: trendWidth , height: trendHeight}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getAction } from '@/api/manage'

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
            default: '99%',
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
        parameterId: {
            type: Number,
            default: 0,
            required: true
        },
        trendXAxisRotate: {
            type: Number,
            default: 0,
            required: false
        },
        trendShowTitle: {
            type: Boolean,
            default: true,
            required: false
        },
        trendLegendVisible: {
            type: Boolean,
            default: false,
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
        barWidth: {
            type: String,
            default: '50px',
            require: false
        }

    },
    data () {
        return {
            url: {
                parameterurl: '/system/sysmonparam/getparamlistbyid'
            },

            trendSymbolSize: 10,
            trendChart: null,
            trendLineColor: '#FF3366',

            chartLegend: { show: this.trendLegendVisible, data: [] },
            chartTitle: { text: this.trendTitle, left: 'center', show: this.trendShowTitle },
            charttooltip: { trigger: 'axis' },
            chartgrid: { left: '50px', right: '50px', top: '10px', bottom: '40px' },
            chartXAxis: {
                type: 'category',
                name: '时间',
                axisLabel: { show: true, rotate: this.trendXAxisRotate, textStyle: { color: '#999999' } },
                axisLine: { lineStyle: { color: '#999999', width: 1 } },
                data: []
            },
            chartYAxis: {
                type: 'value',
                name: '数值', // this.trendYAxisName,
                axisLabel: { show: true, textStyle: { color: '#999999' } },
                axisLine: { lineStyle: { color: '#999999', width: 1 } }
            },
            chartSeries: [{
                type: this.chartType,
                smooth: this.trendLineSmooth,
                symbolSize: 8,
                lineStyle: { color: this.trendLineColor, width: 3 },
                itemStyle: { borderWidth: 1, borderColor: this.trendLineColor, color: this.trendLineColor },
                barWidth: this.barWidth,
                data: []
            }],

            chartSeriesTemp: {
                type: 'line',
                smooth: this.trendLineSmooth,
                symbolSize: 8,
                lineStyle: { color: this.trendLineColor, width: 3 },
                itemStyle: { borderWidth: 1, borderColor: this.trendLineColor, color: this.trendLineColor },
                data: []
            },
            lineXData: [],
            lineYData: [],

            chartOption: {}
        }
    },
    created () {
    },
    mounted () {
        this.initParameter()
        this.initChart()
    },
    watch: {
        chartOption: {
            handler (newVal, oldVal) {
                if (this.trendChart) {
                    if (newVal) {
                        this.trendChart.setOption(newVal)
                    } else {
                        this.trendChart.setOption(oldVal)
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
        drawLine (url, param) {
            getAction(url, param).then((res) => {
                if (res.success) {
                    console.log('==============draw line ================')
                    console.log(res.result)
                    this.lineXData = []
                    this.lineYData = []
                    let maxvalue = 0
                    for (let i = 0; i < res.result.length; i++) {
                        if (res.result[i].value == null) {
                            this.lineXData.push(res.result[i].time)
                            if (this.changeNullTo0) {
                                this.lineYData.push(0)
                            } else { this.lineYData.push(null) }
                        } else {
                            this.lineXData.push(res.result[i].time)
                            this.lineYData.push(parseFloat(res.result[i].value))
                            if (parseFloat(res.result[i].value) > maxvalue) {
                                maxvalue = parseFloat(res.result[i].value)
                            }
                        }
                    }
                    this.chartXAxis.data = this.lineXData
                    this.chartSeries[0].data = this.lineYData
                    this.chartSeries[0].lineStyle.color = this.trendLineColor
                    this.chartSeries[0].itemStyle.color = this.trendLineColor
                    this.chartSeries[0].itemStyle.borderColor = this.trendLineColor
                    this.chartYAxis.max = Math.trunc(maxvalue * 1.5)

                    this.chartOption = {
                        title: this.chartTitle,
                        legend: this.chartLegend,
                        tooltip: this.charttooltip,
                        grid: this.chartgrid,
                        xAxis: this.chartXAxis,
                        yAxis: this.chartYAxis,
                        series: this.chartSeries
                    }
                    this.trendChart.setOption(this.chartOption)
                }
            })
        },

        drawLines (lineparams) {
            let seriesname = ''
            this.chartSeries = []
            let maxvalue = 0
            let seriescolor = ''
            for (let i = 0; i < lineparams.length; i++) {
                getAction(lineparams[i].url, lineparams[i].param).then((res) => {
                    if (res.success) {
                        seriesname = lineparams[i].name
                        seriescolor = lineparams[i].color
                        this.chartLegend.data.push(seriesname)
                        this.lineXData = []
                        this.lineYData = []
                        let lineData = []
                        for (let i = 0; i < res.result.length; i++) {
                            if (res.result[i].value == null) {
                                this.lineXData.push(res.result[i].time)
                                this.lineYData.push(null)
                                lineData.push(null)
                            } else {
                                this.lineXData.push(res.result[i].time)
                                this.lineYData.push(res.result[i].value)
                                lineData.push(res.result[i].value)
                                if (parseFloat(res.result[i].value) > maxvalue) {
                                    maxvalue = parseFloat(res.result[i].value)
                                }
                            }
                        }
                        this.chartYAxis.max = Math.trunc(maxvalue * 1.5)
                        let series =
                                {
                                    name: seriesname,
                                    type: this.chartType,
                                    smooth: this.trendLineSmooth,
                                    symbolSize: 8,
                                    lineStyle: { color: seriescolor, width: 3 },
                                    itemStyle: { borderWidth: 1, borderColor: seriescolor, color: seriescolor },
                                    data: lineData
                                }
                        this.chartXAxis.data = this.lineXData
                        this.chartSeries.push(series)
                    }
                })
            }

            this.$nextTick(() => {
                // this.chartYAxis.max = 50
                setTimeout(() => {
                    this.chartOption = {
                        title: this.chartTitle,
                        legend: this.chartLegend,
                        tooltip: this.charttooltip,
                        grid: this.chartgrid,
                        xAxis: this.chartXAxis,
                        yAxis: this.chartYAxis,
                        series: this.chartSeries
                    }
                    this.trendChart.setOption(this.chartOption)
                    this.$emit('onFinish')
                }, 10)
            })
        },

        initParameter () {
            if (this.parameterId !== 0) {
                this.$nextTick(() => {
                    this.chartYAxis.max = 50
                    setTimeout(() => {
                        getAction(this.url.parameterurl, { id: this.parameterId }).then((res) => {
                            if (res.success) {
                                this.chartYAxis.name = this.trendYAxisName + '(' + res.result.unit + ')'
                                this.chartXAxis.name = this.trendXAxisName
                            }
                        })
                    }, 10)
                })
            }
        }
    }
}
</script>

<style scoped>

</style>
