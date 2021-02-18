<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
  >
    <a-spin :spinning="confirmLoading">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-descriptions :size="descriptionSize" bordered :column="1">
            <a-descriptions-item label="报警时间">{{ model.alarmTime }}</a-descriptions-item>
            <a-descriptions-item label="供热系统">{{ model.heatingSystemName }}</a-descriptions-item>
            <a-descriptions-item label="报警参数">{{ model.parameterName }}</a-descriptions-item>
            <a-descriptions-item label="报警类别">{{ model.alarmCategory }}</a-descriptions-item>
            <a-descriptions-item label="监测数值">{{ model.monitoringValue }}{{ model.parameterUnit }}</a-descriptions-item>
            <a-descriptions-item label="越限类型">{{ model.overLimitType }}</a-descriptions-item>
            <a-descriptions-item label="门限值">{{ model.limitValue }}</a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-spin>
  </a-drawer>
</template>
<script>
import pick from 'lodash.pick'
import { getAction } from '@/api/manage'

export default {
    name: 'HistoryAlarmDetailDrawer',
    components: {},
    data () {
        return {
            title: '查看报警详情',
            drawerWidth: 800,
            visible: false,
            confirmLoading: false,
            descriptionSize: 'default',
            url: {
                alarmHist: '/dataValue/alarmData/historyInfo'
            },
            model: {
              alarmTime: '',
              heatingSystemName: '',
              alarmCategory: '',
              parameterName: '',
              monitoringValue: '',
              parameterUnit: '',
              overLimitType: '',
              limitValue: ''
            }
        }
    },
    created () {
    },
    methods: {
        show (alarmHistId) {
            this.title = '查看报警详情'
            getAction(this.url.alarmHist, { alarmHistId: alarmHistId }).then((res) => {
                if (res.success) {
                    console.log(res.result)
                    this.model.alarmTime = res.result.alarmtime
                    this.model.heatingSystemName = res.result.heatingsystemname
                    this.model.alarmCategory = res.result.alarmcategory
                    this.model.parameterName = res.result.parametername
                    this.model.monitoringValue = res.result.monitoringvalue
                    this.model.parameterUnit = res.result.parameterUnit
                    if(res.result.overlimittype === '1') { this.model.overLimitType='越高高限' }
                    else if(res.result.overlimittype === '2') { this.model.overLimitType = '越高限' }
                    else if(res.result.overlimittype === '3') { this.model.overLimitType = '越低限' }
                    else {this.model.overLimitType = '越低低限'}
                    this.model.limitValue = res.result.limitvalue
                }
            })
            this.visible = true
        },
        close () {
            this.$emit('close')
            this.visible = false
        },
        handleCancel () {
            this.close()
        }
    }
}
</script>

<style scoped>

</style>
