<template>
  <div class="mainPanel">
    <a-row :gutter="12">
      <a-col span="3">
        <a-card title="选择热力站" style="height:1050px">
          <heating-org-tree
            :widgetHeight="treeHeight"
            :checkable="false"
            :draggable="false"
            :showHeatingSystem="false"
            @onTreeSelect="onTreeSelect"></heating-org-tree>
        </a-card>
      </a-col>
      <a-col span="21">
        <a-card title="成本数据" style="height:1050px">
          <div class="table-operator" slot="extra">
            <a-radio-group v-model="reporttype">
              <a-radio-button value="singleday">单日-耗量</a-radio-button>
              <a-radio-button value="singledayunit">单日-耗量(单平米)</a-radio-button>
              <a-radio-button value="accumulateday">累计日-耗量</a-radio-button>
              <a-radio-button value="accumulatedayunit">累计日-耗量(单平米)</a-radio-button>
            </a-radio-group>
          </div>

          <a-table ref="table" bordered rowKey="id" :dataSource="dataSource" :pagination="ipagination">
            <a-table-column title="日期" key="dateIndex"></a-table-column>
            <a-table-column title="供热面积" key="area"></a-table-column>
            <a-table-column-group title="天气">
              <a-table-column title="低温" key="weatherLowTemp"></a-table-column>
              <a-table-column title="高温" key="weatherHighTemp"></a-table-column>
            </a-table-column-group>
            <a-table-column-group title="信访">
              <a-table-column title="报修热线" key="repairLine"></a-table-column>
              <a-table-column title="8890热线" key="8890"></a-table-column>
            </a-table-column-group>
            <a-table-column-group title="天然气">
              <a-table-column title="耗量" key="gasQty"></a-table-column>
              <a-table-column title="单价" key="gasUnitPrice"></a-table-column>
              <a-table-column title="合价" key="gasTotal"></a-table-column>
            </a-table-column-group>
            <a-table-column-group title="地热水">
              <a-table-column title="耗量" key="geothermalQty"></a-table-column>
              <a-table-column title="单价" key="geothermalUnitPrice"></a-table-column>
              <a-table-column title="合价" key="geothermalTotal"></a-table-column>
            </a-table-column-group>
            <a-table-column-group title="电力">
              <a-table-column title="耗量" key="powerQty"></a-table-column>
              <a-table-column title="单价" key="powerUnitPrice"></a-table-column>
              <a-table-column title="合价" key="powerTotal"></a-table-column>
            </a-table-column-group>
            <a-table-column-group title="系统水">
              <a-table-column title="耗量" key="waterQty"></a-table-column>
              <a-table-column title="单价" key="waterUnitPrice"></a-table-column>
              <a-table-column title="合价" key="waterTotal"></a-table-column>
            </a-table-column-group>
            <a-table-column title="总成本" key="totalCost"></a-table-column>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import HeatingOrgTree from '@/components/smartheating/HeatingOrgTree'
import MonthSelector from '../../../components/smartheating/MonthSelector'

export default {
    name: 'Cost',
    components: {
        HeatingOrgTree,
        MonthSelector
    },
    data () {
        return {
            treeHeight: '850px',
            dataSource: [],
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
            reporttype: 'singleday'

        }
    },
    methods: {
        onTreeSelect (selectedKeys) {
            alert(selectedKeys)
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
