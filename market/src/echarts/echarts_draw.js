/**
 * @description 数字千分位逗号   0 或者 空的参数返回 '-'
 * @param {Number} num 数字
 */
const getThousandNum = (num) => {
    return (Number(num) ? num : '-').toString().replace(/\d+/, function (n) {
        let len = n.length;
        if (len % 3 === 0) {
            return n.replace(/(\d{3})/g, ',$1').slice(1);
        } else {
            return n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ',$1');
        }
    });
};

/**
 * @description 小数转换成百分比，并带上百分号   0 或者 空的参数返回 '-'
 * @param {Number} smallNumber 小数 
 */
const convertPercentForKeep = (smallNumber) => {
    let str = smallNumber ? Number(100 * smallNumber).toFixed(2) : '-';
    str = str == 0 || str == '-' ? '-' : `${str}%`;
    return str;
};

/**
 * 判断参数类型方法
 */
const classof = (o) => {
    // Object.prototype.toString()返回"[object Object]",然后call(o)参数，返回该类型，如number类型call(1),返回"[object Number]",再使用slice(截取类型部分)
    return Object.prototype.toString.call(o).slice(8, -1);
};

/**
 * @description 深度拷贝 
 * @param {Object, Array} data 需要深度拷贝的对象
 */
const deepCopy = () => {
    const t = Object.prototype.toString.call(data).replace(/\[object |\]/g, '').toLowerCase();
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
            
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
};

const optionUpdate = (option, optionData) => {
    // 初次拦截参数不为 object 的参数，返回默认设置好的参数
    if (classof(optionData) !== 'Object') {
        return option;
    }
    // 参数循环替换方法
    let optionFor = (option, option_data) => {
        // 判断是否为object 第一次进来必为object
        if (classof(option_data) === 'Object') {
            // 循环参数
            for (let item in option_data) {
                // 判断是否存在key 为item的参数
                if (option[item]) {
                    // 存在 判断原始参数的key item的参数是否为 object 且不为数组  判断参数的key item的参数是否为 object 且不为数组
                    if (classof(option[item]) === 'Object' && classof(option_data[item]) === 'Object') {
                        // 是继续循环 object 去替换参数
                        optionFor(option[item], option_data[item]);
                    } else {
                        // 否直接替换原始参数值为参数的值
                        option[item] = option_data[item];
                    }
                } else {
                    // 不存在直接添加到原始参数里面
                    option[item] = option_data[item];
                }
            }
        }
    };
    optionFor(option, optionData);
    return option;
};

class drawEchats {

    constructor(myEchart, {x = [], lines = [], bars = [], pies = [], maps = []}) {
        this.myEchart = myEchart;     // 绘画的对象
        this.x = x;         // x轴参数 eg: ['', '']
        this.lines = lines;         // 折线图参数 eg: [{data: [], name: ''}]
        this.bars = bars;           // 柱状图参数 eg: [{data: [], name: ''}]
        this.pies = pies;           // 饼状图参数 eg: [{value: '', name: ''}]
        this.maps = maps;           // 地图参数 eg: [{value: '', name: ''}]
        // 重置绘制图形
        if (this.myEchart) this.myEchart.setOption({}, true);
    }

    // 绘制折线图
    drawLine(optionData, echartFunc) {
        // 参数拼接
        let series = [], legendData = [];
        for (let item of this.lines) {
            series.push({
                name: item.name,
                data: item.data,
                type: 'line',
                smooth: true
            });
            legendData.push(item.name);
        }

        let lineOption = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legendData
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.x,
                boundaryGap: false,
                axisLabel: {
                    showMinLabel: true,
                    showMaxLabel: true
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            yAxis: {
                type: 'value'
            },
            series: series
        };
        let option = optionUpdate(lineOption, optionData);
        this.myEchart.setOption(option);
        // 外部函数调用
        echartFunc && echartFunc.apply(this);
    }

    // 绘制柱状图
    drawBar(optionData, echartFunc) {
        // 参数拼接
        let series = [], legendData = [];
        for (let item of this.bars) {
            series.push({
                name: item.name,
                data: item.data,
                type: 'bar',
                barWidth: '35%',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            fontSize: '10'
                        }
                    }
                }
            });
            legendData.push(item.name);
        }

        let barOption = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                },
                formatter: function (params) {
                    let tar = params[0];
                    return tar.name + ' : ' + tar.value;
                }
            },
            legend: {
                data: legendData
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.x,
                axisLabel: {
                    interval: 0,
                    rotate: 0,
                    rotate: this.x.length > 20 ? -45 : 0,
                    showMinLabel: true,
                    showMaxLabel: true,
                    textStyle: {
                        color: '#626262',
                        fontSize: this.x.length > 20 ? '8' : '12'
                    }
                }
            },
            yAxis: {
                type: 'value'
            },
            series: series
        };
        let option = optionUpdate(barOption, optionData);
        this.myEchart.setOption(option);
        // 外部函数调用
        echartFunc && echartFunc.apply(this);
    }

    // 绘制饼状图
    drawPie(optionData, echartFunc) {
        let seriesData = this.pies;
        // 参数拼接
        let legendData = [];
        for (let item of seriesData) {
            legendData.push({
                name: item.name,
                scene: item.scene,
                value: item.value
            });
        }
        let pieOption = {
            tooltip: {
                trigger: 'item',
                textStyle: {
                    fontSize: '10'
                },
                formatter(b) {
                    return `${b.name}${b.data.scene ? ' (' + b.data.scene + ') ' : ''}: ${getThousandNum(b.value)} (${b.percent}%)`;
                }
            },
            grid: {
                containLabel: true
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: legendData,
                textStyle: {
                    fontSize: '10'
                },
                formatter(name) {
                    // 格式化图例文本，自定义显示样式
                    let total = 0, value;
                    legendData.forEach(item =>{
                        if (item.name === name) {
                            value = item.value;
                        }
                        item.value = Number(item.value) > 0 ? Number(item.value) : 0;
                        total += Number(item.value);
                    });
                    return `${name} : ${getThousandNum(value)} (${convertPercentForKeep(value / total)})`;
                }
            },
            series: [
                {
                    type:'pie',
                    radius: [0, '65%'],
                    avoidLabelOverlap: true,
                    label: {
                        show: true,
                        backgroundColor: '#ffffff',
                        borderColor: '#eeeeee',
                        borderWidth: 1,
                        borderRadius: 2,
                        padding: 4,
                        fontSize: '12',
                        align: 'center',
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: legendData,
                    center: ['45%', '50%']
                }
            ]
        };
        let option = optionUpdate(pieOption, optionData);
        this.myEchart.setOption(option);
        // 外部函数调用
        echartFunc && echartFunc.apply(this);
    }

    // 绘制中国地图
    drawMap(optionData, echartFunc) {
        let seriesData = this.maps;
        // 参数拼接
        let legendData = [];
        for (let item of seriesData) {
            legendData.push(item.name);
        }
        let mapOption = {
            title: {
                text: '',
                textStyle: {
                    fontSize: 20
                },
                x: 'center'
            },
            tooltip: {
                show: true,
                formatter: function(params) {
                    return params.name + '：' + params.data['value'];
                }
            },
            visualMap: {
                type: 'continuous',
                min: 0,
                max: seriesData.length > 0 ? seriesData[0].value : 0,
                seriesIndex: [0],
                inRange: {
                    color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096']
                },
                textStyle: {
                    color: '#000'
                },
                bottom: 20,
                left: 20
            },
            xAxis: {
                type: 'value',
                position: 'top',
                barWidth: 30,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#626262',
                        fontSize: '8'
                    }
                }
            },
            yAxis: {
                type: 'category',
                nameGap: 50,
                interval: 0,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    showMinLabel: true,
                    showMaxLabel: true,
                    textStyle: {
                        color: '#626262',
                        fontSize: '8'
                    }
                }
            },
            geo: {
                roam: true,
                map: 'china',
                left: 100,
                top: 10,
                right: 100,
                layoutSize: '80%',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        areaColor: '#ff6499'
                    }
                },
                regions: [{
                    name: '南海诸岛',
                    value: 0,
                    itemStyle: {
                        normal: {
                            opacity: 0,
                            label: {
                                show: false
                            }
                        }
                    }
                }]
            },
            series: [
                {
                    name: 'mapSer',
                    type: 'map',
                    roam: false,
                    geoIndex: 0,
                    label: {
                        show: false
                    },
                    data: deepCopy(seriesData)
                }
            ]
        };
        let option = optionUpdate(mapOption, optionData);
        this.myEchart.setOption(option);
        // 外部函数调用
        echartFunc && echartFunc.apply(this);
    }

    // 绘制横向柱状图
    drawBarY(optionData, echartFunc) {
        // 参数拼接
        let series = [], legendData = [];
        for (let item of this.bars) {
            series.push({
                name: item.name,
                data: item.data,
                type: 'bar',
                barWidth: '35%',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            fontSize: '10'
                        }
                    }
                }
            });
            legendData.push(item.name);
        }

        let barOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: legendData
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: this.x
            },
            series: series
        };

        let option = optionUpdate(barOption, optionData);
        this.myEchart.setOption(option);
        // 外部函数调用
        echartFunc && echartFunc.apply(this);
    }
}

module.exports = drawEchats;