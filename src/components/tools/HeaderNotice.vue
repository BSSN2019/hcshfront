<template>
  <div>
    <span @click="handleClick" class="header-notice">
      <a-badge :count="this.alarmCount">
        <a-icon style="font-size: 16px; padding: 4px" type="alert" />
      </a-badge>
    </span>
    <alarm-list-modal ref="listForm"></alarm-list-modal>
  </div>
</template>

<script>
import store from '@/store/'
import { getAction } from '@/api/manage'
import AlarmListModal from '../../views/smartheating/historyalarm/modules/AlarmListModal'

export default {
    name: 'HeaderNotice',
    components: {
        AlarmListModal
    },
    data () {
        return {
            loadding: false,
            url: {
                currentAlarmCount: '/dataValue/alarmData/currentCount'
            },
            hovered: false,
            stopTimer: false,
            websock: null,
            lockReconnect: true,
            heartCheck: null,
            formData: {},
            openPath: '',
            myTimer: null,
            alarmCount: 0,
            audio: null
        }
    },
    computed: {
    },
    mounted () {
        // this.initWebSocket()
        this.fetchAlarmCount()
        this.myTimer = setInterval(() => {
            this.fetchAlarmCount()
        }, 60 * 1000)
    },
    destroyed: function () {
        // this.websocketOnclose()
        clearInterval(this.myTimer)
    },
    methods: {
        handleClick () {
            this.$refs.listForm.show()
        },
        fetchAlarmCount () {
            console.log('fetchAlarmCount')
            getAction(this.url.currentAlarmCount, null).then(res => {
                let that = this
                if (res.success) {
                    this.alarmCount = res.result
                }
            })
        },
        fetchNotice () {
            if (this.loadding) {
                this.loadding = false
                return
            }
            this.loadding = true
            setTimeout(() => {
                this.loadding = false
            }, 200)
        },
        modalFormOk () {
        },
        handleHoverChange (visible) {
            this.hovered = visible
        },
        initWebSocket: function () {
            // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
            var userId = store.getters.userInfo.id
            var url = window._CONFIG['domianURL'].replace('https://', 'wss://').replace('http://', 'ws://') + '/websocket/' + userId
            this.websock = new WebSocket(url)
            this.websock.onopen = this.websocketOnopen
            this.websock.onerror = this.websocketOnerror
            this.websock.onmessage = this.websocketOnmessage
            this.websock.onclose = this.websocketOnclose
        },
        websocketOnopen: function () {
            console.log('WebSocket连接成功')
        },
        websocketOnerror: function (e) {
            console.log('WebSocket连接发生错误')
            this.reconnect()
        },
        websocketOnmessage: function (e) {
            console.log('-----接收消息-------', e.data)
            var data = eval('(' + e.data + ')')
            if (data.msgType === 'alarmdata') {
                let alarmDataId = data.msgId
                this.alarmCount++
            }
        },
        websocketOnclose: function (e) {
            this.reconnect()
        },
        websocketSend (text) { // 数据发送
            try {
                this.websock.send(text)
            } catch (err) {
                console.log('send failed (' + err.code + ')')
            }
        },

        reconnect () {
            var that = this
            if (that.lockReconnect) return
            that.lockReconnect = true
            // 没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function () {
                console.info('尝试重连...')
                that.initWebSocket()
                that.lockReconnect = false
            }, 5000)
        }
    }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
