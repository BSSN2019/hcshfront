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
      <div style="width:100%;height:750px">
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
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵1#</td>
                    <td width="50%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW004" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr height="20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵1#频率设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.FQTFW004" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">Hz</td>
                  </tr>
                  <tr height="20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵2#</td>
                    <td width="50%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW007" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr height="20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵2#频率设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.FQTFW006" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">Hz</td>
                  </tr>
                  <tr height="300px"></tr>
                  <tr>
                    <td colspan="2" align="center">
                      <a-button v-if="this.hasRight"  title="确定下发" type="primary" @click="handleControl">确定下发</a-button>
                    </td>
                  </tr>

                </table>
              </div>
            </div>
          </a-col>
          <a-col span="16">
            <img ref="backImg" :src="getImgView(panelImgSource)" />
            <div class="PDMFC001">{{ monitoringValue.PDMFC001 }}</div>
            <div class="TEMFR003">{{ monitoringValue.TEMFR003 }}</div>
            <div class="PRMFR003">{{ monitoringValue.PRMFR003 }}</div>
            <div class="FQMFR003">{{ monitoringValue.FQMFR003 }}</div>
            <div class="FQMFR005">{{ monitoringValue.FQMFR005 }}</div>
            <div class="TEMFR004">{{ monitoringValue.TEMFR004 }}</div>
            <div class="PRMFR004">{{ monitoringValue.PRMFR004 }}</div>
            <div class="EQSBR005">
              <img v-if="statusValue.EQSBR005 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR005 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR005 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR005 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR008">
              <img v-if="statusValue.EQSBR008 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR008 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR008 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR008 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source01050003',
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
                TEMFR003: '', // 一网出温
                PRMFR003: '', // 一网出压
                FQMFR003: '', // 循环水泵1#频率
                FQMFR005: '', // 循环水泵1频率
                TEMFR004: '', // 一网进温
                PRMFR004: '' // 一网金牙
            },
            controlValue: {
                EQCBW004: '', // 循环水泵1#
                EQCBW007: '' // 循环水泵2#
            },
            settingValue: {
                FQTFW004: '', // 循环水泵1#频率设定
                FQTFW006: '' // 循环水泵2#频率设定
            },
            statusValue: {
                EQSBR005: '', // 状态
                EQSBR008: '' // 状态
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
  .PDMFC001 {
    position: absolute;
    right: 905px;
    top: 98px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR003 {
    position: absolute;
    right: 398px;
    top: 66px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR003 {
    position: absolute;
    right: 398px;
    top: 98px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FQMFR003 {
    position: absolute;
    right: 623px;
    top: 205px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FQMFR005 {
    position: absolute;
    right: 623px;
    top: 331px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR004 {
    position: absolute;
    right: 398px;
    top: 318px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR004 {
    position: absolute;
    right: 398px;
    top: 347px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR005 {
    position: absolute;
    left: 509px;
    top: 242px;
  }
  .EQSBR008 {
    position: absolute;
    left: 509px;
    top: 367px;
  }
</style>
