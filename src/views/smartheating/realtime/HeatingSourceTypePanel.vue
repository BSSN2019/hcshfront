<template>
  <div>
    <a-card :title="panelTitle" class="card">
      <div class="imgDiv">
        <div class="panelDiv">
          <img v-if="panelImgSource !== ''" :src="getImgView(panelImgSource)" :class="imageClass" @click="handleOpenDetail(heatingSystemId)" />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getFileAccessHttpUrl } from '@/api/manage'

export default {
    name: 'HeatingSourceTypePanel',
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
            realtimeImg: ''
        }
    },
    methods: {
        setProperty (heatingSystemId, code, realtimeImg) {
            this.heatingSystemId = heatingSystemId
            this.realtimeImg = realtimeImg
            this.code = code
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
            this.waterPressure = Math.random().toFixed(2)
            this.waterLevel = Math.random().toFixed(2)
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
    }
    .waterLevel {
        position: absolute;
        left: 320px;
        top: 56px;
        color: #FF0000;
    }
</style>
