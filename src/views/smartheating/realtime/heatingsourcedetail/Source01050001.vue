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
                    <td width="50%" class="leftTitle">深井泵</td>
                    <td width="40%" align="left">
                      <a-radio-group v-model="controlValue.EQCBW001" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">频率设定</td>
                    <td width="40%" >
                      <a-input-number v-model="settingValue.FQTFW002" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">Hz</td>
                  </tr>
                  <tr height="500px"></tr>
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
            <div class="FQMFR001">{{ monitoringValue.FQMFR001 }}</div>
            <div class="CRMFR001">{{ monitoringValue.CRMFR001 }}</div>
            <div class="CRMFR002">{{ monitoringValue.CRMFR002 }}</div>
            <div class="CRMFR003">{{ monitoringValue.CRMFR003 }}</div>
            <div class="EQSBR002">
              <img v-if="statusValue.EQSBR002 === 1" src="~@/assets/realtime/deeppumprun.png" alt="logo" style="width:42px; height:232px">
              <img v-if="statusValue.EQSBR002 === 0" src="~@/assets/realtime/deeppumpstop.png" alt="logo" style="width:42px; height:232px ">
              <img v-if="statusValue.EQSBR002 ===99" src="~@/assets/realtime/deeppumpalarm.png" alt="logo" style="width:42px; height:232px ">
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
    name: 'Source01050001',
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
                FQMFR001: '', // 水泵SB8频率
                CRMFR001: '', // A相电流
                CRMFR002: '', // B相电流
                CRMFR003: '', // C相电流
                PRMFR001: '', // 除砂器进口压力
                PRMFR002: '', // 除砂器出口压力
                PDMFC001: '', // 除砂器两侧压差
                VOMFR002: '' // 阀门开度
            },
            controlValue: {
                EQCBW001: '' // 水泵SB8启动/停止开关
            },
            settingValue: {
                FQTFW002: '', // 频率设定
                VOTFW001: '' // 阀门开度设定
            },
            statusValue: {
                EQSBR002: '' // 深井泵地热供水启动/停止状态
            },
            statusAlarmValues: {

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
  .FQMFR001 {
    position: absolute;
    right: 910px;
    top: 332px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CRMFR001 {
    position: absolute;
    right: 925px;
    top: 386px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .CRMFR002 {
    position: absolute;
    right: 925px;
    top: 418px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .CRMFR003 {
    position: absolute;
    right: 925px;
    top: 448px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .EQSBR002{
    position: absolute;
    right: 1090px;
    top: 304px;
  }
  .block1 {
      position: absolute;
      left: 114px;
      top: 331px;
  }
  .block2 {
      position: absolute;
      left: 750px;
      top: 331px;
  }
</style>
