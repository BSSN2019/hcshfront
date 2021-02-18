<template>
  <div>
    <a-card :title="panelTitle" class="card">
      <div class="imgDiv">
        <div class="panelDiv">
          <img v-if="panelImgSource !== ''" ref="backImg" :src="getImgView(panelImgSource)" :class="imageClass" @click="handleOpenDetail(heatingSystemId)" />
          <div class="TEMFR003">{{ TEMFR003 }}</div>
          <div class="PRMFR013">{{ PRMFR013 }}</div>
          <div class="FQMFR001">{{ FQMFR001 }}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getFileAccessHttpUrl, getAction } from '@/api/manage'

export default {
    name: 'HeatingStationPanel',
    components: {
    },
    props: {
        panelId: {
            type: String,
            default: 'panel',
            required: true
        },
        panelTitle: {
            type: String,
            default: '空机位',
            required: true
        },
        panelImgSource: {
            type: String,
            default: 'heatingexchange.png',
            required: true
        }
    },
    data () {
        return {
            TEMFR003: '', // 二次进口温度
            PRMFR013: '', // 二次循环泵进口压力
            FQMFR001: '', // 二次循环泵运行频率
            imageClass: 'blankSystem',
            heatingSystemId: '',
            url: {
                stationTSValue: '/dataValue/tsValue/station/queryStationParameterTimeValue'
            }
        }
    },
    methods: {
        getImgView (text) {
            if (text && text.indexOf(',') > 0) {
                text = text.substring(0, text.indexOf(','))
            }
            return getFileAccessHttpUrl(text)
        },
        handleOpenDetail (heatingSystemId) {
            this.$emit('OnShowDetail', heatingSystemId)
        },
        enablePanel (hetaingSystemId) {
            this.heatingSystemId = hetaingSystemId
            this.imageClass = 'heatingSystem'
            this.refreshSampleValue()
            this.timer = setInterval(() => {
                this.refreshSampleValue()
            }, 10 * 1000)
        },
        disablePanel () {
            this.imageClass = 'blankSystem'
            clearInterval(this.timer)
            this.TEMFR003 = ''
            this.PRMFR013 = ''
            this.FQMFR001 = ''
        },
        refreshSampleValue () {
            let param = {
                heatingSystemId: this.heatingSystemId,
                parameterStr: 'TEMFR003,PRMFR013,FQMFR001'
            }
            getAction(this.url.stationTSValue, param).then((res) => {
                if (res.success) {
                    this.TEMFR003 = (res.result.TEMFR003 === undefined || res.result.TEMFR003 === null) ? '' : res.result.TEMFR003.toFixed(1)
                    this.PRMFR013 = (res.result.PRMFR013 === undefined || res.result.PRMFR013 === null) ? '' : res.result.PRMFR013.toFixed(2)
                    this.FQMFR001 = (res.result.FQMFR001 === undefined || res.result.FQMFR001 === null) ? '' : res.result.FQMFR001.toFixed(1)
                }
            })
        }
    }
}
</script>

<style scoped>
    .card {
        width: 100%;
        height: 422px;
    }
    .blankSystem {
        opacity:0.3; filter: alpha(opacity=30);
        width: 100%;
        height: 300px;
    }
    .heatingSystem {
        width: 100%;
        height: 300px;
    }
    .imgDiv {
        padding-top: 12px;
        padding-bottom: 12px;
    }
    .panelDiv {
        position: relative;
    }
    .PRMFR013 {
        position: absolute;
        right: 100px;
        top: 136px;
        color: #FF0000;
      font-weight: bold;
    }
    .TEMFR003 {
        position: absolute;
        right: 100px;
        top: 159px;
        color: #FF0000;
      font-weight: bold;
    }
    .FQMFR001 {
        position: absolute;
        right: 100px;
        top: 245px;
        color: #FF0000;
        font-weight: bold;
    }
</style>
