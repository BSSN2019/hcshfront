<template>
  <div>
    <div v-bind:id="trendId" v-bind:style="{width: trendWidth , height: trendHeight}"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {getAction} from '@/api/manage'

  export default {
    name: 'TrendLine2Y',
    components: {
      echarts,
    },
    props: {
      trendId:{
        type: String,
        default: "trendline",
        required: true,
      },
      trendTitle: {
        type: String,
        default: '',
        required: false
      },
      trendWidth: {
        type: String,
        default: "99%",
        required: false
      },
      trendHeight: {
        type: String,
        default: "250px",
        required: false
      },
      trendLineSmooth:{
        type: Boolean,
        default: true,
        required: false
      },
      trendXAxisName:{
        type: String,
        default: "时间",
        required: false,
      },
      trendY1AxisName:{
        type: String,
        default: "数值",
        required: false,
      },
      trendY2AxisName:{
        type: String,
        default: "数值",
        required: false,
      },
      trendXAxisRotate:{
        type: Number,
        default: 0,
        required: false
      },
      trendShowTitle:{
        type: Boolean,
        default: true,
        required: false
      },
      trendLegendVisible:{
        type: Boolean,
        default: false,
        required: false
      },
      trendLine1Color:{
        type: String,
        default: "#FF3366",
        require: false
      },
      trendLine2Color:{
        type: String,
        default: "#FF3366",
        require: false
      },
      chartType:{
        type: String,
        default: "line",
        require: false
      },
      changeNullTo0: {
        type: Boolean,
        defalut: false,
        require: false
      }
    },
    data(){
      return {
        url: {
          parameterurl: "/system/sysmonparam/getparamlistbyid",
        },

        trendSymbolSize: 10,
        trendChart: null,

        chartLegend: {show:this.trendLegendVisible,data:[]},
        chartTitle: {text: this.trendTitle, left:'center', show: this.trendShowTitle},
        charttooltip: {trigger: 'axis'},
        chartgrid:{left: '50px', right: '50px', top: '10px', bottom: '40px'},
        chartXAxis:{
          type: 'category',
          name: '时间',
          axisLabel: {show: true, rotate:this.trendXAxisRotate, textStyle:{color:"#999999"}},
          axisLine: {lineStyle: {color:"#999999",width: 1}},
          data: []
        },
        chartYAxis:[
          {
            type: 'value',
            name: "能耗",
            axisLabel: {show: true, textStyle:{color:"#999999"}},
            axisLine: {lineStyle: {color:"#999999",width: 1}},
          },
          {
            type: 'value',
            name: "室外温度",//this.trendYAxisName,
            axisLabel: {show: true, textStyle:{color:"#999999"}},
            axisLine: {lineStyle: {color:"#999999",width: 1}},
          }
        ],
        chartSeries: [
          {
            type: this.chartType,
            smooth: this.trendLineSmooth,
            symbolSize: 8,
            lineStyle:{color:this.trendLineColor,width: 3},
            itemStyle:{borderWidth: 1, borderColor: this.trendLineColor, color: this.trendLineColor},
            data: []
          },
          {
            type: this.chartType,
            smooth: this.trendLineSmooth,
            symbolSize: 8,
            lineStyle:{color:this.trendLineColor,width: 3},
            itemStyle:{borderWidth: 1, borderColor: this.trendLineColor, color: this.trendLineColor},
            data: []
          }

        ],

        chartSeriesTemp: {
          type: 'line',
          smooth: this.trendLineSmooth,
          symbolSize: 8,
          lineStyle:{color:this.trendLineColor,width: 3},
          itemStyle:{borderWidth: 1, borderColor: this.trendLineColor, color: this.trendLineColor},
          data: []
        },
        lineXData: [],
        lineYData: [],

        chartOption: {},
      }
    },
    created()
    {

    },
    mounted() {

    },
    watch:{
      chartOption: {
        handler(newVal, oldVal) {
          if (this.trendChart) {
            if (newVal) {
              this.trendChart.setOption(newVal);
            } else {
              this.trendChart.setOption(oldVal);
            }
          } else {
            this.initChart();
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
    methods:{
      initChart()
      {
        this.trendChart = this.$echarts.init(document.getElementById(this.trendId));
      },

      drawLine(url,param)
      {
      },

    },
  }
</script>

<style scoped>

</style>