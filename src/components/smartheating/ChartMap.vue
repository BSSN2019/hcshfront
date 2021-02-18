<template>
  <div ref="mapChart" :style="innerMap"></div>
</template>

<script>
import { getAction } from '@/api/manage'
const CUSTOM_MAP_CONFIG = require('./custom_map_config.json')

export default {
    name: 'ChartMap',
    prop: {
        innerMapHeight: {
            type: String,
            default: '500px'
        }
    },
    data () {
        return {
            chart: '',
            bmap: {}, // 定义一个当前的bmap
            mapStyle: {
                styleJson: CUSTOM_MAP_CONFIG
            },
            url: {
                project: '/basicdata/heatingproject/query'
            },
            innerMap: { width: '95%', height: '500px', margin: '0 auto' },

            pointData: [ ],
            linesData: [ ],
            option: {

            }
        }
    },
    getHeight () {
        let height = window.innerHeight - 10
        this.innerMap.height = (height * 0.6 - 80) + 'px'
    },
    mounted () {
        this.initData()
    },
    created () {
        window.addEventListener('resize', this.getHeight)
        this.getHeight()
    },

    methods: {
        getHeight () {
            let height = window.innerHeight - 10
            this.innerMap.height = (height * 0.6 - 80) + 'px'
        },

        initData () {
            getAction(this.url.project, null).then((res) => {
                if (res.success) {
                    this.linesData = []
                    this.pointData = []
                    for (let i = 0; i < res.result.length; i++) {
                        this.linesData.push({
                            fromName: res.result[i].name,
                            toName: '中心',
                            coords: [[res.result[i].longitude, res.result[i].latitude], [117.144355, 39.077068]]
                        })
                        this.pointData.push({
                            name: res.result[i].name,
                            value: [res.result[i].longitude, res.result[i].latitude],
                            projectId: res.result[i].id,
                            tooltip: { formatter: res.result[i].name }
                        })
                    }
                    this.initMap()
                }
            })
        },
        initMap () {
            this.chart = this.$echarts.init(this.$refs.mapChart)
            // 初始化echarts
            this.chart.setOption({
                animation: false,
                bmap: {
                    // 加载 bmap 组件
                    center: [117.144355, 39.077068],
                    zoom: 12,
                    roam: true,
                    label: {
                        show: true
                    },
                    mapStyle: this.mapStyle
                },
                tooltip: {
                    trigger: 'item',
                    borderColor: '#FFFFCC',
                    showDelay: 0,
                    hideDelay: 0,
                    enterable: true,
                    transitionDuration: 0,
                    extraCssText: 'z-index:100',
                    formatter: function (params, ticket, callback) {
                        // 根据业务自己拓展要显示的内容
                        var res = ''
                        var name = params.name
                        res = "<span style='color:#fff;'>" + name + '</span>'
                        return res
                    }
                },
                series: [
                    {
                        name: '中心点',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        zlevel: 3,
                        rippleEffect: {
                            period: 15,
                            scale: 4,
                            brushType: 'fill'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        symbolSize: 12,
                        showEffectOn: 'render',
                        itemStyle: {
                            normal: {
                                color: '#23DFF5'
                            }
                        },
                        data: [{
                            name: '',
                            value: [117.144355, 39.077068]
                        }]
                    },
                    {
                        name: '供热项目',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        zlevel: 2,
                        rippleEffect: {
                            period: 15,
                            scale: 4,
                            brushType: 'fill'
                        },
                        symbolSize: 8,
                        showEffectOn: 'render',
                        itemStyle: {
                            normal: {
                                color: '#F5A623'
                            }
                        },
                        data: this.pointData
                    },
                    {
                        type: 'lines',
                        coordinateSystem: 'bmap',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 20,
                            trailLength: 0.4,
                            symbol: 'arrow',
                            symbolSize: 6
                        },
                        lineStyle: {
                            normal: {
                                color: '#F5A623',
                                width: 1,
                                opacity: 0.6,
                                curveness: 0.3
                            }
                        },
                        data: this.linesData
                    }
                ]
            })
            this.bmap = this.chart
                .getModel()
                .getComponent('bmap')
                .getBMap()
            this.bmap.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT }))
            this.bmap.setMapStyleV2({ styleJson: this.mapStyle.styleJson })
        }
    }
}
</script>

<style scoped>
    #mapChart {
        width: 95%;
    }
    /deep/.anchorBL {
        display: none!important;
    }
</style>
