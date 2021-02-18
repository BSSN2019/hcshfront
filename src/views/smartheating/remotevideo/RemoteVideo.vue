<template>
  <div class="mainPanel">
    <a-row :gutter="4">
      <a-col span="4">
        <a-card title="选择站房" style="height:850px">
          <heating-org-tree
            :widgetHeight="treeHeight"
            :checkable="false"
            :draggable="false"
            :showHeatingSystem="false"
            @onTreeSelect="onTreeSelect">
          </heating-org-tree>
        </a-card>
      </a-col>
      <a-col span="20">
        <a-card title="视频监控" style="height:850px">
          <a-row :gutter="24">
            <a-col span="20">
              <iframe
                :src="videoUrl"
                width="100%"
                height="700"
                id="ysopen"
                allowfullscreen
              >
              </iframe>
            </a-col>
            <a-col span="4">
              <div class="entry1" v-for="item in channel" @click="channelClick(item.channel)">
                <a href="javascript:;">{{ item.name }}</a>
              </div>
              <div style="height:20px"></div>
            </a-col>
          </a-row>

        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import HeatingOrgTree from '@/components/smartheating/HeatingOrgTree'
import { getAction } from '@/api/manage'
export default {
    name: 'RemoteVideo',
    components: {
        HeatingOrgTree
    },
    data () {
        return {
            treeHeight: '700px',
            url: {
                sourceList: '/basicdata/heatingsource/query',
                stationList: '/basicdata/heatingstation/query',
                accessToken: '/sys/config/query'
            },
            videoURL: '',
            channel: [],
            deviceid: '',
            videoUrl: '',
            token: ''
        }
    },
    mounted () {
        this.getAccessToken()
    },
    methods: {
        getAccessToken () {
            getAction(this.url.accessToken, { id: '99' }).then((res) => {
                if (res.success) {
                    this.token = res.result[0].value
                }
            })
        },
        onTreeSelect (selectedKeys, node) {
            let type = node.dataRef.type
            let itemid = node.dataRef.itemid
            let url = ''
            if (type === 3) {
                url = this.url.sourceList
            } else if (type === 4) {
                url = this.url.stationList
            }

            if (url !== '') {
                getAction(url, { id: itemid }).then((res) => {
                    if (res.success) {
                        this.channel = []
                        if (res.result[0].videoid !== null) {
                            this.deviceid = res.result[0].videoid
                            for (let i = 0; i < res.result[0].videochannelnum; i++) {
                                this.channel.push({ name: '通道' + (i + 1), channel: i + 1 })
                            }
                        }
                    }
                })
            }
        },
        channelClick (item) {
            this.videoUrl = 'https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/' + this.deviceid + '/' + item + '.live&autoplay=0&audio=1&templete=2&accessToken=' + this.token
        }
    }
}
</script>

<style scoped>
  .entry1 {
    text-align:center;
    padding: 12px;
    border-color: #FFFFFF;
    border-width : 1px;
    border-style : solid;
    color: #0099CC;
    font-size: 13px;
    height: 64px;
  }
  .mainPanel {
    height: 850px;
    width: 100%;
    padding-top: 12px;
    padding-left: 12px;
    padding-bottom: 12px;
    padidng-right: 0px;
  }
</style>
