<template>
  <div class="mainPanel">
  <a-card :bordered="false" title="用户管理">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="账号">
              <!--<a-input placeholder="请输入账号查询" v-model="queryParam.username"></a-input>-->
              <b-input placeholder="输入账号模糊查询" v-model="queryParam.username"></b-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="性别">
              <a-select v-model="queryParam.sex" placeholder="请选择性别">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">男性</a-select-option>
                <a-select-option value="2">女性</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="真实名字">
                <a-input placeholder="请输入真实名字" v-model="queryParam.realname"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="手机号码">
                <a-input placeholder="请输入手机号码查询" v-model="queryParam.phone"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="用户状态">
                <a-select v-model="queryParam.status" placeholder="请选择">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">冻结</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px" slot="extra">
      <a-button @click="handleAdd" type="primary" icon="plus">添加用户</a-button>
      <a-button type="primary" icon="hdd" @click="recycleBinVisible=true">回收站</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <span v-if="record.division !== '0'" >
            <a @click="handleProject(record)">关联项目</a>
            <a-divider type="vertical"/>
            </span>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>

              <a-menu-item>
                <a href="javascript:;" @click="handleChangePassword(record.username)">密码</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.status==1">
                <a-popconfirm title="确定冻结吗?" @confirm="() => handleFrozen(record.id,2,record.username)">
                  <a>冻结</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.status==2">
                <a-popconfirm title="确定解冻吗?" @confirm="() => handleFrozen(record.id,1,record.username)">
                  <a>解冻</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

    <password-modal ref="passwordmodal" @ok="passwordModalOk"></password-modal>

    <!-- 用户回收站 -->
    <user-recycle-bin-modal :visible.sync="recycleBinVisible" @ok="modalFormOk"/>
    <user-project-list ref="projectForm"></user-project-list>
  </a-card>
  </div>
</template>

<script>
import UserModal from './modules/UserModal'
import PasswordModal from './modules/PasswordModal'
import { putAction, getFileAccessHttpUrl } from '@/api/manage'
import { frozenBatch } from '@/api/api'
import { BssnListMixin } from '@/mixins/BssnListMixin'
import BInput from '@/components/bssn/BInput'
import UserRecycleBinModal from './modules/UserRecycleBinModal'
import UserProjectList from "./modules/UserProjectList";
export default {
    name: 'UserList',
    mixins: [BssnListMixin],
    components: {
        UserModal,
        PasswordModal,
        BInput,
        UserRecycleBinModal,
        UserProjectList
    },
    data () {
        return {
            queryParam: {},
            recycleBinVisible: false,
            columns: [
                {
                    title: '用户账号',
                    align: 'center',
                    dataIndex: 'username',
                    width: 120,
                    sorter: true
                },
                {
                    title: '用户姓名',
                    align: 'center',
                    width: 100,
                    dataIndex: 'realname'
                },
                {
                    title: '性别',
                    align: 'center',
                    width: 80,
                    dataIndex: 'sex_dictText',
                    sorter: true
                },
                {
                    title: '手机号码',
                    align: 'center',
                    width: 100,
                    dataIndex: 'phone'
                },
                {
                    title: '事业部',
                    align: 'center',
                    width: 180,
                    dataIndex: 'division_dictText'
                },
                {
                    title: '状态',
                    align: 'center',
                    width: 80,
                    dataIndex: 'status_dictText'
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'center',
                    width: 170
                }

            ],
            url: {
                syncUser: '/process/extActProcess/doSyncUser',
                list: '/sys/user/list',
                delete: '/sys/user/delete',
                deleteBatch: '/sys/user/deleteBatch',
                exportXlsUrl: '/sys/user/exportXls',
                importExcelUrl: 'sys/user/importExcel'
            }
        }
    },
    computed: {
        importExcelUrl: function () {
            return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
        }
    },
    methods: {
        getAvatarView: function (avatar) {
            return getFileAccessHttpUrl(avatar)
        },

        batchFrozen: function (status) {
            if (this.selectedRowKeys.length <= 0) {
                this.$message.warning('请选择一条记录！')
                return false
            } else {
                let ids = ''
                let that = this
                let isAdmin = false
                that.selectionRows.forEach(function (row) {
                    if (row.username == 'admin') {
                        isAdmin = true
                    }
                })
                if (isAdmin) {
                    that.$message.warning('管理员账号不允许此操作,请重新选择！')
                    return
                }
                that.selectedRowKeys.forEach(function (val) {
                    ids += val + ','
                })
                that.$confirm({
                    title: '确认操作',
                    content: '是否' + (status == 1 ? '解冻' : '冻结') + '选中账号?',
                    onOk: function () {
                        frozenBatch({ ids: ids, status: status }).then((res) => {
                            if (res.success) {
                                that.$message.success(res.message)
                                that.loadData()
                                that.onClearSelected()
                            } else {
                                that.$message.warning(res.message)
                            }
                        })
                    }
                })
            }
        },
        handleMenuClick (e) {
            if (e.key == 1) {
                this.batchDel()
            } else if (e.key == 2) {
                this.batchFrozen(2)
            } else if (e.key == 3) {
                this.batchFrozen(1)
            }
        },
        handleFrozen: function (id, status, username) {
            let that = this
            // TODO 后台校验管理员角色
            if (username == 'admin') {
                that.$message.warning('管理员账号不允许此操作！')
                return
            }
            frozenBatch({ ids: id, status: status }).then((res) => {
                if (res.success) {
                    that.$message.success(res.message)
                    that.loadData()
                } else {
                    that.$message.warning(res.message)
                }
            })
        },
        handleChangePassword (username) {
            this.$refs.passwordmodal.show(username)
        },
        handleAgentSettings (username) {
            this.$refs.sysUserAgentModal.agentSettings(username)
            this.$refs.sysUserAgentModal.title = '用户代理人设置'
        },
        passwordModalOk () {
        // TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
        },
        handleProject (record) {
            this.$refs.projectForm.show(record)
        }
    }

}
</script>
<style scoped>
  @import '~@assets/less/common.less'
  .mainPanel {
    height: 850px;
    width: 100%;
    padding-top: 12px;
    padding-left: 12px;
    padding-bottom: 12px;
    padidng-right: 0px;
  }
</style>
