//線圖
var line_x = [10000, 12000, 14000, 16000, 18000];
var profit_line = [null, null, 0, 0, 0];
var loss_line = [0, 0, 0, null, null];
var bs_line = [null, null, null, null, null];
let myChart = document.getElementById('myChart').getContext('2d');
// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';
let lineChart = new Chart(myChart, {
    zoomEnabled: true,
    type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: line_x, //x軸
        datasets: [{
            label: 'profit',
            data: profit_line, //y軸
            backgroundColor: [
                'rgba(244, 14, 10, 0.5)',
            ],
            borderColor: 'red',
            borderWidth: 1,
            pointHitRadius: 0.75,
            pointRadius: 0.75,

        }, {
            label: 'loss',
            borderColor: 'green',
            data: loss_line, //y軸
            pointHitRadius: 0.75,
            pointRadius: 0.75,
            borderWidth: 1,
            backgroundColor: [
                'rgba(119, 191, 63, 0.5)'
            ]
        }, {
            label: 'BS(remain days)',
            borderColor: '#006699',//藍色
            pointHitRadius: 0.75,
            pointRadius: 0,
            borderWidth: 1,
            data: bs_line, //y軸
            backgroundColor: [
                'rgba(0%,0%,0%,0%)'//透明
            ],
        }]
    },
    options: {
        title: {
            display: true,
            text: 'profit & loss', //圖表標頭
            fontSize: 20
        },
        legend: {
            //display: false,
            position: 'bottom',
            labels: {
                //filter: function(lineChart.data.datasets[6], myChart) {
                // Logic to remove a particular legend item goes here
                //return !lineChart.data.datasets[6].text.includes('bs_5_day');
                //}
                fontColor: 'black' //說明文字
            },

        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
            }
        },
        tooltips: {
            enabled: true
        },
        scales: {
            xAxes: [{ //x軸
                id: 'strike',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'strike'
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                    stepSize: 500,//值的標籤為每50一個
                    callback: function (value, index, values) {
                        var first = (value / 1000 - ((value % 1000) / 1000))
                        var valueplus = ',' + (value - first * 1000)
                        var test = value.toString();
                        //function FormatNumber(n) {
                        //n += "";
                        //var arr = n.split(".");
                        //var re = /(\d{1,3})(?=(\d{3})+$)/g;
                        //return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
                        //}
                        return test; //標籤增加符號
                    }
                },

            }],
            yAxes: [{ //y軸
                id: 'profit&loss',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'profit&loss'
                },
                tick: {
                    stepSize: 500,
                    callback: function (value, index, values) {
                        return '$' + value; //標籤增加符號
                    }
                },

            }]
        }
    }
});

window.addEventListener('resize', function () {
    lineChart.resize();
})


//normal_line_graph
//線圖
var line_x = [10000, 12000, 14000, 16000, 18000];
var line_n = [0, 0, 0, 0, 0];
let myChart_n = document.getElementById('myChart_n').getContext('2d');
// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';
let lineChart_n = new Chart(myChart_n, {
    zoomEnabled: true,
    type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: line_x, //x軸
        datasets: [{
            label: 'probability',
            data: line_n, //y軸
            backgroundColor: [
                'rgba(0, 102, 153, 0.5)',
            ],
            borderColor: '#006699',
            borderWidth: 1,
            pointHitRadius: 0.75,
            pointRadius: 0,

        }, {
            label: 'probability',
            data: line_n, //y軸
            backgroundColor: [
                'rgba(0, 102, 153, 0.7)',
            ],
            borderColor: '#006699',
            borderWidth: 1,
            pointHitRadius: 0.75,
            pointRadius: 0,

        }]
    },
    options: {
        title: {
            display: true,
            text: 'normal distrubution', //圖表標頭
            fontSize: 20
        },
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                //filter: function(lineChart.data.datasets[6], myChart) {
                // Logic to remove a particular legend item goes here
                //return !lineChart.data.datasets[6].text.includes('bs_5_day');
                //}
                fontColor: 'black' //說明文字
            },

        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
            }
        },
        tooltips: {
            enabled: true
        },
        scales: {
            xAxes: [{ //x軸
                id: 'strike',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'strike'
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                    stepSize: 500,//值的標籤為每50一個
                    callback: function (value, index, values) {
                        var first = (value / 1000 - ((value % 1000) / 1000))
                        var valueplus = ',' + (value - first * 1000)
                        var test = value.toString();
                        //function FormatNumber(n) {
                        //n += "";
                        //var arr = n.split(".");
                        //var re = /(\d{1,3})(?=(\d{3})+$)/g;
                        //return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
                        //}
                        return test; //標籤增加符號
                    }
                },

            }],
            yAxes: [{ //y軸
                id: 'probability',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'probability'
                },
                tick: {
                    stepSize: 500,
                    callback: function (value, index, values) {
                        return '$' + value; //標籤增加符號
                    }
                },

            }]
        }
    }
});

window.addEventListener('resize', function () {
    lineChart_n.resize();
})

//ML
function load_json_ml(x) {
    var url = "/json/RF.json";
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            lineChart_rf_1.data.labels = [];
            lineChart_rf_1.data.datasets[0].data = [];
            var len_json = Object.keys(json).length; //宣告json長度
            var list_x = [];
            var list_y = [];
            
            for(var i=0;i<x.length;i++){
                list_y.push(0)
                for(var j=0;j<len_json;j++){
                    if(x[i]==json[j][2]){
                        list_y[i] = (json[j][1]);
                        break;
                    }
                }
            }

            lineChart_rf_1.data.labels = x;
            lineChart_rf_1.data.datasets[0].data = list_y;           
            //lineChart_rf_1.data.datasets[1].data = list_y;
           
            lineChart_rf_1.update();//使線圖可以即時更新
            lineChart_rf_1.resize();//重設線圖
           
        };
    };
}
//ML_RF_line_graph
//線圖
var line_x = [10000, 12000, 14000, 16000, 18000];
var line_n = [0, 0, 0, 0, 0];
let myChart_rf_1 = document.getElementById('myChart_rf_1').getContext('2d');
// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';
// Chart.defaults.elements.bar.borderWidth = 1;

let lineChart_rf_1 = new Chart(myChart_rf_1, {
    zoomEnabled: true,
    type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: line_x, //x軸
        datasets: [{
            label: 'probability',
            data: line_n, //y軸
            backgroundColor: 'rgba(0, 102, 153, 0.5)',
            borderColor: '#006699',
            borderWidth: 50,
        }]
    },
    options: {
        title: {
            display: true,
            text: 'ML_RF', //圖表標頭
            fontSize: 20
        },
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                fontColor: 'black' //說明文字
            },
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
            }
        },
        tooltips: {
            enabled: true
        },
        scales: {
            xAxes: [{ //x軸
                id: 'strike',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'strike'
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                    stepSize: 500,//值的標籤為每50一個
                    callback: function (value, index, values) {
                        var first = (value / 1000 - ((value % 1000) / 1000))
                        var valueplus = ',' + (value - first * 1000)
                        var test = value.toString();
                        return test; //標籤增加符號
                    }
                },
            }],
            yAxes: [{ //y軸
                id: 'probability',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'probability'
                },
                tick: {
                    stepSize: 500,
                    callback: function (value, index, values) {
                        return '$' + value; //標籤增加符號
                    }
                },
            }]
        }
    }
});
window.addEventListener('resize', function () {
    lineChart_rf_1.resize();
})
