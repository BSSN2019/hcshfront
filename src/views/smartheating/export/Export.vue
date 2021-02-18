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
              <a-row style="height:10px"></a-row>
              <a-row :gutter="4">
                <a-col span="2"><span class="divQuery">查询条件</span></a-col>
                <a-col span="2"><span class="divQueryTitle">时间段：</span></a-col>
                <a-col span="8"><a-range-picker @change="onDateChange" style="padding-top: 4px;"/></a-col>
                <a-col span="8"></a-col>
                <a-col span="4">
                  <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                    <a-button type="primary" icon="download" @click="handleExportXls()" style="margin-left: 8px">导出</a-button>
                  </span>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="4" style="height:4px"></a-row>
        <a-row :gutter="4">
          <a-col span="24">
            <a-card border="false">
              <a-table
                ref="table"
                size="small"
                rowKey="valueTime"
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
                :scroll="{ x: 1500, y: 650 }"
                @change="handleTableChange"
              >
              </a-table>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import HeatingOrgTree from '@/components/smartheating/HeatingOrgTree'
import { getAction, downFile } from '@/api/manage'
export default {
    name: 'Export',
    components: {
        HeatingOrgTree
    },
    data () {
        return {
            treeHeight: '700px',
            heatingSystemId: '',
            queryStartDate: '',
            queryEndDate: '',
            url: {
                query: '/export/query',
                exportXlsUrl: '/export/export',
                heatingSystemName: '/basicdata/heatingsystem/getName'
            },
            dataSource: [],
            columns: [
                {
                    title: '时间',
                    align: 'center',
                    dataIndex: 'valueTime',
                    width: 200
                },
                {
                    title: '室外温度',
                    align: 'center',
                    dataIndex: 'weatherTemp',
                    width: 200
                },
                {
                    title: '天气情况',
                    align: 'center',
                    dataIndex: 'weather',
                    width: 200
                },
                {
                    title: '风力',
                    align: 'center',
                    dataIndex: 'weatherWind',
                    width: 200
                },
                {
                    title: '一次进温',
                    align: 'center',
                    dataIndex: 'temfr001',
                    width: 200
                },
                {
                    title: '一次出温',
                    align: 'center',
                    dataIndex: 'temfr002',
                    width: 200
                },
                {
                    title: '一次进压',
                    align: 'center',
                    dataIndex: 'prmfr001',
                    width: 200
                },
                {
                    title: '一次出压',
                    align: 'center',
                    dataIndex: 'prmfr002',
                    width: 200
                },
                {
                    title: '一次瞬时流量',
                    align: 'center',
                    dataIndex: 'fwmfr001',
                    width: 200
                },
                {
                    title: '一次瞬时热量',
                    align: 'center',
                    dataIndex: 'htmfr001',
                    width: 200
                },
                {
                    title: '一次电调阀开度',
                    align: 'center',
                    dataIndex: 'vomfr001',
                    width: 200
                },
                {
                    title: '一次二级泵频率',
                    align: 'center',
                    dataIndex: 'fqmfr003',
                    width: 200
                },
                {
                    title: '二次出温',
                    align: 'center',
                    dataIndex: 'temfr004',
                    width: 200
                },
                {
                    title: '二次进温',
                    align: 'center',
                    dataIndex: 'temfr003',
                    width: 200
                },
                {
                    title: '二次回压',
                    align: 'center',
                    dataIndex: 'prmfr013',
                    width: 200
                },
                {
                    title: '二次进压',
                    align: 'center',
                    dataIndex: 'prmfr003',
                    width: 200
                },
                {
                    title: '二次出压',
                    align: 'center',
                    dataIndex: 'prmfr004',
                    width: 200
                },
                {
                    title: '二次瞬时流量',
                    align: 'center',
                    dataIndex: 'htmfr003',
                    width: 200
                },
                {
                    title: '二次循环泵频率',
                    align: 'center',
                    dataIndex: 'fqmfr001',
                    width: 200
                }
            ],
            ipagination: {
                current: 1,
                pageSize: 20,
                showTotal: (total, range) => {
                    return range[0] + '-' + range[1] + ' 共' + total + '条'
                },
                showQuickJumper: false,
                showSizeChanger: false,
                total: 0
            },
            heatingSystemName: ''
        }
    },
    methods: {
        onDateChange (date, dateString) {
            this.queryStartDate = dateString[0]
            this.queryEndDate = dateString[1]
        },
        onTreeSelect (selectedKeys, node) {
            if (node.dataRef.type === 5) {
                this.heatingSystemId = node.dataRef.itemid
            }
        },
        searchQuery () {
            if (this.heatingSystemId === '') {
                this.$message.warn('请选择一个供热系统')
            } else if (this.queryStartDate === '' || this.queryEndDate === '') {
                this.$message.warn('请选择时间段')
            } else {
                getAction(this.url.query, { heatingSystemId: this.heatingSystemId, queryStartDate: this.queryStartDate, queryEndDate: this.queryEndDate }).then((res) => {
                    if (res.success) {
                        console.log('==================')
                        console.log(res.result)
                        this.dataSource = res.result
                    }
                })
            }
        },
        handleTableChange (pagination, filters, sorter) {
            this.ipagination.current = pagination.current
        },
        handleExportXls () {
            if (this.heatingSystemId === '') {
                this.$message.warn('请选择一个供热系统')
            } else if (this.queryStartDate === '' || this.queryEndDate === '') {
                this.$message.warn('请选择时间段')
            } else {
                getAction(this.url.heatingSystemName, { heatingSystemId: this.heatingSystemId }).then((res) => {
                    if (res.success) {
                        this.heatingSystemName = res.result
                        this.heatingSystemName.replace('-', '_')
                        downFile(this.url.exportXlsUrl, { heatingSystemId: this.heatingSystemId, queryStartDate: this.queryStartDate, queryEndDate: this.queryEndDate }).then((data) => {
                            if (!data) {
                                this.$message.warning('文件下载失败')
                                return
                            }
                            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                                window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), this.heatingSystemName + '.xls')
                            } else {
                                let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
                                let link = document.createElement('a')
                                link.style.display = 'none'
                                link.href = url
                                link.setAttribute('download', this.heatingSystemName + '.xls')
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link) // 下载完成移除元素
                                window.URL.revokeObjectURL(url) // 释放掉blob对象
                            }
                        })
                    }
                })
            }
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
        padding-top: 8px;
        width: 150px;
        font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 115%;
    }
    .divQueryTitle {
        display: table-cell;
        vertical-align: middle;
        padding-left: 20px;
        padding-top: 8px;
        width: 150px;
    }
    .divDateSelector {
        display: table-cell;
        vertical-align: middle;
        padding-left: 20px;
        text-align: left;
    }
</style>
