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
      <div style="width:100%;height:1562px">
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
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW001" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr><tr style="height:10px"></tr>
                  <td width="10%"></td>
                  </tr>
                  <tr>
                    <td class="leftTitle">启动温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW003" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>

                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW004" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">停炉温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW005" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">出口水温高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW006" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">出口水压高限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW006" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">出口水压低限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW007" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">炉膛烟温高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW010" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">炉膛烟压高限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW012" class="textField" style="width:100%"></a-input-number></td>
                    <td>kPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW014" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">流量低限设定</td>
                    <td ><a-input-number v-model="settingValue.FWTFW007" class="textField" style="width:100%"></a-input-number></td>
                    <td>t/h</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">启闭阀1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW014" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>

                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW005" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr><tr style="height:10px"></tr>
                  <td width="10%"></td>
                  </tr>
                  <tr>
                    <td class="leftTitle">启动温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW019" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>

                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW020" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">停炉温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW021" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">出口水温高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW022" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">出口水压高限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW019" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">出口水压低限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW020" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">炉膛烟温高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW026" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">炉膛烟压高限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW025" class="textField" style="width:100%"></a-input-number></td>
                    <td>kPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW030" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">流量低限设定</td>
                    <td ><a-input-number v-model="settingValue.FWTFW011" class="textField" style="width:100%"></a-input-number></td>
                    <td>t/h</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">启闭阀2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW016" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW010" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr><tr style="height:10px"></tr>
                  </tr>
                  <tr>
                    <td class="leftTitle">启动温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW035" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>

                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW036" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">停炉温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW037" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">出口水温高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW038" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">出口水压高限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW032" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">出口水压低限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW033" class="textField" style="width:100%"></a-input-number></td>
                    <td>MPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">炉膛烟温高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW042" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">炉膛烟压高限设定</td>
                    <td ><a-input-number v-model="settingValue.PRTFW038" class="textField" style="width:100%"></a-input-number></td>
                    <td>kPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW046" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">流量低限设定</td>
                    <td ><a-input-number v-model="settingValue.FWTFW015" class="textField" style="width:100%"></a-input-number></td>
                    <td>t/h</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">启闭阀3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW018" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
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
            <div class="TEMFR013">{{ monitoringValue.TEMFR013 }}</div>
            <div class="PRMFR015">{{ monitoringValue.PRMFR015 }}</div>
            <div class="TEMFR015">{{ monitoringValue.TEMFR015 }}</div>
            <div class="PRMFR016">{{ monitoringValue.PRMFR016 }}</div>
            <div class="TEMFR002">{{ monitoringValue.TEMFR002 }}</div>
            <div class="PRMFR005">{{ monitoringValue.PRMFR005 }}</div>
            <div class="TEMFR001">{{ monitoringValue.TEMFR001 }}</div>
            <div class="PRMFR004">{{ monitoringValue.PRMFR004 }}</div>
            <div class="TEMFR007">{{ monitoringValue.TEMFR007 }}</div>
            <div class="PRMFR008">{{ monitoringValue.PRMFR008 }}</div>
            <div class="TEMFR009">{{ monitoringValue.TEMFR009 }}</div>
            <div class="PRMFR011">{{ monitoringValue.PRMFR011 }}</div>
            <div class="TEMFR011">{{ monitoringValue.TEMFR011 }}</div>
            <div class="PRMFR013">{{ monitoringValue.PRMFR013 }}</div>
            <div class="FWMFR008">{{ monitoringValue.FWMFR008 }}</div>
            <div class="FWMFR010">{{ monitoringValue.FWMFR010 }}</div>

            <div class="TEMFR029">{{ monitoringValue.TEMFR029 }}</div>
            <div class="PRMFR028">{{ monitoringValue.PRMFR028 }}</div>
            <div class="TEMFR031">{{ monitoringValue.TEMFR031 }}</div>
            <div class="PRMFR029">{{ monitoringValue.PRMFR029 }}</div>
            <div class="TEMFR018">{{ monitoringValue.TEMFR018 }}</div>
            <div class="PRMFR018">{{ monitoringValue.PRMFR018 }}</div>
            <div class="TEMFR017">{{ monitoringValue.TEMFR017 }}</div>
            <div class="PRMFR017">{{ monitoringValue.PRMFR017 }}</div>
            <div class="TEMFR025">{{ monitoringValue.TEMFR025 }}</div>
            <div class="PRMFR024">{{ monitoringValue.PRMFR024 }}</div>
            <div class="TEMFR023">{{ monitoringValue.TEMFR023 }}</div>
            <div class="PRMFR021">{{ monitoringValue.PRMFR021 }}</div>
            <div class="TEMFR027">{{ monitoringValue.TEMFR027 }}</div>
            <div class="PRMFR026">{{ monitoringValue.PRMFR026 }}</div>
            <div class="FWMFR012">{{ monitoringValue.FWMFR012 }}</div>
            <div class="FWMFR014">{{ monitoringValue.FWMFR014 }}</div>

            <div class="TEMFR045">{{ monitoringValue.TEMFR045 }}</div>
            <div class="PRMFR041">{{ monitoringValue.PRMFR041 }}</div>
            <div class="TEMFR047">{{ monitoringValue.TEMFR047 }}</div>
            <div class="PRMFR042">{{ monitoringValue.PRMFR042 }}</div>
            <div class="TEMFR034">{{ monitoringValue.TEMFR034 }}</div>
            <div class="PRMFR031">{{ monitoringValue.PRMFR031 }}</div>
            <div class="TEMFR033">{{ monitoringValue.TEMFR033 }}</div>
            <div class="PRMFR030">{{ monitoringValue.PRMFR030 }}</div>
            <div class="TEMFR041">{{ monitoringValue.TEMFR041 }}</div>
            <div class="PRMFR037">{{ monitoringValue.PRMFR037 }}</div>
            <div class="TEMFR039">{{ monitoringValue.TEMFR039 }}</div>
            <div class="PRMFR034">{{ monitoringValue.PRMFR034 }}</div>
            <div class="TEMFR043">{{ monitoringValue.TEMFR043 }}</div>
            <div class="PRMFR039">{{ monitoringValue.PRMFR039 }}</div>
            <div class="FWMFR016">{{ monitoringValue.FWMFR016 }}</div>
            <div class="FWMFR018">{{ monitoringValue.FWMFR018 }}</div>

            <div class="EQSBR002">
              <img v-if="statusValue.EQSBR002 === 1" src="~@/assets/realtime/boilerrun.png" alt="logo" style="width:184px; height:50px ">
              <img v-if="statusValue.EQSBR002 === 0" src="~@/assets/realtime/boilerstop.png" alt="logo" style="width:184px; height:50px ">
              <img v-if="statusValue.EQSBR002 === 99" src="~@/assets/realtime/boileralarm.png" alt="logo" style="width:184px; height:50px ">
            </div>
            <div class="EQSBR003">
              <img v-if="statusValue.EQSBR003 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR003 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR003 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR006">
              <img v-if="statusValue.EQSBR006 === 1" src="~@/assets/realtime/boilerrun.png" alt="logo" style="width:184px; height:50px ">
              <img v-if="statusValue.EQSBR006 === 0" src="~@/assets/realtime/boilerstop.png" alt="logo" style="width:184px; height:50px ">
              <img v-if="statusValue.EQSBR006 === 99" src="~@/assets/realtime/boileralarm.png" alt="logo" style="width:184px; height:50px ">
            </div>
            <div class="EQSBR008">
              <img v-if="statusValue.EQSBR008 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR008 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR008 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR011">
              <img v-if="statusValue.EQSBR011 === 1" src="~@/assets/realtime/boilerrun.png" alt="logo" style="width:184px; height:50px ">
              <img v-if="statusValue.EQSBR011 === 0" src="~@/assets/realtime/boilerstop.png" alt="logo" style="width:184px; height:50px ">
              <img v-if="statusValue.EQSBR011 === 99" src="~@/assets/realtime/boileralarm.png" alt="logo" style="width:184px; height:50px ">
              <img v-if="statusValue.EQSBR011 === 100" src="~@/assets/realtime/boilerinterrupt.png" alt="logo" style="width:184px; height:50px ">
            </div>
            <div class="EQSBR012">
              <img v-if="statusValue.EQSBR012 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR012 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR012 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR012 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>

            <div class="EQSBR015" v-if="statusValue.EQSBR015 === 1">开启</div>
            <div class="EQSBR015" v-if="statusValue.EQSBR015 === 0">关闭</div>
            <div class="EQSBR017" v-if="statusValue.EQSBR017 === 1">开启</div>
            <div class="EQSBR017" v-if="statusValue.EQSBR017 === 0">关闭</div>
            <div class="EQSBR019" v-if="statusValue.EQSBR019 === 1">开启</div>
            <div class="EQSBR019" v-if="statusValue.EQSBR019 === 0">关闭</div>
            <div class="FQMFR001">{{ monitoringValue.FQMFR001 }}</div>
            <div class="FQMFR012">{{ monitoringValue.FQMFR012 }}</div>
            <div class="FQMFR002">{{ monitoringValue.FQMFR002 }}</div>

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
    name: 'Source01240002',
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
            /** 1# */
                TEMFR013: '', // 出口烟温
                PRMFR015: '', // 出口烟压
                TEMFR015: '', // 排烟温度
                PRMFR016: '', // 排烟压力
                TEMFR001: '', // 节能进温
                PRMFR004: '', // 节能进压
                TEMFR007: '', // 出口温度
                PRMFR008: '', // 出口压力
                TEMFR002: '', // 进口温度
                PRMFR005: '', // 进口压力
                TEMFR009: '', // 进口风温
                PRMFR011: '', // 进口风压
                TEMFR011: '', // 炉膛烟温
                PRMFR013: '', // 炉膛烟压
                FWMFR008: '', // 瞬时流量
                FWMFR010: '', // 积累流量

                TEMFR029: '', //  出口烟温
                PRMFR028: '', //  出口烟压
                TEMFR031: '', // 排烟温度
                PRMFR029: '', // 排烟压力
                TEMFR018: '', // 出口温度
                PRMFR018: '', // 出口压力
                TEMFR017: '', // 节能进温
                PRMFR017: '', // 节能进压
                TEMFR025: '', // 进口风温
                PRMFR024: '', // 进口风压
                TEMFR023: '', // 出口温度
                PRMFR021: '', // 出口压力
                TEMFR027: '', //  炉膛烟温
                PRMFR026: '', // 炉膛烟压
                FWMFR012: '', // 瞬时流量
                FWMFR014: '', // 积累流量

                TEMFR045: '', //  出口烟温
                PRMFR041: '', // 出口烟压
                TEMFR047: '', // 排烟温度
                PRMFR042: '', // 排烟压力
                TEMFR034: '', // 出口温度
                PRMFR031: '', // 出口压力
                TEMFR033: '', // 节能进温
                PRMFR030: '', // 节能进压
                TEMFR041: '', // 进口风温
                PRMFR037: '', // 进口风压
                TEMFR039: '', // 出口温度
                PRMFR034: '', // 出口压力
                TEMFR043: '', // 炉膛烟温
                PRMFR039: '', // 炉膛烟压
                FWMFR016: '', // 瞬时流量
                FWMFR018: '', // 积累流量

                FQMFR001: '', // 运行频率
                FQMFR012: '', // 运行频率
                FQMFR002: '' // 运行频率
            },
            controlValue: {
                EQCBW001: '', // 锅炉1# 停止 启动
                EQCBW014: '', // 启闭阀2# 关闭 开启
                EQCBW005: '', // 锅炉2# 停止 启动
                EQCBW016: '', // 启闭阀1# 关闭 开启
                EQCBW010: '', // 锅炉3# 停止 启动
                EQCBW018: '' // 启闭3# 关闭 开启
            },
            statusValue: {
                EQSBR003: '', // 鼓风机状态
                EQSBR008: '', // 鼓风机状态
                EQSBR012: '', // 鼓风机状态
                EQSBR002: '', // 锅炉状态
                EQSBR006: '', // 锅炉状态
                EQSBR011: '', // 锅炉状态
                EQSBR015: '', // 阀门状态
                EQSBR017: '', // 阀门状态
                EQSBR019: '' // 阀门状态
            },
            settingValue: {
                TETFW003: '', // 启炉温度设定
                TETFW004: '', // 目标温度设定
                TETFW005: '', // 停炉温度设定
                TETFW006: '', // 出口水温高限设定
                PRTFW006: '', // 出口水压高限设定
                PRTFW007: '', // 出口水压低限设定
                TETFW010: '', // 炉膛烟温高限设定
                PRTFW012: '', // 炉膛烟压高限设定
                TETFW014: '', // 排烟温度高限设定
                FWTFW007: '', // 流量底限设定

                TETFW019: '', // 启炉温度设定
                TETFW020: '', // 目标温度设定
                TETFW021: '', // 停炉温度设定
                TETFW022: '', // 出口水温高限设定
                PRTFW019: '', // 出口水压高限设定
                PRTFW020: '', // 出口水压低限设定
                TETFW026: '', // 炉膛烟温高限设定
                PRTFW025: '', // 炉膛烟压高限设定
                TETFW030: '', // 排烟温度高限设定
                FWTFW011: '', // 流量底限设定

                TETFW035: '', // 启炉温度设定
                TETFW036: '', // 目标温度设定
                TETFW037: '', // 停炉温度设定
                TETFW038: '', // 出口水温高限设定
                PRTFW032: '', // 出口水压高限设定
                PRTFW033: '', // 出口水压低限设定
                TETFW042: '', // 炉膛烟温高限设定
                PRTFW038: '', // 炉膛烟压高限设
                TETFW046: '', // 排烟温度高限设定
                FWTFW015: '' // 流量底限设定

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
        height: 1512px;
        border-radius: 25px;
    }
    .TEMFR013{
      position: absolute;
      right: 691px;
      top: 25px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR015{
      position: absolute;
      right: 691px;
      top: 54px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR015{
      position: absolute;
      right: 296px;
      top: 25px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR016{
      position: absolute;
      right: 296px;
      top: 55px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR002{
      position: absolute;
      right: 570px;
      top: 145px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR005{
      position: absolute;
      right: 570px;
      top: 174px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR001{
      position: absolute;
      right: 300px;
      top: 145px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR004{
      position: absolute;
      right: 300px;
      top: 174px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR009{
      position: absolute;
      right: 1055px;
      top: 300px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR011{
      position: absolute;
      right: 1055px;
      top: 328px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR007{
      position: absolute;
      right: 300px;
      top: 269px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR008{
      position: absolute;
      right: 300px;
      top: 299px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR011{
      position: absolute;
      right: 730px;
      top: 374px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR013{
      position: absolute;
      right: 730px;
      top: 404px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR008{
      position: absolute;
      right: 448px;
      top: 359px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR010{
      position: absolute;
      right: 430px;
      top: 388px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }

    .TEMFR029{
      position: absolute;
      right: 691px;
      top: 524px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR028{
      position: absolute;
      right: 691px;
      top: 552px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR031{
      position: absolute;
      right: 296px;
      top: 523px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR029{
      position: absolute;
      right: 296px;
      top: 553px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR018{
      position: absolute;
      right: 570px;
      top: 645px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR018{
      position: absolute;
      right: 570px;
      top: 674px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR017{
      position: absolute;
      right: 300px;
      top: 645px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR017{
      position: absolute;
      right: 300px;
      top: 674px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR025{
      position: absolute;
      right: 1055px;
      top: 799px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR024{
      position: absolute;
      right: 1055px;
      top: 828px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR023{
      position: absolute;
      right: 300px;
      top: 768px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR021{
      position: absolute;
      right: 300px;
      top: 798px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR027{
      position: absolute;
      right: 730px;
      top: 873px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR026{
      position: absolute;
      right: 730px;
      top: 903px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR012{
      position: absolute;
      right: 448px;
      top: 859px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR014{
      position: absolute;
      right: 430px;
      top: 889px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR045{
      position: absolute;
      right: 691px;
      top: 1024px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR041{
      position: absolute;
      right: 691px;
      top: 1052px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR047{
      position: absolute;
      right: 296px;
      top: 1023px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR042{
      position: absolute;
      right: 296px;
      top: 1053px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR034{
      position: absolute;
      right: 570px;
      top: 1144px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR031{
      position: absolute;
      right: 570px;
      top: 1174px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR033{
      position: absolute;
      right: 300px;
      top: 1144px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR030{
      position: absolute;
      right: 300px;
      top: 1174px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR041{
      position: absolute;
      right: 1055px;
      top: 1298px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR037{
      position: absolute;
      right: 1055px;
      top: 1327px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR039{
      position: absolute;
      right: 300px;
      top: 1268px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR034{
      position: absolute;
      right: 300px;
      top: 1298px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR043{
      position: absolute;
      right: 730px;
      top: 1372px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR039{
      position: absolute;
      right: 730px;
      top: 1402px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR016{
      position: absolute;
      right: 448px;
      top: 1359px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FWMFR018{
      position: absolute;
      right: 430px;
      top: 1390px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR002{
      position: absolute;
      right: 680px;
      top: 278px;
    }
    .EQSBR003{
      position: absolute;
      right: 950px;
      top: 293px;
    }
    .EQSBR006{
      position: absolute;
      right:680px;
      top: 778px;
    }
    .EQSBR008{
      position: absolute;
      right: 950px;
      top: 793px;
    }
    .EQSBR011{
      position: absolute;
      right: 680px;
      top: 1278px;
    }
    .EQSBR012{
      position: absolute;
      right: 950px;
      top: 1293px;
    }
    .FQMFR001{
      position: absolute;
      right: 942px;
      top: 247px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR012{
      position: absolute;
      right: 942px;
      top: 747px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR002{
      position: absolute;
      right: 942px;
      top: 1247px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR015{
      position: absolute;
      right: 53px;
      top: 282px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR017{
      position: absolute;
      right: 53px;
      top: 782px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .EQSBR019{
      position: absolute;
      right: 53px;
      top: 1282px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }

</style>
