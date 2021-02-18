<template>
  <div class="mainPanel">
    <a-row :gutter="4">
      <a-col span="4">
        <a-card title="选择供热系统" style="height:870px">
          <heating-org-tree
            :widgetHeight="treeHeight"
            :checkable="true"
            :draggable="false"
            :level="2"
            @onTreeSelect="onTreeSelect"
            @onTreeCheck="onTreeCheck"
          ></heating-org-tree>
        </a-card>
      </a-col>
      <a-col span="20">
        <a-card title="运行调度" style="height:870px">
          <a-table
            ref="table"
            size="middle"
            rowKey="heatingSystemId"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="ipagination"
            :scroll="{ y: 650 }"
            @change="handleTableChange">
            <template slot="communicationRenderStatus" slot-scope="communicationstatus">
              <a-tag v-if="communicationstatus==1" color="green">正常</a-tag>
              <a-tag v-if="communicationstatus==0" color="red">中断</a-tag>
            </template>
            <template slot="isAuto" slot-scope="isAuto">
              <a-tag v-if="isAuto === '1'" color="green">自动</a-tag>
              <a-tag v-if="isAuto === '0'" color="red">手动</a-tag>
            </template>
            <span slot="action" slot-scope="text, record">
              <!--
              <a v-if="record.isAuto === '0' && record.hasright === 1 " @click="handleEdit(record)">设定</a>
-->
              <a v-if="record.isAuto === '0'" @click="handleEdit(record)">设定</a>
            </span>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <scheduling-modal ref="modalForm" @ok="modalFormOk"></scheduling-modal>
  </div>
</template>

<script>
import HeatingOrgTree from '@/components/smartheating/HeatingOrgTree'
import { getAction } from '@/api/manage'
import SchedulingModal from './SchedulingModal'
export default {
    name: 'Scheduling',
    components: {
        HeatingOrgTree,
        SchedulingModal
    },
    data () {
        return {
            treeHeight: '750px',
            description: '运行调度',
            dataSource: [],
            // 表头
            columns: [
                {
                    title: '自动',
                    align: 'center',
                    dataIndex: 'isAuto',
                    scopedSlots: { customRender: 'isAuto' },
                    filters: [
                        { text: '自动', value: '1' },
                        { text: '手动', value: '0' }
                    ],
                    onFilter: (value, record) => record.isAuto === value,
                    width: '70px'
                },
                {
                    title: '通讯',
                    align: 'center',
                    dataIndex: 'communicationstatus',
                    scopedSlots: { customRender: 'communicationRenderStatus' },
                    filterMultiple: false,
                    filters: [
                        { text: '正常', value: '1' },
                        { text: '中断', value: '0' }
                    ],
                    onFilter: (value, record) => record.communicationstatus === value,
                    width: '70px'
                },
                {
                    title: '站房',
                    align: 'center',
                    dataIndex: 'stationname',
                    width: '15%'
                },
                {
                    title: '系统',
                    align: 'center',
                    dataIndex: 'heatingsystem',
                    width: '15%'
                },
                {
                    title: '设定参数',
                    align: 'center',
                    dataIndex: 'settingparamname',
                    width: '20%'
                },
                {
                    title: '参数值',
                    align: 'center',
                    dataIndex: 'settingvalue',
                    width: '15%'
                },
                {
                    title: '参数值反馈',
                    align: 'center',
                    dataIndex: 'feedbackvalue',
                    width: '15%'
                },
                {
                    title: '二网供温',
                    align: 'center',
                    dataIndex: 'twogotemp',
                    width: '10%'
                },
                {
                    title: '二网回温',
                    align: 'center',
                    dataIndex: 'twobacktemp',
                    width: '10%'
                },
                {
                    title: '二网回压',
                    align: 'center',
                    dataIndex: 'twobackp',
                    width: '10%'
                },
                {
                    title: '水箱液位',
                    align: 'center',
                    dataIndex: 'waterlevel',
                    width: '10%'
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: 'center',
                    scopedSlots: { customRender: 'action' },
                    width: '100px'
                }
            ],
            ipagination: {
                current: 1,
                pageSize: 200,
                showTotal: (total, range) => {
                    return range[0] + '-' + range[1] + ' 共' + total + '条'
                },
                showQuickJumper: false,
                showSizeChanger: false,
                total: 0
            },
            /* 排序参数 */
            isorter: {
                column: 'code',
                order: 'asc'
            },
            /* table加载状态 */
            loading: false,
            /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
            queryParam: {},
            url: {
                list: '/basicdata/heatingsystem/list',
                schedulinglist: '/scheduling/query'
            },
            selectedSystemIds: []
        }
    },
    mounted () {
        setInterval(() => {
            this.refreshData()
        }, 60 * 1000)
    },

    methods: {
        loadData (arg) {
            this.dataSource = []
            this.ipagination.current = 1
        },
        onTreeSelect (selectedKeys) {
        },
        onTreeCheck (checkedKeys, isAdd, heatingSystemIds) {
            if (isAdd) {
                for (let i = 0; i < heatingSystemIds.length; i++) {
                    this.selectedSystemIds.push(heatingSystemIds[i].id)
                }
            } else {
                for (let i = 0; i < heatingSystemIds.length; i++) {
                    for (let j = 0; j < this.selectedSystemIds.length; j++) {
                        if (this.selectedSystemIds[j] == heatingSystemIds[i].id) {
                            this.selectedSystemIds.splice(j, 1)
                            j = j - 1
                        }
                    }
                }
            }
            this.updateTable()
        },
        updateTable () {
            if (this.selectedSystemIds.length > 0) {
                let ids = ''
                for (let i = 0; i < this.selectedSystemIds.length; i++) {
                    if (ids !== '') {
                        ids += ','
                    }
                    ids += this.selectedSystemIds[i].toString()
                }
                getAction(this.url.schedulinglist, { heatingSystemIds: ids }).then(res => {
                    if (res.success) {
                        console.log(res.result)
                        this.dataSource = []
                        for (let i = 0; i < res.result.length; i++) {
                            let twoGoTemp = ''
                            let twoBackTemp = ''
                            let twoBackP = ''
                            let waterLevel = ''
                            let feedbackvalue = ''
                            if (res.result[i].twogotemp !== null) {
                                twoGoTemp = res.result[i].twogotemp.toFixed(2).toString()
                            }
                            if (res.result[i].twobacktemp !== null) {
                                twoBackTemp = res.result[i].twobacktemp.toFixed(2).toString()
                            }
                            if (res.result[i].twobackp !== null) {
                                twoBackP = res.result[i].twobackp.toFixed(2).toString()
                            }
                            if (res.result[i].waterlevel !== null) {
                                waterLevel = res.result[i].waterlevel.toFixed(2).toString()
                            }
                            if (res.result[i].feedbackvalue !== null) {
                                feedbackvalue = res.result[i].feedbackvalue.toFixed(2).toString()
                            }
                            this.dataSource.push({
                                heatingSystemId: res.result[i].id,
                                isAuto: res.result[i].isAuto,
                                communicationstatus: res.result[i].communicationstatus,
                                settingparam: res.result[i].settingparam,
                                stationname: res.result[i].stationname,
                                heatingsystem: res.result[i].heatingsystem,
                                settingparamname: res.result[i].settingparamname,
                                settingvalue: res.result[i].settingvalue,
                                feedbackvalue: feedbackvalue,
                                twogotemp: twoGoTemp,
                                twobacktemp: twoBackTemp,
                                twobackp: twoBackP,
                                waterlevel: waterLevel,
                                hasright: res.result[i].hasright
                            })
                        }
                    }
                })
            } else {
                this.dataSource = []
            }
        },
        refreshData () {
            if (this.selectedSystemIds.length > 0) {
                let ids = ''
                for (let i = 0; i < this.selectedSystemIds.length; i++) {
                    if (ids !== '') {
                        ids += ','
                    }
                    ids += this.selectedSystemIds[i].toString()
                }
                getAction(this.url.schedulinglist, { heatingSystemIds: ids }).then(res => {
                    if (res.success) {
                        for (let i = 0; i < res.result.length; i++) {
                            let twoGoTemp = ''
                            let twoBackTemp = ''
                            let feedbackvalue = ''
                            if (res.result[i].twogotemp !== null) {
                                twoGoTemp = res.result[i].twogotemp.toFixed(2).toString()
                            }
                            if (res.result[i].twobacktemp !== null) {
                                twoBackTemp = res.result[i].twobacktemp.toFixed(2).toString()
                            }
                            if (res.result[i].feedbackvalue !== null) {
                                feedbackvalue = res.result[i].feedbackvalue.toFixed(2).toString()
                            }
                            for (let j = 0; j < this.dataSource.length; j++) {
                                if (this.dataSource[j].heatingSystemId === res.result[i].id) {
                                    this.dataSource[j].feedbackvalue = feedbackvalue
                                    this.dataSource[j].twogotemp = twoGoTemp
                                    this.dataSource[j].twobacktemp = twoBackTemp
                                }
                            }
                        }
                    }
                })
            } else {
                this.dataSource = []
            }
        },

        handleTableChange (pagination, filters, sorter) {
            this.ipagination.current = pagination.current
        },
        handleEdit (record) {
            this.$refs.modalForm.edit(record)
        },
        modalFormOk () {

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

</style>
