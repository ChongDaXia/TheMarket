<template>
    <div
        :ref="refName"
        class="charts"
    />
</template>

<script>
/**
 * 参数说明
 *
 * props：{
 *     type: String, // line: 折线图  bar: 柱状图  pie: 饼状图  map: 地图  barY: 柱状图Y轴常量
 *     refName: String, // 图表dom的ref值，相当于id
 *     chartsData: Object, // x: X轴参数（如果有），data: 参数值
 *     option: Object, // 自定义的配置项（如果有）
 *     echartFunc: Function // 自定义调用echart函数（如果有）
 * }
 */
import ECHARTS from 'echarts';
import './echarts_westeros.js';
import { on, off, throttle } from './tools';
import drawEchats from './echarts_draw';
import './china.js';

export default {
    name: 'ChartBar',

    props: {
        // 图表类型
        type: {
            type: String,
            default: 'line'
        },
        // 图表dom refName
        refName: {
            type: String,
            default() {
                return '0';
            }
        },
        // 图表参数
        chartsData: {
            type: Object,
            default() {
                return {
                    x: [],
                    data: []
                };
            }
        },
        // 图表自定义配置
        option: {
            type: Object,
            default() {
                return {};
            }
        },
        // 图表定义 echart参数调用
        echartFunc: {
            type: Function,
            default() {
                return undefined;
            }
        }
    },

    data() {
        return {
            // 定义图表
            myChart: null,
            // 函数截流控制图表刷新
            myChartResize: throttle(
                () => {
                    this.myChart && this.myChart.resize();
                },
                this,
                500
            )
        };
    },

    watch: {
        chartsData: {
            handler() {
                this.updateChart();
            },
            deep: true
        }
    },
    
    mounted() {
        this.updateChart();
    },

    beforeDestroy() {
        off(window, 'resize', this.resize);
    },

    methods: {
        /**
         * 刷新图表方法
         */
        resize() {
            this.myChartResize();
        },

        /**
         * 更新画图
         */
        updateChart() {
            this.$nextTick(() => {
                let drawFuncName = '';
                let data = {
                    x: this.chartsData.x
                };
                switch (this.type) {
                    case 'line':
                        drawFuncName = 'drawLine';
                        data.lines = this.chartsData.data;
                        break;
                    case 'bar':
                        drawFuncName = 'drawBar';
                        data.bars = this.chartsData.data;
                        break;
                    case 'pie':
                        drawFuncName = 'drawPie';
                        data.pies = this.chartsData.data;
                        break;
                    case 'map':
                        drawFuncName = 'drawMap';
                        data.maps = this.chartsData.data;
                        break;
                    case 'barY':
                        drawFuncName = 'drawBarY';
                        data.lines = this.chartsData.data;
                        break;
                }
                this.myChart = ECHARTS.init(this.$refs[this.refName], 'westeros');
                let drawPie = new drawEchats(this.myChart, data);
                drawPie[drawFuncName](this.option, this.echartFunc(this.myChart));
                on(window, 'resize', this.resize);
            });
        }
    }
};
</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>
