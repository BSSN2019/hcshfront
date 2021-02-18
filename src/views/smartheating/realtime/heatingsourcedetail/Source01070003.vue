<template>
  <div>
    <a-modal
      v-model="visible"
      style="top:0px;"
      :title="title"
      :width="1900"
      centered
      :destroyOnClose="true"
      :maskClosable="false"
      @ok="handleClose"
      @cancel="handleClose"
    >
      <template slot="footer">
        <a-button key="close" type="primary" @click="handleClose">
          关闭
        </a-button>
      </template>
      <div style="width:100%;height:800px">
        <a-row style="height:20px">
          <a-col span="2"></a-col>
          <a-col span="6">刷新时间: {{this.leftTime}}</a-col>
          <a-col span="16">刷新时间: {{this.rightTime}}</a-col>
        </a-row>
        <a-row>
          <a-col span="1"></a-col>
          <a-col span="6">
            <div class="leftPanel">
              <div>
              </div>
            </div>
          </a-col>
          <a-col span="16">
            <img ref="backImg" :src="getImgView(panelImgSource)" />
            <div class="PDMFC001">{{ monitoringValue.PDMFC001 }}</div>
            <div class="TEMFR021">{{ monitoringValue.TEMFR021 }}</div>
            <div class="TEMFR022">{{ monitoringValue.TEMFR022 }}</div>
            <div class="PRMFR008">{{ monitoringValue.PRMFR008 }}</div>
            <div class="PRMFR009">{{ monitoringValue.PRMFR009 }}</div>
          </a-col>
          <a-col span="1"></a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { RealTimeMixin } from '../RealTimeMixin.js'

export default {
    name: 'Source01070003',
    mixins: [RealTimeMixin],
    data () {
        return {
            url: {
            /** 获取供热系统的信息 */
                heatingSystem: '/basicdata/heatingsystem/query',
                /** 获取供热系统名称 */
                heatingSystemName: '/basicdata/heatingsystem/getName',
                /** 获取监测值 */
                monitoringValues: '/dataValue/tsValue/source/current',
                /** 获取状态值 */
                statusValues: '/dataValue/statusData/query',
                /** 获取状态与报警关联的变量值 */
                statusAlarmValues: '/dataValue/statusData/queryStatusAlarm',
                /** 获取设定值 */
                settingValues: '/dataValue/settingData/query',
                /** 获取控制值 */
                controlValues: '/dataValue/controlData/query',
                /** 下发控制值 */
                saveControlValues: '/dataValue/controlData/save',
                /** 下发设定值 */
                saveSettingValues: '/dataValue/settingData/save'
            },
            // sample value
            monitoringValue: {
                PDMFC001: '', // 循环压差
                TEMFR021: '', // 一网出温
                TEMFR022: '', // 一网进温
                PRMFR008: '', // 一网出压
                PRMFR009: '' // 一网进压
                /** WaterPumpFreq: Math.random().toFixed(2),
*/
            },
            controlValue: {
                /*
                    oneControlValve: false,   // 一次电调阀控制(手工/自动)
*/
            },
            settingValue: {
                /*
                    twoTempSetting: '',         // 二出温度设定
*/
            }

        }
    },
    mounted () {

    },
    methods: {
    }
}

</script>

<style lang="less" scoped>
    .leftPanel {
        width: 90%;
        border: 1px solid #aaaaaa;
        padding-left:20px;
        padidng-bottom:10px;
        padding-right: 10px;
        padding-top: 20px;
        margin: 0px 0px 48px 0px;
        height: 717px;
        border-radius: 25px;
    }
    .PDMFC001{
      position: absolute;
      right: 910px;
      top: 96px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR021{
      position: absolute;
      right: 472px;
      top: 65px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR008{
      position: absolute;
      right: 472px;
      top: 96px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR022{
      position: absolute;
      right: 472px;
      top: 440px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR009{
      position: absolute;
      right: 472px;
      top: 470px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }

</style>
