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
      <div style="width:100%;height:2550px">
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
                    <td class="leftTitle" colspan="2">旁通阀开度设定</td>
                    <td colspan="2"><a-input-number v-model="settingValue.VOTFW003" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle" width="5%">%</td>
                  </tr>
                  <tr style="height:450px"></tr>
                  <tr>
                    <td class="leftTitle" colspan="2">三通阀开度设定</td>
                    <td colspan="2"><a-input-number v-model="settingValue.VOTFW005" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle" width="5%">%</td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td class="leftTitle" colspan="2">旁通阀开度设定</td>
                    <td colspan="2"><a-input-number v-model="settingValue.VOTFW007" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle" width="5%">%</td>
                  </tr>
                  <tr style="height:450px"></tr>
                  <tr>
                    <td width="24%" class="leftTitle">制冷算法</td>
                    <td width="35%" align="left">
                      <a-radio-group v-model="controlValue.EQCBW004" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 下线 </a-radio-button>
                        <a-radio-button value="1"> 上线 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="20%" class="leftTitle">室温设定</td>
                    <td width="16%"><a-input-number v-model="settingValue.TETFW019" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle" width="5%">℃</td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">热泵1-1阀门V1</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW006" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td class="leftTitle"></td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">热泵1-1阀门V2</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW007" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td class="leftTitle"></td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">热泵1-1</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW008" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td class="leftTitle"></td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td class="leftTitle" colspan="2">热泵1-1制冷出水温度设定</td>
                    <td colspan="2"><a-input-number v-model="settingValue.TETFW027" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td class="leftTitle" colspan="2">热泵1-1制热出水温度设定</td>
                    <td colspan="2"><a-input-number v-model="settingValue.TETFW028" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr style="height:30px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">热泵1-2阀门V3</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW026" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td class="leftTitle"></td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">热泵1-2阀门V4</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW027" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td class="leftTitle"></td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">热泵1-2</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW028" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td class="leftTitle"></td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td class="leftTitle" colspan="2">热泵1-2制冷出水温度设定</td>
                    <td colspan="2"><a-input-number v-model="settingValue.TETFW038" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td class="leftTitle" colspan="2">热泵1-2制热出水温度设定</td>
                    <td colspan="2"><a-input-number v-model="settingValue.TETFW039" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr style="height:450px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">热泵2阀门V5</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW046" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td class="leftTitle"></td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">热泵2阀门V6</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW047" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td class="leftTitle"></td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td colspan="2" class="leftTitle">热泵2</td>
                    <td colspan="2" align="right">
                      <a-radio-group v-model="controlValue.EQCBW048" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td class="leftTitle"></td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td class="leftTitle" colspan="2">热泵2制冷出水温度设定</td>
                    <td colspan="2"><a-input-number v-model="settingValue.TETFW055" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr style="height:15px"></tr>
                  <tr>
                    <td class="leftTitle" colspan="2">热泵2制热出水温度设定</td>
                    <td colspan="2"><a-input-number v-model="settingValue.TETFW056" class="textField" style="width:100%"></a-input-number></td>
                    <td class="leftTitle">℃</td>
                  </tr>
                  <tr style="height:100px"></tr>
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
            <div class="TEMFR001">{{monitoringValue.TEMFR001}}</div>
            <div class="PRMFR003">{{monitoringValue.PRMFR003}} </div>
            <div class="TEMFR002">{{monitoringValue.TEMFR002}} </div>
            <div class="PRMFR004">{{monitoringValue.PRMFR004}} </div>
            <div class="TEMFR003">{{monitoringValue.TEMFR003}} </div>
            <div class="PRMFR005">{{monitoringValue.PRMFR005}} </div>
            <div class="TEMFR004">{{monitoringValue.TEMFR004}} </div>
            <div class="PRMFR006">{{monitoringValue.PRMFR006}} </div>
            <div class="VOMFR004">{{monitoringValue.VOMFR004}} </div>
            <div class="VOMFR006">{{monitoringValue.VOMFR006}} </div>
            <div class="TEMFR007">{{monitoringValue.TEMFR007}}</div>
            <div class="PRMFR009">{{monitoringValue.PRMFR009}} </div>
            <div class="TEMFR008">{{monitoringValue.TEMFR008}} </div>
            <div class="PRMFR010">{{monitoringValue.PRMFR010}} </div>
            <div class="VOMFR008">{{monitoringValue.VOMFR008}} </div>
            <div class="TEMFR011">{{monitoringValue.TEMFR011}} </div>
            <div class="PRMFR013">{{monitoringValue.PRMFR013}} </div>
            <div class="TEMFR014">{{monitoringValue.TEMFR014}} </div>
            <div class="PRMFR016">{{monitoringValue.PRMFR016}} </div>
            <div class="TEMFR012">{{monitoringValue.TEMFR012}} </div>
            <div class="PRMFR014">{{monitoringValue.PRMFR014}} </div>
            <div class="TEMFR013">{{monitoringValue.TEMFR013}} </div>
            <div class="PRMFR015">{{monitoringValue.PRMFR015}} </div>
            <div class="CRMFR004">{{monitoringValue.CRMFR004}} </div>
            <div class="CRMFR005">{{monitoringValue.CRMFR005}} </div>
            <div class="TEMFR025">{{monitoringValue.TEMFR025}} </div>
            <div class="TEMFR026">{{monitoringValue.TEMFR026}} </div>
            <div class="CAMFR001">{{monitoringValue.CAMFR001}} </div>
            <div class="CAMFR002">{{monitoringValue.CAMFR002}} </div>
            <div class="TEMFR020">{{monitoringValue.TEMFR020}} </div>
            <div class="TEMFR021">{{monitoringValue.TEMFR021}} </div>
            <div class="TEMFR023">{{monitoringValue.TEMFR023}} </div>
            <div class="TEMFR022">{{monitoringValue.TEMFR022}} </div>
            <div class="PRMFR021">{{monitoringValue.PRMFR021}} </div>
            <div class="PRMFR022">{{monitoringValue.PRMFR022}} </div>
            <div class="TEMFR024">{{monitoringValue.TEMFR024}} </div>
            <div class="TEMFR015">{{monitoringValue.TEMFR015}} </div>
            <div class="PRMFR017">{{monitoringValue.PRMFR017}} </div>
            <div class="TEMFR018">{{monitoringValue.TEMFR018}} </div>
            <div class="PRMFR020">{{monitoringValue.PRMFR020}} </div>
            <div class="TEMFR016">{{monitoringValue.TEMFR016}} </div>
            <div class="PRMFR018">{{monitoringValue.PRMFR018}} </div>
            <div class="TEMFR017">{{monitoringValue.TEMFR017}} </div>
            <div class="PRMFR019">{{monitoringValue.PRMFR019}} </div>
            <div class="CRMFR008">{{monitoringValue.CRMFR008}} </div>
            <div class="CRMFR009">{{monitoringValue.CRMFR009}} </div>
            <div class="TEMFR036">{{monitoringValue.TEMFR036}} </div>
            <div class="TEMFR037">{{monitoringValue.TEMFR037}} </div>
            <div class="CAMFR003">{{monitoringValue.CAMFR003}} </div>
            <div class="CAMFR004">{{monitoringValue.CAMFR004}} </div>
            <div class="TEMFR031">{{monitoringValue.TEMFR031}} </div>
            <div class="TEMFR032">{{monitoringValue.TEMFR032}} </div>
            <div class="TEMFR034">{{monitoringValue.TEMFR034}} </div>
            <div class="TEMFR033">{{monitoringValue.TEMFR033}} </div>
            <div class="PRMFR025">{{monitoringValue.PRMFR025}} </div>
            <div class="PRMFR026">{{monitoringValue.PRMFR026}} </div>
            <div class="TEMFR035">{{monitoringValue.TEMFR035}} </div>
            <div class="TEMFR044">{{monitoringValue.TEMFR044}} </div>
            <div class="PRMFR031">{{monitoringValue.PRMFR031}} </div>
            <div class="TEMFR047">{{monitoringValue.TEMFR047}} </div>
            <div class="PRMFR034">{{monitoringValue.PRMFR034}} </div>
            <div class="TEMFR045">{{monitoringValue.TEMFR045}} </div>
            <div class="PRMFR032">{{monitoringValue.PRMFR032}} </div>
            <div class="TEMFR046">{{monitoringValue.TEMFR046}} </div>
            <div class="PRMFR033">{{monitoringValue.PRMFR033}} </div>
            <div class="CRMFR012">{{monitoringValue.CRMFR012}} </div>
            <div class="CRMFR013">{{monitoringValue.CRMFR013}} </div>
            <div class="TEMFR053">{{monitoringValue.TEMFR053}} </div>
            <div class="TEMFR054">{{monitoringValue.TEMFR054}} </div>
            <div class="CAMFR005">{{monitoringValue.CAMFR005}} </div>
            <div class="CAMFR006">{{monitoringValue.CAMFR006}} </div>
            <div class="TEMFR048">{{monitoringValue.TEMFR048}} </div>
            <div class="TEMFR049">{{monitoringValue.TEMFR049}} </div>
            <div class="TEMFR051">{{monitoringValue.TEMFR051}} </div>
            <div class="TEMFR050">{{monitoringValue.TEMFR050}} </div>
            <div class="PRMFR035">{{monitoringValue.PRMFR035}} </div>
            <div class="PRMFR036">{{monitoringValue.PRMFR036}} </div>
            <div class="TEMFR052">{{monitoringValue.TEMFR052}} </div>
            <div class="EQSBR009" v-if="statusValue.EQSBR009 === 1">制热</div>
            <div class="EQSBR009" v-if="statusValue.EQSBR009 === 0">制冷</div>
              <div class="EQSBR029" v-if="statusValue.EQSBR029 === 1">制热</div>
              <div class="EQSBR029" v-if="statusValue.EQSBR029 === 0">制冷</div>
              <div class="EQSBR049" v-if="statusValue.EQSBR049 === 1">制热</div>
              <div class="EQSBR049" v-if="statusValue.EQSBR049 === 0">制冷</div>
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
    name: 'Source02090002',
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
            /** 监测值 */
            monitoringValue: {
                // 第一个框
                TEMFR001: '', // 地热进温 板换1-1
                PRMFR003: '', // 地热进压 板换1-1
                TEMFR002: '', // 地热出温 板换1-1
                PRMFR004: '', // 地热出压 板换1-1
                TEMFR003: '', // 地热进温 板换1-2
                PRMFR005: '', // 地热进压 板换1-2
                TEMFR004: '', // 地热出温 板换1-2
                PRMFR006: '', // 地热出压 板换1-2
                VOMFR004: '', // 旁通阀
                // 第二个框
                VOMFR006: '', // 三通开度
                TEMFR007: '', // 进口温度
                PRMFR009: '', // 进口压力
                TEMFR008: '', // 出口温度
                PRMFR010: '', // 出口压力
                VOMFR008: '', // 旁通阀开度比例
                // 第三个框 上部
                TEMFR011: '', // 地热进温
                PRMFR013: '', // 地热进压
                TEMFR014: '', // 中间出温
                PRMFR016: '', // 中间出压
                TEMFR012: '', // 地热出温
                PRMFR014: '', // 地热出压
                TEMFR013: '', // 中间进温
                PRMFR015: '', // 中间进压
                CRMFR004: '', // 压缩机1#运行电流
                CRMFR005: '', // 压缩机2#运行电流
                TEMFR025: '', // 压缩机1#排气温度
                TEMFR026: '', // 压缩机2#排气温度
                CAMFR001: '', // 压缩机1#当前容量
                CAMFR002: '', // 压缩机2#当前容量
                TEMFR020: '', // 蒸发进温
                TEMFR021: '', // 蒸发出温
                EQSBR009: '', // 热泵1-1 运行模式  - 未找到
                TEMFR023: '', // 冷凝出温
                TEMFR022: '', // 冷凝进温
                PRMFR021: '', // 吸气压力
                PRMFR022: '', // 排气压力
                TEMFR024: '', // 当前温度设定
                // 第三个框下半部分
                TEMFR015: '', // 地热进温
                PRMFR017: '', // 地热进压
                TEMFR018: '', // 中间出温
                PRMFR020: '', // 中间出压
                TEMFR016: '', // 地热出温
                PRMFR018: '', // 地热出压
                TEMFR017: '', // 中间进温
                PRMFR019: '', // 中间进压
                CRMFR008: '', // 压缩机1#运行电流
                CRMFR009: '', // 压缩机2#运行电流
                TEMFR036: '', // 压缩机1#排气温度
                TEMFR037: '', // 压缩机2#排气温度
                CAMFR003: '', // 压缩机1#当前容量
                CAMFR004: '', // 压缩机2#当前容量
                TEMFR031: '', // 蒸发进温
                TEMFR032: '', // 蒸发出温
                EQSTR029: '', // 热泵1-2 运行模式
                TEMFR034: '', // 冷凝出温
                TEMFR033: '', // 冷凝进温
                PRMFR025: '', // 吸气压力
                PRMFR026: '', // 排气压力
                TEMFR035: '', // 当前温度设定
                // 第四个框
                TEMFR044: '', // 地热进温
                PRMFR031: '', // 地热进压
                TEMFR047: '', // 中间出温
                PRMFR034: '', // 中间出压
                TEMFR045: '', // 地热出温
                PRMFR032: '', // 地热出压
                TEMFR046: '', // 中间进温
                PRMFR033: '', // 中间进压
                CRMFR012: '', // 压缩机1#运行电流
                CRMFR013: '', // 压缩机2#运行电流
                TEMFR053: '', // 压缩机1#排气温度
                TEMFR054: '', // 压缩机2#排气温度
                CAMFR005: '', // 压缩机1#当前容量
                CAMFR006: '', // 压缩机2#当前容量
                TEMFR048: '', // 蒸发进温
                TEMFR049: '', // 蒸发出温
                EQSBR049: '', // 热泵1-2 运行模式
                TEMFR051: '', // 冷凝出温
                TEMFR050: '', // 冷凝进温
                PRMFR035: '', // 吸气压力
                PRMFR036: '', // 排气压力
                TEMFR052: ''// 当前温度设定
            },
            controlValue: {
                // 第三个框
                EQCBW004: '', // 制冷算法
                EQCBW006: '', // 热泵1-1阀门V1
                EQCBW007: '', // 热泵1-1阀门V2
                EQCBW008: '', // 热泵1-1
                EQCBW026: '', // 热泵1-2阀门V3
                EQCBW027: '', // 热泵1-2阀门V4
                EQCBW028: '', // 热泵1-2
                EQCBW046: '', // 热泵2阀门V5
                EQCBW047: '', // 热泵2阀门V6
                EQCBW048: ''// 热泵2

            },
            settingValue: {
                // 第一个框
                VOTFW003: '', // 旁通阀开度设定
                // 第二个框
                VOTFW005: '', // 三通阀开度设定
                VOTFW007: '', // 旁通阀开度设定
                // 第三个框
                TETFW019: '', // 制冷算法室温设定
                TETFW027: '', // 热泵1-1制冷出水温度设定
                TETFW028: '', // 热泵1-1制热出水温度设定
                TETFW038: '', // 热泵1-2制冷出水温度设定
                TETFW039: '', // 热泵1-2制热出水温度设定
                TETFW055: '', // 热泵2制冷出水温度设定
                TETFW056: '' // 热泵2制热出水温度设定
            },
            statusValue: {

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
    height: 2500px;
    border-radius: 25px;
  }
  .TEMFR001{
    position: absolute;
    right:1074px;
    top: 133px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR003{
    position: absolute;
    right:1074px;
    top: 163px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR002{
    position: absolute;
    right:1074px;
    top: 256px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR004{
    position: absolute;
    right:1074px;
    top: 286px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR003{
    position: absolute;
    right:577px;
    top: 133px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR005{
    position: absolute;
    right:577px;
    top: 164px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR004{
    position: absolute;
    right:577px;
    top: 256px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR006{
    position: absolute;
    right:577px;
    top: 286px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .VOMFR004{
    position: absolute;
    right:15px;
    top: 254px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .VOMFR006{
    position: absolute;
    right:1088px;
    top: 631px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR007{
    position: absolute;
    right:824px;
    top: 634px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR009{
    position: absolute;
    right:824px;
    top: 662px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR008{
    position: absolute;
    right:824px;
    top: 756px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR010{
    position: absolute;
    right:824px;
    top: 786px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .VOMFR008{
    position: absolute;
    right:265px;
    top: 755px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  // 第三个框 上部
  .TEMFR011{
    position: absolute;
    right:1074px;
    top: 1132px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR013{
    position: absolute;
    right:1074px;
    top: 1162px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR014{
    position: absolute;
    right:802px;
    top: 1132px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR016{
    position: absolute;
    right:802px;
    top: 1162px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR012{
    position: absolute;
    right:1074px;
    top: 1257px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR014{
    position: absolute;
    right:1074px;
    top: 1287px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR013{
    position: absolute;
    right:802px;
    top: 1257px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .PRMFR015{
    position: absolute;
    right:802px;
    top: 1287px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .CRMFR004{
    position: absolute;
    right:522px;
    top: 1072px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .CRMFR005{
    position: absolute;
    right:522px;
    top: 1105px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR025{
    position: absolute;
    right:275px;
    top: 1074px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR026{
    position: absolute;
    right:275px;
    top: 1105px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
    font-weight: bold;

  }
  .CAMFR001{
    position: absolute;
    right:21px;
    top: 1076px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .CAMFR002{
    position: absolute;
    right:21px;
    top: 1106px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR020{
    position: absolute;
    right:553px;
    top: 1218px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR021{
    position: absolute;
    right:553px;
    top: 1285px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .EQSBR009{
    position: absolute;
    right:298px;
    top: 1290px;
    color: #FF0000;
    font-size: large;
  }

  .EQSBR029{
      position: absolute;
      right:298px;
      top: 1790px;
      color: #FF0000;
      font-size: large;
  }

  .EQSBR049{
      position: absolute;
      right:298px;
      top: 2290px;
      color: #FF0000;
      font-size: large;
  }

  .TEMFR023{
    position: absolute;
    right:58px;
    top: 1221px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR022{
    position: absolute;
    right:58px;
    top: 1288px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR021{
    position: absolute;
    right:538px;
    top: 1376px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR022{
    position: absolute;
    right:321px;
    top: 1376px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR024{
    position: absolute;
    right:50px;
    top: 1376px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .TEMFR015{
    position: absolute;
    right:1074px;
    top: 1632px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR017{
    position: absolute;
    right:1074px;
    top: 1662px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR018{
    position: absolute;
    right:802px;
    top: 1632px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR020{
    position: absolute;
    right:802px;
    top: 1662px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR016{
    position: absolute;
    right:1074px;
    top: 1754px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR018{
    position: absolute;
    right:1074px;
    top: 1784px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR017{
    position: absolute;
    right:802px;
    top: 1754px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR019{
    position: absolute;
    right:802px;
    top: 1784px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CRMFR008{
    position: absolute;
    right:522px;
    top: 1570px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CRMFR009{
    position: absolute;
    right:522px;
    top: 1602px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR036{
    position: absolute;
    right:274px;
    top: 1572px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR037{
    position: absolute;
    right:274px;
    top: 1602px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CAMFR003{
    position: absolute;
    right:21px;
    top: 1572px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .CAMFR004{
    position: absolute;
    right:21px;
    top: 1605px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR031{
    position: absolute;
    right:550px;
    top: 1715px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR032{
    position: absolute;
    right:550px;
    top: 1784px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSTR029{
    position: absolute;
    right:1138px;
    top: 1719px;
    color: #FF0000;
    font-size: large;
  }
  .TEMFR034{
    position: absolute;
    right:60px;
    top: 1720px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR033{
    position: absolute;
    right:60px;
    top: 1786px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR025{
    position: absolute;
    right:544px;
    top: 1874px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR026{
    position: absolute;
    right:322px;
    top: 1876px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR035{
    position: absolute;
    right:48px;
    top: 1876px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR044{
    position: absolute;
    right:1074px;
    top: 2131px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR031{
    position: absolute;
    right:1074px;
    top: 2161px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR047{
    position: absolute;
    right:802px;
    top: 2132px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR034{
    position: absolute;
    right:802px;
    top: 2161px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR045{
    position: absolute;
    right:1074px;
    top: 2255px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR032{
    position: absolute;
    right:1074px;
    top: 2285px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR046{
    position: absolute;
    right:802px;
    top: 2255px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR033{
    position: absolute;
    right:802px;
    top: 2285px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CRMFR012{
    position: absolute;
    right:522px;
    top: 2071px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CRMFR013{
    position: absolute;
    right:522px;
    top: 2101px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR053{
    position: absolute;
    right:274px;
    top: 2073px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR054{
    position: absolute;
    right:274px;
    top: 2103px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .CAMFR005{
    position: absolute;
    right:20px;
    top: 2073px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;

  }
  .CAMFR006{
    position: absolute;
    right:20px;
    top: 2105px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR048{
    position: absolute;
    right:552px;
    top: 2217px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR049{
    position: absolute;
    right:552px;
    top: 2284px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR049{
    position: absolute;
    right:px;
    top: px;
    color: #FF0000;
    font-size: large;
  }
  .TEMFR051{
    position: absolute;
    right:57px;
    top: 2221px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR050{
    position: absolute;
    right:57px;
    top: 2287px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR035{
    position: absolute;
    right:540px;
    top: 2375px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR036{
    position: absolute;
    right:322px;
    top: 2375px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR052{
    position: absolute;
    right:50px;
    top: 2375px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
</style>
