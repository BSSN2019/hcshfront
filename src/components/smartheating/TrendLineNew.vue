<template>
  <div id="myChart" style="width:100%;height:500px"></div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'Hello',
    data () {
        return {
            colorList: ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF'],
            chartTitle: {
                text: "订单量（个）",
                left: "18px",
                top: "0",
                textStyle: {
                    color: "#999",
                    fontSize: 12,
                    fontWeight: '400'
                }
            },
            chartLegend: {
                show: true,
                top: '5%',
                right: '5%',
                itemWidth: 20,
                itemGap: 20,
                textStyle: {
                    color: '#556677'
                }
            },
            chartColor: ['#73A0FA', '#73DEB3', '#FFB761'],
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
                top: '15%',
                left: '5%',
                right: '5%',
                bottom: '10%'
            },
            chartXAxis: [{
                type: 'category',
                data: ['北京', '上海', '广州', '深圳', '香港', '澳门', '台湾'],
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
                boundaryGap: false
            }],
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
                }
            }, {
                type: 'value',
                position: 'right',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#556677'
                    },
                    formatter: '{value}'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#DCE2E8'
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            chartSeries: [{
                name: 'Adidas',
                type: 'line',
                data: [10, 10, 30, 12, 15, 3, 7],
                symbolSize: 1,
                symbol: 'circle',
                smooth: true,
                yAxisIndex: 0,
                showSymbol: false,
                lineStyle: {
                    width: 5,
                    shadowColor: 'rgba(158,135,255, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 20
                }
            }, {
                name: 'Nike',
                type: 'line',
                data: [5, 12, 11, 14, 25, 16, 10],
                symbolSize: 1,
                symbol: 'circle',
                smooth: true,
                yAxisIndex: 0,
                showSymbol: false,
                lineStyle: {
                    width: 5,
                    shadowColor: 'rgba(115,221,255, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 20
                }
            },
            {
                name: '老北京布鞋',
                type: 'line',
                data: [150, 120, 170, 140, 500, 160, 110],
                symbolSize: 1,
                yAxisIndex: 1,
                symbol: 'circle',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 5,
                    shadowColor: 'rgba(254,154,139, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 20
                }
            }
            ]
        }
    },
    mounted () {
        this.drawLine()
    },
    methods: {
        drawLine () {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            let chartOption = {
                title: this.chartTitle,
                color: this.chartColor,
                tooltip: this.chartTooltip,
                legend: this.chartLegend,
                grid: this.chartGrid,
                xAxis: this.chartXAxis,
                yAxis: this.chartYAxis,
                series: this.chartSeries
            }
            myChart.setOption(chartOption)
        }
    }
}
</script>

<style scoped>

</style>
