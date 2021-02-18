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
                    <td width="50%" class="leftTitle">锅炉1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW001" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr height="20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">目标温度设定</td>
                    <td width="40%" >
                      <a-input-number v-model="settingValue.TETFW002" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">℃</td>
                  </tr>
                  <tr height="20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">排烟温度高限设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.TETFW004" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">℃</td>
                  </tr>
                  <tr height="50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW004" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr height="20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">目标温度设定</td>
                    <td width="40%" >
                      <a-input-number v-model="settingValue.TETFW008" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">℃</td>
                  </tr>
                  <tr height="20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">排烟温度高限设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.TETFW010" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">℃</td>
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
            <div class="TEMFR005">{{monitoringValue.TEMFR005}}</div>
            <div class="TEMFR003">{{monitoringValue.TEMFR003}}</div>
            <div class="PRMFR002">{{monitoringValue.PRMFR002}}</div>
            <div class="TEMFR001">{{monitoringValue.TEMFR007}}</div>
            <div class="PRMFR001">{{monitoringValue.PRMFR003}}</div>
            <div class="TEMFR011">{{monitoringValue.TEMFR011}}</div>
            <div class="TEMFR009">{{monitoringValue.TEMFR009}}</div>
            <div class="PRMFR004">{{monitoringValue.PRMFR004}}</div>
            <div class="TEMFR007">{{monitoringValue.TEMFR007}}</div>
            <div class="PRMFR003">{{monitoringValue.PRMFR003}}</div>
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
    name: 'Source01020002',
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
                // 1#
                TEMFR005: '', // 排烟温度
                TEMFR003: '', // 出口温度
                PRMFR002: '', // 出口压力
                // 2#
                TEMFR011: '', // 排烟温度
                TEMFR009: '', // 出口温度
                PRMFR004: '', // 出口压力
                TEMFR007: '', // 进口温度
                PRMFR003: '' // 进口压力
            },
            controlValue: {
                EQCBW001: '', // 锅炉1#开启关闭
                EQCBW004: '' // 锅炉2#开启关闭
            },
            settingValue: {
                TETFW002: '', // 1#目标温度设定
                TETFW004: '', // 1#排烟温度高限设定
                TETFW008: '', // 2#目标温度设定
                TETFW010: '' // 2#排烟温度高限设定
            },
            statusValue: {
                EQSBR002: '', // 状态
                EQSBR005: '' // 状态
            }

        }
    },
    mounted () {

    },

    methods: {}
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
  .TEMFR005 {
    position: absolute;
    right: 977px;
    top: 104px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR003 {
    position: absolute;
    right: 770px;
    top: 146px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR002 {
    position: absolute;
    right: 770px;
    top: 176px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR001 {
    position: absolute;
    right: 770px;
    top: 270px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR001 {
    position: absolute;
    right: 770px;
    top: 300px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR011 {
    position: absolute;
    right: 337px;
    top: 104px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR009 {
    position: absolute;
    right: 130px;
    top: 146px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR004 {
    position: absolute;
    right: 130px;
    top: 176px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR007 {
    position: absolute;
    right: 130px;
    top: 270px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR003 {
    position: absolute;
    right: 130px;
    top: 300px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR002{
    position: absolute;
    right: 1115px;
    top: 277px;
  }
  .EQSBR005{
    position: absolute;
    right: 475px;
    top: 277px;
  }
</style>
