<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">

    <a-row :gutter="24">
      <a-col :span="24">
        <a-descriptions :size="descriptionsize" bordered :column="1">
          <a-descriptions-item label="编码">{{ model.code }}</a-descriptions-item>
          <a-descriptions-item label="名称">{{ model.name }}</a-descriptions-item>
          <a-descriptions-item label="所属事业部" span="2">{{ model.division_dictText }}</a-descriptions-item>
          <a-descriptions-item label="负责人">{{ model.leader_dictText }}</a-descriptions-item>
          <a-descriptions-item label="是否启用">{{ model.active_dictText }}</a-descriptions-item>
          <a-descriptions-item label="备注">{{ model.remark }}</a-descriptions-item>
          <a-descriptions-item label="地理位置" span="2">
            <baidu-map
              :center="center"
              :zoom="zoom"
              @ready="initMap"
              ak="RvbM40ylTtCpDBlUufGnnHPxKnphkLHb"
              :scroll-wheel-zoom="true"
              :style="{width:map.width,height:map.height}"
            >
              <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
              <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
              <bm-marker :position="{lng: selectedlng, lat: selectedlat}"></bm-marker>
            </baidu-map>
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>
import { getAction } from '@/api/manage'
import BDictSelectTag from '@/components/dict/BDictSelectTag'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmView from 'vue-baidu-map/components/map/MapView.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'

export default {
    name: 'HeatingProjectDetailDrawer',
    components: {
        BDictSelectTag,
        BaiduMap,
        BmView,
        BmScale,
        BmNavigation,
        BmMarker
    },
    data () {
        return {
            title: '供热项目详情',
            drawerWidth: 800,
            visible: false,
            model: {},
            descriptionsize: 'default',
            url: {
            },
            // 地图相关属性
            center: { lng: 0, lat: 0 },
            zoom: 12,
            map: {
                width: '500px',
                height: '400px'
            },
            showMark: false,
            selectedlng: 0,
            selectedlat: 0,
            selectedcenter: 0,
            keyword: '',
            orglng: 0,
            orglat: 0,
            isEdit: true
        }
    },
    created () {
    },
    methods: {
        show (record) {
            this.model = Object.assign({}, record)
            this.selectedlng = this.model.longitude
            this.selectedlat = this.model.latitude
            this.center.lng = this.selectedlng
            this.center.lat = this.selectedlat
            this.visible = true
        },
        close () {
            this.$emit('close')
            this.visible = false
        },
        handleCancel () {
            this.close()
        },
        initMap ({ BMap, map }) {
            getAction(this.url.config, { name: 'mapzoom' }).then((res) => {
                if (res.success) {
                    this.center.zoom = res.result[0].value
                } else {
                    this.center.zoom = 12
                }
            })
        }
    }
}
</script>
<style scoped>

</style>
