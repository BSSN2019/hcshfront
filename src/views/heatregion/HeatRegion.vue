<template>
  <div>
    <a-spin :spinning="confirmLoading">
      <baidu-map
        :center="center"
        :zoom="zoom"
        @ready="initMap"
        ak="RvbM40ylTtCpDBlUufGnnHPxKnphkLHb"
        :scroll-wheel-zoom="true"
        :style="{ width: this.mapWidth, height: this.mapHeight }"
      >
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      </baidu-map>
    </a-spin>
  </div>
</template>

<script>
import { getAction } from '@/api/manage'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmView from 'vue-baidu-map/components/map/MapView.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmLabel from 'vue-baidu-map/components/overlays/Label'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection'
import BmControl from 'vue-baidu-map/components/controls/Control'
import BmPolyLine from 'vue-baidu-map/components/overlays/Polyline'
import BmPolygon from 'vue-baidu-map/components/overlays/Polygon'

const CUSTOM_MAP_CONFIG = require('./custom_map_config.json')

export default {
    name: 'MapPanel',
    components: {
        BaiduMap,
        BmView,
        BmScale,
        BmNavigation,
        BmMarker,
        BmInfoWindow,
        BmPointCollection,
        BmLabel,
        BmControl,
        BmPolyLine,
        BmPolygon
    },
    props: {
        mapHeight: {
            type: String,
            default: '850px',
            required: false
        },
        mapWidth: {
            tpye: String,
            default: '100%',
            required: false
        },
        centerLng: {
            type: Number,
            default: 117.144355,
            required: false
        },
        centerLat: {
            type: Number,
            default: 39.077068,
            required: false
        },
        defaultZoom: {
            type: Number,
            default: 12,
            required: false
        }
    },
    data () {
        return {
            confirmLoading: false,
            url: {
                heatingSource: '/heatingSource/query',
                heatingStation: '/masterData/heatingStation/queryGISList',
                primaryNetwork: '/geo/network/list',
                secondNetwork: '',
                stationRegion: '/geo/stationRegion/list'
            },
            /** 地图相关属性 */
            center: { lng: this.centerLng, lat: this.centerLat },
            zoom: 15,
            map: null,
            BMap: null,
            mapStyle: {
                styleJson: CUSTOM_MAP_CONFIG
            },
            curZoom: 12
        }
    },
    mounted () {
        window.addEventListener('mousewheel', this.handleScroll, true)
    },
    methods: {
        initMap ({ BMap, map }) {
            this.center.lng = this.centerLng
            this.center.lat = this.centerLat
            this.zoom = this.defaultZoom
            this.curZoom = this.defaultZoom
            this.map = map
            this.BMap = BMap
            map.setMapStyleV2({ styleJson: this.mapStyle.styleJson })
        },
        handleScroll () {
            this.curZoom = this.map.getZoom()
            console.log(this.curZoom)
        },

        infoWindowOpen () {
            this.infoWindow.show = true
        },
        infoWindowClose () {
            this.infoWindow.show = false
        },
        clickPoint (item) {
            this.infoWindowClose()
            this.infoWindow.show = true
            this.infoWindow.info.title = '换热站详情'
            this.infoWindow.info.centerStation = item.centerStationName
            this.infoWindow.info.heatingStation = item.heatingStationName
            this.infoWindow.info.heatingSystem = item.heatingSystemList
            this.infoWindow.info.lng = item.lng
            this.infoWindow.info.lat = item.lat
            this.center.lng = item.lng
            this.center.lat = item.lat
            this.zoom = 18
        },
        mouseOverPoint (type, target, point, pixel) {
            let item = type
            this.infoWindowClose()
            this.infoWindow.show = true
            this.infoWindow.info.title = '换热站详情'
            this.infoWindow.info.centerStation = item.centerStationName
            this.infoWindow.info.heatingStation = item.heatingStationName
            this.infoWindow.info.heatingSystem = item.heatingSystemList
            this.infoWindow.info.lng = item.lng
            this.infoWindow.info.lat = item.lat
        },
        mouseLeavePoint (type, target, point, pixel) {
            this.infoWindow.show = false
        },
        onClickHeatingSystem (heatingSystemId) {
            this.$emit('onClickSystem', heatingSystemId)
        }
    }
}
</script>

<style scoped>

</style>
