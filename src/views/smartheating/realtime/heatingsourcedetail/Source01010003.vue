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
                    <td width="50%" class="leftTitle">循环水泵1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW007" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵1#频率设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.FQTFW002" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">Hz</td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW010" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵2#频率设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.FQTFW004" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">Hz</td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW013" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">循环水泵3#频率设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.FQTFW006" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">Hz</td>
                  </tr>
                  <tr height="250px"></tr>
                  <tr>
                    <td colspan="3" align="center">
                      <a-button v-if="this.hasRight"  title="确定下发" type="primary" @click="handleControl">确定下发</a-button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </a-col>
          <a-col span="16">
            <img ref="backImg" :src="getImgView(panelImgSource)" />
            <div class="TEMFR013">{{ monitoringValue.TEMFR013 }} </div>
            <div class="PRMFR007">{{ monitoringValue.PRMFR007 }}</div>
            <div class="FQMFR001">{{ monitoringValue.FQMFR001 }}</div>
            <div class="FQMFR003">{{ monitoringValue.FQMFR003 }}</div>
            <div class="FQMFR005">{{ monitoringValue.FQMFR005 }}</div>
            <div class="TEMFR014">{{ monitoringValue.TEMFR014 }}</div>
            <div class="PRMFR008">{{ monitoringValue.PRMFR008 }}</div>
            <div class="EQSBR008">
              <img v-if="statusValue.EQSBR008 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR008 === 0 || statusValue.EQSBR008 === -1 " src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR008 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR011">
              <img v-if="statusValue.EQSBR011 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR011 === 0 || statusValue.EQSBR011 === -1 " src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR011 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR014">
              <img v-if="statusValue.EQSBR014 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR014 === 0 || statusValue.EQSBR014 === -1 " src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR014 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source01010003',
    mixins: [RealTimeMixin],
    components: {

    },
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
                // 1#
                TEMFR013: '', // 一网出温
                PRMFR007: '', // 一网出压
                FQMFR001: '', // 循环水泵1频率
                FQMFR003: '', // 循环水泵2频率
                FQMFR005: '', // 循环水泵3频率
                TEMPR014: '', // 一网进温
                PRMFR008: '' // 一网进压
            },
            controlValue: {
                EQCBW007: '', // 循环水泵1#
                EQCBW010: '', // 循环水泵2#
                EQCBW013: '' // 循环水泵3#
            },
            statusValue: {
                EQSBR008: '', // 状态
                EQSBR011: '', // 状态
                EQSBR014: '' // 状态
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
  .TEMFR013 {
    position: absolute;
    right: 400px;
    top: 66px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR007 {
    position: absolute;
    right:400px;
    top: 96px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FQMFR001 {
    position: absolute;
    right: 625px;
    top: 205px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FQMFR003 {
    position: absolute;
    right: 625px;
    top: 330px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FQMFR005 {
    position: absolute;
    right: 625px;
    top: 455px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR014 {
    position: absolute;
    right: 400px;
    top: 441px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR008 {
    position: absolute;
    right: 400px;
    top: 471px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .EQSBR008{
    position: absolute;
    right: 681px;
    top: 243px;
  }
  .EQSBR011{
    position: absolute;
    right: 681px;
    top: 368px;
  }
  .EQSBR014{
    position: absolute;
    right: 681px;
    top: 494px;
  }
</style>
