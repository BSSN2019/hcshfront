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
                    <td width="50%" class="leftTitle">水箱液位高限设定</td>
                    <td width="40%" >
                      <a-input-number v-model="settingValue.WLTFW002" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">m</td>
                  </tr>
                  <tr height="20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水箱液位低限设定</td>
                    <td width="40%" align="right">
                      <a-input-number v-model="settingValue.WLTFW003" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td width="10%">m</td>
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
            <div class="WLMFR001">{{monitoringValue.WLMFR001}}</div>
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
    name: 'Source01050004',
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
          WLMFR001: '' // 水箱液位
        },
        controlValue: {
        },
        settingValue: {
          WLTFW002: '', // 水箱液位高限设定
          WLTFW003: '', // 水箱液位低限设定
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
  .WLMFR001 {
    position: absolute;
    right: 780px;
    top: 174px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
</style>
