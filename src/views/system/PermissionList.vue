<template>
  <a-card :bordered="false" title="菜单管理">

    <!-- 操作按钮区域 -->
    <div class="table-operator" slot="extra">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        :columns="columns"
        :scroll="{x: 1500}"
        size="middle"
        :pagination="false"
        :dataSource="dataSource"
        :loading="loading"
        :expandedRowKeys="expandedRowKeys"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @expandedRowsChange="handleExpandedRowsChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="handleAddSub(record)">添加下级</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <!-- 字符串超长截取省略号显示 -->
        <span slot="url" slot-scope="text">
          <b-ellipsis :value="text" :length="25"/>
        </span>
        <!-- 字符串超长截取省略号显示-->
        <span slot="component" slot-scope="text">
          <b-ellipsis :value="text"/>
        </span>
      </a-table>

    </div>
    <!-- table区域-end -->

    <permission-modal ref="modalForm" @ok="modalFormOk"></permission-modal>
    <permission-data-rule-list ref="PermissionDataRuleList" @ok="modalFormOk"></permission-data-rule-list>

  </a-card>
</template>

<script>
import PermissionModal from './modules/PermissionModal'
import { getPermissionList } from '@/api/api'
import { BssnListMixin } from '@/mixins/BssnListMixin'
import PermissionDataRuleList from './PermissionDataRuleList'
import BEllipsis from '@/components/bssn/BEllipsis'

const columns = [
    {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '菜单类型',
        dataIndex: 'menuType',
        key: 'menuType',
        customRender: function (text) {
            if (text == 0) {
                return '菜单'
            } else if (text == 1) {
                return '菜单'
            } else if (text == 2) {
                return '按钮/权限'
            } else {
                return text
            }
        }
    }, /* {
      title: '权限编码',
      dataIndex: 'perms',
      key: 'permissionCode',
    }, */{
        title: 'icon',
        dataIndex: 'icon',
        key: 'icon'
    },
    {
        title: '组件',
        dataIndex: 'component',
        key: 'component',
        scopedSlots: { customRender: 'component' }
    },
    {
        title: '路径',
        dataIndex: 'url',
        key: 'url',
        scopedSlots: { customRender: 'url' }
    },
    {
        title: '排序',
        dataIndex: 'sortNo',
        key: 'sortNo'
    },
    {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        scopedSlots: { customRender: 'action' },
        align: 'center',
        width: 150
    }
]

export default {
    name: 'PermissionList',
    mixins: [BssnListMixin],
    components: {
        PermissionDataRuleList,
        PermissionModal,
        BEllipsis
    },
    data () {
        return {
            description: '这是菜单管理页面',
            // 表头
            columns: columns,
            loading: false,
            // 展开的行，受控属性
            expandedRowKeys: [],
            url: {
                list: '/sys/permission/list',
                delete: '/sys/permission/delete',
                deleteBatch: '/sys/permission/deleteBatch'
            }
        }
    },
    methods: {
        loadData () {
            this.dataSource = []
            getPermissionList().then((res) => {
                if (res.success) {
                    this.dataSource = res.result
                }
            })
        },
        // 打开数据规则编辑
        handleDataRule (record) {
            this.$refs.PermissionDataRuleList.edit(record)
        },
        handleAddSub (record) {
            this.$refs.modalForm.title = '添加子菜单'
            this.$refs.modalForm.localMenuType = 1
            this.$refs.modalForm.disableSubmit = false
            this.$refs.modalForm.edit({ status: '1', permsType: '1', route: true, 'parentId': record.id })
        },
        handleExpandedRowsChange (expandedRows) {
            this.expandedRowKeys = expandedRows
        }
    }
}
</script>
<style scoped>
  @import '~@assets/less/common.less';
  .mainPanel {
    height: 850px;
    width: 100%;
    padding-top: 12px;
    padding-left: 12px;
    padding-bottom: 12px;
    padidng-right: 0px;
  }
</style>
