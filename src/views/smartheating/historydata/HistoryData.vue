<template>
  <div class="mainPanel">
    <a-row :gutter="4">
      <a-col span="4">
        <a-card title="站房" style="height:853px">
          <heating-org-tree
            :widgetHeight="treeHeight"
            :checkable="false"
            :draggable="false"
            :showHeatingSystem="true"
            @onTreeSelect="onTreeSelect"
          ></heating-org-tree>
          <div slot="extra" style="height:30px">&nbsp;</div>
        </a-card>
      </a-col>
      <a-col span="20">
        <a-row :gutter="4">
          <a-col span="12">
            <his-data-panel
              :title="panelConfig[0].title"
              :trend-id="panelConfig[0].trendId"
              :trend-height="panelConfig[0].trendHeight"
              :group-id="panelConfig[0].groupId"
              :ref="panelConfig[0].trendId"
            >
            </his-data-panel>
          </a-col>
          <a-col span="12">
            <his-data-panel
              :title="panelConfig[1].title"
              :trend-id="panelConfig[1].trendId"
              :trend-height="panelConfig[1].trendHeight"
              :group-id="panelConfig[1].groupId"
              :ref="panelConfig[1].trendId"
            >
            </his-data-panel>
          </a-col>
        </a-row>
        <a-row style="height:4px"></a-row>
        <a-row :gutter="4">
          <a-col span="12">
            <his-data-panel
              :title="panelConfig[2].title"
              :trend-id="panelConfig[2].trendId"
              :trend-height="panelConfig[2].trendHeight"
              :group-id="panelConfig[2].groupId"
              :ref="panelConfig[2].trendId"
            >
            </his-data-panel>
          </a-col>
          <a-col span="12">
            <his-data-panel
              :title="panelConfig[3].title"
              :trend-id="panelConfig[3].trendId"
              :trend-height="panelConfig[3].trendHeight"
              :group-id="panelConfig[3].groupId"
              :ref="panelConfig[3].trendId"
            >
            </his-data-panel>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
import { getAction } from '@/api/manage'
import HeatingOrgTree from '@/components/smartheating/HeatingOrgTree'
import HisDataPanel from './HisDataPanel'
export default {
    name: 'HistoryData',
    components: {
        HeatingOrgTree,
        HisDataPanel
    },
    data () {
        return {
            timeFormat: 'YYYY-MM-DD HH:mm:ss',
            dateFormat: 'YYYY-MM-DD',
            panelConfig: [
                { title: '温度', trendId: 'tempLine', trendHeight: '300px', groupId: 1 },
                { title: '压力', trendId: 'pressureLine', trendHeight: '300px', groupId: 2 },
                { title: '流量', trendId: 'flowLine', trendHeight: '300px', groupId: 3 },
                { title: '热量', trendId: 'heatLine', trendHeight: '300px', groupId: 4 }
            ],
            treeHeight: '700px',
            trendHeight: '300px',
            // 其他属性
            url: {
                parameter: '/sys/parameter/queryhisdata',
                stationValue: '/stationvalue/queryday'
            },
        }
    },
    methods: {
        onTreeSelect (selectedKeys, node) {
            let type = node.dataRef.type
            let itemid = node.dataRef.itemid
            // 如果所选择的树节点为供热系统
            if (type === 5) {
                for (let i = 0; i < 4; i++) {
                    let queryDate = moment(new Date()).format(this.dateFormat)
                    this.$refs[this.panelConfig[i].trendId].showLine(itemid, queryDate)
                }
            }
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
