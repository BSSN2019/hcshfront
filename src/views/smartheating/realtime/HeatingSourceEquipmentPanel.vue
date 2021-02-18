<template>
  <div>
    <a-card :title="panelTitle" class="card">
      <div class="imgDiv">
        <div class="panelDiv">
          <img v-if="panelImgSource !== ''" :src="getImgView(panelImgSource)" :class="imageClass" @click="handleOpenDetail(heatingSystemId)" />
          <div class="oneGoT">{{ oneGoT }}</div>
          <div class="oneBackT">{{ oneBackT }}</div>
          <div class="onePower">{{ onePower }}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getFileAccessHttpUrl, getAction } from '@/api/manage'

export default {
    name: 'HeatingSourceEquipmentPanel',
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
            oneGoT: '',
            oneBackT: '',
            onePower: '',
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
            this.oneGoT = ''
            this.oneBackT = ''
            this.onePower = ''
        },
        refreshSampleValue () {
            let typeCode = this.code.substr(0, 4)
            this.oneGoT = ''
            this.oneBackT = ''
            this.onePower = ''
            getAction(this.url.source, { heatingSystemId: this.heatingSystemId }).then(res => {
                if (res.success && res.result) {
                    for (let i = 0; i < res.result.length; i++) {
                        if (res.result[i].value !== null) {
                            if (typeCode === '0101') {
                                if (res.result[i].name === 'TEMFR013') {
                                    this.oneGoT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'TEMFR014') {
                                    this.oneBackT = res.result[i].value.toFixed(1)
                                }
                            }
                            if (typeCode === '0102') {
                                if (res.result[i].name === 'TEMFR003') {
                                    this.oneGoT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'TEMFR001') {
                                    this.oneBackT = res.result[i].value.toFixed(1)
                                }
                            }
                            if (typeCode === '0105') {
                                if (res.result[i].name === 'TEMFR003') {
                                    this.oneGoT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'TEMFR004') {
                                    this.oneBackT = res.result[i].value.toFixed(1)
                                }
                            }
                            if (typeCode === '0106') {
                                if (res.result[i].name === 'TEMFR017') {
                                    this.oneGoT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'TEMFR018') {
                                    this.oneBackT = res.result[i].value.toFixed(1)
                                }
                            }
                            if (typeCode === '0107') {
                                if (res.result[i].name === 'TEMFR019') {
                                    this.oneGoT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'TEMFR020') {
                                    this.oneBackT = res.result[i].value.toFixed(1)
                                }
                            }
                            if (typeCode === '0108') {
                                if (res.result[i].name === 'TEMFR049') {
                                    this.oneGoT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'TEMFR050') {
                                    this.oneBackT = res.result[i].value.toFixed(1)
                                }
                            }
                            if (typeCode === '0209') {
                                if (res.result[i].name === 'TEMFR009') {
                                    this.oneGoT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'TEMFR010') {
                                    this.oneBackT = res.result[i].value.toFixed(1)
                                }
                            }
                            if (typeCode === '0211') {
                                if (res.result[i].name === 'TEMFR055') {
                                    this.oneGoT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'TEMFR056') {
                                    this.oneBackT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'HTMFR001') {
                                    this.onePower = res.result[i].value.toFixed(1)
                                }
                            }
                            if (typeCode === '0213') {
                                if (res.result[i].name === 'TEMFR049') {
                                    this.oneGoT = res.result[i].value.toFixed(1)
                                }
                                if (res.result[i].name === 'TEMFR050') {
                                    this.oneBackT = res.result[i].value.toFixed(1)
                                }
                            }
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
    .oneGoT {
        position: absolute;
        right: 80px;
        top: 425px;
        color: #FF0000;
        font-weight: bolder;
        font-size: 200%
    }
    .oneBackT {
        position: absolute;
        right: 80px;
        top: 530px;
        color: #FF0000;
      font-weight: bolder;
      font-size: 200%
    }
    .onePower {
      position: absolute;
      right: 80px;
      top: 635px;
      color: #FF0000;
      font-weight: bolder;
      font-size: 200%
    }
</style>
