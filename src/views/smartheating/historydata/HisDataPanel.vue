<template>
  <div>
    <a-card style="height:425px" :title="title">
      <date-selector slot="extra" @onDateChange="onDateChange" ref="dateSelector"></date-selector>
      <div style="width:100%">
        <multi-trend-line
          :trendId="trendId"
          :trendHeight="trendHeight"
          :ref="trendId"
          :trendLegendVisible="true"
        >
        </multi-trend-line>
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { getAction } from '@/api/manage'
import DateSelector from '@/components/smartheating/DateSelector'
import MultiTrendLine from './MultiTrendLine'
export default {
    name: 'HisDataPanel',
    components: {
        MultiTrendLine,
        DateSelector
    },
    props: {
        title: {
            type: String,
            default: '',
            required: true
        },
        trendId: {
            type: String,
            default: 'lineChart',
            required: true
        },
        trendHeight: {
            type: String,
            default: '400px',
            required: true
        },
        groupId: {
            type: Number,
            default: 1,
            required: true
        }
    },
    data () {
        return {
            dateFormat: 'YYYY-MM-DD',
            url: {
                parameter: '/sys/parameter/station/queryhisdata',
                heatingSystem: '/basicdata/heatingsystem/query',
                stationValue: '/dataValue/tsValue/station/querysystemdayvalues',
                sourceValue: '/dataValue/tsValue/source/querysystemdayvalues'
            },
            series: [],
            parameters: [],
            lineColors: [],
            heatingSystemId: ''
        }
    },
    methods: {
        /***
         * @description 针对指定Panel，获取指定换热站、指定日期的所有历史数据参数的监测值
         * @param heaingSystemId,供热系统Id
         * @param queryDate 查询日期
         * */
        showLine (heatingSystemId, queryDate) {
            this.heatingSystemId = heatingSystemId
            /** 根据GroupId获取需要显示的参数 */
            let param = { heatingSystemId: heatingSystemId, groupId: this.groupId }
            this.parameters = []
            this.series = []
            this.lineColors = []
            getAction(this.url.parameter, param).then((res) => {
                if (res.success && res.result.length > 0) {
                    let deviceType = res.result[0].devicetype
                    let fields = ''
                    for (let i = 0; i < res.result.length; i++) {
                        this.parameters.push({
                            code: res.result[i].code,
                            group: res.result[i].hisdatagroup,
                            name: res.result[i].name,
                            linecolor: res.result[i].linecolor
                        })
                        this.series.push(res.result[i].name)
                        this.lineColors.push(res.result[i].linecolor)
                        if (fields !== '') {
                            fields += ','
                        }
                        fields += res.result[i].code
                    }
                    let url = ''
                    if (deviceType === 'station') {
                        url = this.url.stationValue
                    } else {
                        url = this.url.sourceValue
                    }
                    // 根据参数、供热系统Id、查询日期 获取曲线数据
                    let param = {
                        heatingSystemId: heatingSystemId,
                        queryDate: queryDate,
                        fields: fields
                    }
                    getAction(url, param).then((res) => {
                        if (res.success) {
                            let lineDatas = []
                            for (let paramIndex = 0; paramIndex < this.parameters.length; paramIndex++) {
                                let lineData = []
                                for (let dataIndex = 0; dataIndex < res.result.length; dataIndex++) {
                                    let val = res.result[dataIndex]
                                    lineData.push({
                                        valueTime: moment(val['time']).utcOffset(0).format(this.timeFormat),
                                        value: val[this.parameters[paramIndex].code]
                                    })
                                }
                                lineDatas.push(lineData)
                            }
                            this.$refs[this.trendId].drawLine('', this.series, this.lineColors, lineDatas)
                            this.$refs.dateSelector.setDate(queryDate)
                        }
                    })
                }
            })

            // 显示曲线数据
        },
        onDateChange (datevalue) {
            this.showLine(this.heatingSystemId, moment(datevalue).format(this.dateFormat))
        }
    }
}
</script>

<style scoped>

</style>
