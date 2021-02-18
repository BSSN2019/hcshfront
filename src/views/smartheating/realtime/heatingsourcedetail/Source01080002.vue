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
        <a-button key="close" type="primary" @click="handleClose">关闭</a-button>
      </template>
      <div style="width:100%;height:2060px">
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
                    <td width="50%" class="leftTitle">锅炉1#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW001" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW002" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW004" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">炉前泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW025" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:50px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉2#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW004" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW008" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW010" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">炉前泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW028" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:100px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉3#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW007" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW014" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW016" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">炉前泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW031" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:30px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉4#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW010" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW020" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW022" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">炉前泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW034" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:150px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉5#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW013" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW026" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW028" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">炉前泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW037" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:30px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉6#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW016" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW032" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW034" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">炉前泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW040" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr><tr style="height:150px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉7#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW019" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW038" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW040" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">炉前泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW043" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:30px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">锅炉8#</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW022" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">目标温度设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW044" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td class="leftTitle">排烟温度高限设定</td>
                    <td ><a-input-number v-model="settingValue.TETFW046" class="textField" style="width:100%"></a-input-number></td>
                    <td>℃</td>
                  </tr>
                  <tr style="height:10px"></tr>
                  <tr>
                    <td width="50%" class="leftTitle">炉前泵</td>
                    <td width="40%" align="right">
                      <a-radio-group v-model="controlValue.EQCBW046" class="radioGroup" button-style="solid">
                        <a-radio-button value="0"> 关闭 </a-radio-button>
                        <a-radio-button value="1"> 开启 </a-radio-button>
                      </a-radio-group>
                    </td>
                    <td width="10%"></td>
                  </tr>
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
            <div class="TEMFR005">{{ monitoringValue.TEMFR005 }}</div>
            <div class="TEMFR003">{{ monitoringValue.TEMFR003 }}</div>
            <div class="PRMFR002">{{ monitoringValue.PRMFR002 }}</div>
            <div class="TEMFR001">{{ monitoringValue.TEMFR001 }}</div>
            <div class="PRMFR001">{{ monitoringValue.PRMFR001 }}</div>

            <div class="TEMFR017">{{ monitoringValue.TEMFR017 }}</div>
            <div class="TEMFR015">{{ monitoringValue.TEMFR015 }}</div>
            <div class="PRMFR006">{{ monitoringValue.PRMFR006 }}</div>
            <div class="TEMFR013">{{ monitoringValue.TEMFR013 }}</div>
            <div class="PRMFR005">{{ monitoringValue.PRMFR005 }}</div>

            <div class="TEMFR029">{{ monitoringValue.TEMFR029 }}</div>
            <div class="TEMFR027">{{ monitoringValue.TEMFR027 }}</div>
            <div class="PRMFR010">{{ monitoringValue.PRMFR010 }}</div>
            <div class="TEMFR025">{{ monitoringValue.TEMFR025 }}</div>
            <div class="PRMFR009">{{ monitoringValue.PRMFR009 }}</div>

            <div class="TEMFR041">{{ monitoringValue.TEMFR041 }}</div>
            <div class="TEMFR039">{{ monitoringValue.TEMFR039 }}</div>
            <div class="PRMFR014">{{ monitoringValue.PRMFR014 }}</div>
            <div class="TEMFR037">{{ monitoringValue.TEMFR037 }}</div>
            <div class="PRMFR013">{{ monitoringValue.PRMFR013 }}</div>

            <div class="TEMFR011">{{ monitoringValue.TEMFR011 }}</div>
            <div class="TEMFR009">{{ monitoringValue.TEMFR009 }}</div>
            <div class="PRMFR004">{{ monitoringValue.PRMFR004 }}</div>
            <div class="TEMFR007">{{ monitoringValue.TEMFR007 }}</div>
            <div class="PRMFR003">{{ monitoringValue.PRMFR003 }}</div>

            <div class="TEMFR023">{{ monitoringValue.TEMFR023 }}</div>
            <div class="TEMFR021">{{ monitoringValue.TEMFR021 }}</div>
            <div class="PRMFR008">{{ monitoringValue.PRMFR008 }}</div>
            <div class="TEMFR019">{{ monitoringValue.TEMFR019 }}</div>
            <div class="PRMFR007">{{ monitoringValue.PRMFR007 }}</div>

            <div class="TEMFR035">{{ monitoringValue.TEMFR035 }}</div>
            <div class="TEMFR033">{{ monitoringValue.TEMFR033 }}</div>
            <div class="PRMFR012">{{ monitoringValue.PRMFR012 }}</div>
            <div class="TEMFR031">{{ monitoringValue.TEMFR031 }}</div>
            <div class="PRMFR011">{{ monitoringValue.PRMFR011 }}</div>

            <div class="TEMFR047">{{ monitoringValue.TEMFR047 }}</div>
            <div class="TEMFR045">{{ monitoringValue.TEMFR045 }}</div>
            <div class="PRMFR016">{{ monitoringValue.PRMFR016 }}</div>
            <div class="TEMFR043">{{ monitoringValue.TEMFR043 }}</div>
            <div class="PRMFR015">{{ monitoringValue.PRMFR015 }}</div>

            <div class="EQSBR002">
              <img v-if="statusValue.EQSBR002 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR002 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR002 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR002 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR026">
              <img v-if="statusValue.EQSBR026 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR026 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR026 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR026 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>

            <div class="EQSBR008">
              <img v-if="statusValue.EQSBR008 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR008 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR008 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR008 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">            </div>
            <div class="EQSBR032">
              <img v-if="statusValue.EQSBR032 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR032 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR032 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR032 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>

            <div class="EQSBR014">
              <img v-if="statusValue.EQSBR014 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR014 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR014 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR014 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR038">
              <img v-if="statusValue.EQSBR038 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR038 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR038 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR038 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>

            <div class="EQSBR020">
              <img v-if="statusValue.EQSBR020 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR020 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR020 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR020 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR044">
              <img v-if="statusValue.EQSBR044 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR044 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR044 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR044 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>

            <div class="EQSBR005">
              <img v-if="statusValue.EQSBR005 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR005 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR005 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR005 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR029">
              <img v-if="statusValue.EQSBR029 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR029 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR029 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR029 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>

            <div class="EQSBR011">
              <img v-if="statusValue.EQSBR011 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR011 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR011 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR011 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR035">
              <img v-if="statusValue.EQSBR035 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR035 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR035 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR035 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>

            <div class="EQSBR017">
              <img v-if="statusValue.EQSBR017 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR017 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR017 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR017 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR041">
              <img v-if="statusValue.EQSBR041 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR041 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR041 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR041 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
            </div>

            <div class="EQSBR023">
              <img v-if="statusValue.EQSBR023 === 1" src="~@/assets/realtime/modularboilerrun.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR023 === 0" src="~@/assets/realtime/modularboilerstop.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR023 === 99" src="~@/assets/realtime/modularboileralarm.png" alt="logo" style="width:30px; height:47px ">
              <img v-if="statusValue.EQSBR023 === 100" src="~@/assets/realtime/modularboilerinterrupt.png" alt="logo" style="width:30px; height:47px ">
            </div>
            <div class="EQSBR047">
              <img v-if="statusValue.EQSBR047 === 1" src="~@/assets/realtime/pumprun.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR047 === 0" src="~@/assets/realtime/pumpstop.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR047 === 99" src="~@/assets/realtime/pumpalarm.png" alt="logo" style="width:43px; height:43px ">
              <img v-if="statusValue.EQSBR047 === 100" src="~@/assets/realtime/pumpinterrupt.png" alt="logo" style="width:43px; height:43px ">
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
    name: 'Source0108002',
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
                /** 1#锅炉 */
                TEMFR005: '', // 排烟温度
                TEMFR003: '', // 出口温度
                PRMFR002: '', // 出口压力
                TEMFR001: '', // 进口温度
                PRMFR001: '', // 进口压力

                /** 2#锅炉 */
                TEMFR011: '', // 排烟温度
                TEMFR009: '', // 出口温度
                PRMFR004: '', // 出口压力
                TEMFR007: '', // 进口温度
                PRMFR003: '', // 进口压力

                /** 3#锅炉 */
                TEMFR017: '', // 排烟温度
                TEMFR015: '', // 出口温度
                PRMFR006: '', // 出口压力
                TEMFR013: '', // 进口温度
                PRMFR006: '', // 进口压力

                /** 4#锅炉 */
                TEMFR023: '', // 排烟温度
                TEMFR021: '', // 出口温度
                PRMFR008: '', // 出口压力
                TEMFR019: '', // 进口温度
                PRMFR007: '', // 进口压力

                /** 5#锅炉 */
                TEMFR029: '', // 排烟温度
                TEMFR027: '', // 出口温度
                PRMFR010: '', // 出口压力
                TEMFR025: '', // 进口温度
                PRMFR009: '', // 进口压力
                /** 6#锅炉 */
                TEMFR035: '', // 排烟温度
                TEMFR033: '', // 出口温度
                PRMFR012: '', // 出口压力
                TEMFR031: '', // 进口温度
                PRMFR011: '', // 进口压力

                /** 7#锅炉 */
                TEMFR041: '', // 排烟温度
                TEMFR039: '', // 出口温度
                PRMFR014: '', // 出口压力
                TEMFR037: '', // 进口温度
                PRMFR013: '', // 进口压力
                /** 8#锅炉 */
                TEMFR047: '', // 排烟温度
                TEMFR045: '', // 出口温度
                PRMFR016: '', // 出口压力
                TEMFR043: '', // 进口温度
                PRMFR015: '' // 进口压力
            },
            controlValue: {
                EQCBW001: '', // 锅炉1#
                EQCBW025: '', // 炉前泵
                EQCBW004: '', // 锅炉2#
                EQCBW028: '', // 炉前泵
                EQCBW007: '', // 锅炉3#
                EQCBW031: '', // 炉前泵
                EQCBW010: '', // 锅炉4#
                EQCBW034: '', // 炉前泵
                EQCBW013: '', // 锅炉1#
                EQCBW037: '', // 炉前泵
                EQCBW016: '', // 锅炉1#
                EQCBW040: '', // 炉前泵
                EQCBW019: '', // 锅炉1#
                EQCBW043: '', // 炉前泵
                EQCBW022: '', // 锅炉1#
                EQCBW046: '' // 炉前泵
            },
            statusValue: {
                EQSBR002: '', // 状态
                EQSBR026: '', // 状态

                EQSBR005: '', // 状态
                EQSBR029: '', // 状态

                EQSBR008: '', // 状态
                EQSBR032: '', // 状态

                EQSBR011: '', // 状态
                EQSBR035: '', // 状态

                EQSBR014: '', // 状态
                EQSBR038: '', // 状态

                EQSBR017: '', // 状态
                EQSBR041: '', // 状态

                EQSBR020: '', // 状态
                EQSBR044: '', // 状态

                EQSBR023: '', // 状态
                EQSBR047: '' // 状态
            },
            settingValue: {
                TETFW002: '', // 目标温度设定
                TETFW004: '', // 排烟温度高限设定
                TETFW014: '', // 目标温度设定
                TETFW016: '', // 排烟温度高限设定
                TETFW020: '', // 目标温度设定
                TETFW022: '', // 排烟温度高限设定
                TETFW026: '', // 目标温度设定
                TETFW028: '', // 排烟温度高限设定
                TETFW032: '', // 目标温度设定
                TETFW034: '', // 排烟温度高限设定
                TETFW008: '', // 目标温度设定
                TETFW010: '', // 排烟温度高限设定
                TETFW038: '', // 目标温度设定
                TETFW040: '', // 排烟温度高限设定
                TETFW044: '', // 目标温度设定
                TETFW046: '' // 排烟温度高限设定

            }

        }
    },
    mounted () {

    },
    methods: {
    }
}
</script>

<<style lang="less" scoped>
  .leftPanel {
    width: 90%;
    border: 1px solid #aaaaaa;
    padding-left:20px;
    padidng-bottom:10px;
    padding-right: 10px;
    padding-top: 20px;
    margin: 0px 0px 48px 0px;
    height: 2030px;
    border-radius: 25px;
  }
  .TEMFR005{
    position: absolute;
    right: 980px;
    top: 104px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR003{
    position: absolute;
    right: 772px;
    top: 146px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .PRMFR002{
    position: absolute;
    right: 772px;
    top: 176px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR001{
    position: absolute;
    right: 772px;
    top: 268px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR001{
    position: absolute;
    right: 772px;
    top: 298px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .TEMFR017{
    position: absolute;
    right: 980px;
    top: 604px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR015{
    position: absolute;
    right: 772px;
    top: 645px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .PRMFR006{
    position: absolute;
    right: 772px;
    top: 675px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR013{
    position: absolute;
    right: 772px;
    top: 768px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR005{
    position: absolute;
    right: 772px;
    top: 798px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .TEMFR029{
    position: absolute;
    right: 980px;
    top: 1104px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR027{
    position: absolute;
    right: 772px;
    top: 1145px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .PRMFR010{
    position: absolute;
    right: 772px;
    top: 1175px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR025{
    position: absolute;
    right: 772px;
    top: 1268px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR009{
    position: absolute;
    right: 772px;
    top: 1298px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .TEMFR041{
    position: absolute;
    right: 980px;
    top: 1604px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR039{
    position: absolute;
    right: 772px;
    top: 1645px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .PRMFR014{
    position: absolute;
    right: 772px;
    top: 1675px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR037{
    position: absolute;
    right: 772px;
    top: 1768px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR013{
    position: absolute;
    right: 772px;
    top: 1798px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR011{
    position: absolute;
    right: 340px;
    top: 104px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR009{
    position: absolute;
    right: 135px;
    top: 146px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .PRMFR004{
    position: absolute;
    right: 135px;
    top: 176px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR007{
    position: absolute;
    right: 135px;
    top: 268px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR003{
    position: absolute;
    right: 135px;
    top: 298px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR023{
    position: absolute;
    right: 340px;
    top: 604px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR021{
    position: absolute;
    right: 135px;
    top: 645px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .PRMFR008{
    position: absolute;
    right: 135px;
    top: 675px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR019{
    position: absolute;
    right: 135px;
    top: 768px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR007{
    position: absolute;
    right: 135px;
    top: 798px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR035{
    position: absolute;
    right: 340px;
    top: 1104px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR033{
    position: absolute;
    right: 135px;
    top: 1145px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .PRMFR012{
    position: absolute;
    right: 135px;
    top: 1175px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR031{
    position: absolute;
    right: 135px;
    top: 1268px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR011{
    position: absolute;
    right: 135px;
    top: 1298px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR047{
    position: absolute;
    right: 340px;
    top: 1604px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR045{
    position: absolute;
    right: 135px;
    top: 1645px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }

  .PRMFR016{
    position: absolute;
    right: 135px;
    top: 1675px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .TEMFR043{
    position: absolute;
    right: 135px;
    top: 1768px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .PRMFR015{
    position: absolute;
    right: 135px;
    top: 1798px;
    color: #FF0000;
    font-size: large;
    font-weight: bold;
  }
  .EQSBR002{
    position: absolute;
    right: 1114px;
    top: 273px;
  }
  .EQSBR026{
    position: absolute;
    right: 958px;
    top: 322px;
  }
  .EQSBR008{
    position: absolute;
    right: 1114px;
    top: 773px;
  }
  .EQSBR032{
    position: absolute;
    right: 958px;
    top: 822px;
  }
  .EQSBR014{
    position: absolute;
    right: 1114px;
    top: 1273px;
  }
  .EQSBR038 {
    position: absolute;
    right: 958px;
    top: 1323px;
  }
  .EQSBR020{
    position: absolute;
    right: 1114px;
    top: 1773px;
  }
  .EQSBR044 {
    position: absolute;
    right: 958px;
    top: 1826px;
  }
  .EQSBR005{
    position: absolute;
    right: 474px;
    top: 273px;
  }
  .EQSBR029{
    position: absolute;
    right: 318px;
    top: 322px;
  }
  .EQSBR011{
    position: absolute;
    right: 474px;
    top: 773px;
  }
  .EQSBR035 {
    position: absolute;
    right: 318px;
    top: 822px;
  }
  .EQSBR017{
    position: absolute;
    right: 474px;
    top: 1273px;
  }
  .EQSBR041 {
    position: absolute;
    right: 318px;
    top: 1324px;
  }
  .EQSBR023{
    position: absolute;
    right: 474px;
    top: 1773px;
  }
  .EQSBR047{
    position: absolute;
    right: 318px;
    top: 1826px;
  }

</style>
