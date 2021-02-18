<template>
  <a-modal
    v-model="visible"
    style="top:0px;"
    :title="title"
    :width="800"
    centered
    :destroyOnClose="true"
    :maskClosable="false"
    @ok="handleOk"
  >
      <div>请检查需要下发的参数，检查无误，请按"确定"按钮下发参数。</div><br>
      <a-descriptions :size="descriptionsize" bordered :column="1">
<!--
          <a-descriptions-item label="一次电调阀手动/自动">{{ this.controlValue.EQCBW005 === '1' ? '手动':'自动'  }}</a-descriptions-item>
-->
<!--
          <a-descriptions-item label="二出温度设定">{{settingValue.TETFW005  }}</a-descriptions-item>
-->
          <a-descriptions-item label="上线算法">{{ this.onlineAI }}</a-descriptions-item>
          <a-descriptions-item label="算法参数设定">{{ this.onlineSetting }}</a-descriptions-item>
          <a-descriptions-item label="一次电调阀手动开度设定">{{ settingValue.APTFW002 }}</a-descriptions-item>
          <a-descriptions-item label="二次板换温差低限设定">{{ settingValue.TDTFW003 }}</a-descriptions-item>
          <a-descriptions-item label="二次回水压力泄压值设定">{{ settingValue.PRTFW005 }}</a-descriptions-item>
          <a-descriptions-item label="二次回水压力定压值设定">{{ settingValue.PRTFW006 }}</a-descriptions-item>
          <a-descriptions-item label="二次回水压力高限报警">{{ settingValue.PRTFW007 }}</a-descriptions-item>
          <a-descriptions-item label="二次回水压力低限报警">{{ settingValue.PRTFW008 }}</a-descriptions-item>
          <a-descriptions-item label="二次循环泵启停">{{ this.controlValue.EQCBW003 === '1' ? '启动':'停止'   }}</a-descriptions-item>
          <a-descriptions-item label="二次循环泵手动/自动">{{ this.controlValue.EQCBW002 === '1' ? '手动':'自动'  }}</a-descriptions-item>
          <a-descriptions-item label="二次资用压差设定">{{ settingValue.PDTFW010 }}</a-descriptions-item>
          <a-descriptions-item label="二次循环泵手动频率设定">{{ settingValue.FQTFW002 }}</a-descriptions-item>
          <a-descriptions-item label="二次补水泵启停">{{ this.controlValue.EQCBW015 === '1' ? '启动':'停止'  }}</a-descriptions-item>
          <a-descriptions-item label="泄压阀状态">{{ this.EQCIW016 }}</a-descriptions-item>
          <a-descriptions-item label="水箱液位高限报警设定">{{ settingValue.WLTFW002 }}</a-descriptions-item>
          <a-descriptions-item label="水箱液位低限报警设定">{{ settingValue.WLTFW003 }}</a-descriptions-item>
      </a-descriptions>
  </a-modal>
</template>

<script>
    import { postAction} from '@api/manage'

    export default {
    name: 'HeatingStationControlConfirmModal',
    data () {
        return {
            visible: false,
            title: '确认参数下发',
            descriptionsize: 'small',
            settingValue: null,
            controlValue: null,
            onlineAI: null,
            onlineSetting: null,
            EQCIW016: '',
            heatingSystemId: '',
            url: {
                controlValue: '/datavalue/controldata/add',
                settingValue: '/datavalue/settingdata/add'
            }
        }
    },
    methods: {
        show (heatingSystemId,controlValue, settingValue) {
            this.heatingSystemId = heatingSystemId
            this.controlValue = controlValue
            this.settingValue = settingValue
            if(this.controlValue.EQCBW006 === '1') {
                this.onlineAI = '算法A'
                this.onlineSetting = this.settingValue.TETFW006
            } else if(this.controlValue.EQCBW007 === '1') {
                this.onlineAI = '算法B'
                this.onlineSetting = this.settingValue.TETFW007
            } else if(this.controlValue.EQCBW008 === '1') {
                this.onlineAI = '算法C'
                this.onlineSetting = this.settingValue.TETFW008
            }
            if(this.controlValue.EQCIW016 === '0') {
                this.EQCIW016 = '关闭'
            } else if(this.controlValue.EQCIW016 === '1') {
                this.EQCIW016 = '打开'
            } else if (this.controlValue.EQCIW016 === '2') {
                this.EQCIW016 = '关闭'
            }
            this.visible = true
        },
        handleOk () {
            let param = {
                controlValues: JSON.stringify(this.controlValue),
                heatingSystemId: this.heatingSystemId,
                sourceOrStation: 'station'
            }
            postAction(this.url.controlValue, param).then((res) => {
                if (res.success) {
                    param = {
                        settingValues: JSON.stringify(this.settingValue),
                        heatingSystemId: this.heatingSystemId,
                        sourceOrStation: 'station'
                    }
                    postAction(this.url.settingValue, param).then((res) => {
                        if (res.success) {
                            console.log('control value finished')
                        }
                    })
                }
            })

        }
    }
}
</script>

<style scoped>

</style>
