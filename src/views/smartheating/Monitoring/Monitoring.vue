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
        <a-card title="实时监测" style="height:870px">
          <a-table
            ref="table"
            size="middle"
            rowKey="heatingSystemId"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="ipagination"
            :scroll="{ y: 650 }"
            @change="handleTableChange">
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import HeatingOrgTree from '@/components/smartheating/HeatingOrgTree'
import { getAction } from '@/api/manage'

export default {
    name: 'Scheduling',
    components: {
        HeatingOrgTree
    },
    data () {
        return {
            treeHeight: '750px',
            description: '运行调度',
            dataSource: [],
            // 表头
            columns: [
                {
                    title: '供热系统',
                    align: 'center',
                    dataIndex: 'heatingsystem',
                    width: '30%'
                },
                {
                    title: '一进温度',
                    align: 'center',
                    dataIndex: 'onegotemperature',
                    width: '10%'
                },
                {
                    title: '一出温度',
                    align: 'center',
                    dataIndex: 'onebacktemperature',
                    width: '10%'
                },
                {
                    title: '二出温度',
                    align: 'center',
                    dataIndex: 'twogotemperature',
                    width: '10%'
                },
                {
                    title: '二进温度',
                    align: 'center',
                    dataIndex: 'twobacktemperature',
                    width: '10%'
                },
                {
                    title: '一进压力',
                    align: 'center',
                    dataIndex: 'onegopressure',
                    width: '10%'
                },
                {
                    title: '一出压力',
                    align: 'center',
                    dataIndex: 'onebackpressure',
                    width: '10%'
                },
                {
                    title: '二出压力',
                    align: 'center',
                    dataIndex: 'twogopressure',
                    width: '10%'
                },
                {
                    title: '二进压力',
                    align: 'center',
                    dataIndex: 'twobackpressure',
                    width: '10%'
                },
                {
                    title: '水箱液位',
                    align: 'center',
                    dataIndex: 'waterlevel',
                    width: '10%'
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
                monitoringList: '/monitoring/query'
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
                getAction(this.url.monitoringList, { heatingSystemIds: ids }).then(res => {
                    if (res.success) {
                        console.log(res.result)
                        this.dataSource = []
                        let onegotemperature
                        let onebacktemperature
                        let onegopressure
                        let onebackpressure
                        let twogotemperature
                        let twobacktemperature
                        let twogopressure
                        let twobackpressure
                        let waterlevel
                        for (let i = 0; i < res.result.length; i++) {
                            if (res.result[i].onegotemperature !== null) {
                                onegotemperature = res.result[i].onegotemperature.toFixed(2).toString()
                            } else {
                                onegotemperature = ''
                            }
                            if (res.result[i].onebacktemperature !== null) {
                                onebacktemperature = res.result[i].onebacktemperature.toFixed(2).toString()
                            } else {
                                onebacktemperature = ''
                            }
                            if (res.result[i].onegopressure !== null) {
                                onegopressure = res.result[i].onegopressure.toFixed(2).toString()
                            } else {
                                onegopressure = ''
                            }
                            if (res.result[i].onebackpressure !== null) {
                                onebackpressure = res.result[i].onebackpressure.toFixed(2).toString()
                            } else {
                                onebackpressure = ''
                            }
                            if (res.result[i].twogotemperature !== null) {
                                twogotemperature = res.result[i].twogotemperature.toFixed(2).toString()
                            } else {
                                twogotemperature = ''
                            }
                            if (res.result[i].twobacktemperature !== null) {
                                twobacktemperature = res.result[i].twobacktemperature.toFixed(2).toString()
                            } else {
                                twobacktemperature = ''
                            }
                            if (res.result[i].twogopressure !== null) {
                                twogopressure = res.result[i].twogopressure.toFixed(2).toString()
                            } else {
                                twogopressure = ''
                            }
                            if (res.result[i].twobackpressure !== null) {
                                twobackpressure = res.result[i].twobackpressure.toFixed(2).toString()
                            } else {
                                twobackpressure = ''
                            }
                            if (res.result[i].waterlevel !== null) {
                                waterlevel = res.result[i].waterlevel.toFixed(2).toString()
                            } else {
                                waterlevel = ''
                            }
                            this.dataSource.push({
                                heatingsystem: res.result[i].heatingsystem,
                                onegotemperature: onegotemperature,
                                onebacktemperature: onebacktemperature,
                                onegopressure: onegopressure,
                                onebackpressure: onebackpressure,
                                twogotemperature: twogotemperature,
                                twobacktemperature: twobacktemperature,
                                twogopressure: twogopressure,
                                twobackpressure: twobackpressure,
                                waterlevel: waterlevel
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
