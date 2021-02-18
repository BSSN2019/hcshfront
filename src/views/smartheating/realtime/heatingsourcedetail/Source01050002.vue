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
            </div>
          </a-col>
          <a-col span="16">
            <img ref="backImg" :src="getImgView(panelImgSource)" />
            <div class="TEMFR002">{{monitoringValue.TEMFR002}}</div>
            <div class="PRMFR002">{{ monitoringValue.PRMFR002}}</div>
            <div class="TEMFR001">{{ monitoringValue.TEMFR001}}</div>
            <div class="PRMFR001">{{ monitoringValue.PRMFR001}}</div>
            <div class="EQSBR004">
              <img v-if="statusValue.EQSBR004 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQABR004 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQABR004 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR004 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source01050002',
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
                TEMFR002: '', // 出口温度
                PRMFR002: '', // 出口压力
                TEMFR001: '', // 进口温度
                PRMFR001: '' // 进口压力
            },
            controlValue: {
            },
            statusValue: {
                EQSBR004: '' // 状态
            },
            settingValue: {
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
  .TEMFR002 {
    position: absolute;
    right: 772px;
    top: 146px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR002 {
    position: absolute;
    right: 772px;
    top: 176px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR001 {
    position: absolute;
    right: 772px;
    top: 270px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR001 {
    position: absolute;
    right: 772px;
    top: 299px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .EQSBR004{
    position: absolute;
    right: 936px;
    top: 319px;
  }
</style>
