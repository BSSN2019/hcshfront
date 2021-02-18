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
                    <td width="50%" class="leftTitle">中间补水泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW148" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">补水压力上限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW053" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">补水压力下限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW054" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">中间水箱液位高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW004" class="textField" style="width:100%"></a-input-number></td>
                    <td>m</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">中间水箱液位低限设定</td>
                    <td ><a-input-number v-model="settingValue.WLTFW007" class="textField" style="width:100%"></a-input-number></td>
                    <td>m</td>
                  </tr>

                  <tr style="height:100px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">一网补水泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW151" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">补水压力上限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW055" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">补水压力下限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW056" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">中间水箱液位高限设定</td>
                    <td ><a-input-number v-model="settingValue.WLTFW012" class="textField" style="width:100%"></a-input-number></td>
                    <td>m</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">中间水箱液位低限设定</td>
                    <td ><a-input-number v-model="settingValue.WLTFW013" class="textField" style="width:100%"></a-input-number></td>
                    <td>m</td>
                  </tr>
                  <tr style="height:10px"></tr>
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
            <div class="WLMFR006">{{ monitoringValue.WLMFR006 }}</div>
            <div class="WLMFR011">{{ monitoringValue.WLMFR011 }}</div>
            <div class="FQMFR027">{{ monitoringValue.FQMFR027 }}</div>
            <div class="FQMFR028">{{ monitoringValue.FQMFR028 }}</div>
            <div class="POMFR001">{{ monitoringValue.POMFR001 }}</div>
            <div class="POMFR002">{{ monitoringValue.POMFR002 }}</div>
            <div class="EDMFR001">{{ monitoringValue.EDMFR001 }}</div>
            <div class="EDMFC002">{{ monitoringValue.EDMFC002 }}</div>
            <div class="WQMFR001">{{ monitoringValue.WQMFR001 }}</div>
            <div class="WQMFC002">{{ monitoringValue.WQMFC002 }}</div>
            <div class="WQMFC003">{{ monitoringValue.WQMFC003 }}</div>
            <div class="EQSBR149">
              <img v-if="statusValue.EQSBR149 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR149 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR149 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR149 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR152">
              <img v-if="statusValue.EQSBR152 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR152 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR152 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR152 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source02110004',
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
                WLMFR006: '', // 中间水箱液位
                WLMFR011: '', // 一网水箱液位
                FQMFR027: '', // 中间补水泵频率
                FQMFR028: '', // 一网补水泵频率
                POMFR001: '', // 瞬时总功率
                POMFR002: '', // 瞬时有用功率
                EDMFR001: '', // 积累电量
                EDMFC002: '', // 日耗电量
                WQMFR001: '', // 瞬时水量
                WQFMR002: '', //  积累水量
                WQFMC003: '' // 日耗水量

            },
            controlValue: {
                /** 参数名中的第三位为C的参数 */
                EQCBW148: '', // 中间补水泵
                EQCBW151: '', // 一网补水泵
            },
            settingValue: {
                /** 参数名中的第三位为T的参数 */
                PRTFW053: '', // 补水压力上限设定
                PRTFW054: '', // 补水压力下限设定
                WLTFW007: '', // 中间水箱液位高限设定
                WLTFW008: '', // 中间水箱液位低限设定
                PRTFW055: '', // 补水压力上限设定
                PRTFW056: '', // 补水压力下限设定
                WLTFW012: '', // 一网水箱液位高限设定
                WLTFW013: '', // 一网水箱液位低限设定
                TETFW002: '', // 目标温度设定
                TETFW004: '', // 排烟温度高限设定
            },
            statusValue: {
                /** 参数名中的第三位为S的参数 */
                EQSBR149: '', // 状态
                EQSBR152: '' // 状态
            },
            alarmValue: {
                /** 参数名中的第三位为A的参数 */
                WLABR009: '', // 高限报警
                WLABR010: '', // 低限报警
                WLABR014: '', // 高限报警
                WLABR015: '', // 高限报警
                EQABS150: '', // 故障
                EQABS153: '' // 故障

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
    height: 715px;
    border-radius: 25px;
  }
  .WLMFR006 {
    position: absolute;
    right: 746px;
    top: 81px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .WLMFR011 {
    position: absolute;
    right: 744px;
    top: 392px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FQMFR027 {
    position: absolute;
    right: 500px;
    top: 219px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FQMFR028 {
    position: absolute;
    right: 500px;
    top: 532px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .POMFR001 {
    position: absolute;
    right: 115px;
    top: 234px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .POMFR002{
    position: absolute;
    right: 115px;
    top: 268px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .EDMFR001{
    position: absolute;
    right: 115px;
    top: 302px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .EDMFC002 {
    position: absolute;
    right: 115px;
    top: 334px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .WQMFR001 {
    position: absolute;
    right:125px;
    top: 386px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .WQMFC002 {
    position: absolute;
    right: 125px;
    top: 422px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .WQMFC003{
    position: absolute;
    right: 125px;
    top: 453px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .EQSBR149{
    position: absolute;
    right: 563px;
    top: 256px;
  }
  .EQSBR152{
    position: absolute;
    right: 563px;
    top: 570px;
  }

</style>
