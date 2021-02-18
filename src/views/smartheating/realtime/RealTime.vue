<template>
  <div class="mainPanel">
    <a-row :gutter="4">
      <a-col span="4">
        <a-card title="站房" style="height:850px">
          <heating-org-tree
            :widgetHeight="treeHeight"
            :checkable="false"
            :draggable="false"
            :level="3"
            :showHeatingSystem="false"
            @onTreeSelect="onTreeSelect">
            >
          </heating-org-tree>
        </a-card>
      </a-col>
      <a-col span="20">
        <heating-source v-show="this.showType === 3" ref="sourcePanel"></heating-source>
        <heating-station v-show="this.showType === 4" ref="stationPanel" @OnShowDetail="handleStationOpenDetail"></heating-station>
      </a-col>
    </a-row>
    <heating-station-detail-valve ref="stationModalValve" ></heating-station-detail-valve>
    <heating-station-detail-pump ref="stationModalPump" ></heating-station-detail-pump>
  </div>
</template>

<script>
import HeatingOrgTree from '@/components/smartheating/HeatingOrgTree'
import HeatingStation from './HeatingStation'
import HeatingSource from './HeatingSource'

import HeatingStationDetailValve from './HeatingStationDetailValve'
import HeatingStationDetailPump from './HeatingStationDetailPump'
import { getAction, getFileAccessHttpUrl } from '@/api/manage'

export default {
    name: 'RealTime',
    components: {
        HeatingOrgTree,
        HeatingStation,
        HeatingSource,
        HeatingStationDetailValve,
        HeatingStationDetailPump
    },
    data () {
        return {
            treeHeight: '750px',
            showType: 4,
            controlParameter: '',
            url: {
                /** 获取供热系统的信息 */
                heatingSystem: '/basicdata/heatingsystem/query'
            }
        }
    },
    mounted () {
    },
    methods: {
        onTreeSelect (selectedKeys, node) {
            let type = node.dataRef.type
            let itemid = node.dataRef.itemid
            this.selectedPoint = itemid
            if (type === 3) {
                // 如果选择的树节点为热源
                this.showType = 3
                this.$refs.sourcePanel.showPanels(itemid)
            }
            if (type === 4) {
                // 如果所选择的树节点为换热站
                this.showType = 4
                this.$refs.stationPanel.showPanels(itemid)
            }
        },
        handleStationOpenDetail (item) {
            getAction(this.url.heatingSystem, { id: item }).then((res) => {
                if (res.success) {
                    this.controlParameter = res.result[0].controlparameter
                    if (this.controlParameter === 'EQCBW005') {
                        this.$refs.stationModalValve.show(item)
                    } else {
                        this.$refs.stationModalPump.show(item)
                    }
                }
            })
        },
        getImgView (text) {
            if (text && text.indexOf(',') > 0) {
                text = text.substring(0, text.indexOf(','))
            }
            return getFileAccessHttpUrl(text)
        }
    }
}
</script>

<style scoped>
  .mainPanel {
    height: 850px;
    width: 100%;
    padding-top: 12px;
    padding-left: 12px;
    padding-bottom: 12px;
    padidng-right: 0px;
  }
</style>
