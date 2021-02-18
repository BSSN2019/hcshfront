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
                  <tr style="height:30px"></tr>
                  <tr>
                    <td class="leftTitle">循环压差设定</td>
                    <td ><a-input-number v-model="settingValue.PDTFW001" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW020" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW022" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵1#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW013" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>

                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW025" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW027" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵2#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW005" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>

                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW029" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW031" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵3#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW007" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>

                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW033" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW035" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">循环水泵4#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW009" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                    <tr style="height:20px"></tr>
                  <tr>
                    <td colspan="5" align="center">
                      <a-button v-if="this.hasRight" title="确定下发" type="primary" @click="handleControl">确定下发</a-button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </a-col>
          <a-col span="16">
            <img ref="backImg" :src="getImgView(panelImgSource)" />
            <div class="PDMFC005">{{ monitoringValue.PDMFC005 }}</div>
            <div class="TEMFR049">{{ monitoringValue.TEMFR049 }}</div>
            <div class="PRMFR043">{{ monitoringValue.PRMFR043 }}</div>
            <div class="TEMFR050">{{ monitoringValue.TEMFR050 }}</div>
            <div class="PRMFR044">{{ monitoringValue.PRMFR044 }}</div>
            <div class="FQMFR003">{{ monitoringValue.FQMFR003 }}</div>
            <div class="FQMFR004">{{ monitoringValue.FQMFR004 }}</div>
            <div class="FQMFR006">{{ monitoringValue.FQMFR006 }}</div>
            <div class="FQMFR008">{{ monitoringValue.FQMFR008 }}</div>
            <div class="EQSBR021">
              <img v-if="statusValue.EQSBR021 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR021 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR021 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR026">
              <img v-if="statusValue.EQSBR026 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR026 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR026 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR030">
              <img v-if="statusValue.EQSBR030 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR030 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR030 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR034">
              <img v-if="statusValue.EQSBR034 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR034 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR034 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source03230003',
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
                PDMFC005: '', // 循环压差
                TEMFR049: '', // 一网出温
                PRMFR043: '', // 一网出压
                TEMFR050: '', // 一网进温
                PRMFR044: '', // 一网进压
                FQMFR003: '', // 循环水泵1#频率
                FQMFR004: '', // 循环水泵2#频率
                FQMFR006: '', // 循环水泵3#频率
                FQMFR008: '' // 循环水泵4#频率

            },
            controlValue: {
                EQCBW020: '', // 循环水泵1# 停止 启动
                EQCBW022: '', // 循环水泵1# 自动 手动
                EQCBW025: '', // 循环水泵2# 停止 启动
                EQCBW027: '', // 循环水泵2# 自动 手动
                EQCBW029: '', // 循环水泵3# 停止 启动
                EQCBW031: '', // 循环水泵3# 自动 手动
                EQCBW033: '', // 循环水泵4# 停止 启动
                EQCBW035: '', // 循环水泵4# 自动 手动
            },
            statusValue: {
                EQSBR021: '', // 状态
                EQSBR026: '', // 状态
                EQSBR030: '', // 状态
                EQSBR034: '' // 状态
            },
            settingValue: {
                PDTFW001: '', // 循环压差设定
                FQTFW013: '', // 循环水泵1#频率设定
                FQTFW005: '', // 循环水泵2#频率设定
                FQTFW007: '', // 循环水泵3#频率设定
                FQTFW009: '' // 循环水泵4#频率设定
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
    /** 1*/
    .PDMFC005{
      position: absolute;
      right: 915px;
      top: 99px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR049{
      position: absolute;
      right: 470px;
      top: 65px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR043{
      position: absolute;
      right: 470px;
      top: 99px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR050{
      position: absolute;
      right: 400px;
      top: 568px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR044{
      position: absolute;
      right: 400px;
      top: 600px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR003{
      position: absolute;
      right: 625px;
      top: 205px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR004{
      position: absolute;
      right: 625px;
      top: 330px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR006{
      position: absolute;
      right: 625px;
      top: 455px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR008{
      position: absolute;
      right: 625px;
      top: 580px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR021{
      position: absolute;
      right: 682px;
      top: 242px;
    }
    .EQSBR026{
      position: absolute;
      right: 682px;
      top: 368px;
    }
    .EQSBR030{
      position: absolute;
      right: 682px;
      top: 492px;
    }
    .EQSBR034{
      position: absolute;
      right: 682px;
      top: 618px;
    }
</style>
