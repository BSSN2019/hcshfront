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
                <table>
                  <tr style="height:100px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB7-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW130" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB7-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW133" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">补水压力上限设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.PRTFW041" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">MPa</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">补水压力下限设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.PRTFW042" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">MPa</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水箱液位高限设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.WLTFW002" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">m</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水箱液位低限设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.WLTFW003" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">m</td>
                  </tr>
                  <tr style="height:300px"></tr>
                  <tr>
                    <td colspan="5" align="center">
                      <a-button v-if="this.hasRight"  title="确定下发" type="primary" @click="handleControl">确定下发</a-button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </a-col>
          <a-col span="16">
            <img ref="backImg" :src="getImgView(panelImgSource)" />
            <div class="WLMFR001">{{ monitoringValue.WLMFR001 }}</div>
            <div class="PRMFR040">{{ monitoringValue.PRMFR040 }}</div>
            <div class="FQMFR033">{{ monitoringValue.FQMFR033 }}</div>
            <div class="FQMFR034">{{ monitoringValue.FQMFR034 }}</div>
            <div class="EQSBR131">
              <img v-if="statusValue.EQSBR131 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR131 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR131 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR131 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR134">
              <img v-if="statusValue.EQSBR134 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR134 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR134 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR134 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
          </a-col>
          <a-col span="1"></a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { RealTimeMixin } from '../RealTimeMixin'

export default {
    name: 'Source02090004',
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
            monitoringValue: {
                PRMFR040: '', // 自来水压力
                WLMFR001: '', // 水箱液位
                FQMFR033: '', // SB7-1频率
                FQMFR034: '' // SB7-2频率
            },
            controlValue: {
                EQCBW130: '', // SB7-1启动停止
                EQCBW133: '' // SB7-2启动停止
            },
            settingValue: {
                PRTFW041: '', // 补水压力上限设定
                PRTFW042: '', // 补水压力下限设定
                WLTFW002: '', // 水箱液位高限设定
                WLTFW003: '' // 水箱液位低限设定
            },
            statusValue: {
                EQSBR131: '',
                EQSBR134: ''
            }
        }
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
    .WLMFR001 {
      position: absolute;
      right: 800px;
      top: 133px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR040 {
      position: absolute;
      right: 1036px;
      top: 133px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR033 {
      position: absolute;
      right: 532px;
      top: 272px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR034 {
      position: absolute;
      right: 532px;
      top: 396px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .EQSBR131 {
      position: absolute;
      right: 588px;
      top: 309px;
    }
    .EQSBR134 {
      position: absolute;
      right: 588px;
      top: 434px;
    }

</style>
