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
      <div style="width:100%;height:2000px">
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
                    <td width="50%" class="leftTitle">污水侧阀1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW016" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">中间侧阀1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW024" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">蒸发侧阀1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW058" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">冷凝侧阀1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW060" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">热泵1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW056" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">热泵1#出水温度设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.TETFW026" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">℃</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">污水侧阀2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW018" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">中间侧阀2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW026" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">蒸发侧阀2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW088" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">冷凝侧阀2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW090" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">热泵2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW086" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">热泵2#出水温度设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.TETFW040" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">℃</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">污水侧阀3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW020" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">中间侧阀3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW028" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">蒸发侧阀3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW118" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">冷凝侧阀3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW120" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">热泵3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW116" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">热泵3#出水温度设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.TETFW054" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">℃</td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">污水侧阀4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW022" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">中间侧阀4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW030" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:300px"></tr>
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
            <div class="TEMFR003">{{ monitoringValue.TEMFR003 }}</div>
            <div class="PRMFR003">{{ monitoringValue.PRMFR003 }}</div>
            <div class="TEMFR004">{{ monitoringValue.TEMFR004 }}</div>
            <div class="PRMFR004">{{ monitoringValue.PRMFR004 }}</div>
            <div class="TEMFR022">{{ monitoringValue.TEMFR022 }}</div>
            <div class="PRMFR021">{{ monitoringValue.PRMFR021 }}</div>
            <div class="TEMFR023">{{ monitoringValue.TEMFR023 }}</div>
            <div class="PRMFR022">{{ monitoringValue.PRMFR022 }}</div>
            <div class="TEMFR025">{{ monitoringValue.TEMFR025 }}</div>
            <div class="PRMFR024">{{ monitoringValue.PRMFR024 }}</div>
            <div class="TEMFR024">{{ monitoringValue.TEMFR024 }}</div>
            <div class="PRMFR023">{{ monitoringValue.PRMFR023 }}</div>
            <div class="PRMFR019">{{ monitoringValue.PRMFR019 }}</div>
            <div class="PRMFR020">{{ monitoringValue.PRMFR020 }}</div>
            <div class="TEMFR005">{{ monitoringValue.TEMFR005 }}</div>
            <div class="PRMFR005">{{ monitoringValue.PRMFR005 }}</div>
            <div class="TEMFR006">{{ monitoringValue.TEMFR006 }}</div>
            <div class="PRMFR006">{{ monitoringValue.PRMFR006 }}</div>
            <div class="TEMFR036">{{ monitoringValue.TEMFR036 }}</div>
            <div class="PRMFR033">{{ monitoringValue.PRMFR033 }}</div>
            <div class="TEMFR037">{{ monitoringValue.TEMFR037 }}</div>
            <div class="PRMFR034">{{ monitoringValue.PRMFR034 }}</div>
            <div class="TEMFR038">{{ monitoringValue.TEMFR038 }}</div>
            <div class="PRMFR035">{{ monitoringValue.PRMFR035 }}</div>
            <div class="TEMFR039">{{ monitoringValue.TEMFR039 }}</div>
            <div class="PRMFR036">{{ monitoringValue.PRMFR036 }}</div>
            <div class="PRMFR031">{{ monitoringValue.PRMFR031 }}</div>
            <div class="PRMFR032">{{ monitoringValue.PRMFR032 }}</div>
            <div class="CRMFR018">{{ monitoringValue.CRMFR018 }}</div>
            <div class="CRMFR021">{{ monitoringValue.CRMFR021 }}</div>
            <div class="TEMFR007">{{ monitoringValue.TEMFR007 }}</div>
            <div class="PRMFR007">{{ monitoringValue.PRMFR007 }}</div>
            <div class="TEMFR008">{{ monitoringValue.TEMFR008 }}</div>
            <div class="PRMFR008">{{ monitoringValue.PRMFR008 }}</div>
            <div class="TEMFR050">{{ monitoringValue.TEMFR050 }}</div>
            <div class="PRMFR045">{{ monitoringValue.PRMFR045 }}</div>
            <div class="TEMFR051">{{ monitoringValue.TEMFR051 }}</div>
            <div class="PRMFR046">{{ monitoringValue.PRMFR046 }}</div>
            <div class="TEMFR052">{{ monitoringValue.TEMFR052 }}</div>
            <div class="PRMFR047">{{ monitoringValue.PRMFR047 }}</div>
            <div class="TEMFR053">{{ monitoringValue.TEMFR053 }}</div>
            <div class="PRMFR048">{{ monitoringValue.PRMFR048 }}</div>
            <div class="PRMFR043">{{ monitoringValue.PRMFR043 }}</div>
            <div class="PRMFR044">{{ monitoringValue.PRMFR044 }}</div>
            <div class="CRMFR024">{{ monitoringValue.CRMFR024 }}</div>
            <div class="TEMFR009">{{ monitoringValue.TEMFR009 }}</div>
            <div class="PRMFR009">{{ monitoringValue.PRMFR009 }}</div>
            <div class="TEMFR010">{{ monitoringValue.TEMFR010 }}</div>
            <div class="PRMFR010">{{ monitoringValue.PRMFR010 }}</div>
            <div class="VOMFR001">{{ monitoringValue.VOMFR001 }}</div>
            <div class="VOMFR002">{{ monitoringValue.VOMFR002 }}</div>
            <div class="VOMFR003">{{ monitoringValue.VOMFR003 }}</div>

            <div class="EQSBR039" v-if="statusValue.EQSBR039 === 1">远方</div>
            <div class="EQSBR039" v-if="statusValue.EQSBR039 === 0">本地</div>
            <div class="EQSBR032" v-if="statusValue.EQSBR032 === 1">是</div>
            <div class="EQSBR032" v-if="statusValue.EQSBR032 === 0">否</div>
            <div class="EQSBR033" v-if="statusValue.EQSBR033 === 1">是</div>
            <div class="EQSBR033" v-if="statusValue.EQSBR033 === 0">否</div>
            <div class="EQSBR034" v-if="statusValue.EQSBR034 === 1">是</div>
            <div class="EQSBR034" v-if="statusValue.EQSBR034 === 0">否</div>
            <div class="EQSBR035" v-if="statusValue.EQSBR035 === 1">是</div>
            <div class="EQSBR035" v-if="statusValue.EQSBR035 === 0">否</div>

            <div class="EQSBR017" v-if="statusValue.EQSBR017 === 1">开启</div>
            <div class="EQSBR017" v-if="statusValue.EQSBR017 === 0">关闭</div>
            <div class="EQSBR025" v-if="statusValue.EQSBR025 === 1">开启</div>
            <div class="EQSBR025" v-if="statusValue.EQSBR025 === 0">关闭</div>
            <div class="EQSBR059" v-if="statusValue.EQSBR059 === 1">开启</div>
            <div class="EQSBR059" v-if="statusValue.EQSBR059 === 0">关闭</div>
            <div class="EQSBR061" v-if="statusValue.EQSBR061 === 1">开启</div>
            <div class="EQSBR061" v-if="statusValue.EQSBR061 === 0">关闭</div>
            <div class="EQSBR019" v-if="statusValue.EQSBR019 === 1">开启</div>
            <div class="EQSBR019" v-if="statusValue.EQSBR019 === 0">关闭</div>
            <div class="EQSBR027" v-if="statusValue.EQSBR027 === 1">开启</div>
            <div class="EQSBR027" v-if="statusValue.EQSBR027 === 0">关闭</div>
            <div class="EQSBR089" v-if="statusValue.EQSBR089 === 1">开启</div>
            <div class="EQSBR089" v-if="statusValue.EQSBR089 === 0">关闭</div>
            <div class="EQSBR091" v-if="statusValue.EQSBR091 === 1">开启</div>
            <div class="EQSBR091" v-if="statusValue.EQSBR091 === 0">关闭</div>
            <div class="EQSBR021" v-if="statusValue.EQSBR021 === 1">开启</div>
            <div class="EQSBR021" v-if="statusValue.EQSBR021 === 0">关闭</div>
            <div class="EQSBR029" v-if="statusValue.EQSBR029 === 1">开启</div>
            <div class="EQSBR029" v-if="statusValue.EQSBR029 === 0">关闭</div>
            <div class="EQSBR119" v-if="statusValue.EQSBR119 === 1">开启</div>
            <div class="EQSBR119" v-if="statusValue.EQSBR119 === 0">关闭</div>
            <div class="EQSBR121" v-if="statusValue.EQSBR121 === 1">开启</div>
            <div class="EQSBR121" v-if="statusValue.EQSBR121 === 0">关闭</div>
            <div class="EQSBR023" v-if="statusValue.EQSBR023 === 1">开启</div>
            <div class="EQSBR023" v-if="statusValue.EQSBR023 === 0">关闭</div>
            <div class="EQSBR031" v-if="statusValue.EQSBR031 === 1">开启</div>
            <div class="EQSBR031" v-if="statusValue.EQSBR031 === 0">关闭</div>

            <div class="EQSBR069" v-if="statusValue.EQSBR069 === 1">远方</div>
            <div class="EQSBR069" v-if="statusValue.EQSBR069 === 0">本地</div>
            <div class="EQSBR062" v-if="statusValue.EQSBR062 === 1">是</div>
            <div class="EQSBR062" v-if="statusValue.EQSBR062 === 0">否</div>
            <div class="EQSBR063" v-if="statusValue.EQSBR063 === 1">是</div>
            <div class="EQSBR063" v-if="statusValue.EQSBR063 === 0">否</div>
            <div class="EQSBR065" v-if="statusValue.EQSBR065 === 1">是</div>
            <div class="EQSBR065" v-if="statusValue.EQSBR065 === 0">否</div>
            <div class="EQSBR064" v-if="statusValue.EQSBR064 === 1">是</div>
            <div class="EQSBR064" v-if="statusValue.EQSBR064 === 0">否</div>

            <div class="EQSBR099" v-if="statusValue.EQSBR099 === 1">远方</div>
            <div class="EQSBR099" v-if="statusValue.EQSBR099 === 0">本地</div>
            <div class="EQSBR092" v-if="statusValue.EQSBR092 === 1">是</div>
            <div class="EQSBR092" v-if="statusValue.EQSBR092 === 0">否</div>
            <div class="EQSBR093" v-if="statusValue.EQSBR093 === 1">是</div>
            <div class="EQSBR093" v-if="statusValue.EQSBR093 === 0">否</div>
            <div class="EQSBR095" v-if="statusValue.EQSBR095 === 1">是</div>
            <div class="EQSBR095" v-if="statusValue.EQSBR095 === 0">否</div>
            <div class="EQSBR094" v-if="statusValue.EQSBR094 === 1">是</div>
            <div class="EQSBR094" v-if="statusValue.EQSBR094 === 0">否</div>

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
    name: 'Source02110002',
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
                /** 参数名中的第三位为M的参数 */
                TEMFR004: '', // 1#中间出温
                PRMFR004: '', // 1#中间出压
                TEMFR003: '', // 1#退水温度
                PREFR003: '', // 1#退水压力
                PRMFR019: '', // 1#冷凝压力
                PRMFR020: '', // 1#蒸汽压力
                TEMFR022: '', // 1#蒸汽进温
                PRMFR021: '', // 1#蒸汽进压
                TEMFR023: '', // 1#蒸汽出温
                CRMFR018: '', // 1# 电机电流百分数
                PRMFR022: '', // 1#蒸汽出压
                PRMFR025: '', // 1#冷凝出压
                TEMFR024: '', // 1#冷凝进温
                PRMFR023: '', // 1#冷凝进压
                VOMFR001: '', // 1# 导叶开度

                /** 2# */
                TEMFR005: '', // 2#退水温度
                PRMFR005: '', // 2#退水压力
                TEMFR006: '', // 2#中间出压
                PRMFR006: '', // 2#中间出温
                TEMFR036: '', // 2#蒸汽进压
                PRMFR033: '', // 2#蒸汽进温
                TEMFR037: '', // 2#蒸汽出温
                PRMFR034: '', // 2#蒸汽出压
                PRMFR031: '', // 2#冷凝压力
                PRMFR032: '', // 2#蒸汽压力
                TEMFR039: '', // 2#冷凝出温
                PRMFR036: '', // 2#冷凝出压
                TEMFR038: '', // 2#冷凝进温
                PRMFR035: '', // 2#冷凝进压
                CRMFR021: '', // 2# 电机电流百分数
                VOMFR002: '', // 2# 导叶开度

                /** 3# */
                TEMFR007: '', // 3#退水温度
                PRMFR007: '', // 3#退水压力
                TEMFR008: '', // 3#中间出温
                PRMFR008: '', // 3#中间出压
                TEMFR050: '', // 3#蒸汽进温
                PRMFR045: '', // 3#蒸汽进压
                TEMFR051: '', // 3#蒸汽出温
                PRMFR046: '', // 3#蒸汽出压
                TEMFR053: '', // 3#冷凝出温
                PRMFR048: '', // 3#冷凝出压
                TEMFR052: '', // 3#冷凝进温
                PRMFR047: '', // 3#冷凝进压
                PRMFR043: '', // 3#冷凝压力
                PRMFR044: '', // 3#蒸汽压力
                CRMFR024: '', // 3# 电机电流百分数
                VOMFR003: '', // 3# 导叶开度

                /**  4# */
                TEMFR009: '', // 4#退水温度
                PRMFR009: '', // 4#退水压力
                TEMFR010: '', // 4#中间出温
                PRMFR010: '' // 4#中间出压

            },
            controlValue: {
                /** 参数名中的第三位为C的参数 */
                /** 1# */
                EQCBW016: '', // 1#污水侧阀
                EQCBW024: '', // 1#中间侧阀
                EQCBW058: '', // 1#蒸汽侧阀
                EQCBW060: '', // 1#冷凝侧阀
                EQCBW056: '', // 1#热泵

                /** 2# */
                EQCBW018: '', // 2#污水侧阀
                EQCBW026: '', // 2#中间侧阀
                EQCBW088: '', // 2#蒸汽侧阀
                EQCBW090: '', // 2#冷凝侧阀
                EQCBW085: '', // 2#热泵 停止
                EQCBW086: '', // 2#热泵 启动

                /** 3# */
                EQCBW020: '', // 3#污水侧阀
                EQCBW028: '', // 3#中间侧阀
                EQCBW118: '', // 3#蒸汽侧阀
                EQCBW120: '', // 3#冷凝侧阀
                EQCBW115: '', // 3#热泵 停止
                EQCBW116: '', // 3#热泵 启动

                /** 4# */
                EQCBW022: '', // 4#污水侧阀
                EQCBW030: '' // 4#中间侧阀

            },
            settingValue: {
                /** 参数名中的第三位为T的参数 */
                /** 1# */
                TETFW026: '', // 1#出水温度设定
                /** 2# */
                TETFW040: '', // 2##出水温度设定
                /** 3# */
                TETFW054: '' // 3#出水温度设定
            },
            statusValue: {
                /** 参数名中的第三位为S的参数 */
                /** 1# */
                EQSBR017: '', // 1#阀门状态
                EQSBR025: '', // 1#阀门状态
                EQSBR059: '', // 1#阀门状态
                EQSBR039: '', // 1# 远方/本地
                EQSBR032: '', // 1# 机组运行
                EQSBR033: '', // 1# 机组停机
                EQSBR035: '', // 1# 远方开机
                EQSBR034: '', // 1# 远方停机
                EQSBR061: '', // 1# 阀门状态

                /** 2# */
                EQSBR019: '', // 2# 阀门状态
                EQSBR027: '', // 2# 阀门状态
                EQSBR089: '', // 2# 阀门状态
                EQSBR069: '', // 2# 远方/本地
                EQSBR062: '', // 2# 机组运行
                EQSBR063: '', // 2# 机组停机
                EQSBR065: '', // 2# 远方开机
                EQSBR064: '', // 2# 远方停机
                EQSBR091: '', // 2# 阀门状态

                /** 3# */
                EQSBR021: '', // 3# 阀门状态
                EQSBR029: '', // 3# 阀门状态
                EQSBR119: '', // 3# 阀门状态
                EQSBR099: '', // 3# 远方/本地
                EQSBR092: '', // 3# 机组运行
                EQSBR093: '', // 3# 机组停机
                EQSBR095: '', // 3# 远方开机
                EQSBR094: '', // 3# 远方停机
                EQSBR121: '', // 3# 阀门状态

                /** 4# */
                EQSBR023: '', // 4# 阀门状态
                EQSBR031: '' // 4# 阀门状态
            },
            alarmValue: {
                /** 参数名中的第三位为A的参数 */
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
    height: 1990px;
    border-radius: 25px;
  }
  .TEMFR003{
    position: absolute;
    right: 1063px;
    top: 252px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR003{
    position: absolute;
    right: 1063px;
    top: 282px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR004{
    position: absolute;
    right: 808px;
    top: 129px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR004{
    position: absolute;
    right: 808px;
    top: 159px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR022{
    position: absolute;
    right: 554px;
    top: 214px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR021{
    position: absolute;
    right: 554px;
    top: 244px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR023{
    position: absolute;
    right: 554px;
    top: 338px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR022{
    position: absolute;
    right: 554px;
    top: 367px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR024{
    position: absolute;
    right: 57px;
    top: 340px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR023{
    position: absolute;
    right: 57px;
    top: 370px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR025{
    position: absolute;
    right: 57px;
    top: 132px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR024{
    position: absolute;
    right: 57px;
    top: 160px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR019{
    position: absolute;
    right: 421px;
    top: 421px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR020{
    position: absolute;
    right: 421px;
    top: 451px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR005{
    position: absolute;
    right: 1063px;
    top: 752px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR005{
    position: absolute;
    right: 1063px;
    top: 781px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR006{
    position: absolute;
    right: 808px;
    top: 628px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR006{
    position: absolute;
    right: 808px;
    top: 655px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR036{
    position: absolute;
    right: 554px;
    top: 712px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR033{
    position: absolute;
    right: 554px;
    top: 744px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR037{
    position: absolute;
    right: 554px;
    top: 836px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR034{
    position: absolute;
    right: 554px;
    top: 867px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR038{
    position: absolute;
    right: 57px;
    top: 839px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR035{
    position: absolute;
    right: 57px;
    top: 870px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR039{
    position: absolute;
    right: 57px;
    top: 632px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR036{
    position: absolute;
    right: 57px;
    top: 660px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR031{
    position: absolute;
    right: 421px;
    top: 917px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR032{
    position: absolute;
    right: 421px;
    top: 951px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CRMFR018{
    position: absolute;
    right: 145px;
    top: 451px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CRMFR021{
    position: absolute;
    right: 145px;
    top: 950px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR007{
    position: absolute;
    right: 1063px;
    top: 1251px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR007{
    position: absolute;
    right: 1063px;
    top: 1282px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR008{
    position: absolute;
    right: 808px;
    top: 1127px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR008{
    position: absolute;
    right: 808px;
    top: 1158px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR050{
    position: absolute;
    right: 554px;
    top: 1212px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR045{
    position: absolute;
    right: 554px;
    top: 1244px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR051{
    position: absolute;
    right: 554px;
    top: 1336px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR046{
    position: absolute;
    right: 554px;
    top: 1366px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR052{
    position: absolute;
    right: 57px;
    top: 1337px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR047{
    position: absolute;
    right: 57px;
    top: 1370px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR053{
    position: absolute;
    right: 57px;
    top: 1130px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR048{
    position: absolute;
    right: 57px;
    top: 1157px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR043{
    position: absolute;
    right: 421px;
    top: 1418px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR044{
    position: absolute;
    right: 421px;
    top: 1451px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CRMFR024{
    position: absolute;
    right: 145px;
    top: 1451px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR009{
    position: absolute;
    right: 1063px;
    top: 1750px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR009{
    position: absolute;
    right: 1063px;
    top: 1780px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR010{
    position: absolute;
    right: 808px;
    top: 1625px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR010{
    position: absolute;
    right: 808px;
    top: 1655px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR017{
    position: absolute;
    right: 1050px;
    top: 144px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR025{
    position: absolute;
    right: 794px;
    top: 266px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR039{
    position: absolute;
    right: 479px;
    top: 62px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR032{
    position: absolute;
    right: 323px;
    top: 62px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR033{
    position: absolute;
    right: 323px;
    top: 94px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR035{
    position: absolute;
    right: 166px;
    top: 62px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR034{
    position: absolute;
    right: 166px;
    top: 94px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR059{
    position: absolute;
    right: 556px;
    top: 141px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR061{
    position: absolute;
    right: 60px;
    top: 269px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .VOMFR001{
    position: absolute;
    right: 198px;
    top: 421px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR019{
    position: absolute;
    right: 1050px;
    top: 641px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR027{
    position: absolute;
    right: 794px;
    top: 766px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR069{
    position: absolute;
    right: 479px;
    top: 561px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR062{
    position: absolute;
    right: 323px;
    top: 562px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR063{
    position: absolute;
    right: 323px;
    top: 592px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR065{
    position: absolute;
    right: 166px;
    top: 562px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR064{
    position: absolute;
    right: 166px;
    top: 592px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR089{
    position: absolute;
    right: 559px;
    top: 640px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .VOMFR002{
    position: absolute;
    right: 198px;
    top: 920px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR091{
     position: absolute;
     right: 60px;
     top: 768px;
     color: #FF0000;
     font-size: large;
     font-weight: bold;
   }
  .EQSBR021{
    position: absolute;
    right: 1050px;
    top: 1140px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR029{
    position: absolute;
    right: 794px;
    top: 1265px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR099{
    position: absolute;
    right: 479px;
    top: 1060px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR092{
    position: absolute;
    right: 323px;
    top: 1060px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR093{
    position: absolute;
    right: 323px;
    top: 1093px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR095{
    position: absolute;
    right: 166px;
    top: 1060px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR094{
    position: absolute;
    right: 166px;
    top: 1093px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR119{
    position: absolute;
    right: 559px;
    top: 1140px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR121{
    position: absolute;
    right: 60px;
    top: 1266px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .VOMFR003{
    position: absolute;
    right: 198px;
    top: 1417px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR023{
    position: absolute;
    right: 1050px;
    top: 1641px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR031{
    position: absolute;
    right: 794px;
    top: 1766px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

</style>
