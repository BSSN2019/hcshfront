<template>
  <div>
    <a-row :gutter="4">
      <a-col span="8">
        <heating-station-panel
          :panel-id="panelList[0].id"
          :panel-title="panelList[0].text"
          :panel-img-source="panelList[0].img"
          :heating-system-id="panelList[0].heatingSystemId"
          :ref="panelList[0].id"
          @OnShowDetail="onShowDetail"
        >
        </heating-station-panel>
      </a-col>
      <a-col span="8">
        <heating-station-panel
          :panel-id="panelList[1].id"
          :panel-title="panelList[1].text"
          :panel-img-source="panelList[1].img"
          :heating-system-id="panelList[1].heatingSystemId"
          :ref="panelList[1].id"
          @OnShowDetail="onShowDetail"
        >
        </heating-station-panel>
      </a-col>
      <a-col span="8">
        <heating-station-panel
          :panel-id="panelList[2].id"
          :panel-title="panelList[2].text"
          :panel-img-source="panelList[2].img"
          :heating-system-id="panelList[2].heatingSystemId"
          :ref="panelList[2].id"
          @OnShowDetail="onShowDetail"
        >
        </heating-station-panel>
      </a-col>
    </a-row>
    <a-row style="height:5px"></a-row>
    <a-row :gutter="4">
      <a-col span="8">
        <water-box-panel
          :panel-id="panelList[3].id"
          :panel-title="panelList[3].text"
          :panel-img-source="panelList[3].img"
          :heating-system-id="panelList[3].heatingSystemId"
          :ref="panelList[3].id"
          @OnShowDetail="onShowDetail"
        >
        </water-box-panel>
      </a-col>
      <a-col span="8">
        <heating-station-panel
          :panel-id="panelList[4].id"
          :panel-title="panelList[4].text"
          :panel-img-source="panelList[4].img"
          :heating-system-id="panelList[4].heatingSystemId"
          :ref="panelList[4].id"
          @OnShowDetail="onShowDetail"
        >
        </heating-station-panel>
      </a-col>
      <a-col span="8">
        <heating-station-panel
          :panel-id="panelList[5].id"
          :panel-title="panelList[5].text"
          :panel-img-source="panelList[5].img"
          :heating-system-id="panelList[5].heatingSystemId"
          :ref="panelList[5].id"
          @OnShowDetail="onShowDetail"
        >
        </heating-station-panel>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getAction } from '@/api/manage'
import HeatingStationPanel from './HeatingStationPanel'
import WaterBoxPanel from './WaterBoxPanel'

export default {
    name: 'HeatingStation',
    components: { WaterBoxPanel, HeatingStationPanel },
    data () {
        return {
            url: {
                station: '/basicdata/heatingstation/query',
                system: '/basicdata/heatingsystem/query'
            },
            panelList: [
                { id: 'panel1', text: '空机位', heatingSystemId: '', img: 'heatingexchange.png' },
                { id: 'panel2', text: '空机位', heatingSystemId: '', img: 'heatingexchange.png' },
                { id: 'panel3', text: '空机位', heatingSystemId: '', img: 'heatingexchange.png' },
                { id: 'panel4', text: '空机位', heatingSystemId: '', img: 'waterbox.png' },
                { id: 'panel5', text: '空机位', heatingSystemId: '', img: 'heatingexchange.png' },
                { id: 'panel6', text: '空机位', heatingSystemId: '', img: 'heatingexchange.png' }
            ]
        }
    },
    mounted () {
        for (let i = 0; i < 6; i++) {
            this.panelList[i].text = '空机位'
            this.panelList[i].heatingSystemId = ''
            this.$refs[this.panelList[i].id].disablePanel()
        }
    },
    methods: {
        showPanels (heatingStationId) {
            getAction(this.url.system, { heatingstation: heatingStationId, orderBy: 'code' }).then(res => {
                if (res.success) {
                    for (let i = 0; i < 6; i++) {
                        this.panelList[i].text = '空机位'
                        this.panelList[i].heatingSystemId = ''
                        this.$refs[this.panelList[i].id].disablePanel()
                    }
                    let index = 0
                    for (let i = 0; i < res.result.length; i++) {
                        if (res.result[i].typestation === 99) {
                            this.panelList[3].text = '公共系统'
                            this.panelList[3].heatingSystemId = res.result[i].id
                            this.$refs.panel4.heatingSystemId = res.result[i].id
                            this.$refs.panel4.enablePanel(res.result[i].id)
                        } else {
                            this.panelList[index].text = res.result[i].name
                            this.panelList[index].heatingSystemId = res.result[i].id
                            this.$refs[this.panelList[index].id].heatingSystemId = res.result[i].id
                            this.$refs[this.panelList[index].id].enablePanel(res.result[i].id)
                            index++
                            if (index === 3) index++
                        }
                    }
                }
            })
        },
        onShowDetail (heatingSystemId) {
            console.log(heatingSystemId)
            this.$emit('OnShowDetail', heatingSystemId)
        }
    }
}
</script>

<style scoped>

</style>
