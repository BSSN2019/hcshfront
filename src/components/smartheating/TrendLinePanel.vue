<template>
  <a-card :title="panelTitle" :style="{height:panelHeight}">
    <date-selector v-if="showDatePicker" slot="extra" @onDateChange="onDateChange"></date-selector>
  </a-card>
</template>

<script>
import TrendLine from './TrendLine'
import DateSelector from '@/components/smartheating/DateSelector'

export default {
    name: 'TrendLinePanel',
    components: {
        TrendLine,
        DateSelector
    },
    props: {
        panelTitle: {
            type: String,
            default: '趋势图',
            required: true
        },
        panelHeight: {
            type: String,
            default: '500px',
            required: false
        },
        showDatePicker: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    data () {
        return {

        }
    },
    methods: {
        onDateChange (dateValue) {

        }
    }

}
</script>

<style scoped>

</style>
