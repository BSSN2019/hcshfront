<template>
  <div>
    <a @click="handlePrevMonth">前一月&nbsp;&nbsp;&nbsp;&nbsp;</a>
    <a-month-picker
      slot="extra"
      :value="selectedMonth"
      :allowClear=false
      :inputReadOnly=true
      :disabled-date="disabledDate"
      @change="handleDatePickerChange"
      placeholder="请选择日期"
      style="width:120px"
    ></a-month-picker>
    <a @click="handleNextMonth" v-if="showNextMonth">&nbsp;&nbsp;&nbsp;&nbsp;后一月</a>

  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'MonthSelector',
    data(){
      return {
        monthFormat: 'YYYY-MM',

        selectedMonth:null,
        showNextMonth: false,
        disabledDate(current)
        {
          return current && current>moment().endOf('month')
        },
      }
    },
    created()
    {
      this.selectedMonth = moment(new Date,this.monthFormat)
    },
    methods:{

      handleDatePickerChange(date,dateString)
      {
        this.selectedMonth = moment(date,this.monthFormat)

        let selectdate = new Date(this.selectedMonth)
        let year = selectdate.getFullYear()
        let month = selectdate.getMonth()
        if(month === 12){month=1;year = year+1}
        else {month = month+1}
        let nextmonth = new Date(year,month,1)
        let currmonth = new Date()
        if(nextmonth >currmonth)
          this.showNextMonth = false
        else
          this.showNextMonth = true

        this.$emit("onMonthChange",this.selectedMonth)

      },
      handlePrevMonth()
      {
        let selectdate = new Date(this.selectedMonth)
        let year = selectdate.getFullYear()
        let month = selectdate.getMonth()
        if(month === 1)
        {
          month=12
          year = year-1
        }
        else
          month = month-1
        selectdate = new Date(year,month,1)
        this.selectedMonth = moment(selectdate,this.monthFormat)
        this.showNextMonth = true
        this.$emit("onMonthChange",this.selectedMonth)
      },

      handleNextMonth()
      {
        let selectdate = new Date(this.selectedMonth)
        let year = selectdate.getFullYear()
        let month = selectdate.getMonth()
        if(month === 12){month=1;year = year+1}
        else {month = month+1}
        selectdate = new Date(year,month,1)
        this.selectedMonth = moment(selectdate,this.monthFormat)

        if(month === 12){month=1;year = year+1}
        else {month = month+1}
        let nextmonth = new Date(year,month,1)
        let currmonth = new Date()
        if(nextmonth >currmonth)
          this.showNextMonth = false
        else
          this.showNextMonth = true

        this.$emit("onMonthChange",this.selectedMonth)
      }
    }
  }
</script>

<style scoped>

</style>