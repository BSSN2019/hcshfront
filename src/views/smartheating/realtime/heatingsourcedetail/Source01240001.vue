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
              </div>
            </div>
          </a-col>
          <a-col span="16">
            <img ref="backImg" :src="getImgView(panelImgSource)" />
            <div class="PRMFR001">{{monitoringValue.PRMFR001}}</div>
            <div class="FWMFR001">{{monitoringValue.FWMFR001}}</div>
            <div class="FWMFR002">{{monitoringValue.FWMFR002}}</div>
            <div class="GQMFC001">{{monitoringValue.GQMFC001}}</div>
            <div class="PRMFR002">{{monitoringValue.PRMFR002}}</div>
            <div class="FWMFR003">{{monitoringValue.FWMFR003}}</div>
            <div class="FWMFR004">{{monitoringValue.FWMFR004}}</div>
            <div class="GQMFC002">{{monitoringValue.GQMFC002}}</div>
            <div class="PRMFR003">{{monitoringValue.PRMFR003}}</div>
            <div class="FWMFR005">{{monitoringValue.FWMFR005}}</div>
            <div class="FWMFR006">{{monitoringValue.FWMFR006}}</div>
            <div class="GQMFC003">{{monitoringValue.GQMFC003}}</div>
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
  name: 'Source01240001',
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
            /** 燃气表1#*/
              PRMFR001: '', // 燃气压力
              FWMFR001: '', // 瞬时流量
              FWMFR002: '', // 积累流量
              GQMFC001: '', // 日耗气量
              /** 燃气表2#*/
              PRMFR002: '', // 燃气压力
              FWMFR003: '', // 瞬时流量
              FWMFR004: '', // 积累流量
              GQMFC002: '', // 日耗气量
              /** 燃气表3#*/
              PRMFR003: '', // 燃气压力
              FWMFR005: '', // 瞬时流量
              FWMFR006: '', // 积累流量
              GQMFC003: '', // 日耗气量

                         },
            settingValue: {
                /*
                    twoTempSetting: '',         // 二出温度设定
*/
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
    .PRMFR001{
      position: absolute;
      right: 771px;
      top: 61px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR001 {
      position: absolute;
      right: 771px;
      top: 93px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR002 {
      position: absolute;
      right: 750px;
      top: 126px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .GQMFC001 {
      position: absolute;
      right: 750px;
      top: 159px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR002{
      position: absolute;
      right: 771px;
      top: 281px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR003 {
      position: absolute;
      right: 771px;
      top: 312px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR004 {
      position: absolute;
      right: 750px;
      top: 346px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .GQMFC002 {
      position: absolute;
      right: 750px;
      top: 378px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR003{
      position: absolute;
      right: 771px;
      top: 499px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR005 {
      position: absolute;
      right: 771px;
      top: 530px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR006 {
      position: absolute;
      right: 750px;
      top: 563px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .GQMFC003 {
      position: absolute;
      right: 750px;
      top: 595px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }

</style>
