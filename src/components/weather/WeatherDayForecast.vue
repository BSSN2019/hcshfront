<template>
  <div class="wholePanel">
    <a-row :gutter="12">
      <a-col span="3">
        <div class="weatherPanel">
          <div class="dateTitle">实时天气</div>
          <div class="weather"><img :src="this.realTime.wticon" style="width:40px;height:30px"></div>
          <div class="weatherText">{{ this.realTime.wtnm }}</div>
          <div class="weatherText">{{ this.realTime.wttemp }}℃</div>
          <div class="weatherText">{{ this.realTime.wtwindnm }}</div>
          <div class="weatherText">{{ this.realTime.wtwinp }}</div>
        </div>
      </a-col>
      <div v-for="item in this.weatherDayForecastItem">
        <a-col span="3">
          <div class="weatherPanel">
            <div class="dateTitle">{{ item.forecastday }}</div>
            <div class="weather">
              <img :src="item.wticon1" style="width:40px;height:30px">
              <a-divider type="vertical"></a-divider>
              <img :src="item.wticon2" style="width:40px;height:30px">
            </div>
            <div class="weatherText">
              {{ item.wtnm1 }}<a-divider type="vertical"></a-divider>{{ item.wtnm2 }}
            </div>
            <div class="weatherText">
              {{ item.wttemp1 }}℃<a-divider type="vertical"></a-divider>{{ item.wttemp2 }}℃
            </div>
            <div class="weatherText">
              {{ item.wtwindnm1 }}<a-divider type="vertical"></a-divider>{{ item.wtwindnm2 }}
            </div>
            <div class="weatherText">
              {{ item.wtwinpnm1 }}<a-divider type="vertical"></a-divider>{{ item.wtwinpnm2 }}
            </div>
          </div>
        </a-col>
      </div>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
import { getAction } from '@/api/manage.js'

export default {
    name: 'WeatherDayForecast',
    components: {

    },
    data () {
        return {
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'YYYY-MM-DD HH:mm:ss',
            weatherDayForecastItem: [],
            realTime: {
                wticon: '',
                wtnm: '',
                wttemp: '',
                wtwindnm: '',
                wtwinp: ''
            },
            url: {
                realtime: '/weather/realtime/query',
                day: '/weather/day/query'
            }
        }
    },
    mounted () {
        this.getWeatherRealtime()
        this.getWeatherDayForecastItem()
    },
    methods: {
        getWeatherDayForecastItem () {
            getAction(this.url.day, { queryDate: moment(new Date()).format(this.dateFormat) }).then(res => {
                if (res.success) {
                    console.log(res.result)
                    for (let i = 0; i < res.result.length; i++) {
                        this.weatherDayForecastItem.push({
                            forecastday: moment(res.result[i].forecastday).format(this.dateFormat),
                            wticon1: require('../../assets/weather/' + res.result[i].wticon1 + '.png'),
                            wticon2: require('../../assets/weather/' + res.result[i].wticon2 + '.png'),
                            wtnm1: res.result[i].wtnm1,
                            wtnm2: res.result[i].wtnm2,
                            wttemp1: res.result[i].wttemp1,
                            wttemp2: res.result[i].wttemp2,
                            wtwindnm1: res.result[i].wtwindnm1,
                            wtwindnm2: res.result[i].wtwindnm2,
                            wtwinpnm1: res.result[i].wtwinpnm1,
                            wtwinpnm2: res.result[i].wtwinpnm2
                        })
                    }
                }
            })
        },
        getWeatherRealtime () {
            getAction(this.url.realtime, { queryDate: moment(new Date()).format(this.dateFormat) }).then(res => {
                if (res.success) {
                    this.realTime.wticon = require('../../assets/weather/' + res.result[0].wticon + '.png')
                    this.realTime.wtnm = res.result[0].wtnm
                    this.realTime.wttemp = res.result[0].wttemp
                    this.realTime.wtwindnm = res.result[0].wtwindnm
                    this.realTime.wtwinp = res.result[0].wtwinp + '级'
                }
            })
        }
    }
}
</script>

<style scoped>
  .wholePanel {
    text-align:center;
    border-color: #000000;
    border-width : 1px;
    border-style : none;
  }
  .weatherText {
    text-align:center;
    color: #FFFFFF;
    padding-top: 8px;
  }
  .dateTitle {
    font-size: 16px;
    font-weight: bolder;
    text-align:center;
    margin-bottom:8px;
    height:32px;
    color: #FFFFFF;
  }
  .weatherPanel {
    background-color: rgba(208,229,237,0.1);
    height: 220px;
    padding: 10px;
  }
  .weatherDivider {
    background-color: #FFFFFF;
    height: 250px;
    width: 8px;
  }
</style>
