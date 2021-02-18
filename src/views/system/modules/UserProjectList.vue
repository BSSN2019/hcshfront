<template>
  <a-drawer
    :title="title"
    :width="drawerWidth"
    @close="onClose"
    :visible="visible"
  >
    <div>
      <a-button style="margin-bottom: 10px" type="primary" @click="handleAdd">新增</a-button>
    </div>
    <div>
      <a-table
        ref="table"
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        bordered
      >

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <user-proejct-modal ref="modalForm" @ok="modalFormOk"></user-proejct-modal>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import { filterObj } from '@/utils/util'
import { BssnListMixin } from '@/mixins/BssnListMixin'
import UserProejctModal from './UserProejctModal'
export default {
    name: 'UserPorjectList',
    mixins: [BssnListMixin],
    components: { UserProejctModal },
    data () {
        return {
            columns: [
                {
                    title: '名称',
                    align: 'center',
                    dataIndex: 'project_dictText'
                },
                {
                    title: '是否可控',
                    align: 'center',
                    dataIndex: 'control_dictText'
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: 'center',
                    scopedSlots: { customRender: 'action' }
                }
            ],
            queryParam: {
                userId: '',
                dictName: '',
                itemText: '',
                delFlag: '1',
                status: []
            },
            title: '关联项目',
            visible: false,
            drawerWidth: 700,
            model: {},
            userId: '',
            status: 1,
            labelCol: {
                xs: { span: 5 },
                sm: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 12 }
            },
            form: this.$form.createForm(this),
            validatorRules: {
                name: { rules: [{ required: true, message: '请输入名称!' }] }
            },
            url: {
                list: '/basicdata/heatingprojectuser/list',
                delete: '/basicdata/heatingprojectuser/delete'
            }
        }
    },
    methods: {
        show (record) {
            this.userId = record.id
            this.queryParam = { user: this.userId }
            this.visible = true
            // 当其它模块调用该模块时,调用此方法加载字典数据
            this.loadData()
        },

        getQueryParams () {
            var param = Object.assign({}, this.queryParam)
            param.userId = this.userId
            param.field = this.getQueryField()
            param.pageNo = this.ipagination.current
            param.pageSize = this.ipagination.pageSize
            if (this.superQueryParams) {
                param['superQueryParams'] = encodeURI(this.superQueryParams)
                param['superQueryMatchType'] = this.superQueryMatchType
            }
            return filterObj(param)
        },

        handleAdd () {
            this.$refs.modalForm.title = '添加关联项目'
            this.$refs.modalForm.add(this.userId)
        },
        handleEdit: function (record) {
            this.$refs.modalForm.title = '编辑收费期 - ' + record.name
            this.$refs.modalForm.edit(record)
            this.$refs.modalForm.disableSubmit = false
        },

        onClose () {
            this.visible = false
            this.form.resetFields()
            this.dataSource = []
        }
    }
}
</script>
<style scoped>
</style>
