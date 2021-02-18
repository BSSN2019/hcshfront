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
                  <tr>
                  </tr><tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW013" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵1#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW002" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW016" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵2#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW004" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr><tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW019" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵3#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW006" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
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
            <div class="TEMFR017">{{ monitoringValue.TEMFR017 }}</div>
            <div class="PRMFR010">{{ monitoringValue.PRMFR010 }}</div>
            <div class="TEMFR018">{{ monitoringValue.TEMFR018 }}</div>
            <div class="PRMFR011">{{ monitoringValue.PRMFR011 }}</div>
            <div class="FQMFR001">{{ monitoringValue.FQMFR001 }}</div>
            <div class="FQMFR003">{{ monitoringValue.FQMFR003 }}</div>
            <div class="FQMFR005">{{ monitoringValue.FQMFR005 }}</div>
            <div class="EQSBR014">
              <img v-if="statusValue.EQSBR014 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR014 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR014 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR014 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR017">
              <img v-if="statusValue.EQSBR017 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR017 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR017 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR017 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR020">
              <img v-if="statusValue.EQSBR020 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR020 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR020 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR020 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source01060003',
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
                TEMFR017: '', // 一网出温
                PRMFR010: '', // 一网出压
                TEMFR018: '', // 一网出温
                PRMFR0111: '', // 一网出压
                FQMFR001: '', // 循环水泵1#频率
                FQMFR003: '', // 循环水泵2#频率
                FQMFR005: '' // 循环水泵2#频率
            },
            controlValue: {
                EQCBW013: '', // 循环水泵1#
                EQCBW016: '', // 循环水泵2#
                EQCBW019: '' // 循环水泵3#

            },
            statusValue: {
                EQSBR014: '', // 状态
                EQSBR017: '', // 状态
                EQSBR020: '' // 状态
            },
            settingValue: {
                FQTFW002: '', // 循环水泵1#频率设定
                FQTFW004: '', // 循环水泵2#频率设定
                FQTFW006: '' // 循环水泵3#频率设定
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
    .TEMFR017 {
      position: absolute;
      right: 473px;
      top: 82px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR010 {
      position: absolute;
      right: 473px;
      top: 112px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR018 {
      position: absolute;
      right: 400px;
      top: 456px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR011 {
       position: absolute;
       right: 400px;
       top: 486px;
       color: #FF0000;
       font-size: large;
       font-weight: bold;
     }
    .FQMFR001 {
      position: absolute;
      right: 623px;
      top: 221px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR003 {
      position: absolute;
      right: 623px;
      top: 345px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR005 {
      position: absolute;
      right: 623px;
      top: 471px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR014{
      position: absolute;
      right: 682px;
      top: 257px;
    }
    .EQSBR017{
      position: absolute;
      right: 682px;
      top: 382px;
    }
    .EQSBR020{
      position: absolute;
      right: 682px;
      top: 507px;
    }

</style>
