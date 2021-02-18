<template>
  <a-card title="地图" style="height:1000px">
    <a-row :gutter="0">
      <a-col spa="24">
        <div style="overflow:auto">
          <baidu-map
            :center="center"
            :zoom="zoom"
            @ready="initMap"
            ak="RvbM40ylTtCpDBlUufGnnHPxKnphkLHb"
            :scroll-wheel-zoom="true"
            :style="{width:map.width,height:map.height}"
            :map-style="mapStyle"
          >
            <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
            <div v-for="(item) in heatingSources">
              <bm-marker :position="{lng: item.lng, lat: item.lat}">
              </bm-marker>
              <bm-label
                :content="item.name"
                :position="{lng: item.lng, lat: item.lat}"
                :labelStyle="{color: 'blue', fontSize : '16px'}"
                :offset="{width: -25, height: 15}"
              />
            </div>
          </baidu-map>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { getAction } from '@/api/manage'
import pick from 'lodash.pick'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmView from 'vue-baidu-map/components/map/MapView.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'

export default {
    name: 'GISMonitor',
    components: {
        BaiduMap,
        BmView,
        BmScale,
        BmNavigation,
        BmMarker,
        BmInfoWindow
    },
    data () {
        return {
            heatingSources: [],
            url: {
                heatingSource: '/basicdata/heatingsource/query',
                config: '/sys/config/query'
            },
            // 地图相关属性
            center: { lng: 0, lat: 0 },
            zoom: 12,
            map: {
                width: '100%',
                height: '900px'
            },
            mapStyle: { style: 'googlelite'
            }
        }
    },
    mounted () {
        this.initHeatingSource()
    },
    methods: {
        initHeatingSource () {
            this.heatingSources = []
            getAction(this.url.heatingSource, { active: 1 }).then((res) => {
                if (res.success) {
                    console.log(res.result)
                    for (let i = 0; i < res.result.length; i++) {
                        this.heatingSources.push({
                            name: res.result[i].name,
                            code: res.result[i].code,
                            lng: res.result[i].longitude,
                            lat: res.result[i].latitude
                        })
                    }
                }
            })
        },
        initMap ({ BMap, map }) {
            getAction(this.url.config, { name: 'mapcenterlng' }).then((res) => {
                if (res.success) {
                    this.center.lng = res.result[0].value
                } else {
                    this.center.lng = 117.054211
                }
            })
            getAction(this.url.config, { name: 'mapcenterlat' }).then((res) => {
                if (res.success) {
                    this.center.lat = res.result[0].value
                } else {
                    this.center.lat = 39.123662
                }
            })
            getAction(this.url.config, { name: 'mapzoom' }).then((res) => {
                if (res.success) {
                    this.center.zoom = res.result[0].value
                } else {
                    this.center.zoom = 12
                }
            })
            // style: normal, light, dark, redalert, googlelite, grassgreen, midnight, pink, darkgreen, blush, grayscale, hardedge
            /*
            let mapStyle={
                features:['road','water','land'],
                style: 'grayscale'
            }
            map.setMapStyle(mapStyle)
*/
        }
    }

}
</script>

<style scoped>

</style>
