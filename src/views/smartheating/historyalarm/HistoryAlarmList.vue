<template>
  <div class="mainPanel">
    <a-row :gutter="4">
      <a-col span="4">
        <a-card title="站房" style="height:850px">
          <heating-org-tree
            ref="stationTree"
            :widgetHeight="treeHeight"
            @onTreeSelect="onTreeSelect"
            :checkable="false"
            :draggable="false"
            :showHeatingSystem="true"
          ></heating-org-tree>
        </a-card>
      </a-col>
      <a-col span="20">
        <a-card title="历史报警记录" style="height:850px">
          <!-- 查询区域 -->
<!--        2020-12-02, 开会讨论结果
            <div class="table-page-search-wrapper">
            <a-form layout="inline" @keyup.enter.native="searchQuery">
              <a-row :gutter="24">
                <a-col :md="4" :sm="8">
                  <a-form-item label="类别">
                  </a-form-item>
                </a-col>
                <a-col :md="4" :sm="8">
                  <a-form-item label="参数">
                  </a-form-item>
                </a-col>
                <a-col :md="4" :sm="8">
                  <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                    <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                  </span>
                </a-col>

              </a-row>
            </a-form>
          </div>-->
          <!-- 查询区域-END -->

          <!-- table区域-begin -->
          <div>
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              :columns="columns"
              :dataSource="dataSource"
              :pagination="ipagination"
              :loading="loading"
              @change="handleTableChange">
              <span slot="action" slot-scope="text, record">
                <a @click="handleDetail(record)">详情</a>
                <a-divider type="vertical" />
                <a @click="handleWhiteList(record)">加白名单</a>
              </span>
            </a-table>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <history-alarm-detail-drawer ref="detailDrawer"></history-alarm-detail-drawer>
  </div>
</template>

<script>
import { filterObj } from '@/utils/util'
import { getAction } from '@/api/manage'
import HeatingOrgTree from '@/components/smartheating/HeatingOrgTree'
import HistoryAlarmDetailDrawer from './modules/HistoryAlarmDetailDrawer'

export default {
    name: 'BuildingList',
    components: {
        HeatingOrgTree,
        HistoryAlarmDetailDrawer
    },
    data () {
        return {
            treeHeight: '700px',
            /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
            queryParam: {
                villageId: '',
                buildingId: '',
                unitId: ''
            },
            /* 数据源 */
            dataSource: [],
            /* 分页参数 */
            ipagination: {
                current: 1,
                pageSize: 10,
                pageSizeOptions: ['10', '20', '30'],
                showTotal: (total, range) => {
                    return range[0] + '-' + range[1] + ' 共' + total + '条'
                },
                showQuickJumper: true,
                showSizeChanger: true,
                total: 0
            },
            /* 排序参数 */
            isorter: {
                column: 'createTime',
                order: 'desc'
            },
            /* 筛选参数 */
            filters: {},
            /* table加载状态 */
            loading: false,
            /* 查询折叠 */
            toggleSearchStatus: false,
            // 表头
            columns: [
                {
                    title: '#',
                    dataIndex: '',
                    key: 'rowIndex',
                    align: 'center',
                    customRender: function (t, r, index) {
                        return parseInt(index) + 1
                    },
                    width: 60
                },
                {
                    title: '报警时间',
                    align: 'center',
                    dataIndex: 'newestalarmtime',
                    widht: '15%'
                },
                {
                    title: '供热系统',
                    align: 'center',
                    dataIndex: 'heatingsystemname',
                    widht: '25%'
                },
                {
                    title: '报警参数',
                    align: 'center',
                    dataIndex: 'parametername',
                    widht: '20%'

                },
                {
                    title: '报警类别',
                    align: 'center',
                    dataIndex: 'alarmcategory',
                    widht: '20%'

                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: 'center',
                    scopedSlots: { customRender: 'action' },
                    width: 200
                }
            ],
            url: {
                list: '/dataValue/alarmData/historyList'
            },
            selectedHeatingSystemId: ''
        }
    },
    methods: {
        onTreeSelect (selectedKeys, node) {
            let type = node.dataRef.type
            let itemid = node.dataRef.itemid
            if (type === 5) {
                this.selectedHeatingSystemId = itemid
                this.loadData(1)
            }
        },
        loadData (arg) {
            if (!this.url.list) {
                this.$message.error('请设置url.list属性!')
                return
            }
            // 加载数据 若传入参数1则加载第一页的内容
            if (arg === 1) {
                this.ipagination.current = 1
            }
            let params = this.getQueryParams()// 查询条件
            params.heatingsystem = this.selectedHeatingSystemId
            this.loading = true
            getAction(this.url.list, params).then((res) => {
                if (res.success) {
                    console.log(res.result)
                    this.dataSource = res.result.records
                    this.ipagination.total = res.result.total
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.loading = false
            })
        },
        getQueryParams () {
            // 获取查询条件
            let sqp = {}
            let param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
            param.field = this.getQueryField()
            param.pageNo = this.ipagination.current
            param.pageSize = this.ipagination.pageSize
            return filterObj(param)
        },
        getQueryField () {
            // TODO 字段权限控制
            let str = 'id,'
            this.columns.forEach(function (value) {
                str += ',' + value.dataIndex
            })
            return str
        },
        searchQuery () {
            this.loadData(1)
        },
        searchReset () {
            this.queryParam = {}
            this.loadData(1)
        },
        handleTableChange (pagination, filters, sorter) {
            this.ipagination = pagination
            this.loadData()
        },
        handleDetail(record) {
            this.$refs.detailDrawer.show(record.id)
        },
        handleWhiteList (record) {

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
