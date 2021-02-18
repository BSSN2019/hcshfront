<template>
  <div>
    <a-card :title="panelTitle" class="card">
      <div class="imgDiv">
        <div class="panelDiv">
          <img v-if="panelImgSource !== ''" :src="getImgView(panelImgSource)" :class="imageClass" @click="handleOpenDetail()" />
          <div class="waterLevel">{{ waterLevel }}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getFileAccessHttpUrl, getAction } from '@/api/manage'

export default {
    name: 'WaterBoxPanel',
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
            default: 'waterbox.png',
            required: true
        }
    },
    data () {
        return {
            waterPressure: '',
            waterLevel: '',
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
        handleOpenDetail () {

        },
        enablePanel (heatingSystemId) {
            this.heatingSystemId = heatingSystemId
            this.imageClass = 'heatingSystem'
            this.refreshSampleValue()
            this.timer = setInterval(() => {
                this.refreshSampleValue()
            }, 10 * 1000)
        },
        disablePanel () {
            this.imageClass = 'blankSystem'
            clearInterval(this.timer)
            this.waterLevel = ''
        },
        refreshSampleValue () {
            let param = {
                heatingSystemId: this.heatingSystemId,
                parameterStr: 'WLMFR001'
            }
            getAction(this.url.stationTSValue, param).then(res => {
                if (res.success && res.result) {
                    this.waterLevel = (res.result.WLMFR001 === undefined || res.result.WLMFR001 === null) ? '' : res.result.WLMFR001.toFixed(1)
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
    .waterPressure {
        position: absolute;
        right: 260px;
        top: 56px;
        color: #FF0000;
        font-weight: bold;
    }
    .waterLevel {
        position: absolute;
        right: 65px;
        top: 56px;
        color: #FF0000;
        font-weight: bold;
    }
</style>
