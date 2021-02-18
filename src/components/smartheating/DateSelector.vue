<template>
  <div>
    <a @click="handlePrevDay">前一天&emsp;</a>
    <a-date-picker
      slot="extra"
      :value="selectedDate"
      :allowClear="false"
      :inputReadOnly="true"
      :disabled-date="disabledDate"
      @change="handleDatePickerChange"
      placeholder="请选择日期"
      style="width:120px"
      v-model="selectedDate"
    ></a-date-picker>
    <a @click="handleNextDay" v-if="showNextDay">&emsp;后一天</a>
  </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'DateSelector',
    data () {
        return {
            dateFormat: 'YYYY-MM-DD',
            selectedDate: null,
            showNextDay: false,
            disabledDate (current) {
                return current && current > moment().endOf('day')
            }
        }
    },
    created () {
        this.selectedDate = moment(new Date(), this.dateFormat)
    },
    methods: {

        handleDatePickerChange (date, dateString) {
            this.selectedDate = moment(date, this.dateFormat)
            let selectdate = new Date(this.selectedDate)
            selectdate.setDate(selectdate.getDate() + 1)
            if (selectdate > moment().endOf('day')) { this.showNextDay = false } else { this.showNextDay = true }

            this.$emit('onDateChange', this.selectedDate)
        },
        handlePrevDay () {
            let selectdate = new Date(this.selectedDate)
            selectdate.setDate(selectdate.getDate() - 1)
            this.selectedDate = moment(selectdate, this.dateFormat)
            this.showNextDay = true
            this.$emit('onDateChange', this.selectedDate)
        },
        handleNextDay () {
            let selectdate = new Date(this.selectedDate)
            selectdate.setDate(selectdate.getDate() + 1)
            this.selectedDate = moment(selectdate, this.dateFormat)
            selectdate.setDate(selectdate.getDate() + 1)
            if (selectdate > moment().endOf('day')) { this.showNextDay = false }
            this.$emit('onDateChange', this.selectedDate)
        },
        setDate (date) {
            this.selectedDate = date
            if (moment(this.selectedDate).format('YYYYMMDD') >= moment(new Date()).format('YYYYMMDD')) {
              this.showNextDay = false
            }
        }
    }
}
</script>

<style scoped>

</style>
