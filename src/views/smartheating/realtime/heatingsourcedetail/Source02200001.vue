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
          <a-col span="6">刷新时间: {{ this.leftTime }}</a-col>
          <a-col span="16">刷新时间: {{ this.rightTime }}</a-col>
        </a-row>
        <a-row>
          <a-col span="1"></a-col>
          <a-col span="6">
            <div class="leftPanel">
              <div>
                <table>
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">深水泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW001" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td class="leftTitle">频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW002" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr>
                  </tr><tr style="height:450px"></tr>
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
            <div class="FQMFR001">{{ monitoringValue.FQMFR001 }}</div>
            <div class="CRMFR001">{{ monitoringValue.CRMFR001 }}</div>
            <div class="CRMFR002">{{ monitoringValue.CRMFR002 }}</div>
            <div class="CRMFR003">{{ monitoringValue.CRMFR003 }}</div>
            <div class="EQSBR002">
              <img v-if="statusValue.EQSBR002 === 1" src="~@/assets/realtime/deeppumprun.png" alt="logo" style="width:43px; height:232px ">
              <img v-if="statusValue.EQSBR002 === 0" src="~@/assets/realtime/deeppumpstop.png" alt="logo" style="width:43px; height:232px ">
              <img v-if="statusValue.EQSBR002 === 99" src="~@/assets/realtime/deeppumpalarm.png" alt="logo" style="width:43px; height:232px ">
            </div>
              <div class="EQSBR002_1">
                  <img v-if="statusValue.EQSBR002 === 1" src="~@/assets/realtime/deeppumprun2.png" alt="logo" style="width:22px; height:232px ">
                  <img v-if="statusValue.EQSBR002 === 0" src="~@/assets/realtime/deeppumpstop2.png" alt="logo" style="width:22px; height:232px ">
                  <img v-if="statusValue.EQSBR002 === 99" src="~@/assets/realtime/deeppumpalarm2.png" alt="logo" style="width:22px; height:232px ">
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
    name: 'Source02200001',
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
                FQMFR001: '', // 深井泵频率
                CRMFR001: '', // 相电流A
                CRMFR002: '', // 相电流B
                CRMFR003: '' // 相电流C

            },
            controlValue: {
                EQCBW001: '' // 深井泵
            },
            statusValue: {
                EQSBR002: '' // 状态
            },
            settingValue: {
                FQTFW002: '' // 频率设定
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
    .FQMFR001{
      position: absolute;
      right: 912px;
      top: 350px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR001{
      position: absolute;
      right: 928px;
      top: 405px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR002{
      position: absolute;
      right: 928px;
      top: 435px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .CRMFR003{
      position: absolute;
      right: 928px;
      top: 468px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR002{
        position: absolute;
        right: 1090px;
        top: 320px;
    }
    .EQSBR002_1{
        position: absolute;
        right: 481px;
        top: 330px;
    }

</style>
