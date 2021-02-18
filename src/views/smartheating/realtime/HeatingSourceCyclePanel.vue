<template>
  <div>
    <a-card :title="panelTitle" class="card">
      <div class="imgDiv">
        <div class="panelDiv">
          <img v-if="panelImgSource !== ''" :src="getImgView(panelImgSource)" :class="imageClass" @click="handleOpenDetail(heatingSystemId)" />
          <div class="oneGoPressure">{{ oneGoPressure }}</div>
          <div class="oneBackPressure">{{ oneBackPressure }}</div>
          <div class="onePD">{{ onePD }}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getFileAccessHttpUrl, getAction } from '@/api/manage'

export default {
    name: 'HeatingSourceCyclePanel',
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
            oneGoPressure: '',
            oneBackPressure: '',
            onePD: '',
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
            this.$emit('OnShowDetail', this.heatingSystemId, this.realtimeImg)
        },
        enablePanel (heatingSystemId) {
            this.heatingSystemId = heatingSystemId
            this.imageClass = 'heatingSystem'
            this.timer = setInterval(() => {
                this.refreshSampleValue()
            }, 5000)
        },
        disablePanel () {
            this.imageClass = 'blankSystem'
            clearInterval(this.timer)
            this.waterPressure = ''
            this.waterLevel = ''
        },
        refreshSampleValue () {
            let typeCode = this.code.substr(0, 4)
            this.oneGoPressure = ''
            this.oneBackPressure = ''
            this.onePD = ''
            getAction(this.url.source, { heatingSystemId: this.heatingSystemId }).then(res => {
                if (res.success && res.result) {
                    for (let i = 0; i < res.result.length; i++) {
                        if (typeCode === '0101') {
                            if (res.result[i].name === 'PRMFR007') { this.oneGoPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PRMFR008') { this.oneBackPressure = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0102') {
                            if (res.result[i].name === 'PRMFR002') { this.oneGoPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PRMFR001') { this.oneBackPressure = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0105') {
                            if (res.result[i].name === 'PRMFR003') { this.oneGoPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PRMFR004') { this.oneBackPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PDMFC001') { this.onePD = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0106') {
                            if (res.result[i].name === 'PRMFR010') { this.oneGoPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PRMFR011') { this.oneBackPressure = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0107') {
                            if (res.result[i].name === 'PRMFR007') { this.oneGoPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PRMFR008') { this.oneBackPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PDMFC013') { this.onePD = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0108') {
                            if (res.result[i].name === 'PRMFR017') { this.oneGoPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PRMFR018') { this.oneBackPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PDMFC001') { this.onePD = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0209') {
                            if (res.result[i].name === 'PRMFR011') { this.oneGoPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PRMFR012') { this.oneBackPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PDMFC003') { this.onePD = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0211') {
                            if (res.result[i].name === 'PRMFR049') { this.oneGoPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PRMFR050') { this.oneBackPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PDMFC001') { this.onePD = res.result[i].value.toFixed(2) }
                        }
                        if (typeCode === '0213') {
                            if (res.result[i].name === 'PRMFR043') { this.oneGoPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PRMFR044') { this.oneBackPressure = res.result[i].value.toFixed(2) }
                            if (res.result[i].name === 'PDMFC005') { this.onePD = res.result[i].value.toFixed(2) }
                        }
                    }
                }
            })
            if (this.onePD === '') {
                this.onePD = this.oneGoPressure - this.oneBackPressure
            }
        }

    }
}
</script>

<style scoped>
    .card {
        width: 100%;
        height: 850px;
    }
    .blankSystem {
        width: 100%;
        height: 730px;
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
    .oneGoPressure {
      position: absolute;
      right: 80px;
      top: 425px;
      color: #FF0000;
      font-weight: bolder;
      font-size: 200%
    }
    .oneBackPressure {
      position: absolute;
      right: 80px;
      top: 530px;
      color: #FF0000;
      font-weight: bolder;
      font-size: 200%
    }
    .onePD {
      position: absolute;
      right: 80px;
      top: 635px;
      color: #FF0000;
      font-weight: bolder;
      font-size: 200%
    }
</style>
