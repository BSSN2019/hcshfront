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
      <div style="width:100%;height:1100px">
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
                    <td width="50%" class="leftTitle">锅炉1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW001" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="40%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW002" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                  </tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW004" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="40%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW006" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                  </tr>
                  <tr style="height:100px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW007" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="40%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW010" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                  </tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW010" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="40%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW014" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
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
            <div class="TEMFR004">{{monitoringValue.TEMFR004}}</div>
            <div class="TEMFR003">{{ monitoringValue.TEMFR003 }}</div>
            <div class="PRMFR003">{{ monitoringValue.PRMFR003 }}</div>
            <div class="TEMFR001">{{ monitoringValue.TEMFR001 }}</div>
            <div class="PRMFR002">{{ monitoringValue.PRMFR002 }}</div>
            <div class="TEMFR012">{{ monitoringValue.TEMFR012 }}</div>
            <div class="TEMFR011">{{ monitoringValue.TEMFR011 }}</div>
            <div class="PRMFR007">{{ monitoringValue.PRMFR007 }}</div>
            <div class="TEMFR009">{{ monitoringValue.TEMFR009 }}</div>
            <div class="PRMFR006">{{ monitoringValue.PRMFR006 }}</div>
            <div class="TEMFR008">{{ monitoringValue.TEMFR008 }}</div>
            <div class="TEMFR007">{{ monitoringValue.TEMFR007 }}</div>
            <div class="PRMFR005">{{ monitoringValue.PRMFR005 }}</div>
            <div class="TEMFR005">{{ monitoringValue.TEMFR005 }}</div>
            <div class="PRMFR004">{{ monitoringValue.PRMFR004 }}</div>
            <div class="TEMFR016">{{ monitoringValue.TEMFR016 }}</div>
            <div class="TEMFR015">{{ monitoringValue.TEMFR015 }}</div>
            <div class="PRMFR009">{{ monitoringValue.PRMFR009 }}</div>
            <div class="TEMFR013">{{ monitoringValue.TEMFR013 }}</div>
            <div class="PRMFR008">{{ monitoringValue.PRMFR008 }}</div>
            <div class="EQSBR002">
              <img v-if="statusValue.EQSBR002 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR002 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR002 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR002 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR005">
              <img v-if="statusValue.EQSBR005 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR005 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR005 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR005 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR008">
              <img v-if="statusValue.EQSBR008 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR008 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR008 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR008 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR011">
              <img v-if="statusValue.EQSBR011 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR011 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR011 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR011 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
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
    name: 'Source01060002',
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
                TEMFR004: '', // 排烟温度
                TEMFR003: '', // 出口温度
                PRMFR003: '', // 出口温度
                TEMFR001: '', // 出口温度
                PRMFR002: '', // 出口温度
                TEMFR008: '', // 排烟温度
                TEMFR007: '', // 出口温度
                PRMFR005: '', // 出口温度
                TEMFR005: '', // 出口温度
                PRMFR004: '', // 出口温度
                TEMFR012: '', // 排烟温度
                TEMFR011: '', // 出口温度
                PRMFR007: '', // 出口温度
                TEMFR009: '', // 出口温度
                PRMFR006: '', // 出口温度
                TEMFR016: '', // 排烟温度
                TEMFR015: '', // 出口温度
                PRMFR009: '', // 出口温度
                TEMFR013: '', // 出口温度
                PRMFR008: '' // 出口温度
            },
            controlValue: {
                EQCBW001: '', // 锅炉1#
                EQCBW004: '', // 锅炉2#
                EQCBW007: '', // 锅炉3#
                EQCBW010: '' // 锅炉4#

            },
            statusValue: {
                EQSBR002: '', // 状态
                EQSBR005: '', // 状态
                EQSBR008: '', // 状态
                EQSBR011: '' // 状态
            },
            settingValue: {
                TETFW002: '', // 目标温度设定
                TETFW006: '', // 目标温度设定
                TETFW010: '', // 目标温度设定
                TETFW014: '' // 目标温度设定
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
        height: 1027px;
        border-radius: 25px;
    }
    .TEMFR004 {
      position: absolute;
      right: 978px;
      top: 104px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR003 {
      position: absolute;
      right: 773px;
      top: 146px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR003 {
      position: absolute;
      right: 773px;
      top: 174px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR001 {
      position: absolute;
      right: 773px;
      top: 269px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR002 {
      position: absolute;
      right: 773px;
      top: 299px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR012 {
      position: absolute;
      right: 978px;
      top: 605px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR011 {
      position: absolute;
      right: 773px;
      top: 647px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR007 {
      position: absolute;
      right: 773px;
      top: 677px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR009 {
      position: absolute;
      right: 773px;
      top: 770px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR006 {
      position: absolute;
      right: 773px;
      top: 800px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR008 {
      position: absolute;
      right: 339px;
      top: 104px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR007 {
      position: absolute;
      right: 130px;
      top: 146px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR005 {
      position: absolute;
      right: 130px;
      top: 174px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR005 {
      position: absolute;
      right: 130px;
      top: 269px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR004 {
      position: absolute;
      right: 130px;
      top: 299px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR016 {
      position: absolute;
      right: 339px;
      top: 605px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR015 {
      position: absolute;
      right: 130px;
      top: 647px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR009 {
      position: absolute;
      right: 130px;
      top: 677px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR013 {
      position: absolute;
      right: 130px;
      top: 770px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR008 {
      position: absolute;
      right: 130px;
      top: 800px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR002 {
      position: absolute;
      left: 90px;
      top: 276px;
    }
    .EQSBR005 {
      position: absolute;
      left: 730px;
      top: 280px;
    }
    .EQSBR008 {
      position: absolute;
      left: 90px;
      top: 780px;
    }
    .EQSBR011 {
      position: absolute;
      left: 730px;
      top: 780px;
    }
</style>
