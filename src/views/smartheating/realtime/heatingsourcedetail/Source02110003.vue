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
      <div style="width:100%;height:900px">
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
                    <td width="50%" class="leftTitle">中间水泵1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW122" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">中间水泵1#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW012" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">中间水泵2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW125" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">中间水泵2#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW014" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">中间水泵3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW128" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">中间水泵3#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW016" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">中间水泵4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW131" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">中间水泵4#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW018" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">一网水泵1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW134" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">一网水泵1#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW020" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">一网水泵2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW137" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">一网水泵2#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW022" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">一网水泵3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW140" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">一网水泵3#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW024" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">一网水泵4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW143" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">一网水泵4#频率设定</td>
                    <td ><a-input-number v-model="settingValue.FQTFW026" class="textField" style="width:100%"></a-input-number></td>
                    <td>Hz</td>
                  </tr>
                  <tr style="height:20px"></tr>
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
            <div class="FQMFR011">{{ monitoringValue.FQMFR011 }}</div>
            <div class="FQMFR013">{{ monitoringValue.FQMFR013 }}</div>
            <div class="FQMFR015">{{ monitoringValue.FQMFR015 }}</div>
            <div class="FQMFR017">{{ monitoringValue.FQMFR017 }}</div>
            <div class="FQMFR019">{{ monitoringValue.FQMFR019 }}</div>
            <div class="FQMFR021">{{ monitoringValue.FQMFR021 }}</div>
            <div class="FQMFR023">{{ monitoringValue.FQMFR023 }}</div>
            <div class="FQMFR025">{{ monitoringValue.FQMFR025 }}</div>
            <div class="PRMFR011">{{ monitoringValue.PRMFR011 }}</div>
            <div class="TEMFR011">{{ monitoringValue.TEMFR011 }}</div>
            <div class="FWMFR005">{{ monitoringValue.FWMFR005 }}</div>
            <div class="HTMFR004">{{ monitoringValue.HTMFR004 }}</div>
            <div class="FWMFR006">{{ monitoringValue.FWMFR006 }}</div>
            <div class="HTMFR005">{{ monitoringValue.HTMFR005 }}</div>
            <div class="HTMFC006">{{ monitoringValue.HTMFC006 }}</div>
            <div class="TEMFR055">{{ monitoringValue.TEMFR055 }}</div>
            <div class="PRMFR049">{{ monitoringValue.PRMFR049 }}</div>
            <div class="FWMFR003">{{ monitoringValue.FWMFR003 }}</div>
            <div class="HTMFR001">{{ monitoringValue.HTMFR001 }}</div>
            <div class="FWMFR004">{{ monitoringValue.FWMFR004 }}</div>
            <div class="HTMFR002">{{ monitoringValue.HTMFR002 }}</div>
            <div class="HTMFC003">{{ monitoringValue.HTMFC003 }}</div>
            <div class="TEMFR012">{{ monitoringValue.TEMFR012 }}</div>
            <div class="PRMFR012">{{ monitoringValue.PRMFR012 }}</div>
            <div class="TEMFR056">{{ monitoringValue.TEMFR056 }}</div>
            <div class="PRMFR050">{{ monitoringValue.PRMFR050 }}</div>
            <div class="PRMFR051">{{ monitoringValue.PRMFR051 }}</div>
            <div class="PRMFR052">{{ monitoringValue.PRMFR052 }}</div>
            <div class="PDMFC001">{{ monitoringValue.PDMFC001 }}</div>
            <div class="PDMFC002">{{ monitoringValue.PDMFC002 }}</div>

            <div class="EQSBR123">
              <img v-if="statusValue.EQSBR123 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR123 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR123 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR126">
              <img v-if="statusValue.EQSBR126 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR126 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR126 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR129">
              <img v-if="statusValue.EQSBR129 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR129 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR129 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR132">
              <img v-if="statusValue.EQSBR132 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR132 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR132 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR135">
              <img v-if="statusValue.EQSBR135 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR135 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR135 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR138">
              <img v-if="statusValue.EQSBR138 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR138 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR138 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR141">
              <img v-if="statusValue.EQSBR141 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR141 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR141 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR144">
              <img v-if="statusValue.EQSBR144 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR144 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR144 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source02110003',
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
                /** 第三个参数M */
                // 1#
                FQMFR011: '', // 1# 中间水泵频率
                TEMFR011: '', // 1# 中间出温
                PRMFR011: '', // 1# 中间出压
                TEMFR055: '', // 1# 一网出温
                PRMFR049: '', // 1# 一网出压

                // 2
                FQMFR012: '', // 2# 中间水泵频率
                FWMFR005: '', // 中间瞬时流量
                HTMFR004: '', // 中间瞬时热力
                FWMFR006: '', // 中间瞬时流量
                HTMFR005: '', // 中间积累热量
                HTMFC006: '', // 日输出热量

                FWMFR003: '', // 一网瞬时流量
                HTMFR001: '', // 一网瞬时热量
                FWMFR004: '', // 一网积累流量
                HTMFR002: '', // 一网积累热量
                HTMFC003: '', // 日输出热量
                FQMFR019: '', // 1# 一网水泵效率
                FQMFR021: '', // 2# 一网水泵效率
                FQMFR023: '', // 3# 一网水泵效率
                FQMFR025: '', // 4# 一网水泵效率
                FQMFR015: '', // 3# 中间水泵效率
                FQMFR019: '', // 4#  中间水泵效率

                TEMFR012: '', // 4# 中间出温
                PRMFR012: '', // 4# 中间出压
                TEMFR056: '', // 4# 一网进温
                PRMFR050: '', // 4# 一网进压
                PRMFR052: '', // 出压
                PRMFR051: '', // 进压
                PDMFC001: '', // 循环压差
                PDMFC002: '' // 压差
            },
            controlValue: {
                /** 参数名中的第三位为C的参数 */

                EQCBW122: '', // 中间水泵1#
                EQCBW125: '', // 中间水泵2#
                EQCBW128: '', // 中间水泵3#
                EQCBW131: '', // 中间水泵4#
                EQCBW134: '', // 一网水泵1#
                EQCBW137: '', // 一网水泵2#
                EQCBW140: '', // 一网水泵3#
                EQCBW143: '' // 一网水泵4#
            },
            settingValue: {
                /** 参数名中的第三位为T的参数 */
                FQTFW012: '', // 中间水泵1#频率设定
                FQTFW014: '', // 中间水泵2#频率设定
                FQTFW016: '', // 中间水泵3#频率设定
                FQTFW018: '', // 中间水泵4#频率设定
                FQTFW020: '', // 一网水泵1#频率设定
                FQTFW022: '', // 一网水泵2#频率设定
                FQTFW024: '', // 一网水泵3#频率设定
                FQTFW026: '' // 一网水泵4#频率设定
            },
            statusValue: {
                /** 参数名中的第三位为S的参数 */
                EQSBR123: '', // 状态
                EQSBR126: '', // 状态
                EQSBR129: '', // 状态
                EQSBR132: '', // 状态
                EQSBR135: '', // 状态
                EQSBR138: '', // 状态
                EQSBR141: '', // 状态
                EQSBR144: '', // 状态
            },
            alarmValue: {
                /** 参数名中的第三位为A的参数 */
                EQABR124: '',
                EQABR127: '',
                EQABR129: '',
                EQABR133: '',
                EQABR136: '',
                EQABR139: '',
                EQABR142: '',
                EQABR145: ''

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
    height: 900px;
    border-radius: 25px;
  }
  .FQMFR011{
      position: absolute;
      right: 1014px;
      top: 49px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FQMFR013{
      position: absolute;
      right: 1016px;
      top: 173px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FQMFR015{
      position: absolute;
      right: 1016px;
      top: 298px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FQMFR017{
      position: absolute;
      right: 1016px;
      top: 421px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FQMFR019 {
      position: absolute;
      right: 272px;
      top: 173px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FQMFR021{
      position: absolute;
      right: 272px;
      top: 298px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FQMFR023{
      position: absolute;
      right: 272px;
      top: 420px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FQMFR025 {
      position: absolute;
      right: 272px;
      top: 545px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }

  .TEMFR011 {
      position: absolute;
      right: 790px;
      top: 35px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .PRMFR011 {
      position: absolute;
      right: 790px;
      top: 65px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }

  .FWMFR005 {
      position: absolute;
      right: 780px;
      top: 169px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .HTMFR004 {
      position: absolute;
      right: 780px;
      top: 204px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FWMFR006 {
      position: absolute;
      right: 760px;
      top: 237px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }

  .HTMFR005{
      position: absolute;
      right: 760px;
      top: 270px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .HTMFC006{
      position: absolute;
      right:760px;
      top: 300px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .TEMFR012 {
      position: absolute;
      right: 795px;
      top: 530px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }

  .PRMFR012 {
      position: absolute;
      right: 795px;
      top: 560px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .TEMFR056 {
      position: absolute;
      right: 545px;
      top: 530px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .PRMFR050 {
      position: absolute;
      right: 545px;
      top: 565px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .TEMFR055 {
      position: absolute;
      right: 295px;
      top: 36px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .PRMFR049 {
      position: absolute;
      right: 295px;
      top: 65px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FWMFR003 {
      position: absolute;
      right: 60px;
      top: 172px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .HTMFR001 {
      position: absolute;
      right: 60px;
      top: 205px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .FWMFR004 {
      position: absolute;
      right: 40px;
      top: 238px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .HTMFR002 {
      position: absolute;
      right: 40px;
      top: 272px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .HTMFC003 {
      position: absolute;
      right: 40px;
      top: 304px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .PRMFR052 {
      position: absolute;
      right: 150px;
      top: 560px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .PRMFR051{
      position: absolute;
      right: 50px;
      top: 615px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .PDMFC001 {
      position: absolute;
      right: 553px;
      top: 66px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .PDMFC002 {
      position: absolute;
      right: 59px;
      top: 533px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
  }
  .EQSBR123{
        position: absolute;
        right: 1074px;
        top: 85px;
    }
  .EQSBR126{
      position: absolute;
      right: 1074px;
      top: 209px;
  }
  .EQSBR129{
      position: absolute;
      right: 1074px;
      top: 333px;
  }
  .EQSBR132{
      position: absolute;
      right: 1074px;
      top: 457px;
  }
  .EQSBR135{
      position: absolute;
      right: 331px;
      top: 209px;
  }
  .EQSBR138{
      position: absolute;
      right: 331px;
      top: 333px;
  }
  .EQSBR141{
      position: absolute;
      right: 331px;
      top: 456px;
  }
  .EQSBR144{
      position: absolute;
      right: 331px;
      top: 580px;
  }
</style>
