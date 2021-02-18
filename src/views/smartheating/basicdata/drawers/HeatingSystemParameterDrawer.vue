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
    <div class="table-page-search-wrapper">
      <a-row>
        <a-col span="1"></a-col>
        <a-col span="6">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-form-item label="参数类别">
              <b-dict-select-tag placeholder="请选择参数类别" v-model="queryParam.category" dictCode="parametercategory"/>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col span="1"></a-col>
        <a-col span="6">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-form-item label="是否启用">
              <b-dict-select-tag placeholder="请选择是否启用" v-model="queryParam.enable" dictCode="activestatus"/>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col span="1"></a-col>
        <a-col span="6">
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
          </span>
        </a-col>
        <a-col span="1"></a-col>
      </a-row>
    </div>
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
        <a @click="handleEdit(record)">编辑</a>
      </span>
    </a-table>
    <heating-system-parameter-model ref="modelForm" @ok="modalFormOk"></heating-system-parameter-model>
  </a-drawer>
</template>

<script>
import { getAction } from '@/api/manage'
import { filterObj } from '@/utils/util'
import HeatingSystemParameterModel from '../modules/HeatingSystemParameterModel'
export default {
    name: 'HeatingSystemParameterDrawer',
    components: {
        HeatingSystemParameterModel
    },
    data () {
        return {
            title: '监测参数',
            drawerWidth: 800,
            visible: false,
            model: {},
            descriptionsize: 'default',
            url: {
                list: '/sys/parameter/station/list',
                systemName: '/basicdata/heatingsystem/getName'
            },
            dataSource: [],
            // 表头
            columns: [
                {
                    title: '参数编码',
                    align: 'center',
                    dataIndex: 'code'
                },
                {
                    title: '参数名称',
                    align: 'center',
                    dataIndex: 'name'
                },
                {
                    title: '参数类别',
                    align: 'center',
                    dataIndex: 'category_dictText'
                },
                {
                    title: '是否启用',
                    align: 'center',
                    dataIndex: 'enable_dictText'
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: 'center',
                    scopedSlots: { customRender: 'action' }
                }
            ],
            ipagination: {
                current: 1,
                pageSize: 15,
                showTotal: (total, range) => {
                    return range[0] + '-' + range[1] + ' 共' + total + '条'
                },
                showQuickJumper: true,
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
            /* 供热系统Id */
            heatingSystemId: ''
        }
    },
    created () {
    },
    methods: {
        loadData (arg) {
            if (arg === 1) {
                this.ipagination.current = 1
            }
            this.loading = true
            let params = this.getQueryParams()
            params.heatingsystem = this.heatingSystemId
            return new Promise((resolve) => {
                console.log(this.url.list)
                console.log(params)
                getAction(this.url.list, params).then(res => {
                    if (res.success) {
                        console.log(res.result)
                        this.dataSource = res.result.records
                        this.ipagination.total = res.result.total
                    } else {
                        this.$message.warning(res.message)
                    }
                    this.loading = false
                })
            })
        },
        show (heatingSystemId) {
            this.visible = true
            this.heatingSystemId = heatingSystemId
            getAction(this.url.systemname, { heatingSystemId: heatingSystemId }).then(res => {
                if (res.success) {
                    this.title = '监测参数(' + res.result + ')'
                }
            })
            this.loadData()
        },
        close () {
            this.$emit('close')
            this.visible = false
        },
        handleCancel () {
            this.close()
        },
        handleTableChange (pagination, filters, sorter) {
            // 分页、排序、筛选变化时触发
            // TODO 筛选
            if (Object.keys(sorter).length > 0) {
                this.isorter.column = sorter.field
                this.isorter.order = sorter.order == 'ascend' ? 'asc' : 'desc'
            }
            this.ipagination = pagination
            this.loadData()
        },
        getQueryParams () {
            // 获取查询条件
            let sqp = {}
            if (this.superQueryParams) {
                sqp['superQueryParams'] = encodeURI(this.superQueryParams)
                sqp['superQueryMatchType'] = this.superQueryMatchType
            }
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
        handleEdit (record) {
            this.$refs.modelForm.edit(record)
        },
        modalFormOk () {
            this.loadData()
        }
    }
}
</script>

<style scoped>

</style>
