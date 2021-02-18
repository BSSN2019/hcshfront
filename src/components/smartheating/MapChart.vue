<template>
  <div>
    <div id="map-chart" :style="innerMap"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getAction } from '@/api/manage'
const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
const CUSTOM_MAP_CONFIG = require('./custom_map_config.json')

export default {
    name: 'MapChart',
    components: { echarts },
    prop: {
        innerMapHeight: {
            type: String,
            default: '420px'
        }
    },
    data () {
        return {
            mapChart: null,
            chart: null,
            bmap: null,
            mapStyle: {
                styleJson: CUSTOM_MAP_CONFIG
            },
            innerMap: { height: '420px' },
            url: {
                project: '/basicdata/heatingproject/query'
            },
            pointData: [],
            linesData: [ ],
            option: {
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
                        var value = params.value[params.seriesIndex + 1]
                        res = "<span style='color:#fff;'>" + name + '</span><br/>数据：' + value
                        return res
                    }
                },
                bmap: {
                    center: [117.170344, 39.09253],
                    // 百度地图缩放等级，数字越大，放大越大，地图比例尺越小
                    zoom: 12,
                    // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
                    roam: true,
                    mapStyle: {
                        styleJson: CUSTOM_MAP_CONFIG
                    }
                },
                series: [
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
                    },
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
                    }
                ]
            }
        }
    },
    mounted () {
        this.initChart()
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
        initChart () {
            this.mapChart = this.$echarts.init(document.getElementById('map-chart'))
            this.bmap = this.mapChart.getModel().getComponent('bmap').getBMap()
            this.bmap.addControl(new BMap.MapTypeControl())
            this.bmap.setMapStyleV2({ styleJson: this.mapStyle.styleJson })
/*
            this.mapChart.on('finished', () => {
                this.bmap = this.mapChart.getModel().getComponent('bmap').getBMap()
                this.bmap.addControl(new BMap.MapTypeControl())
                this.bmap.setMapStyleV2({ styleJson: this.mapStyle.styleJson })
            })
*/
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
                            projectId: res.result[i].id
                        })
                    }
                    this.option.series[0].data = this.linesData
                    this.option.series[2].data = this.pointData
                    this.mapChart.setOption(this.option)
                    this.mapChart.on('click', (params) => {
                    })
                }
            })
        }
    }
}
</script>
<style scoped>
  #map-chart {
    width: 95%;
    margin: 0 auto;
  }
  .anchorBL {
    display: none !important;;
  }
  .BMap_cpyCtrl {
    display:none !important;;
  }
</style>
