<template>
  <div class="mainPanel">
    <a-row :gutter="4">
      <a-col span="4">
        <a-card style="height:850px" title="选择供热系统">
          <heating-org-tree
            :widgetHeight="treeHeight"
            :checkable="false"
            :draggable="false"
            :showHeatingSystem="true"
            :showHeatingSource="false"
            @onTreeSelect="onTreeSelect"
          >
          </heating-org-tree>
        </a-card>
      </a-col>
      <a-col span="20">
        <a-row :gutter="4">
          <a-col span="24">
            <div class="divBorder" style="width:100%;height:58px">
              <div style="height:10px"></div>
              <span class="divQuery">查询日期：</span><span class="divDateSelector"><date-selector @onDateChange="onDateChange"></date-selector></span>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="4" style="height:4px"></a-row>
        <a-row :gutter="4">
          <a-col span="24">
            <div class="divBorder" style="height:260px">
              <div>
                <a-i-trend-line
                  trendId="weatherLine"
                  :trendHeight="LineHeight"
                  :trendWidth="LineWidth"
                  :trendShowTitle="true"
                  :trendTitle="weatherLineTitle"
                  :showDataZoom="false"
                  :changeNullTo0="false"
                  ref="weatherLine"
                >
                </a-i-trend-line>
              </div>

            </div>
          </a-col>
        </a-row>
        <a-row style="height:4px"></a-row>
        <a-row :gutter="12">
          <a-col span="24">
            <div class="divBorder" style="height:260px">
              <div>
                <a-i-trend-line
                  trendId="twoGoTLine"
                  :trendHeight="LineHeight"
                  :trendWidth="LineWidth"
                  :trendShowTitle="true"
                  :trendTitle="weatherLineTitle"
                  :showDataZoom="false"
                  :changeNullTo0="false"
                  ref="twoGoTLine"
                >
                </a-i-trend-line>
              </div>

            </div>
          </a-col>
        </a-row>
        <a-row style="height:4px"></a-row>
        <a-row :gutter="12">
          <a-col span="24">
            <div class="divBorder" style="height:260px">
              <div>
                <a-i-trend-line
                  trendId="innerTempLine"
                  :trendHeight="LineHeight"
                  :trendWidth="LineWidth"
                  :trendShowTitle="true"
                  :trendTitle="weatherLineTitle"
                  :showDataZoom="false"
                  :changeNullTo0="false"
                  ref="innerTempLine"
                >
                </a-i-trend-line>
              </div>

            </div>
          </a-col>
        </a-row>
        <a-row style="height:4px"></a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import HeatingOrgTree from '@/components/smartheating/HeatingOrgTree'
import TrendLine from '@/components/smartheating/TrendLine'
import { getAction } from '@/api/manage'
import DateSelector from '@/components/smartheating/DateSelector'

import moment from 'moment'
import AITrendLine from './AITrendLine'
export default {
    name: 'AI',
    components: {
        HeatingOrgTree,
        DateSelector,
        TrendLine,
        AITrendLine
    },
    data () {
        return {
            treeHeight: '700px',
            weatherLineId: 'weatherLine',
            twoGoTLineId: 'towGoTLine',
            innerTempLineId: 'innerTempLine',
            weatherLineTitle: '室外温度',
            twoGoTTitle: '二次网出水温度',
            innerTempTitle: '室内温度',
            LineHeight: '250px',
            LineWidth: '98%',
            timeFormat: 'YYYY-MM-DD HH:mm:ss',
            dateFormat: 'YYYY-MM-DD',
            hourFormat: 'HH',
            url: {
                hourFrozen: '/hourfrozen/query',
                weather2: '/hourfrozen/weather2'
            },
            heatingSystemId: '',
            queryDate: '',
            weatherData: [],
            twoGoTDataList: [],
            innerTempDataList: []
        }
    },
    methods: {
        onDateChange (datevalue) {
            this.queryDate = moment(datevalue).format(this.dateFormat)
            if (this.heatingSystemId !== '') {
                this.showLines()
            }
        },
        onTreeSelect (selectedKeys, node) {
            if (node.dataRef.type === 5) {
                this.heatingSystemId = node.dataRef.itemid
                if (this.queryDate === '') {
                    this.queryDate = moment(new Date()).format(this.dateFormat)
                }
                this.showLines()
            }
        },
        showLines () {
            getAction(this.url.hourFrozen, { heatingSystemId: this.heatingSystemId, queryDate: this.queryDate }).then((res) => {
                if (res.success) {
                    let currentDate = moment(new Date()).format(this.dateFormat)
                    this.weatherData = []
                    this.twoGoTDataList = []
                    this.innerTempDataList = []
                    let weatherId = null
                    let index = 0
                    for (let i = 0; i < res.result.length; i++) {
                        this.weatherData.push({
                            valueTime: res.result[i].valueTime,
                            value1: res.result[i].forecast,
                            value2: res.result[i].realtime
                        })
                        this.twoGoTDataList.push({
                            valueTime: res.result[i].valueTime,
                            value1: res.result[i].twogotsetting,
                            value2: res.result[i].twogotvalue
                        })
                        this.innerTempDataList.push({
                            valueTime: res.result[i].valueTime,
                            value1: res.result[i].intempsetting,
                            value2: res.result[i].intempvalue
                        })
                        if (res.result[i].weatherId !== null) {
                            weatherId = res.result[i].weatherId
                            index = i
                        }
                        if (i === (res.result.length - 1) && currentDate === this.queryDate) {
                            getAction(this.url.weather2, { weatherId: weatherId }).then((res) => {
                                if (res.success) {
                                    for (let i = 0; i < res.result.length; i++) {
                                        this.weatherData[index + 1 + i].value1 = res.result[i].value === null ? null : parseInt(res.result[i].value)
                                    }
                                    this.showWeatherLine()
                                    this.showTwoGoTLine()
                                    this.showInnerTempLine()
                                }
                            })
                        }
                    }
                    console.log(this.weatherData)
                    this.showWeatherLine()
                    this.showTwoGoTLine()
                    this.showInnerTempLine()
                }
            })
        },
        showWeatherLine () {
            let weatherParam = []
            weatherParam.push({ name: '预测室外温度', linecolor: '#4bacc6' })
            weatherParam.push({ name: '实际室外温度', linecolor: '#9bbb59' })
            setTimeout(() => {
                this.$refs.weatherLine.drawLine('室外温度', weatherParam, this.weatherData)
            }, 100)
        },
        showTwoGoTLine () {
            let twoGoTParam = []
            twoGoTParam.push({ name: '二出温度设定值', linecolor: '#4bacc6' })
            twoGoTParam.push({ name: '二出温度实际值', linecolor: '#9bbb59' })
            setTimeout(() => {
                this.$refs.twoGoTLine.drawLine('二出温度', twoGoTParam, this.twoGoTDataList)
            }, 100)
        },
        showInnerTempLine () {
            let innerTempParam = []
            innerTempParam.push({ name: '室内温度设定值', linecolor: '#4bacc6' })
            innerTempParam.push({ name: '室内温度实际值', linecolor: '#9bbb59' })
            setTimeout(() => {
                this.$refs.innerTempLine.drawLine('室内温度', innerTempParam, this.innerTempDataList)
            }, 100)
        }
    }
}
</script>

<style scoped>
  .mainPanel {
    height: 850px;
    width: 100%;
    padding-top: 12px;
    padding-left: 12px;
    padding-bottom: 12px;
    padidng-right: 0px;
  }
  .divBorder {
      border-width: 1px;
      border-color: #E0E0E0;
      border-style: solid;
      background-color: #FFFFFF;
  }
  .divQuery {
      display: table-cell;
      vertical-align: middle;
      padding-left: 20px;
      width: 100px;
  }
  .divDateSelector {
      display: table-cell;
      vertical-align: middle;
      padding-left: 20px;
      text-align: left;
  }
</style>
