<template>
  <div>
    <a-card :title="panelTitle" class="card">
      <div class="imgDiv">
        <div class="panelDiv">
          <img v-if="panelImgSource !== ''" :src="getImgView(panelImgSource)" :class="imageClass" @click="handleOpenDetail()" />
          <div class="waterPressure">{{ waterPressure }}</div>
          <div class="waterLevel">{{ waterLevel }}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getFileAccessHttpUrl, getAction } from '@/api/manage'

export default {
    name: 'HeatingSourceWaterBoxPanel',
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
            code: '',
            realtimeImg: '',
            url: {
                source: '/dataValue/tsValue/source/current'
            }
        }
    },
    methods: {
        setProperty (heatingSystemId, code, realtimeImg) {
            this.heatingSystemId = heatingSystemId
            this.realtimeImg = realtimeImg
            this.code = code
            this.refreshSampleValue()
            this.timer = setInterval(() => {
                this.refreshSampleValue()
            }, 10 * 1000)
        },
        getImgView (text) {
            if (text && text.indexOf(',') > 0) {
                text = text.substring(0, text.indexOf(','))
            }
            return getFileAccessHttpUrl(text)
        },
        handleOpenDetail () {
            console.log(this.realtimeImg)
            this.$emit('OnShowDetail', this.heatingSystemId, this.realtimeImg)
        },
        enablePanel (heatingSystemId) {
            this.heatingSystemId = heatingSystemId
            this.imageClass = 'heatingSystem'
        },
        disablePanel () {
            this.imageClass = 'blankSystem'
            clearInterval(this.timer)
            this.waterPressure = ''
            this.waterLevel = ''
        },
        refreshSampleValue () {
            let typeCode = this.code.substr(0, 4)
            this.waterPressure = ''
            this.waterLevel = ''
            getAction(this.url.source, { heatingSystemId: this.heatingSystemId }).then(res => {
                if (res.success && res.result) {
                    for (let i = 0; i < res.result.length; i++) {
                        if (typeCode === '0101') {
                            if (res.result[i].name === 'WLMFR001') { this.waterLevel = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0102') {
                            if (res.result[i].name === 'WLMFR001') { this.waterLevel = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0105') {
                            if (res.result[i].name === 'WLMFR001') { this.waterLevel = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0106') {
                            if (res.result[i].name === 'WLMFR001') { this.waterLevel = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0107') {
                            if (res.result[i].name === 'WLMFR001') { this.waterLevel = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0108') {
                            if (res.result[i].name === 'WLMFR001') { this.waterLevel = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0209') {
                            if (res.result[i].name === 'WLMFR001') { this.waterLevel = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0211') {
                            if (res.result[i].name === 'WLMFR011') { this.waterLevel = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0213') {
                            if (res.result[i].name === 'WLMFR001') { this.waterLevel = res.result[i].value.toFixed(2) }
                        }
                    }
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
        left: 125px;
        top: 56px;
        color: #FF0000;
        font-weight: bold;
    }
    .waterLevel {
        position: absolute;
        left: 320px;
        top: 56px;
        color: #FF0000;
      font-weight: bold;
    }
</style>
