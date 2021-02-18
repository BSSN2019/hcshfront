<template>
  <div id="clock">
    <p class="action action-full ant-dropdown-link user-dropdown-menu">{{ data.date }}&nbsp;{{ data.time }} &nbsp;{{ data.week }}</p>
  </div>
</template>

<script>

export default {
    name: 'BClock',
    data () {
        return {
            data: {
                time: '',
                date: '',
                week: ''
            },
            week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        }
    },
    created () {
        this.dateTime()
    },
    methods: {

        dateTime: function () {
            setInterval(() => { // 定时器，每个一秒调用一次（这样就可以看到每一秒的时间变动啦）
                let newtime = new Date()
                this.data.time = this.getIncrease(newtime.getHours(), 2) + ':' + this.getIncrease(newtime.getMinutes(), 2) + ':' + this.getIncrease(newtime.getSeconds(), 2)
                this.data.date = this.getIncrease(newtime.getFullYear(), 4) + '-' + this.getIncrease(newtime.getMonth() + 1, 2) + '-' + this.getIncrease(newtime.getDate(), 2)
                this.data.week = this.week[newtime.getDay()]
            }, 1000)
        },
        getIncrease: function (num, digit) {
            let increase = ''
            for (let i = 0; i < digit; i++) {
                increase += '0'
            }
            return (increase + num).slice(-digit)
        }
    }
}
</script>

<style scoped>

</style>
