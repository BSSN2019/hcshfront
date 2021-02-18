<template>
  <div class="mainPanel">
    <a-row :gutter="4">
      <a-col span="24">
        <a-card :bordered="false" title="报警白名单管理">
          <a-table
            ref="openAlarmList"
            size="middle"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="ipagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <span slot="action" slot-scope="text, record">
              <div>
                <a-popconfirm title="确定从白名单移除吗?" @confirm="() => handleDeleteWhitelist(record)">
                  <a>移除</a>
                </a-popconfirm>
              </div>
            </span>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { BssnListMixin } from '@/mixins/BssnListMixin'
import { getAction, putAction } from '@/api/manage'
export default {
    name: 'AlarmListModal',
    mixins: [BssnListMixin],
    data () {
        return {
            title: '报警白名单列表',
            ipagination: {
                current: 1,
                pageSize: 15,
                showTotal: (total, range) => {
                    return range[0] + '-' + range[1] + ' 共' + total + '条'
                },
                showQuickJumper: false,
                showSizeChanger: false,
                total: 0
            },
            /* 排序参数 */
            isorter: {
                column: 'newestalarmtime',
                order: 'desc'
            },
            columns: [
                {
                    title: '#',
                    dataIndex: '',
                    key: 'rowIndex',
                    align: 'center',
                    customRender: function (t, r, index) {
                        return parseInt(index) + 1
                    },
                    width: 40
                },
                {
                    title: '供热系统',
                    align: 'center',
                    dataIndex: 'heatingsystemname',
                    sorter: true
                },
                {
                    title: '参数',
                    align: 'center',
                    dataIndex: 'parametername',
                    width: '25%'
                },
                {
                    title: '报警类别',
                    align: 'center',
                    dataIndex: 'alarmcategory',
                    width: '10%'
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: 'center',
                    scopedSlots: { customRender: 'action' },
                    width: '200px'
                }
            ],
            url: {
                list: '/dataValue/alarmData/list',
                whitelist: '/dataValue/alarmData/removeFromWhiteList'
            }
        }
    },
    methods: {
        loadData (arg) {
            if (!this.url.list) {
                this.$message.error('请设置url.list属性!')
                return
            }
            if (arg === 1) {
                this.ipagination.current = 1
            }
            let params = this.getQueryParams()// 查询条件
            this.loading = true
            params.iswhitelist = 1
            getAction(this.url.list, params).then((res) => {
                if (res.success) {
                    this.dataSource = res.result.records
                    this.ipagination.total = res.result.total
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.loading = false
            })
        },
        handleDeleteWhitelist (record) {
            let param = { id: record.id }
            putAction(this.url.whitelist, param).then((res) => {
                if (res.success) {
                    this.$message.info(res.message)
                    this.loadData()
                }
            })
        },
        handleTableChange (pagination, filters, sorter) {
            if (Object.keys(sorter).length > 0) {
                this.isorter.column = sorter.field
                this.isorter.order = sorter.order === 'ascend' ? 'asc' : 'desc'
            }
            this.ipagination = pagination
            this.loadData()
        }
    }
}
</script>

<style scoped>

</style>
