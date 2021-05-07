//ML
function load_json_ml_refer() {
    load_json_refer_rf();
    load_json_refer_svm();
}
function load_json_refer_rf(){
    var url = "/json/RF.json";
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);
            
            var len_json = Object.keys(json).length; //宣告json長度
            var list_x = [];
            var list_y = [];
            for(var i=0;i<len_json;i++){
                list_x.push(json[i][0]);
                list_y.push(json[i][1]);               
            }
            lineChart_rf_refer.data.labels = list_x;
            lineChart_rf_refer.data.datasets[0].data = list_y;          
                     
            lineChart_rf_refer.update();//使線圖可以即時更新
            lineChart_rf_refer.resize();//重設線圖
        };
    };
}
function load_json_refer_svm(){
    var url = "/json/SVM.json";
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            var json = JSON.parse(request.responseText);        
            var len_json = Object.keys(json).length; //宣告json長度
            var list_x = [];
            var list_y = [];
            for(var i=0;i<len_json;i++){
                list_x.push(json[i][0]);
                list_y.push(json[i][1]);               
            }
            lineChart_svm_refer.data.labels = list_x;
            lineChart_svm_refer.data.datasets[0].data = list_y;
               
                     
            lineChart_svm_refer.update();//使線圖可以即時更新
            lineChart_svm_refer.resize();//重設線圖
        };
    };
}
//ML_RF_line_graph
//線圖
var line_x = [10000, 12000, 14000, 16000, 18000];
var line_n = [0, 0, 0, 0, 0];
let myChart_rf_refer = document.getElementById('myChart_rf_refer').getContext('2d');
// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';
// Chart.defaults.elements.bar.borderWidth = 1;

let lineChart_rf_refer = new Chart(myChart_rf_refer, {
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
            text: 'Random Forest', //圖表標頭
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
                    labelString: 'per_change'
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
//ML_SVM_line_graph
//線圖
var line_x = [10000, 12000, 14000, 16000, 18000];
var line_n = [0, 0, 0, 0, 0];
let myChart_svm_refer = document.getElementById('myChart_svm_refer').getContext('2d');
// Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';
// Chart.defaults.elements.bar.borderWidth = 1;

let lineChart_svm_refer = new Chart(myChart_svm_refer, {
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
            text: 'SVM', //圖表標頭
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
                    labelString: 'per_change'
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