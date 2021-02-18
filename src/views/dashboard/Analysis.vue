<template>
  <div class="wholepage" :style="wholeHeight">
    <a-row :gutter="12">
      <a-col span="12">
        <div class="panel" :style="mapHeight">
          <div style="height:8px"></div>
          <div>
            <div class="panelFlag"></div><h1 class="panelTitle">连线地图</h1>
          </div>
          <div style="height:20px"></div>
          <div class="mapChart" :style="innerMapHeight">
            <div style="overflow: auto">
              <chart-map ref="mapLineChart"></chart-map>
            </div>
          </div>
        </div>
      </a-col>
      <a-col span="9">
        <div style="width:12px"></div>
        <div class="panel" :style="mapHeight">
          <div style="height:8px"></div>
          <div>
            <div class="panelFlag"></div><h1 class="panelTitle">项目概况</h1>
            <div style="height:20px"></div>
            <a-row>
              <a-col span="24">
                <a-carousel effect="fade" autoplay arrows class="carouselPanel">
                  <div style="height:380px" v-for="item in this.projectPos">
                    <a-row style="height:0px"></a-row>
                    <a-row>
                      <a-col span="1"></a-col>
                      <a-col span="22">
                        <div class="imgBorder">
                          <img :src="getImgView(item.introductImg)" style="width:100%">
                        </div>
                      </a-col>
                      <a-col span="1"></a-col>
                    </a-row>
                    <br><br><br><br><br>
                  </div>
                  <div
                    slot="prevArrow"
                    slot-scope="props"
                    class="custom-slick-arrow"
                    style="left: 30px; top:400px; z-index: 1"
                  >
                    <a-icon type="left-circle" />
                  </div>
                  <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 30px; top:400px; z-index: 1">
                    <a-icon type="right-circle" />
                  </div>
                </a-carousel>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
      <a-col span="3">
        <div class="listEntry">
          <a target="_blank" href="http://hwt.hcenergy.net:11713/#/">
            <img src="~@/assets/entry1.png" class="imageEntry" :style="imageHeight">
          </a>
        </div>
        <div class="imgSeperator">&nbsp;</div>
        <div class="listEntry">
          <a target="_blank" href="http://60.30.137.2:11726/#/">
            <img src="~@/assets/entry2.png" class="imageEntry" :style="imageHeight">
          </a>
        </div>
        <div class="listEntry">
          <a target="_blank" href="http://hwt.hcenergy.net:11715/login">
            <img src="~@/assets/entry3.png" class="imageEntry" :style="imageHeight">
          </a>
        </div>
        <div class="listEntry">
          <a target="_blank" href="http://hwt.hcenergy.net:11716/admin/login">
            <img src="~@/assets/entry4.png" class="imageEntry" :style="imageHeight">
          </a>
        </div>
        <div class="listEntry">
          <a target="_blank" href="http://hwt.hcenergy.net:11713/#/">
            <img src="~@/assets/entry5.png" class="imageEntry" :style="imageHeight">
          </a>
        </div>
      </a-col>
    </a-row>
    <a-row style="height:4px"></a-row>
    <a-row :gutter="8">
      <a-col span="24">
        <div class="panelWeather" :style="weatherHeight">
          <div style="height:12px"></div>
          <div>
            <div class="panelFlag"></div><h1 class="panelTitle">天气预报</h1>
          </div>
          <div class="innerWeather">
            <weather-day-forecast></weather-day-forecast>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import WeatherDayForecast from '../../components/weather/WeatherDayForecast'
import { getAction, getFileAccessHttpUrl } from '@/api/manage'
import ChartMap from '../../components/smartheating/ChartMap'
import { BssnListMixin } from '../../mixins/BssnListMixin'

export default {
    name: 'Analysis',
    mixins: [BssnListMixin],
    components: {
        WeatherDayForecast,
        ChartMap
    },
    data () {
        return {
            projectPos: [],
            url: {
                project: '/basicdata/heatingproject/query',
                config: '/sys/config/query',
                list: 'basicdata/heatingproject/list'
            },
            // 地图相关属性
            center: { lng: 117.133989, lat: 39.068889 },
            zoom: 12,
            map: {
                width: '100%',
                height: '600px'
            },
            mapStyle: {
                style: 'googlelite'
            },
            linesData: [],
            wholeHeight: { height: '' },
            mapHeight: { height: '' },
            weatherHeight: { height: '' },
            innerMapHeight: { height: '' },
            imageHeight: { height: '' },
            box1Height: { height: '' },
            ipagination: {
                current: 1,
                pageSize: 5,
                showTotal: (total, range) => {
                    return range[0] + '-' + range[1] + ' 共' + total + '条'
                },
                showQuickJumper: false,
                showSizeChanger: false,
                total: 0
            },
            columns: [
                {
                    title: '序号',
                    dataIndex: '',
                    key: 'rowIndex',
                    align: 'center',
                    customRender: function (t, r, index) {
                        return parseInt(index) + 1
                    },
                    width: 60
                },
                {
                    title: '名称',
                    align: 'center',
                    dataIndex: 'name'
                },
                {
                    title: '供热面积(㎡)',
                    align: 'right',
                    dataIndex: 'heatingarea',
                    width: '30%'
                }
            ],
            dataList: [
                { value: 59.00, name: '污水源', percent: 10.67 },
                { value: 177.93, name: '天然气', percent: 32.17 },
                { value: 95.98, name: '地热井', percent: 17.35 },
                { value: 220.14, name: '趸   热', percent: 39.80 }
            ]
        }
    },
    created () {
        window.addEventListener('resize', this.getHeight)
        this.getHeight()
    },
    mounted () {
        this.initProject()
    },
    methods: {
        loadAfter () {
            for (let i = 0; i < this.dataSource.length; i++) {
                this.dataSource[i].heatingarea = this.dataSource[i].heatingarea.toString().replace(/\d(?=(?:\d{3})+\b)/g, '$&,')
            }
        },
        getHeight () {
            let height = window.innerHeight - 10
            this.wholeHeight.height = height + 'px'
            this.mapHeight.height = height * 0.6 + 'px'
            this.box1Height.height = (height * 0.6 - 50) + 'px'
            this.weatherHeight.height = height * 0.31 + 'px'
            /*
            this.imageHeight.height = (height * 0.6 * 0.2 + 12) + 'px'
*/
        },
        initProject () {
            this.heatingSources = []
            getAction(this.url.project, { orderBy: 'code', active: 1 }).then((res) => {
                if (res.success) {
                    for (let i = 0; i < res.result.length; i++) {
                        if (res.result[i].introductimg !== null) {
                            this.projectPos.push({
                                name: res.result[i].name,
                                code: res.result[i].code,
                                lng: res.result[i].longitude,
                                lat: res.result[i].latitude,
                                area: res.result[i].heatingarea / 10000,
                                introductImg: res.result[i].introductimg

                            })
                        }
                    }
                }
            })
        },
        getImgView (text) {
            if (text && text.indexOf(',') > 0) {
                text = text.substring(0, text.indexOf(','))
            }
            return getFileAccessHttpUrl(text)
        },
        initMap ({ BMap, map }) {
            getAction(this.url.config, { name: 'mapcenterlng' }).then((res) => {
                if (res.success) {
                    this.center.lng = res.result[0].value
                } else {
                    this.center.lng = 117.054211
                }
            })
            getAction(this.url.config, { name: 'mapcenterlat' }).then((res) => {
                if (res.success) {
                    this.center.lat = res.result[0].value
                } else {
                    this.center.lat = 39.123662
                }
            })
            getAction(this.url.config, { name: 'mapzoom' }).then((res) => {
                if (res.success) {
                    this.center.zoom = res.result[0].value
                } else {
                    this.center.zoom = 12
                }
            })
        },
        array2obj (array, key) {
            let resObj = {}
            for (let i = 0; i < array.length; i++) {
                resObj[array[i][key]] = array[i]
            }
            return resObj
        }
    }
}
</script>
<style lang="less">
  .ant-table-bordered .ant-table-header > table, .ant-table-bordered .ant-table-body > table, .ant-table-bordered .ant-table-fixed-left table, .ant-table-bordered .ant-table-fixed-right table {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
  }
</style>
<style lang="less" scoped>
  .table_info {
    & /deep/ .ant-table-thead > tr > th {
      background-color: rgba(255,255,255,0.19);
      color: #FFFFFF;
      border: 0px;
    }
    & /deep/ .ant-table-tbody > tr > td {
      color: #FFFFFF;
      background-color: #33415B;
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 1px solid #666666;
    }
    & /deep/ .ant-table .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
      background: rgba(255,255,255,0.19);
    }
    & /deep/ .ant-pagination-total-text {
      color: #FFFFFF;
    }
    & /deep/ .ant-pagination-item a {
      background-color: #33415B;
      color: #FFFFFF;
    }
    & /deep/ .ant-pagination-item-active {
      background-color: #33415B;
      border-color: #FFFFFF;
      color: #FFFFFF;
    }
    & /deep/ .ant-pagination-item-active a {
      background-color: #33415B;
      color: #FFFFFF;
    }

    & /deep/ .ant-pagination-item-link {
      background-color: rgba(0,0,0,0.1);
      color: #FFFFFF;
    }
    & /deep/ .a {
      background-color: #33415B;
      color: #FFFFFF;
    }
 }

  .carouselPanel {
    & /deep/ .ant-carousel .slick-slide {
      text-align: center;
      height: 160px;
      line-height: 160px;
      background: #364d79;
      overflow: hidden;
    }

    & /deep/ .ant-carousel .slick-slide h3 {
      color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  /deep/ .ant-carousel .slick-slide {
    text-align: center;
    height: 500px;
    line-height: 160px;
    overflow: hidden;
  }

  /deep/ .ant-carousel .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    opacity: 0.3;
  }
  /deep/ .ant-carousel .custom-slick-arrow:before {
    display: none;
  }
  /deep/ .ant-carousel .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  /deep/ .ant-carousel .slick-slide h3 {
    color: #fff;
  }
  .wholepage {
    background-color: #000000;
    padding: 12px;
    margin: 0px;
  }
  .panel {
    background-color: #33415B;
    border-radius: 5px;
    padding: 0px;
    margin: 0px;
  }
  .panelWeather {
    background-color: #33415B;
    border-radius: 5px;
  }
  .panelFlag {
    height: 32px;
    background-color: #2eabff;
    width: 6px;
    vertical-align: middle;
    float: left;
    margin-right: 12px;
  }
  .panelTitle {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    text-align: left;
    height: 32px;
    padding-left: 12px;
    font-size: larger;
    display: table-cell;
    vertical-align: middle;
    color: #FFFFFF;
  }
  .imageEntry {
    width: 197px;
    height: 101px;
    display:block;
    margin-bottom: 12px;
  }
  .listEntry {
    list-style: none;
    float: left;
    width: 200px;
    overflow: hidden;
  }
  .imgSeperator {
    height: 12px;
  }
  .mapChart {
    background-color: #33415B;
  }
  .innerWeather {
    margin: 20px;
    padding: 0px;
    width: 98%;
  }
  .projectBox1 {
    width: 100%;
    border: 1px;
    border-color: #666666;
    border-style: solid;
    padding-left:20px;
    padidng-bottom:10px;
    padding-right: 10px;
    padding-top: 20px;
    margin-top: 0px;
    margin-left: 16px;
    margin-right: 10px;
    margin-bottom: 10px;
    height: 495px;
    border-radius: 6px;
  }
  .projectBox2 {
    width: 95%;
    border: 1px;
    border-color: #666666;
    border-style: solid;
    padding-left:20px;
    padidng-bottom:10px;
    padding-right: 10px;
    padding-top: 20px;
    margin-top: 0px;
    margin-left: 16px;
    margin-right: 10px;
    margin-bottom: 10px;
    height: 495px;
    border-radius: 6px;
  }
  .projectTitle1 {
    color: #ffffff;
    font-size: 100%;
  }
  .projectValue1 {
    color: #ffffff;
    font-size: 300%;
  }
  .projectTitle2 {
    color: #ffffff;
    font-size: normal;
  }
  .projectValue2 {
    padding-top: 16px;
    color: #ffffff;
    font-size: 200%;
  }
  .projectLineTitle {
    padding-top: 16px;
    color: #ffffff;
    font-size: 150%;
    height: 60px;
    padding-bottom: 16px;
  }
  .projectLineContent {
    padding-top: 16px;
    color: #ffffff;
    font-size: 120%;
  }
  .imgBorder {
    border-color: #FFFFFF;
    border-width: 5px;
    border-style: solid;
  }

</style>
