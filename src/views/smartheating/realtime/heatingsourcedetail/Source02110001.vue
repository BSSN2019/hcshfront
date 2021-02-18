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
                    <td width="50%" class="leftTitle">污水泵1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW001" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">污水泵1#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW002" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height: 30px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">污水泵2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW004" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">污水泵2#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW004" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height: 20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">污水泵3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW007" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">污水泵3#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW006" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height: 20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">污水泵4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW010" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">污水泵4#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW008" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height: 20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">污水泵5#</td>
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
                    <td class="leftTitle">污水泵5#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW010" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">泵坑液位高限设定</td>
                    <td ><a-input-number v-model="settingValue.WLTFW002" class="textField" style="width:100%"></a-input-number></td>
                    <td>m</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">泵坑液位低限设定</td>
                    <td ><a-input-number v-model="settingValue.WLTFW003" class="textField" style="width:100%"></a-input-number></td>
                    <td>m</td>
                  </tr>
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
            <div class="FQMFR001">{{ monitoringValue.FQMFR001 }}</div>
            <div class="FQMFR003">{{ monitoringValue.FQMFR003 }}</div>
            <div class="FQMFR005">{{ monitoringValue.FQMFR005 }}</div>
            <div class="FQMFR007">{{ monitoringValue.FQMFR007 }}</div>
            <div class="FQMFR009">{{ monitoringValue.FQMFR009 }}</div>
            <div class="CRMFR001">{{ monitoringValue.CRMFR001 }}</div>
            <div class="CRMFR002">{{ monitoringValue.CRMFR002 }}</div>
            <div class="CRMFR003">{{ monitoringValue.CRMFR003 }}</div>
            <div class="CRMFR004">{{ monitoringValue.CRMFR004 }}</div>
            <div class="CRMFR005">{{ monitoringValue.CRMFR005 }}</div>
            <div class="CRMFR006">{{ monitoringValue.CRMFR006 }}</div>
            <div class="CRMFR007">{{ monitoringValue.CRMFR007 }}</div>
            <div class="CRMFR008">{{ monitoringValue.CRMFR008 }}</div>
            <div class="CRMFR009">{{ monitoringValue.CRMFR009 }}</div>
            <div class="CRMFR010">{{ monitoringValue.CRMFR010 }}</div>
            <div class="CRMFR011">{{ monitoringValue.CRMFR011 }}</div>
            <div class="CRMFR012">{{ monitoringValue.CRMFR012 }}</div>
            <div class="CRMFR013">{{ monitoringValue.CRMFR013 }}</div>
            <div class="CRMFR014">{{ monitoringValue.CRMFR014 }}</div>
            <div class="CRMFR015">{{ monitoringValue.CRMFR015 }}</div>
            <div class="FWMFR001">{{ monitoringValue.FWMFR001 }}</div>
            <div class="FWMFR002">{{ monitoringValue.FWMFR002 }}</div>
            <div class="TEMFR002">{{ monitoringValue.TEMFR002 }}</div>
            <div class="PRMFR002">{{ monitoringValue.PRMFR002 }}</div>
            <div class="TEMFR001">{{ monitoringValue.TEMFR001 }}</div>
            <div class="PRMFR001">{{ monitoringValue.PRMFR001 }}</div>
            <div class="EQSBR002">
              <img v-if="statusValue.EQSBR002 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR002 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR002 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR002 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
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
            <div class="EQSBR011">
              <img v-if="statusValue.EQSBR011 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR011 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR011 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR011 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR014">
              <img v-if="statusValue.EQSBR014 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR014 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR014 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR014 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source02110001',
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
                /** 参数名中的第三位为M的参数 */
                WLMFR001: '', // 水位
                FQMFR001: '', // 污水泵1#频率
                FQMFR003: '', // 污水泵2#频率
                FQMFR005: '', // 污水泵3#频率
                FQMFR007: '', // 污水泵4#频率
                FQMFR009: '', // 污水泵5#频率
                CRMFR001: '', // A相电流
                CRMFR002: '', // B相电流
                CRMFR003: '', // C相电流
                CRMFR004: '', // A相电流
                CRMFR005: '', // B相电流
                CRMFR006: '', // C相电流
                CRMFR007: '', // A相电流
                CRMFR008: '', // B相电流
                CRMFR009: '', // C相电流
                CRMFR010: '', // A相电流
                CRMFR011: '', // B相电流
                CRMFR012: '', // C相电流
                CRMFR013: '', // A相电流
                CRMFR014: '', // B相电流
                CRMFR015: '', // C相电流
                FWMFR001: '', // 瞬时流量
                FWMFR002: '', // 累计电流
                TEMFP002: '', // 污水进温
                PRMFR002: '', // 污水进压
                TEMFP001: '', // 污水出温
                PRMFR001: '' // 污水出压
            },
            controlValue: {
                /** 参数名中的第三位为C的参数 */
                EQCBW001: '', // 污水泵1#
                EQCBW004: '', // 污水泵2#
                EQCBW007: '', // 污水泵3#
                EQCBW010: '', // 污水泵4#
                EQCBW013: '' // 污水泵5#

            },
            settingValue: {
                /** 参数名中的第三位为T的参数 */
                FQTFW002: '', // 污水泵1#频率设定
                FQTFW004: '', // 污水泵1#频率设定
                FQTFW006: '', // 污水泵1#频率设定
                FQTFW008: '', // 污水泵1#频率设定
                FQTFW010: '', // 污水泵1#频率设定
                WLTFW002: '', // 泵坑液位高限设定
                WLTFW003: '' // 泵坑液位低限设定

            },
            statusValue: {
                /** 参数名中的第三位为S的参数 */
                EQSBR002: '', // 状态
                EQSBR005: '', // 状态
                EQSBR008: '', // 状态
                EQSBR011: '', // 状态
                EQSBR014: '' // 状态

            },
            alarmValue: {
                /** 参数名中的第三位为A的参数 */
                EQABR003: '', // 故障
                EQABR006: '', // 故障
                EQABR009: '', // 故障
                EQABR012: '', // 故障
                EQABR015: '', // 故障
                WLABR004: '', // 高限报警
                WLABR005: '' // 低限报警

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
    .WLMFR001{
      position: absolute;
      right: 1028px;
      top: 40px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR001{
         position: absolute;
         right: 810px;
         top: 40px;
         color: #FF0000;
         font-size: large;
         font-weight: bold;
       }
    .FQMFR003{
      position: absolute;
      right: 810px;
      top: 165px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR005{
      position: absolute;
      right: 810px;
      top: 290px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR007{
      position: absolute;
      right: 810px;
      top: 416px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR009{
      position: absolute;
      right: 810px;
      top: 539px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR001{
      position: absolute;
      right: 615px;
      top: 33px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR002{
       position: absolute;
       right: 615px;
       top: 68px;
       color: #FF0000;
       font-size: large;
       font-weight: bold;
     }
    .CRMFR003{
      position: absolute;
      right: 615px;
      top: 101px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR004{
      position: absolute;
      right: 615px;
      top: 158px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR005{
      position: absolute;
      right: 615px;
      top: 192px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR006{
      position: absolute;
      right: 615px;
      top: 226px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR007{
      position: absolute;
      right: 615px;
      top: 283px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR008{
      position: absolute;
      right: 615px;
      top: 316px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR009{
      position: absolute;
      right: 615px;
      top: 351px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR010{
      position: absolute;
      right: 615px;
      top: 407px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR011{
      position: absolute;
      right: 615px;
      top: 442px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR012{
      position: absolute;
      right: 615px;
      top: 477px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR013{
      position: absolute;
      right: 615px;
      top: 532px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR014{
      position: absolute;
      right: 615px;
      top: 566px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR015{
      position: absolute;
      right: 615px;
      top: 601px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR001{
      position: absolute;
      right: 277px;
      top: 27px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR002{
      position: absolute;
      right: 277px;
      top: 56px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR002{
      position: absolute;
      right: 312px;
      top: 113px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR002{
      position: absolute;
      right: 312px;
      top: 143px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR001{
      position: absolute;
      right: 310px;
      top: 651px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR001{
      position: absolute;
      right: 310px;
      top: 678px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR002{
      position: absolute;
      right: 857px;
      top: 77px;
    }
    .EQSBR005{
      position: absolute;
      right: 857px;
      top: 202px;
    }
    .EQSBR008{
      position: absolute;
      right: 857px;
      top: 326px;
    }
    .EQSBR011{
      position: absolute;
      right: 857px;
      top: 451px;
    }
    .EQSBR014{
      position: absolute;
      right: 857px;
      top: 576px;
    }
</style>
