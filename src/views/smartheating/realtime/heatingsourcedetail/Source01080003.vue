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

                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">深水泵1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW049" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵1#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW002" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">深水泵2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW052" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵2#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW004" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">深水泵3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW055" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵3#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW006" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">深水泵4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW058" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵4#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW008" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>

                  </tr>
                  <tr style="height:200px"></tr>
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
            <div class="PDMFC001">{{ monitoringValue.PDMFC001 }}</div>
            <div class="TEMFR049">{{ monitoringValue.TEMFR049 }}</div>
            <div class="PRMFR017">{{ monitoringValue.PRMFR017 }}</div>
            <div class="TEMFR050">{{ monitoringValue.TEMFR050 }}</div>
            <div class="PRMFR018">{{ monitoringValue.PRMFR018 }}</div>
            <div class="FQMFR001">{{ monitoringValue.FQMFR001 }}</div>
            <div class="FQMFR003">{{ monitoringValue.FQMFR003 }}</div>
            <div class="FQMFR005">{{ monitoringValue.FQMFR005 }}</div>
            <div class="FQMFR007">{{ monitoringValue.FQMFR007 }}</div>
            <div class="FWMFR001">{{ monitoringValue.FWMFR001 }}</div>
            <div class="HTMFR001">{{ monitoringValue.HTMFR001 }}</div>
            <div class="FWMFR002">{{ monitoringValue.FWMFR002 }}</div>
            <div class="HTMFR002">{{ monitoringValue.HTMFR002 }}</div>
            <div class="HTMFC003">{{ monitoringValue.HTMFC003 }}</div>
            <div class="EQSBR050">
              <img v-if="statusValue.EQSBR050 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR050 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR050 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR050 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR053">
              <img v-if="statusValue.EQSBR053 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR053 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR053 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR053 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR056">
              <img v-if="statusValue.EQSBR056 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR056 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR056 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR056 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR059">
              <img v-if="statusValue.EQSBR059 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR059 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR059 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR059 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source01080003',
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
                TEMFR049: '', // 一网出温
                PRMFR017: '', // 一网出压
                TEMFR050: '', // 一网出温
                PRMFR018: '', // 一网出压
                FQMFR001: '', // 循环水泵1#频率
                FQMFR003: '', // 循环水泵1#频率
                FQMFR005: '', // 循环水泵1#频率
                FQMFR007: '', // 循环水泵1#频率
                FWMFR001: '', // 一网瞬时流量
                HTMFR001: '', // 一网瞬时热量
                FWMFR002: '', // 一网累积流量
                HTMFR002: '', // 一网累积流量
                HTMFC003: '' // 日输出流量

            },
            controlValue: {
                EQCBW049: '', // 循环水泵1#
                EQCBW052: '', // 循环水泵2#
                EQCBW055: '', // 循环水泵3#
                EQCBW058: '' // 循环水泵4#

            },
            statusValue: {
                EQSBR050: '', // 状态
                EQSBR053: '', // 状态
                EQSBR056: '', // 状态
                EQSBR059: '' // 状态
            },
            settingValue: {
                FQTFW002: '', // 循环水泵1#频率设定
                FQTFW004: '', // 循环水泵2#频率设定
                FQTFW006: '', // 循环水泵3#频率设定
                FQTFW008: '' // 循环水泵4#频率设定

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
      top: 80px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR049{
      position: absolute;
      right: 469px;
      top: 50px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR017{
      position: absolute;
      right: 469px;
      top: 80px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }

    .TEMFR050{
      position: absolute;
      right: 398px;
      top: 550px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR018{
      position: absolute;
      right: 398px;
      top: 580px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }

    .FWMFR001{
      position: absolute;
      right: 180px;
      top: 150px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .HTMFR001{
      position: absolute;
      right: 180px;
      top: 185px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR002{
      position: absolute;
      right: 160px;
      top: 218px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .HTMFR002{
      position: absolute;
      right: 160px;
      top: 250px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }

    .HTMFC003{
      position: absolute;
      right: 160px;
      top: 285px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR001{
      position: absolute;
      right: 622px;
      top: 187px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR003{
      position: absolute;
      right: 622px;
      top: 313px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR005{
      position: absolute;
      right: 622px;
      top: 437px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR007{
      position: absolute;
      right: 622px;
      top: 562px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR050{
      position: absolute;
      right: 681px;
      top: 225px;
    }
    .EQSBR053{
      position: absolute;
      right: 681px;
      top: 350px;
    }
    .EQSBR056{
      position: absolute;
      right: 681px;
      top: 475px;
    }
    .EQSBR059{
      position: absolute;
      right: 681px;
      top: 600px;
    }
</style>
