<template>
  <div>
    <a-row :gutter="4">
      <a-col span="8">
        <a-row>
          <a-col span="24">
            <heating-source-type-panel
              :panel-id="panelList[0].id"
              :panel-title="panelList[0].text"
              :panel-img-source="panelList[0].img"
              :heating-system-id="panelList[0].heatingSystemId"
              :ref="panelList[0].id"
              @OnShowDetail="onShowDetail"
            >
            </heating-source-type-panel>
          </a-col>
        </a-row>
        <a-row style="height:4px"></a-row>
        <a-row>
          <a-col span="24">
            <heating-source-water-box-panel
              :panel-id="panelList[1].id"
              :panel-title="panelList[1].text"
              :panel-img-source="panelList[1].img"
              :heating-system-id="panelList[1].heatingSystemId"
              :ref="panelList[1].id"
              @OnShowDetail="onShowDetail"
            >
            </heating-source-water-box-panel>
          </a-col>
        </a-row>
      </a-col>
      <a-col span="8" style="height:850px">
        <heating-source-equipment-panel
          :panel-id="panelList[2].id"
          :panel-title="panelList[2].text"
          :panel-img-source="panelList[2].img"
          :heating-system-id="panelList[2].heatingSystemId"
          :ref="panelList[2].id"
          @OnShowDetail="onShowDetail"
        >
        </heating-source-equipment-panel>
      </a-col>
      <a-col span="8" style="height:850px">
        <heating-source-cycle-panel
          :panel-id="panelList[3].id"
          :panel-title="panelList[3].text"
          :panel-img-source="panelList[3].img"
          :heating-system-id="panelList[3].heatingSystemId"
          :ref="panelList[3].id"
          @OnShowDetail="onShowDetail"
        >
        </heating-source-cycle-panel>
      </a-col>
    </a-row>
    <source01010002 ref="Source01010002"></source01010002>
    <source01010003 ref="Source01010003"></source01010003>
    <source01010004 ref="Source01010004"></source01010004>
    <source01020002 ref="Source01020002"></source01020002>
    <source01020003 ref="Source01020003"></source01020003>
    <source01020004 ref="Source01020004"></source01020004>
    <source01050001 ref="Source01050001"></source01050001>
    <source01050002 ref="Source01050002"></source01050002>
    <source01050003 ref="Source01050003"></source01050003>
    <source01050004 ref="Source01050004"></source01050004>
    <source01060001 ref="Source01060001"></source01060001>
    <source01060002 ref="Source01060002"></source01060002>
    <source01060003 ref="Source01060003"></source01060003>
    <source01060004 ref="Source01060004"></source01060004>
    <source01070002 ref="Source01070002"></source01070002>
    <source01070003 ref="Source01070003"></source01070003>
    <source01070004 ref="Source01070004"></source01070004>
    <source01080002 ref="Source01080002"></source01080002>
    <source01080003 ref="Source01080003"></source01080003>
    <source01080004 ref="Source01080004"></source01080004>
    <source02090001 ref="Source02090001"></source02090001>
    <source02090002 ref="Source02090002"></source02090002>
    <source02090003 ref="Source02090003"></source02090003>
    <source02090004 ref="Source02090004"></source02090004>
    <source02110001 ref="Source02110001"></source02110001>
    <source02110002 ref="Source02110002"></source02110002>
    <source02110003 ref="Source02110003"></source02110003>
    <source02110004 ref="Source02110004"></source02110004>
    <source02120001 ref="Source02120001"></source02120001>
    <source03130001 ref="Source03130001"></source03130001>
    <source03130002 ref="Source03130002"></source03130002>
    <source03130003 ref="Source03130003"></source03130003>
    <source03130004 ref="Source03130004"></source03130004>
    <source03130001 ref="Source03230001"></source03130001>
    <source03130003 ref="Source03230003"></source03130003>
    <source03130004 ref="Source03230004"></source03130004>
    <source03230002 ref="Source03230002"></source03230002>
    <source01140001 ref="Source01140001"></source01140001>
    <source01140002 ref="Source01140002"></source01140002>
    <source01140003 ref="Source01140003"></source01140003>
    <source01140004 ref="Source01140004"></source01140004>
    <source01150001 ref="Source01150001"></source01150001>
    <source01150002 ref="Source01150002"></source01150002>
    <source01150003 ref="Source01150003"></source01150003>
    <source01150004 ref="Source01150004"></source01150004>
    <source01240001 ref="Source01240001"></source01240001>
    <source01240002 ref="Source01240002"></source01240002>
    <source01240003 ref="Source01240003"></source01240003>
    <source01240004 ref="Source01240004"></source01240004>
    <source02160001 ref="Source02160001"></source02160001>
    <source02170001 ref="Source02170001"></source02170001>
    <source02180001 ref="Source02180001"></source02180001>
    <source02190001 ref="Source02190001"></source02190001>
    <source02200001 ref="Source02200001"></source02200001>
    <source02210001 ref="Source02210001"></source02210001>
    <source02220001 ref="Source02220001"></source02220001>

  </div>
</template>

<script>
import { getAction } from '@/api/manage'
import HeatingSourceWaterBoxPanel from './HeatingSourceWaterBoxPanel'
import HeatingSourceTypePanel from './HeatingSourceTypePanel'
import HeatingSourceEquipmentPanel from './HeatingSourceEquipmentPanel'
import HeatingSourceCyclePanel from './HeatingSourceCyclePanel'
import DetailPanelComponents from './heatingsourcedetail/DetailPanelComponents'
import Source01010002 from './heatingsourcedetail/Source01010002'
import Source01010003 from './heatingsourcedetail/Source01010003'
import Source01010004 from './heatingsourcedetail/Source01010004'
import Source01020002 from './heatingsourcedetail/Source01020002'
import Source01020003 from './heatingsourcedetail/Source01020003'
import Source01020004 from './heatingsourcedetail/Source01020004'
import Source01050001 from './heatingsourcedetail/Source01050001'
import Source01050002 from './heatingsourcedetail/Source01050002'
import Source01050003 from './heatingsourcedetail/Source01050003'
import Source01050004 from './heatingsourcedetail/Source01050004'
import Source01060001 from './heatingsourcedetail/Source01060001'
import Source01060002 from './heatingsourcedetail/Source01060002'
import Source01060003 from './heatingsourcedetail/Source01060003'
import Source01060004 from './heatingsourcedetail/Source01060004'
import Source01070002 from './heatingsourcedetail/Source01070002'
import Source01070003 from './heatingsourcedetail/Source01070003'
import Source01070004 from './heatingsourcedetail/Source01070004'
import Source01080002 from './heatingsourcedetail/Source01080002'
import Source01080003 from './heatingsourcedetail/Source01080003'
import Source01080004 from './heatingsourcedetail/Source01080004'
import Source02090001 from './heatingsourcedetail/Source02090001'
import Source02090002 from './heatingsourcedetail/Source02090002'
import Source02090003 from './heatingsourcedetail/Source02090003'
import Source02090004 from './heatingsourcedetail/Source02090004'
import Source02110001 from './heatingsourcedetail/Source02110001'
import Source02110002 from './heatingsourcedetail/Source02110002'
import Source02110003 from './heatingsourcedetail/Source02110003'
import Source02110004 from './heatingsourcedetail/Source02110004'
import Source02120001 from './heatingsourcedetail/Source02120001'
import Source03130001 from './heatingsourcedetail/Source03130001'
import Source03130002 from './heatingsourcedetail/Source03130002'
import Source03130003 from './heatingsourcedetail/Source03130003'
import Source03130004 from './heatingsourcedetail/Source03130004'
import Source03230002 from './heatingsourcedetail/Source03230002'
import Source03230001 from './heatingsourcedetail/Source03230001'
import Source03230003 from './heatingsourcedetail/Source03230003'
import Source03230004 from './heatingsourcedetail/Source03230004'
import Source01140001 from './heatingsourcedetail/Source01140001'
import Source01140002 from './heatingsourcedetail/Source01140002'
import Source01140003 from './heatingsourcedetail/Source01140003'
import Source01140004 from './heatingsourcedetail/Source01140004'
import Source01150001 from './heatingsourcedetail/Source01150001'
import Source01150002 from './heatingsourcedetail/Source01150002'
import Source01150003 from './heatingsourcedetail/Source01150003'
import Source01150004 from './heatingsourcedetail/Source01150004'
import Source01240001 from './heatingsourcedetail/Source01240001'
import Source01240002 from './heatingsourcedetail/Source01240002'
import Source01240003 from './heatingsourcedetail/Source01240003'
import Source01240004 from './heatingsourcedetail/Source01240004'
import Source02160001 from './heatingsourcedetail/Source02160001'
import Source02170001 from './heatingsourcedetail/Source02170001'
import Source02180001 from './heatingsourcedetail/Source02180001'
import Source02190001 from './heatingsourcedetail/Source02190001'
import Source02200001 from './heatingsourcedetail/Source02200001'
import Source02210001 from './heatingsourcedetail/Source02210001'
import Source02220001 from './heatingsourcedetail/Source02220001'

export default {
    name: 'HeatingSource',
    components: {
        HeatingSourceWaterBoxPanel,
        HeatingSourceTypePanel,
        HeatingSourceEquipmentPanel,
        HeatingSourceCyclePanel,
        DetailPanelComponents,
        Source01010002,
        Source01010003,
        Source01010004,
        Source01020002,
        Source01020003,
        Source01020004,
        Source01050001,
        Source01050002,
        Source01050003,
        Source01050004,
        Source01060001,
        Source01060002,
        Source01060003,
        Source01060004,
        Source01070002,
        Source01070003,
        Source01070004,
        Source01080002,
        Source01080003,
        Source01080004,
        Source02090001,
        Source02090002,
        Source02090003,
        Source02090004,
        Source02110001,
        Source02110002,
        Source02110003,
        Source02110004,
        Source02120001,
        Source03130001,
        Source03130002,
        Source03130003,
        Source03130004,
        Source03230002,
        Source03230001,
        Source03230003,
        Source03230004,
        Source01140001,
        Source01140002,
        Source01140003,
        Source01140004,
        Source01150001,
        Source01150002,
        Source01150003,
        Source01150004,
        Source01240001,
        Source01240002,
        Source01240003,
        Source01240004,
        Source02160001,
        Source02170001,
        Source02180001,
        Source02190001,
        Source02200001,
        Source02210001,
        Source02220001
    },
    data () {
        return {
            HeatingSourceComps: DetailPanelComponents,
            panelList: [
                { id: 'panel1', text: '能源形式', heatingSystemId: '', code: '', img: 'heatingsourcetype.png' },
                { id: 'panel2', text: '公共系统', heatingSystemId: '', code: '', img: 'waterbox.png' },
                { id: 'panel3', text: '能源设备', heatingSystemId: '', code: '', img: 'heatingsourceequipment.png' },
                { id: 'panel4', text: '循环系统', heatingSystemId: '', code: '', img: 'heatingsourcecircle.png' }
            ],
            url: {
                system: '/basicdata/heatingsystem/query'
            },
            heatingSourceId: ''

        }
    },
    methods: {
        showPanels (heatingSourceId) {
            console.log('showPanels' + heatingSourceId)
            this.heatingSourceId = heatingSourceId
            getAction(this.url.system, { heatingsource: heatingSourceId, orderBy: 'code' }).then(res => {
                if (res.success) {
                    console.log(res.result)
                    for (let i = 0; i < res.result.length; i++) {
                        if (res.result[i].typesource === 1) {
                            this.panelList[0].heatingSystemId = res.result[i].id
                            this.panelList[0].code = res.result[i].code
                            this.$refs[this.panelList[0].id].setProperty(res.result[i].id, res.result[i].code, res.result[i].realtimeimg)
                        } else if (res.result[i].typesource === 2) {
                            this.panelList[2].heatingSystemId = res.result[i].id
                            this.panelList[2].code = res.result[i].code
                            this.$refs[this.panelList[2].id].setProperty(res.result[i].id, res.result[i].code, res.result[i].realtimeimg)
                        } else if (res.result[i].typesource === 3) {
                            this.panelList[3].heatingSystemId = res.result[i].id
                            this.panelList[3].code = res.result[i].code
                            this.$refs[this.panelList[3].id].setProperty(res.result[i].id, res.result[i].code, res.result[i].realtimeimg)
                        } else if (res.result[i].typesource === 99) {
                            this.panelList[1].heatingSystemId = res.result[i].id
                            this.panelList[1].code = res.result[i].code
                            this.$refs[this.panelList[1].id].setProperty(res.result[i].id, res.result[i].code, res.result[i].realtimeimg)
                        }
                    }
                }
            })
        },
        onShowDetail (heatingSystemId, realtimeImg) {
            console.log(realtimeImg)
            if (realtimeImg !== null) {
                let componentName = 'Source' + realtimeImg
                this.$refs[componentName].show(heatingSystemId)
            }
        }
    }
}
</script>

<style scoped>

</style>
