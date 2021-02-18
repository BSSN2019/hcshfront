<template>
  <div
    id="divTree"
    :style="{
      width: widgetWidth,
      height: widgetHeight,
      overflow: 'auto',
      background:'#FFFFFF',
    }"
  >
    <a-tree
      :checkable="checkable"
      show-icon
      :treeData="treeData"
      :defaultSelectedKeys="defaultSelectedKeys"
      :draggable="nodeDraggable"
      :loadData="onLoadData"
      :expandedRowKeys="expandedRowKeys"
      @expand="onTreeExpand"
      @select="onTreeSelect"
      @check="onTreeCheck"
      @dragend="onDragEnd"
    >
      <svg-icon name="division" slot="division" style="width:20px;height:20px"></svg-icon>
      <svg-icon name="heatingproject" slot="heatingproject" style="width:20px;height:20px"></svg-icon>
      <svg-icon name="heatingsource" slot="heatingsource" style="width:20px;height:20px"></svg-icon>
      <svg-icon name="heatingstation" slot="heatingstation" style="width:20px;height:20px"></svg-icon>
      <svg-icon name="heatingsystem" slot="heatingsystem" style="width:20px;height:20px"></svg-icon>

    </a-tree>
  </div>
</template>

<script>
import { getAction } from '@/api/manage.js'

export default {
    name: 'HeatingOrgTree',
    components: {
    },
    props: {
        widgetWidth: {
            type: String,
            default: '100%'
        },
        widgetHeight: {
            type: String,
            default: '800px'
        },
        checkable: {
            type: Boolean,
            default: false
        },
        showHeatingSystem: {
            type: Boolean,
            default: true
        },
        nodeDraggable: {
            type: Boolean,
            default: false
        },
        showHeatingSource: {
            type: Boolean,
            default: true
        },
        level: {
            type: Number,
            default: 4
        }
    },
    data () {
        return {
            defaultSelectedKeys: [''],
            autoExpandParent: false,
            checkedKeys: [],
            selectedKeys: [],
            treeData: [
            ],
            companyName: '',
            url: {
                divisionList: '/basicdata/division/query',
                sourceList: '/basicdata/heatingsource/query',
                stationList: '/basicdata/heatingstation/query',
                systemList: '/basicdata/heatingsystem/query',
                projectList: '/basicdata/heatingproject/query',
                rootlist: '/basicdata/heatingorg/rootList',
                childlist: '/basicdata/heatingorg/childList',
                divisionSystemIds: '/basicdata/heatingorg/queryDivisionSystemIds',
                projectSystemIds: '/basicdata/heatingorg/queryProjectSystemIds',
                stationSystemIds: '/basicdata/heatingorg/queryStationSystemIds',
                systemIds: '/basicdata/heatingorg/querySystemIds'
            },
            expandedRowKeys: []
        }
    },
    mounted () {
        this.initTreeData()
    },
    methods: {
        initTreeData () {
            this.loadRoot()
        },
        loadRoot () {
            this.$nextTick(() => {
                getAction(this.url.rootlist, { active: 1 }).then((res) => {
                    if (res.success) {
                        for (let i = 0; i < res.result.records.length; i++) {
                            this.treeData.push({
                                title: res.result.records[i].name,
                                key: res.result.records[i].id,
                                id: res.result.records[i].id,
                                type: res.result.records[i].type,
                                itemid: res.result.records[i].itemid,
                                slots: { icon: 'division' },
                                isLeaf: false
                            })
                        }
                    }
                })
            })
        },
        loadChildren (treeNode) {
            let icon = ''
            let isLeaf = false
            this.$nextTick(() => {
                getAction(this.url.childlist, { pid: treeNode.dataRef.key, active: 1 }).then((res) => {
                    if (res.success) {
                        treeNode.dataRef.children = []
                        for (let i = 0; i < res.result.records.length; i++) {
                            if (res.result.records[i].type === 1) {
                                icon = 'division'
                            } else if (res.result.records[i].type === 2) {
                                icon = 'heatingproject'
                                if (this.level === 2) { isLeaf = true } else { isLeaf = false }
                            } else if (res.result.records[i].type === 3) {
                                icon = 'heatingsource'
                                if (this.level === 3) { isLeaf = true } else { isLeaf = false }
                            } else if (res.result.records[i].type === 4) {
                                icon = 'heatingstation'
                                if (this.level === 3) { isLeaf = true } else { isLeaf = false }
                            } else if (res.result.records[i].type === 5) {
                                icon = 'heatingsystem'
                                isLeaf = true
                            }
                            let canCreateTreeNode = true
                            if (res.result.records[i].type === 3 && this.showHeatingSource === false) {
                                canCreateTreeNode = false
                            }
                            if (res.result.records[i].type === 5 && res.result.records[i].systemtype === 99) {
                                canCreateTreeNode = false
                            }
                            if (canCreateTreeNode) {
                                treeNode.dataRef.children.push({
                                    title: res.result.records[i].name,
                                    key: res.result.records[i].id,
                                    id: res.result.records[i].id,
                                    type: res.result.records[i].type,
                                    itemid: res.result.records[i].itemid,
                                    slots: { icon: icon },
                                    isLeaf: isLeaf
                                })
                            }
                        }
                        this.treeData = [...this.treeData]
                    }
                })
            })
        },
        onTreeCheck (checkedKeys, info) {
            let heatingSystemIds = []
            let url = ''
            let param
            if (info.node.dataRef.type === 1) {
                url = this.url.divisionSystemIds
                param = { heatingOrgId: info.node.dataRef.id }
            }
            if (info.node.dataRef.type === 2) {
                url = this.url.projectSystemIds
                param = { heatingOrgId: info.node.dataRef.id }
            }
            if (info.node.dataRef.type === 4) {
                url = this.url.stationSystemIds
                param = { heatingOrgId: info.node.dataRef.id }
            }
            if (info.node.dataRef.type === 5) {
                url = this.url.systemIds
                param = { heatingOrgId: info.node.dataRef.id }
            }
            getAction(url, param).then((res) => {
                if (res.success) {
                    for (let i = 0; i < res.result.length; i++) {
                        heatingSystemIds.push(res.result[i])
                    }
                    let isAdd = true
                    if (!info.checked) {
                        isAdd = false
                    }
                    this.$emit('onTreeCheck', checkedKeys, isAdd, heatingSystemIds)
                }
            })
        },
        onTreeExpand (expandedKeys, info) {
        },
        onTreeSelect (selectedKeys, info) {
            let type = info.node.dataRef.type
            this.expandedRowKeys = []
            /*
            if (type === 1 || type === 2 || ((type === 3 || type === 4) && this.showHeatingSystem === true)) {
                this.loadChildren(info.node)
            }
*/
            if (type === 1 || type === 2 || type === 5) {
                this.$emit('onTreeSelect', selectedKeys, info.node)
            }
            if ((type === 3 || type === 4) && this.showHeatingSystem === false) {
                this.$emit('onTreeSelect', selectedKeys, info.node)
            }
        },
        onLoadData (treeNode) {
            return new Promise(resolve => {
                if (treeNode.dataRef.children) {
                    resolve()
                    return
                }
                setTimeout(() => {
                    this.loadChildren(treeNode)
                    resolve()
                }, 200)
            })
        },
        onDragEnd (info) {
            this.$emit('onDragEnd', info)
        },
        onTreeDblClick (info) {
        },
        clearSelection () {
            this.defaultSelectedKeys = ['']
        }

    }
}
</script>

<style scoped>

</style>
