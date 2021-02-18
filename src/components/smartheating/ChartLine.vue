<template>
  <div style="width:100%;height:300px">
    <canvas :width="chartWidth" :height="chartHeight" :id="trendId" ></canvas>
  </div>

</template>

<script>
import Chart from 'chart.js'

export default {
    name: 'ChartLine',
    props: {
        chartWidth: {
            type: String,
            default: '400px'
        },
        chartHeight: {
            type: String,
            default: '300px'
        },
        trendId: {
            type: String,
            default: 'lineChart'
        }
    },
    data () {
        return {
            chartObject: null,
            datasets: [],
            options: {
                responsive: true,
                title: { display: false },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                legend: {
                    labels: {
                        boxWidth: 10
                    }
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '时间'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: '监测值'
                        }
                    }]
                }
            }
        }
    },
    mounted () {
        this.chartObject = document.getElementById(this.trendId)
    },
    methods: {
        DrawLines (xLabels, yLabels, lineColors, dataArray) {
            this.datasets = []
            for (let i = 0; i < yLabels.length; i++) {
                let dataValue = dataArray[i]
                this.datasets.push(
                    {
                        label: yLabels[i],
                        backgroundColor: lineColors[i],
                        borderColor: lineColors[i],
                        pointRadius: 1,
                        data: dataValue,
                        fill: false
                    })
            }
            // eslint-disable-next-line no-new

            new Chart(this.chartObject, {
                type: 'line',
                data: {
                    labels: xLabels,
                    datasets: this.datasets
                },
                options: this.options
            })
        }
    }
}
</script>

<style scoped>

</style>
