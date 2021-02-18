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
                  <tr>
                    <td colspan="2" class="leftTitle">
                      <span v-if="controlParameter === 'EQCBW005'">电调阀</span>
                      <span v-if="controlParameter === 'EQCBW010'">二级泵</span>
                    </td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW005" button-style="solid" @change="EQCBW005Change" v-if="controlParameter === 'EQCBW005'">
                        <a-radio-button value="1">手动</a-radio-button>
                        <a-radio-button value="0">自动</a-radio-button>
                      </a-radio-group>
                      <a-radio-group v-model="controlValue.EQCBW010" button-style="solid" @change="EQCBW010Change" v-if="controlParameter === 'EQCBW010'">
                        <a-radio-button value="1">手动</a-radio-button>
                        <a-radio-button value="0">自动</a-radio-button>
                      </a-radio-group>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">二出温度设定</td>
                    <td>
                      <a-input-number v-model="settingValue.TETFW005" style="width:100%" :class="settingStyle.textClass.TETFW005" :disabled="settingStyle.disabledValue.TETFW005"></a-input-number>
                    </td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr>
                    <td width="24%" class="leftTitle">算法A</td>
                    <td width="35%" align="left">
                      <a-radio-group
                        v-if="controlParameter==='EQCBW005'"
                        v-model="controlValue.EQCBW006"
                        class="radioGroup"
                        button-style="solid"
                        @change="handleChangeA"
                        :disabled="settingStyle.disabledValue.EQCBW006">
                        <a-radio-button value="0"> 下线 </a-radio-button>
                        <a-radio-button value="1"> 上线 </a-radio-button>
                      </a-radio-group>
                      <a-radio-group
                        v-if="controlParameter==='EQCBW010'"
                        v-model="controlValue.EQCBW012"
                        class="radioGroup"
                        button-style="solid"
                        @change="handleChangeA"
                        :disabled="settingStyle.disabledValue.EQCBW012">
                        <a-radio-button value="0"> 下线 </a-radio-button>
                        <a-radio-button value="1"> 上线 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="20%" class="leftTitle">室温设定</td>
                    <td width="16%">
                      <a-input-number
                        v-if="controlParameter==='EQCBW005'"
                        v-model="settingValue.TETFW006"
                        class="textField"
                        style="width:100%"
                        :class="settingStyle.textClass.TETFW006"
                        :disabled="settingStyle.disabledValue.TETFW006"></a-input-number>
                      <a-input-number
                        v-if="controlParameter==='EQCBW010'"
                        v-model="settingValue.TETFW010"
                        class="textField"
                        style="width:100%"
                        :class="settingStyle.textClass.TETFW010"
                        :disabled="settingStyle.disabledValue.TETFW010"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">℃</td>
                  </tr>
                  <tr>
                    <td class="leftTitle">算法B</td>
                    <td>
                      <a-radio-group
                        v-if="controlParameter==='EQCBW005'"
                        v-model="controlValue.EQCBW007"
                        class="radioGroup"
                        button-style="solid"
                        @change="handleChangeB"
                        :disabled="settingStyle.disabledValue.EQCBW007">
                        <a-radio-button value="0"> 下线 </a-radio-button>
                        <a-radio-button value="1"> 上线 </a-radio-button>
                      </a-radio-group>
                      <a-radio-group
                        v-if="controlParameter==='EQCBW010'"
                        v-model="controlValue.EQCBW013"
                        class="radioGroup"
                        button-style="solid"
                        @change="handleChangeB"
                        :disabled="settingStyle.disabledValue.EQCBW013">
                        <a-radio-button value="0"> 下线 </a-radio-button>
                        <a-radio-button value="1"> 上线 </a-radio-button>
                      </a-radio-group></td>
                    <td class="leftTitle">室温设定</td>
                    <td>
                      <a-input-number
                        v-if="controlParameter==='EQCBW005'"
                        v-model="settingValue.TETFW007"
                        class="textField"
                        style="width:100%"
                        :class="settingStyle.textClass.TETFW007"
                        :disabled="settingStyle.disabledValue.TETFW007"></a-input-number>
                      <a-input-number
                        v-if="controlParameter==='EQCBW010'"
                        v-model="settingValue.TETFW011"
                        class="textField"
                        style="width:100%"
                        :class="settingStyle.textClass.TETFW011"
                        :disabled="settingStyle.disabledValue.TETFW011"></a-input-number>
                    </td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr>
                    <td class="leftTitle">算法C</td>
                    <td>
                      <a-radio-group
                        v-if="controlParameter==='EQCBW005'"
                        v-model="controlValue.EQCBW008"
                        class="radioGroup"
                        button-style="solid"
                        @change="handleChangeC"
                        :disabled="settingStyle.disabledValue.EQCBW008">
                        <a-radio-button value="0"> 下线 </a-radio-button>
                        <a-radio-button value="1"> 上线 </a-radio-button>
                      </a-radio-group>
                      <a-radio-group
                        v-if="controlParameter==='EQCBW010'"
                        v-model="controlValue.EQCBW014"
                        class="radioGroup"
                        button-style="solid"
                        @change="handleChangeC"
                        :disabled="settingStyle.disabledValue.EQCBW014">
                        <a-radio-button value="0"> 下线 </a-radio-button>
                        <a-radio-button value="1"> 上线 </a-radio-button>
                      </a-radio-group></td>
                    <td class="leftTitle">室温设定</td>
                    <td>
                      <a-input-number
                        v-if="controlParameter==='EQCBW005'"
                        v-model="settingValue.TETFW008"
                        class="textField"
                        style="width:100%"
                        :class="settingStyle.textClass.TETFW008"
                        :disabled="settingStyle.disabledValue.TETFW008"></a-input-number>
                      <a-input-number
                        v-if="controlParameter==='EQCBW010'"
                        v-model="settingValue.TETFW012"
                        class="textField"
                        style="width:100%"
                        :class="settingStyle.textClass.TETFW012"
                        :disabled="settingStyle.disabledValue.TETFW012"></a-input-number>
                    </td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">
                      <span v-if="controlParameter === 'EQCBW005'">电调阀手动开度设定</span>
                      <span v-if="controlParameter === 'EQCBW010'">二级泵手动频率设定</span>
                    </td>
                    <td>
                      <span v-if="controlParameter === 'EQCBW005'">
                        <a-input-number v-model="settingValue.VOTFW002" class="textField" style="width:100%" :class="settingStyle.textClass.VOTFW002" :disabled="settingStyle.disabledValue.VOTFW002"></a-input-number>
                      </span>
                      <span v-if="controlParameter === 'EQCBW010'">
                        <a-input-number v-model="settingValue.FQTFW004" class="textField" style="width:100%" :class="settingStyle.textClass.VOTFW002" :disabled="settingStyle.disabledValue.VOTFW002"></a-input-number>
                      </span>
                    </td>
                    <td class="leftTitle">
                      <span v-if="controlParameter === 'EQCBW005'">%</span>
                      <span v-if="controlParameter === 'EQCBW010'">Hz</span>
                    </td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td colspan="3" class="leftTitle">二次板换温差低限设定</td>
                    <td>
                      <a-input-number v-model="settingValue.TDTFW003" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">二次回水压力泄压值设定</td>
                    <td>
                      <a-input-number v-model="settingValue.PRTFW005" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td class="leftTitle">MPa</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">二次回水压力定压值设定</td>
                    <td>
                      <a-input-number v-model="settingValue.PRTFW006" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td class="leftTitle">MPa</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">二次回水压力高限报警</td>
                    <td>
                      <a-input-number v-model="settingValue.PRTFW007" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td class="leftTitle">MPa</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">二次回水压力低限报警</td>
                    <td>
                      <a-input-number v-model="settingValue.PRTFW008" class="textField" style="width:100%"></a-input-number>
                    </td>
                    <td class="leftTitle">MPa</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="leftTitle">二次循环泵</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW003" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="2" class="leftTitle">二次循环泵</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW002" class="radioGroup" button-style="solid" @change="EQCBW002Change">
                        <a-radio-button value="1"> 手动 </a-radio-button>
                        <a-radio-button value="0"> 自动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">二次资用压差设定</td>
                    <td>
                      <a-input-number v-model="settingValue.PDTFW010" class="textField" style="width:100%" :class="settingStyle.textClass.PDTFW010" :disabled="settingStyle.disabledValue.PDTFW010"></a-input-number>
                    </td>
                    <td class="leftTitle">MPa</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">二次循环泵手动频率设定</td>
                    <td>
                      <a-input-number v-model="settingValue.FQTFW002" class="textField" style="width:100%" :class="settingStyle.textClass.FQTFW002" :disabled="settingStyle.disabledValue.FQTFW002"></a-input-number>
                    </td>
                    <td class="leftTitle">Hz</td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">二次补水泵</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW015" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="1" class="leftTitle">泄压阀状态</td>
                    <td colspan="3" align="right">
                      <a-radio-group v-model="controlValue.EQCIW016" class="radioGroup" button-style="solid">
                        <a-radio-button value="0">关闭</a-radio-button>
                        <a-radio-button value="1">打开</a-radio-button>
                        <a-radio-button value="2">自动</a-radio-button>
                      </a-radio-group>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">水箱液位高限报警设定</td>
                    <td>
                      <a-input v-model="settingValue.WLTFW002" class="textField" style="width:100%"></a-input>
                    </td>
                    <td class="leftTitle">m</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="leftTitle">水箱液位低限报警设定</td>
                    <td>
                      <a-input v-model="settingValue.WLTFW003" class="textField" style="width:100%"></a-input>
                    </td>
                    <td class="leftTitle">m</td>
                  </tr>
                  <tr>
                    <td colspan="5" align="center">
                      <a-button v-if="this.hasRight"  title="确定下发" type="primary" @click="handleControl">确定下发</a-button>
<!--
                      <a-button title="确定下发" type="primary" @click="handleControl">确定下发</a-button>
-->
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </a-col>
          <a-col span="16">
            <img ref="backImg" :src="getImgView(panelImgSource)" />
            <div class="FQMFR003">{{ monitoringValue.FQMFR003 }}</div>
            <div class="VOMFR001">{{ monitoringValue.VOMFR001 }}</div>
            <div class="TEMFR001">{{ monitoringValue.TEMFR001 }}</div>
            <div class="PRMFR001">{{ monitoringValue.PRMFR001 }}</div>
            <div class="TEMFR002">{{ monitoringValue.TEMFR002 }}</div>
            <div class="PRMFR002">{{ monitoringValue.PRMFR002 }}</div>
            <div class="TEMFR004">{{ monitoringValue.TEMFR004 }}</div>
            <div class="PRMFR004">{{ monitoringValue.PRMFR004 }}</div>
            <div class="TEMFR003">{{ monitoringValue.TEMFR003 }}</div>
            <div class="PRMFR003">{{ monitoringValue.PRMFR003 }}</div>
            <div class="FQMFR001">{{ monitoringValue.FQMFR001 }}</div>
            <div class="PRMFR013">{{ monitoringValue.PRMFR013 }}</div>
            <div class="PDMFC001">{{ monitoringValue.PDMFC001 }}</div>
            <div class="TDMFC001">{{ monitoringValue.TDMFC001 }}</div>
            <div class="FWMFR001">{{ monitoringValue.FWMFR001 }}</div>
            <div class="FWMFR002">{{ monitoringValue.FWMFR002 }}</div>
            <div class="HTMFR001">{{ monitoringValue.HTMFR001 }}</div>
            <div class="HTMFR002">{{ monitoringValue.HTMFR002 }}</div>
            <div class="PDMFC002">{{ monitoringValue.PDMFC002 }}</div>
            <div class="TDMFC002">{{ monitoringValue.TDMFC002 }}</div>
            <div class="FWMFR003">{{ monitoringValue.FWMFR003 }}</div>
            <div class="FWMFR004">{{ monitoringValue.FWMFR004 }}</div>
            <div class="HTMFR003">{{ monitoringValue.HTMFR003 }}</div>
            <div class="HTMFR004">{{ monitoringValue.HTMFR004 }}</div>
            <div class="PRMFR014">{{ monitoringValue.PRMFR014 }}</div>
            <div class="WLMFR001">{{ monitoringValue.WLMFR001 }}</div>
            <div class="FQMFR005">{{ monitoringValue.FQMFR005 }}</div>
            <div class="EQSBR001">
              <img v-if="statusValue.EQSBR001 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR001 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR001 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR016">
              <img v-if="statusValue.EQSBR016 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR016 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR016 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR009" v-if="controlParameter === 'EQCBW010'">
              <img v-if="statusValue.EQSBR009 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR009 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR009 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
          </a-col>
          <a-col span="1"></a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { RealTimeMixin } from './RealTimeMixin'

export default {
    name: 'StationDetail',
    mixins: [RealTimeMixin],
    components: {
    },
    data () {
        return {
            settingStyle: {
                textClass: {
                    TETFW005: 'enableText',
                    TETFW006: 'enableText',
                    TETFW007: 'enableText',
                    TETFW008: 'enableText',
                    TETFW010: 'enableText',
                    TETFW011: 'enableText',
                    TETFW012: 'enableText',
                    VOTFW002: 'enableText',
                    PDTFW010: 'enableText',
                    FQTFW002: 'enableText'
                },
                disabledValue: {
                    TETFW005: false,
                    EQCBW006: false,
                    TETFW006: false,
                    EQCBW007: false,
                    TETFW007: false,
                    EQCBW008: false,
                    TETFW008: false,
                    EQCBW010: false,
                    TETFW012: false,
                    EQCBW011: false,
                    TETFW013: false,
                    EQCBW012: false,
                    TETFW014: false,
                    VOTFW002: false,
                    PDTFW010: false,
                    FQTFW002: false
                }
            },
            url: {
                /** 获取供热系统的信息 */
                heatingSystem: '/basicdata/heatingsystem/query',
                /** 获取供热系统名称 */
                heatingSystemName: '/basicdata/heatingsystem/getName',
                /** 获取监测值 */
                monitoringValues: '/dataValue/tsValue/station/current',
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
                FQMFR003: '', // 二级泵运行频率
                VOMFR001: '', // 电调阀开度
                TEMFR001: '', // 一次进口温度 (一进温度)
                PRMFR001: '', // 一次进口压力 (一进压力)
                TEMFR002: '', // 一次出口温度 (一出温度)
                PRMFR002: '', // 一次出口压力 (一出压力)
                TEMFR004: '', // 二次出口温度 (二出温度)
                PRMFR004: '', // 二次出口压力 (二出压力)
                TEMFR003: '', // 二次进口温度 (二进温度)
                PRMFR003: '', // 二次进口压力 (二进压力)
                FQMFR001: '', // 二次循环泵PLC运行频率 (水泵频率)
                PRMFR013: '', // 二次循环泵进口压力(二回压力)
                PDMFC001: '', // 一次侧板换压差 (一次板换压差)
                TDMFC001: '', // 一次侧温差 (一次板换温差)
                FWMFR001: '', // 一次侧瞬时流量 (一次瞬时流量)
                FWMFR002: '', // 一次侧累积流量 (一次累计流量)
                HTMFR001: '', // 一次侧瞬时热量 (一次瞬时热量)
                HTMFR002: '', // 一次侧累积热量 (一次累计热量)
                PDMFC002: '', // 二次侧资用压差 (二次资用压差)
                TDMFC002: '', // 二次侧温差 (二次板换温差)
                FWMFR003: '', // 二次侧瞬时流量 (二次瞬时流量)
                FWMFR004: '', // 二次侧累积流量 (二次累计流量)
                HTMFR003: '', // 二次侧瞬时热量 (二次瞬时热量)
                HTMFR004: '', // 二次侧累积热量 (二次累计热量)
                PRMFR014: '', // 自来水PLC压力 (自来水压力)
                WLMFR001: '', // 水箱PLC液位 (水箱液位)
                FQMFR005: '' // 补水泵PLC运行频率 (水泵频率)
            },
            controlValue: {
                EQCBW005: '', // 电调阀PLC手动/自动开关
                EQCBW006: '', // 电调阀页面自动算法A开关
                EQCBW007: '', // 电调阀页面自动算法B开关
                EQCBW008: '', // 电调阀页面自动算法C开关
                EQCBW012: '', // 二级泵页面自动算法A开关
                EQCBW013: '', // 二级泵页面自动算法B开关
                EQCBW014: '', // 二级泵页面自动算法C开关
                EQCBW003: '', // 二次循环泵PLC停止/启动开关
                EQCBW002: '', // 二次循环泵PLC手动/自动开关
                EQCBW015: '', // 补水泵PLC停止/启动开关
                EQCIW016: '' // 泄压阀(关闭/打开/自动)
            },
            settingValue: {
                TETFW005: '', // 电调阀PLC自动二出温度设定
                TETFW006: '', // 电调阀页面算法A温度设定
                TETFW007: '', // 电调阀页面算法B温度设定
                TETFW008: '', // 电调阀页面算法C温度设定
                TETFW010: '', // 二级泵页面算法A温度设定
                TETFW011: '', // 二级泵页面算法B温度设定
                TETFW012: '', // 二级泵页面算法C温度设定
                VOTFW002: '', // 一次电调阀手工开度设定
                FQTFW004: '', // 二级泵手动频率设定

                TDTFW003: '', // 二次板换温差低限设定
                PRTFW005: '', // 二次侧回水压力泄压值设定
                PRTFW006: '', // 二次侧回水压力定压值设定
                PRTFW007: '', // 二次侧回水压力高限报警设定
                PRTFW008: '', // 二次侧回水压力低限报警设定
                PDTFW010: '', // 二次循环泵PLC自动压差设定 (二次资用压差设定)
                FQTFW002: '', // 二次循环泵PLC手动频率设定
                WLTFW002: '', // 水箱PLC液位高限设定
                WLTFW003: '' // 水箱PLC液位低限设定
            },
            statusValue: {
                EQSBR001: '', // 循环泵状态
                EQSBR009: '', // 二级泵状态
                EQSBR016: '' // 补水泵状态
            },
            alarmValue: {
                EQABR015: '', // 二级泵故障
                EQABR004: '', // 循环泵故障
                EQABR016: '', // 补水泵故障
                TDABR003: '', // 二次板换压差低限报警
                PRABR009: '', // 二次回水压力高限报警
                PRABR010: '', // 二次回水压力低限报警
                WLABR004: '', // 水箱液位高限报警
                WLABR005: '' // 水箱液位低限报警
            }

        }
    },
    mounted () {
    },
    methods: {
        setupStatusButtons () {
            this.EQCBW002Change()
            this.EQCBW005Change()
        },
        EQCBW002Change () {
            /** 自动 */
            if (this.controlValue.EQCBW002 === '0') {
                this.settingStyle.textClass.PDTFW010 = 'enableText'
                this.settingStyle.disabledValue.PDTFW010 = false
                this.settingStyle.textClass.FQTFW002 = 'disableText'
                this.settingStyle.disabledValue.FQTFW002 = true
            }
            /** 手动 */
            else {
                this.settingStyle.textClass.PDTFW010 = 'disableText'
                this.settingStyle.disabledValue.PDTFW010 = true
                this.settingStyle.textClass.FQTFW002 = 'enableText'
                this.settingStyle.disabledValue.FQTFW002 = false
            }
        },

        EQCBW005Change () {
            /** 手动 */
            console.log(this.controlValue.EQCBW005)
            console.log(this.controlValue.EQCBW010)
            if (this.controlValue.EQCBW005 === '1' || this.controlValue.EQCBW010 === '1') {
                this.settingStyle.textClass.TETFW005 = 'disableText'
                this.settingStyle.disabledValue.TETFW005 = true

                this.controlValue.EQCBW006 = '0'
                this.settingStyle.disabledValue.EQCBW006 = true
                this.settingStyle.textClass.TETFW006 = 'disableText'
                this.settingStyle.disabledValue.TETFW006 = true

                this.controlValue.EQCBW007 = '0'
                this.settingStyle.disabledValue.EQCBW007 = true
                this.settingStyle.textClass.TETFW007 = 'disableText'
                this.settingStyle.disabledValue.TETFW007 = true

                this.controlValue.EQCBW008 = '0'
                this.settingStyle.disabledValue.EQCBW008 = true
                this.settingStyle.textClass.TETFW008 = 'disableText'
                this.settingStyle.disabledValue.TETFW008 = true

                this.settingStyle.textClass.VOTFW002 = 'enableText'
                this.settingStyle.disabledValue.VOTFW002 = false
            }
            /** 自动 */
            else {
                this.settingStyle.textClass.TETFW005 = 'enableText'
                this.settingStyle.disabledValue.TETFW005 = false

                this.controlValue.EQCBW006 = '0'
                this.settingStyle.disabledValue.EQCBW006 = false
                this.settingStyle.textClass.TETFW006 = 'disableText'
                this.settingStyle.disabledValue.TETFW006 = true

                this.controlValue.EQCBW007 = '0'
                this.settingStyle.disabledValue.EQCBW007 = false
                this.settingStyle.textClass.TETFW007 = 'disableText'
                this.settingStyle.disabledValue.TETFW007 = true

                this.controlValue.EQCBW008 = '0'
                this.settingStyle.disabledValue.EQCBW008 = false
                this.settingStyle.textClass.TETFW008 = 'disableText'
                this.settingStyle.disabledValue.TETFW008 = true

                this.settingStyle.textClass.VOTFW002 = 'disableText'
                this.settingStyle.disabledValue.VOTFW002 = true
            }
        },
        handleChangeA () {
            if (this.controlValue.EQCBW006 === '1' || this.controlValue.EQCBW012 === '1') {
                this.settingStyle.textClass.TETFW005 = 'disableText'
                this.settingStyle.disabledValue.TETFW005 = true

                this.settingStyle.textClass.TETFW006 = 'enableText'
                this.settingStyle.disabledValue.TETFW006 = false
                this.settingStyle.textClass.TETFW010 = 'enableText'
                this.settingStyle.disabledValue.TETFW010 = false

                this.controlValue.EQCBW007 = '0'
                this.controlValue.EQCBW013 = '0'

                this.settingStyle.textClass.TETFW007 = 'disableText'
                this.settingStyle.disabledValue.TETFW007 = true
                this.settingStyle.textClass.TETFW011 = 'disableText'
                this.settingStyle.disabledValue.TETFW011 = true

                this.controlValue.EQCBW008 = '0'
                this.controlValue.EQCBW014 = '0'

                this.settingStyle.textClass.TETFW008 = 'disableText'
                this.settingStyle.disabledValue.TETFW008 = true
                this.settingStyle.textClass.TETFW012 = 'disableText'
                this.settingStyle.disabledValue.TETFW012 = true
            } else {
                this.controlValue.EQCBW006 = '0'
                this.controlValue.EQCBW012 = '0'
                this.settingStyle.textClass.TETFW006 = 'disableText'
                this.settingStyle.disabledValue.TETFW006 = true
                this.settingStyle.textClass.TETFW010 = 'disableText'
                this.settingStyle.disabledValue.TETFW010 = true
                this.settingStyle.textClass.TETFW005 = 'enableText'
                this.settingStyle.disabledValue.TETFW005 = false
            }
        },
        handleChangeB () {
            if (this.controlValue.EQCBW007 === '1' || this.controlValue.EQCBW013 === '1') {
                this.settingStyle.textClass.TETFW005 = 'disableText'
                this.settingStyle.disabledValue.TETFW005 = true

                this.controlValue.EQCBW006 = '0'
                this.controlValue.EQCBW012 = '0'
                this.settingStyle.textClass.TETFW006 = 'disableText'
                this.settingStyle.disabledValue.TETFW006 = true
                this.settingStyle.textClass.TETFW010 = 'disableText'
                this.settingStyle.disabledValue.TETFW010 = true

                this.settingStyle.textClass.TETFW007 = 'enableText'
                this.settingStyle.disabledValue.TETFW007 = false
                this.settingStyle.textClass.TETFW011 = 'enableText'
                this.settingStyle.disabledValue.TETFW011 = false

                this.controlValue.EQCBW008 = '0'
                this.controlValue.EQCBW014 = '0'
                this.settingStyle.textClass.TETFW008 = 'disableText'
                this.settingStyle.disabledValue.TETFW008 = true
                this.settingStyle.textClass.TETFW012 = 'disableText'
                this.settingStyle.disabledValue.TETFW012 = true
            } else {
                this.controlValue.EQCBW007 = '0'
                this.controlValue.EQCBW013 = '0'
                this.settingStyle.textClass.TETFW007 = 'disableText'
                this.settingStyle.disabledValue.TETFW007 = true
                this.settingStyle.textClass.TETFW011 = 'disableText'
                this.settingStyle.disabledValue.TETFW011 = true
                this.settingStyle.textClass.TETFW005 = 'enableText'
                this.settingStyle.disabledValue.TETFW005 = false
            }
        },
        handleChangeC () {
            if (this.controlValue.EQCBW008 === '1' || this.controlValue.EQCBW014 === '1') {
                this.settingStyle.textClass.TETFW005 = 'disableText'
                this.settingStyle.disabledValue.TETFW005 = true

                this.controlValue.EQCBW006 = '0'
                this.controlValue.EQCBW012 = '0'
                this.settingStyle.textClass.TETFW006 = 'disableText'
                this.settingStyle.disabledValue.TETFW006 = true
                this.settingStyle.textClass.TETFW010 = 'disableText'
                this.settingStyle.disabledValue.TETFW010 = true

                this.controlValue.EQCBW007 = '0'
                this.controlValue.EQCBW013 = '0'
                this.settingStyle.textClass.TETFW007 = 'disableText'
                this.settingStyle.disabledValue.TETFW007 = true
                this.settingStyle.textClass.TETFW011 = 'disableText'
                this.settingStyle.disabledValue.TETFW011 = true

                this.settingStyle.textClass.TETFW008 = 'enableText'
                this.settingStyle.disabledValue.TETFW008 = false
                this.settingStyle.textClass.TETFW012 = 'enableText'
                this.settingStyle.disabledValue.TETFW012 = false
            } else {
                this.controlValue.EQCBW008 = '0'
                this.controlValue.EQCBW014 = '0'
                this.settingStyle.textClass.TETFW008 = 'disableText'
                this.settingStyle.disabledValue.TETFW008 = true
                this.settingStyle.textClass.TETFW012 = 'disableText'
                this.settingStyle.disabledValue.TETFW012 = true
                this.settingStyle.textClass.TETFW005 = 'enableText'
                this.settingStyle.disabledValue.TETFW005 = false
            }
        },
        displayControlButtons () {
            this.EQCBW002Change()
            /** 如果是电调阀控制 */
            if (this.controlParameter === 'EQCBW005') {
                /** 如果电调阀控制为手动 */
                if (this.controlValue.EQCBW005 === '1') {
                    /** 二出温度设定无效 */
                    this.settingStyle.textClass.TETFW005 = 'disableText'
                    this.settingStyle.disabledValue.TETFW005 = true
                    /** 算法A无效 */
                    this.controlValue.EQCBW006 = '0'
                    this.settingStyle.disabledValue.EQCBW006 = true
                    this.settingStyle.textClass.TETFW006 = 'disableText'
                    this.settingStyle.disabledValue.TETFW006 = true
                    /** 算法B无效 */
                    this.controlValue.EQCBW007 = '0'
                    this.settingStyle.disabledValue.EQCBW007 = true
                    this.settingStyle.textClass.TETFW007 = 'disableText'
                    this.settingStyle.disabledValue.TETFW007 = true
                    /** 算法C无效 */
                    this.controlValue.EQCBW008 = '0'
                    this.settingStyle.disabledValue.EQCBW008 = true
                    this.settingStyle.textClass.TETFW008 = 'disableText'
                    this.settingStyle.disabledValue.TETFW008 = true
                    /** 电调阀开度设定有效 */
                    this.settingStyle.textClass.VOTFW002 = 'enableText'
                    this.settingStyle.disabledValue.VOTFW002 = false
                }
                /** 如果电调阀控制为自动 */
                else {
                    /** 如果算法A/B/C没有上线，二出温度设定有效 */
                    if (this.controlValue.EQCBW006 === '0' && this.controlValue.EQCBW007 === '0' && this.controlValue.EQCBW008 === '0') {
                        /** 二出温度设定有效 */
                        this.settingStyle.textClass.TETFW005 = 'enableText'
                        this.settingStyle.disabledValue.TETFW005 = false
                        /** 算法A按钮有效，设定值无效 */
                        this.controlValue.EQCBW006 = '0'
                        this.settingStyle.disabledValue.EQCBW006 = false
                        this.settingStyle.textClass.TETFW006 = 'disableText'
                        this.settingStyle.disabledValue.TETFW006 = true
                        /** 算法B按钮有效，设定值无效 */
                        this.controlValue.EQCBW007 = '0'
                        this.settingStyle.disabledValue.EQCBW007 = false
                        this.settingStyle.textClass.TETFW007 = 'disableText'
                        this.settingStyle.disabledValue.TETFW007 = true
                        /** 算法C按钮有效，设定值无效 */
                        this.controlValue.EQCBW008 = '0'
                        this.settingStyle.disabledValue.EQCBW008 = false
                        this.settingStyle.textClass.TETFW008 = 'disableText'
                        this.settingStyle.disabledValue.TETFW008 = true
                    }
                    /** 如果算法A上线，算法A设定有效，二出温度设定无效，算法B/C下线，算法B/C设定无效 */
                    if (this.controlValue.EQCBW006 === '1') {
                        /** 算法A按钮有效，设定值无效 */
                        this.controlValue.EQCBW006 = '1'
                        this.settingStyle.disabledValue.EQCBW006 = false
                        this.settingStyle.textClass.TETFW006 = 'enableText'
                        this.settingStyle.disabledValue.TETFW006 = false
                        /** 算法B按钮有效，设定值无效 */
                        this.controlValue.EQCBW007 = '0'
                        this.settingStyle.disabledValue.EQCBW007 = false
                        this.settingStyle.textClass.TETFW007 = 'disableText'
                        this.settingStyle.disabledValue.TETFW007 = true
                        /** 算法C按钮有效，设定值无效 */
                        this.controlValue.EQCBW008 = '0'
                        this.settingStyle.disabledValue.EQCBW008 = false
                        this.settingStyle.textClass.TETFW008 = 'disableText'
                        this.settingStyle.disabledValue.TETFW008 = true
                    }
                    /** 如果算法B上线，算法B设定有效，二出温度设定无效，算法A/C下线，算法A/C设定无效 */
                    if (this.controlValue.EQCBW007 === '1') {
                        /** 算法A按钮有效，设定值无效 */
                        this.controlValue.EQCBW006 = '0'
                        this.settingStyle.disabledValue.EQCBW006 = false
                        this.settingStyle.textClass.TETFW006 = 'disableText'
                        this.settingStyle.disabledValue.TETFW006 = true
                        /** 算法B按钮有效，设定值无效 */
                        this.controlValue.EQCBW007 = '1'
                        this.settingStyle.disabledValue.EQCBW007 = false
                        this.settingStyle.textClass.TETFW007 = 'enableText'
                        this.settingStyle.disabledValue.TETFW007 = false
                        /** 算法C按钮有效，设定值无效 */
                        this.controlValue.EQCBW008 = '0'
                        this.settingStyle.disabledValue.EQCBW008 = false
                        this.settingStyle.textClass.TETFW008 = 'disableText'
                        this.settingStyle.disabledValue.TETFW008 = true
                    }
                    /** 如果算法C上线，算法C设定有效，二出温度设定无效，算法B/C下线，算法B/C设定无效 */
                    if (this.controlValue.EQCBW008 === '1') {
                        /** 算法A按钮有效，设定值无效 */
                        this.controlValue.EQCBW006 = '0'
                        this.settingStyle.disabledValue.EQCBW006 = false
                        this.settingStyle.textClass.TETFW006 = 'disableText'
                        this.settingStyle.disabledValue.TETFW006 = true
                        /** 算法B按钮有效，设定值无效 */
                        this.controlValue.EQCBW007 = '0'
                        this.settingStyle.disabledValue.EQCBW007 = false
                        this.settingStyle.textClass.TETFW007 = 'disableText'
                        this.settingStyle.disabledValue.TETFW007 = true
                        /** 算法C按钮有效，设定值无效 */
                        this.controlValue.EQCBW008 = '1'
                        this.settingStyle.disabledValue.EQCBW008 = false
                        this.settingStyle.textClass.TETFW008 = 'enableText'
                        this.settingStyle.disabledValue.TETFW008 = false
                    }
                    /** 电调阀开度（二级泵频率）设定无效 */
                    this.settingStyle.textClass.VOTFW002 = 'disableText'
                    this.settingStyle.disabledValue.VOTFW002 = true
                }
            }
            /** 如果控制参数为二级泵 */
            else {
                /** 如果二级泵控制为手动 */
                if (this.controlValue.EQCBW010 === '1') {
                /** 二出温度设定无效 */
                    this.settingStyle.textClass.TETFW009 = 'disableText'
                    this.settingStyle.disabledValue.TETFW009 = true
                    /** 算法A无效 */
                    this.controlValue.EQCBW012 = '0'
                    this.settingStyle.disabledValue.EQCBW012 = true
                    this.settingStyle.textClass.TETFW010 = 'disableText'
                    this.settingStyle.disabledValue.TETFW010 = true
                    /** 算法B无效 */
                    this.controlValue.EQCBW013 = '0'
                    this.settingStyle.disabledValue.EQCBW013 = true
                    this.settingStyle.textClass.TETFW011 = 'disableText'
                    this.settingStyle.disabledValue.TETFW011 = true
                    /** 算法C无效 */
                    this.controlValue.EQCBW014 = '0'
                    this.settingStyle.disabledValue.EQCBW014 = true
                    this.settingStyle.textClass.TETFW012 = 'disableText'
                    this.settingStyle.disabledValue.TETFW012 = true
                    /** 电调阀开度设定有效 */
                    this.settingStyle.textClass.FQTFW004 = 'enableText'
                    this.settingStyle.disabledValue.FQTFW004 = false
                }
                /** 如果电调阀控制为自动 */
                else {
                /** 如果算法A/B/C没有上线，二出温度设定有效 */
                    if (this.controlValue.EQCBW012 === '0' && this.controlValue.EQCBW013 === '0' && this.controlValue.EQCBW014 === '0') {
                        /** 二出温度设定有效 */
                        this.settingStyle.textClass.TETFW009 = 'enableText'
                        this.settingStyle.disabledValue.TETFW009 = false
                        /** 算法A按钮有效，设定值无效 */
                        this.controlValue.EQCBW012 = '0'
                        this.settingStyle.disabledValue.EQCBW012 = false
                        this.settingStyle.textClass.TETFW010 = 'disableText'
                        this.settingStyle.disabledValue.TETFW010 = true
                        /** 算法B按钮有效，设定值无效 */
                        this.controlValue.EQCBW013 = '0'
                        this.settingStyle.disabledValue.EQCBW013 = false
                        this.settingStyle.textClass.TETFW011 = 'disableText'
                        this.settingStyle.disabledValue.TETFW011 = true
                        /** 算法C按钮有效，设定值无效 */
                        this.controlValue.EQCBW014 = '0'
                        this.settingStyle.disabledValue.EQCBW014 = false
                        this.settingStyle.textClass.TETFW012 = 'disableText'
                        this.settingStyle.disabledValue.TETFW012 = true
                    }
                    /** 如果算法A上线，算法A设定有效，二出温度设定无效，算法B/C下线，算法B/C设定无效 */
                    if (this.controlValue.EQCBW006 === '1') {
                        /** 算法A按钮有效，设定值无效 */
                        this.controlValue.EQCBW012 = '1'
                        this.settingStyle.disabledValue.EQCBW012 = false
                        this.settingStyle.textClass.TETFW010 = 'enableText'
                        this.settingStyle.disabledValue.TETFW010 = false
                        /** 算法B按钮有效，设定值无效 */
                        this.controlValue.EQCBW013 = '0'
                        this.settingStyle.disabledValue.EQCBW013 = false
                        this.settingStyle.textClass.TETFW011 = 'disableText'
                        this.settingStyle.disabledValue.TETFW011 = true
                        /** 算法C按钮有效，设定值无效 */
                        this.controlValue.EQCBW014 = '0'
                        this.settingStyle.disabledValue.EQCBW014 = false
                        this.settingStyle.textClass.TETFW012 = 'disableText'
                        this.settingStyle.disabledValue.TETFW012 = true
                    }
                    /** 如果算法B上线，算法B设定有效，二出温度设定无效，算法A/C下线，算法A/C设定无效 */
                    if (this.controlValue.EQCBW007 === '1') {
                        /** 算法A按钮有效，设定值无效 */
                        this.controlValue.EQCBW012 = '0'
                        this.settingStyle.disabledValue.EQCBW012 = false
                        this.settingStyle.textClass.TETFW010 = 'disableText'
                        this.settingStyle.disabledValue.TETFW010 = true
                        /** 算法B按钮有效，设定值无效 */
                        this.controlValue.EQCBW013 = '1'
                        this.settingStyle.disabledValue.EQCBW013 = false
                        this.settingStyle.textClass.TETFW011 = 'enableText'
                        this.settingStyle.disabledValue.TETFW011 = false
                        /** 算法C按钮有效，设定值无效 */
                        this.controlValue.EQCBW014 = '0'
                        this.settingStyle.disabledValue.EQCBW014 = false
                        this.settingStyle.textClass.TETFW012 = 'disableText'
                        this.settingStyle.disabledValue.TETFW012 = true
                    }
                    /** 如果算法C上线，算法C设定有效，二出温度设定无效，算法B/C下线，算法B/C设定无效 */
                    if (this.controlValue.EQCBW008 === '1') {
                        /** 算法A按钮有效，设定值无效 */
                        this.controlValue.EQCBW012 = '0'
                        this.settingStyle.disabledValue.EQCBW012 = false
                        this.settingStyle.textClass.TETFW010 = 'disableText'
                        this.settingStyle.disabledValue.TETFW010 = true
                        /** 算法B按钮有效，设定值无效 */
                        this.controlValue.EQCBW013 = '0'
                        this.settingStyle.disabledValue.EQCBW013 = false
                        this.settingStyle.textClass.TETFW011 = 'disableText'
                        this.settingStyle.disabledValue.TETFW011 = true
                        /** 算法C按钮有效，设定值无效 */
                        this.controlValue.EQCBW014 = '1'
                        this.settingStyle.disabledValue.EQCBW014 = false
                        this.settingStyle.textClass.TETFW012 = 'enableText'
                        this.settingStyle.disabledValue.TETFW012 = false
                    }
                    /** 二级泵频率设定无效 */
                    this.settingStyle.textClass.FQTFW004 = 'disableText'
                    this.settingStyle.disabledValue.FQTFW004 = true
                }
            }
        }
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
        padding-top: 10px;
        margin: 0px 0px 48px 0px;
        height: 760px;
        border-radius: 25px;
    }
    .VOMFR001 {
      position: absolute;
      right: 1042px;
      top: 148px;
      color: #FF0000;
      font-weight: bold;
      font-size: large;
    }
    .FQMFR003 {
        position: absolute;
        left: 130px;
        top: 148px;
        color: #FF0000;
        font-weight: bold;
        font-size: large;
    }
    .TEMFR001 {
        position: absolute;
        right: 827px;
        top: 134px;
        color: #FF0000;
        fontont-weight: bold;
        font-weight: bold;
        font-size: large;
    }
    .PRMFR001 {
        position: absolute;
        right: 827px;
        top: 164px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .TEMFR002 {
        position: absolute;
        right: 827px;
        top: 257px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .PRMFR002 {
        position: absolute;
        right: 827px;
        top: 288px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .TEMFR004 {
        position: absolute;
        right: 554px;
        top: 134px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .PRMFR004 {
        position: absolute;
        left: 645px;
        top: 164px;
      font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .TEMFR003 {
        position: absolute;
        right: 554px;
        top: 257px;
      font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .PRMFR003 {
        position: absolute;
        right: 554px;
        top: 290px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .FQMFR001 {
        position: absolute;
        right: 319px;
        top: 272px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .PRMFR013 {
        position: absolute;
        right: 135px;
        top: 288px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .PDMFC001 {
        position: absolute;
        right: 1047px;
        top: 287px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .TDMFC001 {
        position: absolute;
        right: 1047px;
        top: 316px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .FWMFR001 {
        position: absolute;
        right: 1047px;
        top: 348px;
      font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .FWMFR002 {
        position: absolute;
        right: 1002px;
        top: 410px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .HTMFR001 {
        position: absolute;
        right: 1047px;
        top: 380px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .HTMFR002 {
        position: absolute;
        right: 1002px;
        top: 441px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .PDMFC002 {
        position: absolute;
        right: 301px;
        top: 30px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .TDMFC002 {
        position: absolute;
        right: 301px;
        top: 61px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .FWMFR003 {
        position: absolute;
        right: 301px;
        top: 92px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .FWMFR004 {
        position: absolute;
        right: 254px;
        top: 156px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .HTMFR003 {
        position: absolute;
        right: 301px;
        top: 125px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .HTMFR004 {
        position: absolute;
        right: 254px;
        top: 188px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .PRMFR014 {
        position: absolute;
        left: 410px;
        top: 512px;
      font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .WLMFR001 {
        position: absolute;
        right: 560px;
        top: 508px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .FQMFR005 {
        position: absolute;
        right: 322px;
        top: 647px;
        font-weight: bold;
        color: #FF0000;
        font-size: large;
    }
    .EQSBR001 {
      position: absolute;
      left: 850px;
      top: 308px;
      font-weight: bold;
      color: #FF0000;
      font-size: large;
    }
    .EQSBR016 {
      position: absolute;
      left: 850px;
      top: 684px;
      font-weight: bold;
      color: #FF0000;
      font-size: large;
    }
    .EQSBR009 {
      position: absolute;
      left: 107px;
      top: 184px;
      font-weight: bold;
      color: #FF0000;
      font-size: large;
    }
    .leftTitle {
      font-size: 16px;
      height: 35px;
    }

    .enableText {
      background-color: #FFFFFF;
      disabled: false;
    }
    .disableText {
      background-color: #CCCCCC;
      disabled: true;
    }

</style>
