<template>
    <a-card :bordered="false" title="供热楼宇管理">
        <!-- table区域-begin -->
        <div>
            <a-table
                    class="table_info"
                    ref="table"
                    size="middle"
                    rowKey="id"
                    :columns="columns"
                    :dataSource="dataSource"
                    :pagination="ipagination"
                    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                    @change="handleTableChange">
            </a-table>
        </div>
    </a-card>
</template>

<script>

    import { BssnListMixin } from '@/mixins/BssnListMixin'

    export default {
        name: 'BuildingList',
        mixins: [BssnListMixin],
        components: {
        },
        data () {
            return {
                description: '供热楼宇管理页面',
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
                        title: '编码',
                        align: 'center',
                        dataIndex: 'code',
                        scopedSlots: { customRender: 'codeaction' },
                        width: '10%'
                    },
                    {
                        title: '名称',
                        align: 'center',
                        dataIndex: 'name',
                        width: '10%'
                    }
                ],
                url: {
                    list: '/basicdata/heatingproject/list',
                },
                dictOptions: {}
            }
        },
        methods: {
            initDictConfig () {
            },

        }
    }
</script>
    <style lang="less">
                      .ant-table-bordered .ant-table-header > table, .ant-table-bordered .ant-table-body > table, .ant-table-bordered .ant-table-fixed-left table, .ant-table-bordered .ant-table-fixed-right table {
                          border-top: 0px;
                          border-left: 0px;
                          border-right: 0px;
                          border-bottom: 0px;
                      }
    </style>
    <style lang="less" scoped>
                       .table_info {
                           & /deep/ .ant-table-thead > tr > th {
                               background-color: rgba(255,255,255,0.19);
                               color: #FFFFFF;
                               border: 0px;
                           }
                           & /deep/ .ant-table-tbody > tr > td {
                               color: #FFFFFF;
                               background-color: #33415B;
                               border-top: 0px;
                               border-left: 0px;
                               border-right: 0px;
                               border-bottom: 1px solid #666666;
                           }
                           & /deep/ .ant-table .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
                               background: rgba(255,255,255,0.19);
                           }
                           & /deep/ .ant-pagination-total-text {
                               color: #FFFFFF;
                           }
                           & /deep/ .ant-pagination-item {
                               background-color: rgba(0,0,0,0.1);
                               border-color: #FFFFFF;
                           }

                       }

</style>

