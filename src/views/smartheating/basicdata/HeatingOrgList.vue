<template>
  <div class="mainPanel">
    <a-card :bordered="false" title="项目组织管理">

      <div class="table-operator" slot="extra">
        <a-button @click="handleAddDivision" type="primary" icon="plus">添加事业部</a-button>
      </div>

      <!-- table区域-begin -->
      <div>
        <a-table
          ref="table"
          size="middle"
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :loading="loading"
          :expandedRowKeys="expandedRowKeys"
          @change="handleTableChange"
          @expand="handleExpand"
        >

          <span slot="action" slot-scope="text, record">
            <div v-if="record.type === 1">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleAddProject(record)">添加项目</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDeleteDivision(record.itemid)">
                <a>删除</a>
              </a-popconfirm>
            </div>
            <div v-if="record.type === 2">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleAddSource(record)">加能源站</a>
              <a-divider type="vertical" />
              <a @click="handleAddStation(record)">加换热站</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDeleteProject(record.itemid)">
                <a>删除</a>
              </a-popconfirm>
            </div>
            <div v-if="record.type === 3">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleAddSystem(record)">添加系统</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDeleteSource(record.itemid)">
                <a>删除</a>
              </a-popconfirm>
            </div>
            <div v-if="record.type === 4">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleAddSystem(record)">添加系统</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDeleteStation(record.itemid)">
                <a>删除</a>
              </a-popconfirm>
            </div>
            <div v-if="record.type === 5">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleStationParameter(record)">监测参数</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDeleteSystem(record.itemid)">
                <a>删除</a>
              </a-popconfirm>
            </div>
          </span>
          <a slot="codeaction" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
        </a-table>
      </div>
    </a-card>
    <division-modal ref="devisionModalForm" @ok="modalFormOk"></division-modal>
    <heating-project-modal ref="projectModalForm" @ok="modalFormOk"></heating-project-modal>
    <heating-source-modal ref="sourceModalForm" @ok="modalFormOk"></heating-source-modal>
    <heating-station-modal ref="stationModalForm" @ok="modalFormOk"></heating-station-modal>
    <heating-system-modal ref="systemModalForm" @ok="modalFormOk"></heating-system-modal>
    <division-detail-drawer ref="divisionDetailDrawer"></division-detail-drawer>
    <heating-project-detail-drawer ref="projectDetailDrawer"></heating-project-detail-drawer>
    <heating-source-detail-drawer ref="sourceDetailDrawer"></heating-source-detail-drawer>
    <heating-station-detail-drawer ref="stationDetailDrawer"></heating-station-detail-drawer>
    <heating-system-detail-drawer ref="systemDetailDrawer"></heating-system-detail-drawer>
    <heating-system-parameter-drawer ref="parameterDrawer"></heating-system-parameter-drawer>
  </div>
</template>

<script>

import { getAction, deleteAction } from '@/api/manage'
import { BssnListMixin } from '@/mixins/BssnListMixin'
import DivisionModal from './modules/DivisionModal'
import HeatingProjectModal from './modules/HeatingProjectModal'
import HeatingSourceModal from './modules/HeatingSourceModal'
import HeatingStationModal from './modules/HeatingStationModal'
import HeatingSystemModal from './modules/HeatingSystemModal'
import DivisionDetailDrawer from './drawers/DivisionDetailDrawer'
import HeatingProjectDetailDrawer from './drawers/HeatingProjectDetailDrawer'
import HeatingSourceDetailDrawer from './drawers/HeatingSourceDetailDrawer'
import HeatingStationDetailDrawer from './drawers/HeatingStationDetailDrawer'
import HeatingSystemDetailDrawer from './drawers/HeatingSystemDetailDrawer'
import HeatingSystemParameterDrawer from './drawers/HeatingSystemParameterDrawer'

export default {
    name: 'HeatingOrgList',
    mixins: [BssnListMixin],
    components: {
        DivisionModal,
        HeatingProjectModal,
        HeatingSourceModal,
        HeatingStationModal,
        HeatingSystemModal,
        DivisionDetailDrawer,
        HeatingProjectDetailDrawer,
        HeatingSourceDetailDrawer,
        HeatingStationDetailDrawer,
        HeatingSystemDetailDrawer,
        HeatingSystemParameterDrawer
    },
    data () {
        return {
            description: '设备信息管理页面',
            // 表头
            columns: [
                {
                    title: '名称',
                    align: 'left',
                    dataIndex: 'name'
                },
                {
                    title: '编号',
                    align: 'left',
                    dataIndex: 'code',
                    scopedSlots: { customRender: 'codeaction' },
                    width: '20%'
                },
                {
                    title: '类型',
                    align: 'left',
                    dataIndex: 'type_dictText',
                    width: '10%'
                },
                {
                    title: '负责人',
                    align: 'left',
                    dataIndex: 'leader_dictText',
                    width: '10%'
                },
                {
                    title: '是否有效',
                    align: 'left',
                    dataIndex: 'active_dictText',
                    width: '10%'
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    align: 'center',
                    scopedSlots: { customRender: 'action' },
                    width: '300px'
                }
            ],
            url: {
                list: '/basicdata/heatingorg/rootList',
                childList: '/basicdata/heatingorg/childList',
                division: '/basicdata/division/list',
                project: '/basicdata/heatingproject/list',
                source: '/basicdata/heatingsource/list',
                station: '/basicdata/heatingstation/list',
                system: '/basicdata/heatingsystem/list',
                deleteDivision: '/basicdata/division/delete',
                deleteProject: '/basicdata/heatingproject/delete',
                deleteSource: '/basicdata/heatingsource/delete',
                deleteStation: '/basicdata/heatingstation/delete',
                deleteSystem: '/basicdata/heatingsystem/delete'
            },
            expandedRowKeys: [],
            hasChildrenField: 'hasChild',
            pidField: 'pid',
            dictOptions: {},
            isorter: {
                column: 'code',
                order: 'asc'
            }
        }
    },
    methods: {
        loadData (arg) {
            if (arg === 1) {
                this.ipagination.current = 1
            }
            this.loading = true
            this.expandedRowKeys = []
            let params = this.getQueryParams()
            return new Promise((resolve) => {
                getAction(this.url.list, params).then(res => {
                    if (res.success) {
                        let result = res.result
                        if (Number(result.total) > 0) {
                            this.ipagination.total = Number(result.total)
                            if (res.result.records[0].id === 0) { res.reuslt.records.remove(0) }
                            this.dataSource = this.getDataByResult(res.result.records)
                            resolve()
                        } else {
                            this.ipagination.total = 0
                            this.dataSource = []
                        }
                    } else {
                        this.$message.warning(res.message)
                    }
                    this.loading = false
                })
            })
        },
        getDataByResult (result) {
            return result.map(item => {
                // 判断是否标记了带有子节点
                if (item[this.hasChildrenField] === 1) {
                    let loadChild = { id: item.id + '_loadChild', name: 'loading...', isLoading: true }
                    item.children = [loadChild]
                }
                return item
            })
        },
        handleExpand (expanded, record) {
            // 判断是否是展开状态
            if (expanded) {
                this.expandedRowKeys.push(record.id)
                if (record.children.length > 0 && record.children[0].isLoading === true) {
                    let params = this.getQueryParams()// 查询条件
                    params[this.pidField] = record.id
                    getAction(this.url.childList, params).then((res) => {
                        if (res.success) {
                            if (res.result.records && res.result.records.length > 0) {
                                record.children = this.getDataByResult(res.result.records)
                                this.dataSource = [...this.dataSource]
                            } else {
                                record.children = ''
                                record.hasChildrenField = '0'
                            }
                        } else {
                            this.$message.warning(res.message)
                        }
                    })
                }
            } else {
                let keyIndex = this.expandedRowKeys.indexOf(record.id)
                if (keyIndex >= 0) {
                    this.expandedRowKeys.splice(keyIndex, 1)
                }
            }
        },
        initDictConfig () {
        },
        modalFormOk (formData, arr) {
            if (!formData.id) {
                // 如果是新建
                this.addOk(formData, arr)
            } else {
                // 如果是修改
                if (!arr) {
                    this.loadData()
                } else {
                    this.editOk(formData, this.dataSource)
                    this.dataSource = [...this.dataSource]
                    let currentExpendedRowKeys = [...this.expandedRowKeys]
                    if (currentExpendedRowKeys.length > 0) {
                        for (let i = 0; i < currentExpendedRowKeys.length; i++) {
                            if (formData.id === currentExpendedRowKeys[i]) {
                                if (formData.pid === '0') {
                                    this.expandedRowKeys = []
                                }
                                this.expandTreeNode(formData.id)
                                break
                            }
                        }
                    } else {
                        this.loadData()
                    }
                }
            }
        },
        editOk (formData, arr) {
            if (arr && arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id === formData.id) {
                        arr[i] = formData
                        break
                    } else {
                        this.editOk(formData, arr[i].children)
                    }
                }
            }
        },
        async addOk (formData, arr) {
            if (formData[this.pidField] === '0') {
                this.loadData()
            } else {
                await this.expandTreeNode(arr)
            }
        },
        expandTreeNode (nodeId) {
            return new Promise((resolve, reject) => {
                this.getFormDataById(nodeId, this.dataSource)
                let row = this.parentFormData
                if (!this.expandedRowKeys.includes(nodeId)) {
                    this.expandedRowKeys.push(nodeId)
                }
                let params = this.getQueryParams()
                params.pid = nodeId
                getAction(this.url.childList, params).then((res) => {
                    if (res.success) {
                        if (res.result.records && res.result.records.length > 0) {
                            row.children = this.getDataByResult(res.result.records)
                            this.dataSource = [...this.dataSource]
                            resolve()
                        } else {
                            reject()
                        }
                    } else {
                        reject()
                    }
                })
            })
        },
        getFormDataById (id, arr) {
            if (arr && arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id == id) {
                        this.parentFormData = arr[i]
                    } else {
                        this.getFormDataById(id, arr[i].children)
                    }
                }
            }
        },
        handleEdit (record) {
            if (record.type === 1) { this.handleEditDivision(record) }
            if (record.type === 2) { this.handleEditProject(record) }
            if (record.type === 3) { this.handleEditSource(record) }
            if (record.type === 4) { this.handleEditStation(record) }
            if (record.type === 5) { this.handleEditSystem(record) }
        },
        handleDetail (record) {
            if (record.type === 1) { this.handleDetailDivision(record) }
            if (record.type === 2) { this.handleDetailProject(record) }
            if (record.type === 3) { this.handleDetailSource(record) }
            if (record.type === 4) { this.handleDetailStation(record) }
            if (record.type === 5) { this.handleDetailSystem(record) }
        },
        handleAddDivision () {
            this.$refs.devisionModalForm.add()
            this.$refs.devisionModalForm.title = '事业部信息详情'
            this.$refs.devisionModalForm.disableSubmit = false
        },
        handleEditDivision (record) {
            getAction(this.url.division, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.devisionModalForm.edit(model)
                    this.$refs.devisionModalForm.title = '编辑事业部'
                    this.$refs.devisionModalForm.disableSubmit = false
                }
            })
        },
        handleDeleteDivision (id) {
            deleteAction(this.url.deleteDivision, { id: id }).then((res) => {
                if (res.success) {
                    this.$message.success(res.message)
                    this.loadData()
                }
            })
        },
        handleDetailDivision (record) {
            getAction(this.url.division, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.divisionDetailDrawer.show(model)
                    this.$refs.divisionDetailDrawer.disableSubmit = false
                }
            })
        },
        handleAddProject (record) {
            this.$refs.projectModalForm.add(record.itemid)
            this.$refs.projectModalForm.title = '添加供热项目'
            this.$refs.projectModalForm.disableSubmit = false
        },
        handleEditProject (record) {
            getAction(this.url.project, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.projectModalForm.edit(model)
                    this.$refs.projectModalForm.title = '编辑项目信息'
                    this.$refs.projectModalForm.disableSubmit = false
                }
            })
        },
        handleDeleteProject (id) {
            deleteAction(this.url.deleteProject, { id: id }).then((res) => {
                if (res.success) {
                    this.$message.success(res.message)
                    this.loadData()
                }
            })
        },
        handleDetailProject (record) {
            getAction(this.url.project, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.projectDetailDrawer.show(model)
                    this.$refs.projectDetailDrawer.disableSubmit = false
                }
            })
        },
        handleAddSource (record) {
            this.$refs.sourceModalForm.add(record.itemid)
            this.$refs.sourceModalForm.title = '添加热源'
            this.$refs.sourceModalForm.disableSubmit = false
        },
        handleEditSource (record) {
            getAction(this.url.source, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.sourceModalForm.edit(model)
                    this.$refs.sourceModalForm.title = '编辑热源'
                    this.$refs.sourceModalForm.disableSubmit = false
                }
            })
        },
        handleDeleteSource (id) {
            deleteAction(this.url.deleteSource, { id: id }).then((res) => {
                if (res.success) {
                    this.$message.success(res.message)
                    this.loadData()
                }
            })
        },
        handleDetailSource (record) {
            getAction(this.url.source, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.sourceDetailDrawer.show(model)
                    this.$refs.sourceDetailDrawer.disableSubmit = false
                }
            })
        },
        handleSourceParameter (record) {
/*
            getAction(this.url.source, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.sourceParamDrawer.edit(model)
                    this.$refs.sourceParamDrawer.disableSubmit = false
                }
            })
*/
        },
        handleAddStation (record) {
            this.$refs.stationModalForm.add(record.itemid)
            this.$refs.stationModalForm.title = '添加换热站'
            this.$refs.stationModalForm.disableSubmit = false
        },
        handleEditStation (record) {
            getAction(this.url.station, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.stationModalForm.edit(model)
                    this.$refs.stationModalForm.title = '编辑换热站'
                    this.$refs.stationModalForm.disableSubmit = false
                }
            })
        },
        handleDetailStation (record) {
            getAction(this.url.station, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.stationDetailDrawer.show(model)
                    this.$refs.stationDetailDrawer.disableSubmit = false
                }
            })
        },
        handleDeleteStation (id) {
            deleteAction(this.url.deleteStation, { id: id }).then((res) => {
                if (res.success) {
                    this.$message.success(res.message)
                    this.loadData()
                }
            })
        },
        handleStationParameter (record) {
          this.$refs.parameterDrawer.show(record.itemid)
/*
            getAction(this.url.station, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.stationParamDrawer.edit(model)
                    this.$refs.stationParamDrawer.disableSubmit = false
                }
            })
*/
        },
        handleAddSystem (record) {
            this.$refs.systemModalForm.add(record)
            this.$refs.systemModalForm.title = '添加供热系统'
            this.$refs.systemModalForm.disableSubmit = false
        },
        handleEditSystem (record) {
            getAction(this.url.system, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.systemModalForm.edit(model)
                    this.$refs.systemModalForm.title = '编辑供热系统'
                    this.$refs.systemModalForm.disableSubmit = false
                }
            })
        },
        handleDeleteSystem (id) {
            deleteAction(this.url.deleteSystem, { id: id }).then((res) => {
                if (res.success) {
                    this.$message.success(res.message)
                    this.loadData()
                }
            })
        },
        handleDetailSystem (record) {
            getAction(this.url.system, { id: record.itemid }).then((res) => {
                if (res.success) {
                    let model = Object.assign({}, res.result.records[0])
                    this.$refs.systemDetailDrawer.show(model)
                    this.$refs.systemDetailDrawer.disableSubmit = false
                }
            })
        },

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
