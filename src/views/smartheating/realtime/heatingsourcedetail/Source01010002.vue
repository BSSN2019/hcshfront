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
      <div style="width:100%;height:1600px">
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
                    <td width="50%" class="leftTitle">锅炉1#电调阀开度设定</td>
                    <td width="40%" >
                      <a-input-number v-model="settingValue.VOTFW001" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">%</td>
                  </tr>
                  <tr height="500px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉2#电调阀开度设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.VOTFW003" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">%</td>
                  </tr>
                  <tr height="500px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉3#电调阀开度设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.VOTFW005" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">%</td>
                  </tr>
                  <tr height="200px"></tr>
                  <tr>
                    <td colspan="3" align="center">
                      <a-button v-if="this.hasRight" title="确定下发" type="primary" @click="handleControl">确定下发</a-button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </a-col>
          <a-col span="16">
            <img ref="backImg" :src="getImgView(panelImgSource)" />
            <div class="TEMFR003">{{ monitoringValue.TEMFR003 }}</div>
            <div class="TEMFR001">{{ monitoringValue.TEMFR001 }}</div>
            <div class="PRMFR001">{{ monitoringValue.PRMFR001 }}</div>
            <div class="TEMFR002">{{ monitoringValue.TEMFR002 }}</div>
            <div class="PRFRM002">{{ monitoringValue.PRMFR002 }}</div>
            <div class="VOMFR002">{{ monitoringValue.VOMFR002 }}</div>
            <div class="FWMFR001">{{ monitoringValue.FWMFR001 }}</div>
            <div class="FWMFR002">{{ monitoringValue.FWMFR002 }}</div>
            <div class="TEMFR007">{{ monitoringValue.TEMFR007 }}</div>
            <div class="TEMFR005">{{ monitoringValue.TEMFR005 }}</div>
            <div class="PRMFR003">{{ monitoringValue.PRMFR003 }}</div>
            <div class="TEMFR006">{{ monitoringValue.TEMFR006 }}</div>
            <div class="PRFRM004">{{ monitoringValue.PRMFR004 }}</div>
            <div class="VOMFR004">{{ monitoringValue.VOMFR004 }}</div>
            <div class="FWMFR003">{{ monitoringValue.FWMFR003 }}</div>
            <div class="FWMFR004">{{ monitoringValue.FWMFR004 }}</div>
            <div class="TEMFR011">{{ monitoringValue.TEMFR011 }}</div>
            <div class="TEMFR009">{{ monitoringValue.TEMFR009 }}</div>
            <div class="PRMFR005">{{ monitoringValue.PRMFR005 }}</div>
            <div class="TEMFR010">{{ monitoringValue.TEMFR010 }}</div>
            <div class="PRFRM006">{{ monitoringValue.PRMFR006 }}</div>
            <div class="VOMFR006">{{ monitoringValue.VOMFR006 }}</div>
            <div class="FWMFR005">{{ monitoringValue.FWMFR005 }}</div>
            <div class="FWMFR006">{{ monitoringValue.FWMFR006 }}</div>
            <div class="EQSBR001">
              <img v-if="statusValue.EQSBR001 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR001 === 0 || statusValue.EQSBR001 === -1 " src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR001 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR003">
              <img v-if="statusValue.EQSBR003 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR003 === 0 || statusValue.EQSBR003 === -1 " src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR003 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR005">
              <img v-if="statusValue.EQSBR005 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR005 === 0  || statusValue.EQSBR005 === -1 " src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR005 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="boiler1">
              <img v-if="statusValue.EQSBR001 === 1" src="~@/assets/realtime/boilerrun.png" alt="logo" style="width:184px; height:50px ">
            </div>
            <div class="boiler2">
              <img v-if="statusValue.EQSBR003 === 1" src="~@/assets/realtime/boilerrun.png" alt="logo" style="width:184px; height:50px ">
            </div>
            <div class="boiler3">
              <img  v-if="statusValue.EQSBR005 === 1" src="~@/assets/realtime/boilerrun.png" alt="logo" style="width:184px; height:50px ">
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
    name: 'Source01010002',
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
                // 1#
                TEMFR003: '', // 排烟温度
                TEMFR001: '', // 进口温度
                PRMFR001: '', // 进口压力
                TEMFR002: '', // 出口温度
                PRMFR002: '', // 出口压力
                VOMFR002: '', // 电阀开度
                FWMFR001: '', // 瞬时流量
                FWMFR002: '', // 累计流量
                // 2#
                TEMFR007: '', // 排烟温度
                TEMFR005: '', // 进口温度
                PRMFR003: '', // 进口压力
                TEMFR006: '', // 出口温度
                PRMFR004: '', // 出口压力
                VOMFR004: '', // 电阀开度
                FWMFR003: '', // 瞬时流量
                FWMFR004: '', // 累计流量
                // 3#
                TEMFR011: '', // 排烟温度
                TEMFR009: '', // 进口温度
                PRMFR005: '', // 进口压力
                TEMFR010: '', // 出口温度
                PRMFR006: '', // 出口压力
                VOMFR006: '', // 电阀开度
                FWMFR005: '', // 瞬时流量
                FWMFR006: '' // 累计流量
            },
            controlValue: {},
            settingValue: {
                VOTFW001: '', // 锅炉1#电调阀开度设定
                VOTFW003: '', // 锅炉2#电调阀开度设定
                VOTFW005: '' // 锅炉3#电调阀开度设定
            },
            statusValue: {
                EQSBR001: '', // 状态
                EQSBR003: '', // 状态
                EQSBR005: '' // 状态
            },
            alarmValue: {}
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
    height: 1515px;
    border-radius: 25px;
  }
  .TEMFR003 {
    position: absolute;
    right: 438px;
    top: 39px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR001 {
    position: absolute;
    right: 441px;
    top: 131px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR001 {
    position: absolute;
    right: 441px;
    top: 161px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR002 {
    position: absolute;
    right: 441px;
    top: 254px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRFRM002 {
    position: absolute;
    right: 441px;
    top: 284px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .VOMFR002 {
    position: absolute;
    right: 146px;
    top: 269px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FWMFR001 {
    position: absolute;
    right: 588px;
    top: 345px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FWMFR002 {
    position: absolute;
    right: 568px;
    top: 375px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR007 {
    position: absolute;
    right: 436px;
    top: 539px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR005 {
    position: absolute;
    right: 438px;
    top: 631px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR003 {
    position: absolute;
    right: 438px;
    top: 661px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR006 {
    position: absolute;
    right: 438px;
    top: 754px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRFRM004 {
    position: absolute;
    right: 438px;
    top: 784px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .VOMFR004 {
    position: absolute;
    right: 146px;
    top: 768px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FWMFR003 {
    position: absolute;
    right: 588px;
    top: 845px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FWMFR004 {
    position: absolute;
    right: 568px;
    top: 875px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR011 {
    position: absolute;
    right: 438px;
    top: 1040px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR009 {
    position: absolute;
    right: 438px;
    top: 1131px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR005 {
    position: absolute;
    right: 438px;
    top: 1161px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR010 {
    position: absolute;
    right: 438px;
    top: 1255px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRFRM006 {
    position: absolute;
    right: 438px;
    top: 1285px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .VOMFR006 {
    position: absolute;
    right: 146px;
    top: 1269px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FWMFR005 {
    position: absolute;
    right: 588px;
    top: 1346px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .FWMFR006 {
    position: absolute;
    right: 568px;
    top: 1374px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR001{
    position: absolute;
    right: 1090px;
    top: 278px;
  }
  .EQSBR003{
    position: absolute;
    right: 1090px;
    top: 778px;
  }
  .EQSBR005{
    position: absolute;
    right: 1090px;
    top: 1278px;
  }
  .boiler1{
      position: absolute;
      right: 820px;
      top: 265px;
  }
  .boiler2{
      position: absolute;
      right: 820px;
      top: 765px;
  }
  .boiler3{
      position: absolute;
      right: 820px;
      top: 1265px;
  }
</style>
