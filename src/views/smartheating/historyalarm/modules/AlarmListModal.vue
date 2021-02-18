<template>

  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
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
            <a-popconfirm title="确定加白名单吗?" @confirm="() => handleWhitelist(record)">
              <a>加白名单</a>
            </a-popconfirm>
          </div>
        </span>
      </a-table>
    </a-spin>
  </a-modal>
</template>

<script>
import { BssnListMixin } from '@/mixins/BssnListMixin'
import { getAction, putAction } from '@/api/manage'
export default {
    name: 'AlarmListModal',
    mixins: [BssnListMixin],
    data () {
        return {
            title: '报警列表',
            width: 1200,
            visible: false,
            confirmLoading: false,
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
                    title: '报警时间',
                    align: 'center',
                    dataIndex: 'newestalarmtime',
                    width: '15%',
                    sorter: true
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
                list: '/dataValue/alarmData/currentList',
                whitelist: '/dataValue/alarmData/addWhiteList'
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
            getAction(this.url.list, params).then((res) => {
                if (res.success) {
                    this.dataSource = res.result.records
                    this.ipagination.total = res.result.total
                    this.$emit('refreshTitle', '未处理(' + res.result.total + ')')
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.loading = false
            })
        },
        show () {
            this.visible = true
            this.loadData()
        },
        handleOk () {
            this.visible = false
        },
        handleCancel () {
            this.visible = false
        },
        handleWhitelist (record) {
            let param = { id: record.id }
            putAction(this.url.whitelist, param).then((res) => {
                if (res.success) {
                    this.$message.info(res.message)
                    this.loadData()
                    this.$emit('addwhitelist')
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
