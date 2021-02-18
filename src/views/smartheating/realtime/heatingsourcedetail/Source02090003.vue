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
      <div style="width:100%;height:2380px">
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
                  <tr style="height:30px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">一级循环压差值设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.PDTFW008" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">MPa</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB1-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW065" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB1-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW067" class="radioGroup" button-style="solid" width="100%">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB1-1频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW004" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:30px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB1-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW069" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB1-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW071" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB1-2频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW006" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:30px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB1-3</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW073" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB1-3</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW075" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB1-3频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW008" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:100px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">二级循环压差值设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.PDTFW009" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">MPa</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB2-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW077" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB2-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW079" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB2-1频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW010" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:30px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB2-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW081" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB2-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW083" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB2-2频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW012" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:60px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB3-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW085" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB3-1频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW014" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB3-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW088" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB3-2频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW016" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB3-3</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW091" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB3-3频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW018" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">制冷循环压差值设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.PDTFW010" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">MPa</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB4-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW094" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB4-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW096" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB4-1频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW020" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB4-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW098" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB4-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW100" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB4-2频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW022" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB4-3</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW102" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB4-3</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW104" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB4-3频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW024" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td class="leftTitle">冷塔1#</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW118" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">冷塔1#</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW120" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">冷塔2#</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW122" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">冷塔2#</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW124" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">冷塔3#</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW126" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">冷塔3#</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW128" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 自动 </a-radio-button>
                        <a-radio-button value="1"> 手动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">冷塔出水温度设定1</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.TETFW060" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">冷塔出水温度设定2</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.TETFW061" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">℃</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">冷塔出水温度设定3</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.TETFW062" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">℃</td>
                  </tr>
                  <tr style="height:20px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB5-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW106" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB5-1频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW026" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB5-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW109" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB5-2频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW028" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB6-1</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW112" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB6-1频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW030" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td class="leftTitle">水泵SB6-2</td>
                    <td align="right">
                      <a-radio-group v-model="controlValue.EQCBW115" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 停止 </a-radio-button>
                        <a-radio-button value="1"> 启动 </a-radio-button>
                      </a-radio-group>
                    </td>
                  </tr>
                  <tr style="height:5px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">水泵SB6-2频率设定</td>
                    <td width="45%" align="right">
                      <a-input-number v-model="settingValue.FQTFW032" class="textField" style="width:73%"></a-input-number>
                    </td>
                    <td class="leftTitle" width="5%">HZ</td>
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
            <div class="PDMFC002">{{ monitoringValue.PDMFC002 }}</div>
            <div class="TEMFR005">{{ monitoringValue.TEMFR005 }}</div>
            <div class="PRMFR007">{{ monitoringValue.PRMFR007 }}</div>
            <div class="FQMFR003">{{ monitoringValue.FQMFR003 }}</div>
            <div class="FQMFR005">{{ monitoringValue.FQMFR005 }}</div>
            <div class="FQMFR007">{{ monitoringValue.FQMFR007 }}</div>
            <div class="TEMFR006">{{ monitoringValue.TEMFR006 }}</div>
            <div class="PRMFR008">{{ monitoringValue.PRMFR008 }}</div>
            <div class="PDMFC003">{{ monitoringValue.PDMFC003 }}</div>
            <div class="TEMFR009">{{ monitoringValue.TEMFR009 }}</div>
            <div class="PRMFR011">{{ monitoringValue.PRMFR011 }}</div>
            <div class="FQMFR009">{{ monitoringValue.FQMFR009 }}</div>
            <div class="FQMFR011">{{ monitoringValue.FQMFR011 }}</div>
            <div class="TEMFR010">{{ monitoringValue.TEMFR010 }}</div>
            <div class="PRMFR012">{{ monitoringValue.PRMFR012 }}</div>
            <div class="FQMFR013">{{ monitoringValue.FQMFR013 }}</div>
            <div class="FQMFR015">{{ monitoringValue.FQMFR015 }}</div>
            <div class="FQMFR017">{{ monitoringValue.FQMFR017 }}</div>
            <div class="PRMFR039">{{ monitoringValue.PRMFR039 }}</div>
            <div class="PDMFC006">{{ monitoringValue.PDMFC006 }}</div>
            <div class="TEMFR042">{{ monitoringValue.TEMFR042 }}</div>
            <div class="PRMFR029">{{ monitoringValue.PRMFR029 }}</div>
            <div class="FWMFR004">{{ monitoringValue.FWMFR004 }}</div>
            <div class="CLMFR001">{{ monitoringValue.CLMFR001 }}</div>
            <div class="FWMFR005">{{ monitoringValue.FWMFR005 }}</div>
            <div class="CLMFR002">{{ monitoringValue.CLMFR002 }}</div>
            <div class="CLMFC003">{{ monitoringValue.CLMFC003 }}</div>
            <div class="FQMFR019">{{ monitoringValue.FQMFR019 }}</div>
            <div class="FQMFR021">{{ monitoringValue.FQMFR021 }}</div>
            <div class="FQMFR023">{{ monitoringValue.FQMFR023 }}</div>
            <div class="TEMFR059">{{ monitoringValue.TEMFR059 }}</div>
            <div class="TEMFR043">{{ monitoringValue.TEMFR043 }}</div>
            <div class="PRMFR030">{{ monitoringValue.PRMFR030 }}</div>
            <div class="FQMFR025">{{ monitoringValue.FQMFR025 }}</div>
            <div class="FQMFR027">{{ monitoringValue.FQMFR027 }}</div>
            <div class="FQMFR029">{{ monitoringValue.FQMFR029 }}</div>
            <div class="FQMFR031">{{ monitoringValue.FQMFR031 }}</div>
            <div class="EQSBR066">
              <img v-if="statusValue.EQSBR066 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR066 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR066 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR066 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR070">
              <img v-if="statusValue.EQSBR070 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR070 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR070 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR070 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR074">
              <img v-if="statusValue.EQSBR074 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR074 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR074 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR074 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR078">
              <img v-if="statusValue.EQSBR078 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR078 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR078 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR078 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR082">
              <img v-if="statusValue.EQSBR082 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR082 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR082 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR082 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR086">
              <img v-if="statusValue.EQSBR086 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR086 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR086 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR086 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR089">
              <img v-if="statusValue.EQSBR089 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR089 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR089 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR089 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR092">
              <img v-if="statusValue.EQSBR092 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR092 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR092 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR092 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR095">
              <img v-if="statusValue.EQSBR095 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR095 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR095 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR095 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR099">
              <img v-if="statusValue.EQSBR099 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR099 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR099 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR099 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR103">
              <img v-if="statusValue.EQSBR103 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR103 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR103 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR103 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR107">
              <img v-if="statusValue.EQSBR107 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR107 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR107 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR107 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR110">
              <img v-if="statusValue.EQSBR110 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR110 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR110 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR110 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR113">
              <img v-if="statusValue.EQSBR113 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR113 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR113 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR113 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>
            <div class="EQSBR116">
              <img v-if="statusValue.EQSBR116 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR116 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR116 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR116 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>

            <div class="EQSBR119">
              <img v-if="statusValue.EQSBR119 === 1" src="~@/assets/realtime/coolingtowerrun.png" alt="logo" style="width:160px; height:21px ">
              <img v-if="statusValue.EQSBR119 === 0" src="~@/assets/realtime/coolingtowerstop.png" alt="logo" style="width:160px; height:21px ">
              <img v-if="statusValue.EQSBR119 === 99" src="~@/assets/realtime/coolingtoweralarm.png" alt="logo" style="width:160px; height:21px ">
              <img v-if="statusValue.EQSBR119 === 100" src="~@/assets/realtime/coolingtowerinterrupt.png" alt="logo" style="width:160px; height:21px ">
            </div>
            <div class="EQSBR123">
              <img v-if="statusValue.EQSBR123 === 1" src="~@/assets/realtime/coolingtowerrun.png" alt="logo" style="width:160px; height:21px ">
              <img v-if="statusValue.EQSBR123 === 0" src="~@/assets/realtime/coolingtowerstop.png" alt="logo" style="width:160px; height:21px ">
              <img v-if="statusValue.EQSBR123 === 99" src="~@/assets/realtime/coolingtoweralarm.png" alt="logo" style="width:160px; height:21px ">
              <img v-if="statusValue.EQSBR123 === 100" src="~@/assets/realtime/coolingtowerinterrupt.png" alt="logo" style="width:160px; height:21px ">
            </div>
            <div class="EQSBR127">
              <img v-if="statusValue.EQSBR127 === 1" src="~@/assets/realtime/coolingtowerrun.png" alt="logo" style="width:160px; height:21px ">
              <img v-if="statusValue.EQSBR127 === 0" src="~@/assets/realtime/coolingtowerstop.png" alt="logo" style="width:160px; height:21px ">
              <img v-if="statusValue.EQSBR127 === 99" src="~@/assets/realtime/coolingtoweralarm.png" alt="logo" style="width:160px; height:21px ">
              <img v-if="statusValue.EQSBR127 === 100" src="~@/assets/realtime/coolingtowerinterrupt.png" alt="logo" style="width:160px; height:21px ">
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
    name: 'Source02090003',
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
                // 1
                PDMFC002: '', // 循环压差
                TEMFR005: '', // 一出温度
                PRMFR007: '', // 一出压力
                FQMFR003: '', // 水泵SB1-1频率
                FQMFR005: '', // 水泵SB1-2频率
                FQMFR007: '', // 水泵SB1-3频率
                TEMFR006: '', // 一进温度
                PRMFR008: '', // 一进压力
                // 2
                PDMFC003: '', // 循环压差
                TEMFR009: '', // 一出温度
                PRMFR011: '', // 一出压力
                FQMFR009: '', // 水泵SB2-1频率
                FQMFR011: '', // 水泵SB2-2频率
                TEMFR010: '', // 一进温度
                PRMFR012: '', // 一进压力
                // 3
                FQMFR013: '', // 水泵SB3-1频率
                FQMFR015: '', // 水泵SB3-2频率
                FQMFR017: '', // 水泵SB3-3频率
                PRMFR039: '', // 冷塔进水压力
                PDMFC006: '', // 循环压差
                TEMFR042: '', // 供冷出温
                PRMFR029: '', // 供冷出压
                FWMFR004: '', // 供冷瞬时流量
                CLMFR001: '', // 供冷瞬时冷量
                FWMFR005: '', // 供冷累计流量
                CLMFR002: '', // 供冷累计冷量
                CLMFC003: '', // 日输出冷量
                FQMFR019: '', // 水泵SB4-1频率
                FQMFR021: '', // 水泵SB4-2频率
                FQMFR023: '', // 水泵SB4-3频率
                TEMFR059: '', // 冷塔出水温度
                TEMFR043: '', // 供冷进温
                PRMFR030: '', // 供冷进压
                FQMFR025: '', // 水泵SB5-1频率
                FQMFR027: '', // 水泵SB5-2频率
                FQMFR029: '', // 水泵SB6-1频率
                FQMFR031: '' // 水泵SB6-2频率

            },
            controlValue: {
                EQCBW065: '', // 水泵SB1-1启停
                EQCBW067: '', // 水泵SB1-1手自动
                EQCBW069: '', // 水泵SB1-2启停
                EQCBW071: '', // 水泵SB1-2手自动
                EQCBW073: '', // 水泵SB1-3启停
                EQCBW075: '', // 水泵SB1-3手自动
                EQCBW077: '', // 水泵SB2-1启停
                EQCBW079: '', // 水泵SB2-1手自动
                EQCBW081: '', // 水泵SB2-2启停
                EQCBW083: '', // 水泵SB2-2手自动
                EQCBW085: '', // 水泵SB3-1启停
                EQCBW088: '', // 水泵SB3-2启停
                EQCBW091: '', // 水泵SB3-3启停
                EQCBW094: '', // 水泵SB4-1启停
                EQCBW096: '', // 水泵SB4-1手自动
                EQCBW098: '', // 水泵SB4-2启停
                EQCBW100: '', // 水泵SB4-2手自动
                EQCBW102: '', // 水泵SB4-3启停
                EQCBW104: '', // 水泵SB4-3手自动
                EQCBW118: '', // 冷塔1#启停
                EQCBW120: '', // 冷塔1#手自动
                EQCBW122: '', // 冷塔2#启停
                EQCBW124: '', // 冷塔2#手自动
                EQCBW126: '', // 冷塔3#启停
                EQCBW128: '', // 冷塔3#手自动
                EQCBW106: '', // 水泵SB5-1启停
                EQCBW109: '', // 水泵SB5-2启停
                EQCBW112: '', // 水泵SB6-1启停
                EQCBW115: ''// 水泵SB6-2启停
            },
            settingValue: {
                PDTFW008: '', // 一级循环压差设定
                FQTFW004: '', // 水泵SB1-1频率设定
                FQTFW006: '', // 水泵SB1-2频率设定
                FQTFW008: '', // 水泵SB1-3频率设定
                PDTFW009: '', // 二级循环压差设定
                FQTFW010: '', // 水泵SB2-1频率设定
                FQTFW012: '', // 水泵SB2-2频率设定
                FQTFW014: '', // 水泵SB3-1频率设定
                FQTFW016: '', // 水泵SB3-2频率设定
                FQTFW018: '', // 水泵SB3-3频率设定
                PDTFW010: '', // 制冷循环压差值设定
                FQTFW020: '', // 水泵SB4-1频率设定
                FQTFW022: '', // 水泵SB4-2频率设定
                FQTFW024: '', // 水泵SB4-3频率设定
                TETFW060: '', // 冷塔出水温度设定1
                TETFW061: '', // 冷塔出水温度设定2
                TETFW062: '', // 冷塔出水温度设定3
                FQTFW026: '', // 水泵SB5-1频率设定
                FQTFW028: '', // 水泵SB5-2频率设定
                FQTFW030: '', // 水泵SB6-1频率设定
                FQTFW032: ''// 水泵SB6-2频率设定
            },
            statusValue: {
                EQSBR066: '', // 状态
                EQSBR070: '', // 状态
                EQSBR074: '', // 状态
                EQSBR078: '', // 状态
                EQSBR082: '', // 状态
                EQSBR086: '', // 状态
                EQSBR089: '', // 状态
                EQSBR092: '', // 状态
                EQSBR095: '', // 状态
                EQSBR099: '', // 状态
                EQSBR101: '', // 状态
                EQSBR103: '', // 状态
                EQSBR107: '', // 状态
                EQSBR110: '', // 状态
                EQSBR113: '', // 状态
                EQSBR116: '', // 状态
                EQSBR119: '', // 状态
                EQSBR123: '', // 状态
                EQSBR127: '' // 状态

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
        padding-right:20px;
        padidng-bottom:10px;
        padding-right: 10px;
        padding-top: 20px;
        margin: 0px 0px 48px 0px;
        height: 2330px;
        border-radius: 25px;
    }
    .PDMFC002{
      position: absolute;
      right: 814px;
      top: 78px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR005{
      position: absolute;
      right: 567px;
      top: 52px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR007{
      position: absolute;
      right: 567px;
      top: 81px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR003{
      position: absolute;
      right: 793px;
      top: 188px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR005{
      position: absolute;
      right: 793px;
      top: 312px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR007{
      position: absolute;
      right: 793px;
      top: 437px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR006{
      position: absolute;
      right: 567px;
      top: 424px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .PRMFR008{
      position: absolute;
      right: 567px;
      top: 453px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .PDMFC003{
      position: absolute;
      right: 814px;
      top:668px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .TEMFR009{
      position: absolute;
      right: 567px;
      top: 641px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .PRMFR011{
      position: absolute;
      right: 567px;
      top: 670px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR009{
      position: absolute;
      right: 793px;
      top: 779px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR011{
      position: absolute;
      right:793px;
      top: 904px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .TEMFR010{
      position: absolute;
      right: 567px;
      top: 890px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .PRMFR012{
      position: absolute;
      right: 567px;
      top: 919px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR013{
      position: absolute;
      right: 792px;
      top: 1105px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR015{
      position: absolute;
      right: 793px;
      top: 1323px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR017{
      position: absolute;
      right: 793px;
      top: 1556px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .PRMFR039{
      position: absolute;
      right: 546px;
      top: 1121px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .PDMFC006{
      position: absolute;
      right: 321px;
      top: 1122px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .TEMFR042{
      position: absolute;
      right: 58px;
      top: 1091px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .PRMFR029{
      position: absolute;
      right: 58px;
      top: 1123px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FWMFR004{
      position: absolute;
      right: 65px;
      top: 1187px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .CLMFR001{
      position: absolute;
      right: 65px;
      top: 1221px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FWMFR005{
      position: absolute;
      right: 42px;
      top: 1256px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .CLMFR002{
      position: absolute;
      right: 42px;
      top: 1288px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .CLMFC003{
      position: absolute;
      right: 42px;
      top: 1320px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR019{
      position: absolute;
      right: 297px;
      top: 1324px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR021{
      position: absolute;
      right: 293px;
      top: 1556px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR023{
      position: absolute;
      right: 294px;
      top: 1728px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR059{
      position: absolute;
      right: 548px;
      top: 1742px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .TEMFR043{
      position: absolute;
      right: 59px;
      top: 1713px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .PRMFR030{
      position: absolute;
      right: 59px;
      top: 1743px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR025{
      position: absolute;
      right: 794px;
      top: 1929px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR027{
      position: absolute;
      right: 794px;
      top: 2053px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .FQMFR029{
      position: absolute;
      right: 296px;
      top: 2053px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;
    }
    .FQMFR031{
      position: absolute;
      right: 296px;
      top: 2178px;
      color: #FF0000;
      font-size: large;
      font-weight: bold;

    }
    .EQSBR066{
        position: absolute;
        right: 841px;
        top: 225px;
      }
    .EQSBR070{
      position: absolute;
      right: 841px;
      top: 350px;
    }
    .EQSBR074{
      position: absolute;
      right: 841px;
      top: 474px;
    }
    .EQSBR078{
      position: absolute;
      right: 841px;
      top: 817px;
    }
    .EQSBR082{
      position: absolute;
      right: 841px;
      top: 940px;
    }
    .EQSBR086{
      position: absolute;
      right: 841px;
      top: 1143px;
    }
    .EQSBR089{
      position: absolute;
      right: 841px;
      top: 1360px;
    }
    .EQSBR092{
      position: absolute;
      right: 841px;
      top: 1593px;
    }
    .EQSBR095{
      position: absolute;
      right: 343px;
      top: 1360px;
    }
    .EQSBR099{
      position: absolute;
      right: 343px;
      top: 1594px;
    }
    .EQSBR103{
      position: absolute;
      right: 343px;
      top: 1765px;
    }
    .EQSBR107{
      position: absolute;
      right: 841px;
      top: 1968px;
    }
    .EQSBR110{
        position: absolute;
        right: 841px;
        top: 2092px;
      }
    .EQSBR113{
          position: absolute;
          right: 343px;
          top: 2092px;
        }
    .EQSBR116{
            position: absolute;
            right: 343px;
            top: 2216px;
          }
    .EQSBR119{
      position: absolute;
      right: 1045px;
      top: 1264px;
    }
    .EQSBR123{
      position: absolute;
      right: 1045px;
      top: 1515px;
    }
    .EQSBR127{
      position: absolute;
      right: 1045px;
      top: 1761px;
    }

</style>
