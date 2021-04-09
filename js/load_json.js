//時間設置
function myTimer() {
    var d = new Date();
    document.getElementById("time").innerHTML = Date();
}

//下拉式選單，判斷月份年分
function func_month() {
    week_name = get_week_name()[0];
    year_name = get_week_name()[1];
    month_name = get_week_name()[2];
    //console.log(week_name)
    document.getElementById('month_0').innerHTML = year_name.toString() + '/' + month_name.toString() + '/W' + week_name.toString();
    document.getElementById('month_1').innerHTML = '-';

    var month_call_list = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] //call的所有月份代號list
    var month_put_list = ["M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"] //put的所有月份代號list
    document.getElementById('month_0').value = week_name.toString() + month_call_list[month_name - 1] + month_put_list[month_name - 1] + (year_name.toString())[3]
    document.getElementById('month_1').value = '-'
}
//判斷第幾週
function get_week_name() {
    var now = new Date();//今天
    var y = now.getFullYear();//今年
    var m = now.getMonth() + 1;//今月
    var date = now.getDate()//今日日期
    //當月資訊
    const this_month_start = new Date()//當月1號
    this_month_start.setDate(1);
    const this_month_end = new Date() //當月最後一天
    this_month_end.setMonth(this_month_end.getMonth() + 1);
    this_month_end.setDate(1);
    this_month_end.setDate(this_month_end.getDate() - 1);
    const this_delta = (this_month_end.getTime() - this_month_start.getTime()) / 86400000;//當月天數
    var date_list = [];//星期三陣列  
    p = this_month_start;//copy this_month_start
    p.setDate(p.getDate() - 1);
    //如果為星期三則加入陣列   
    for (var i = 0; i <= this_delta; i++) {
        p.setDate(p.getDate() + 1);
        if (p.getDay() === 3) {
            date_list.push(p.getDate());
        }
    }
    var w = 0;
    var diff = 0;

    //判斷第幾個星期三
    for (var i = 0; i < date_list.length; i++) {
        diff = date_list[i] - date;
        if (diff >= 0 && diff < 7) {
            w = i + 1;
            y = now.getFullYear();
            m = now.getMonth() + 1;

        } else if (diff >= -7 && diff < 0) {
            w = 1;
            n_day = new Date();
            n_day.setDate(n_day.getDate() + 7);
            y = n_day.getFullYear();
            m = n_day.getMonth() + 1;

        }
    }
    if (w == 3) {
        w = 'O'
    }
    
    return [w, y, m];
}
//T字帳
//讀取.json
function load_json_call(str) { //讀取data_call.json並建立表格
    var url_str = (document.getElementById("month").value)[0] + (document.getElementById("month").value)[1] + (document.getElementById("month").value)[3];
    var url_call = 'json/TX' + url_str + '.json';
    var row_len = document.getElementById("t_table").rows.length; //左邊表格長度
    method: 'POST',
        fetch(url_call)
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {

                var data_call = data; //完整的data_call.json
                var row_len = document.getElementById("t_table").rows.length; //左邊表格長度
                var data_len = Object.keys(data_call.code).length; //data_call中的code長度
                var t_table = document.getElementById("t_table"); //左邊表格id

                //判斷表格長度跟資料長度
                if (row_len !== data_len) {
                    //先清除資料
                    for (var i = 0; i < row_len; i++) { //清除所有欄位							
                        document.getElementById("t_table").deleteRow(0);
                    }
                    //建立表格
                    for (var i = 0; i < data_len; i++) {
                        var newRow = t_table.insertRow(i),
                            cell0 = newRow.insertCell(0),
                            cell1 = newRow.insertCell(1),
                            cell2 = newRow.insertCell(2),
                            cell3 = newRow.insertCell(3),
                            cell4 = newRow.insertCell(4);

                        cell2.setAttribute("id", "bt_code_" + i.toString());
                        cell2.setAttribute("class", "codestrike");


                        cell0.innerHTML = cell0.innerHTML + "<button id='bt_call_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn tm-light-blue-bordered-btn tm-news-link' onclick='contracts_content(bt_call_buy_price_" + i.toString() + ")'>" + '-' + "</button>";
                        cell1.innerHTML = cell1.innerHTML + "<button id='bt_call_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn tm-light-blue-bordered-btn tm-news-link' onclick='contracts_content(bt_call_sell_price_" + i.toString() + ")'>" + '-' + "</button>";
                        cell2.innerHTML = cell2.innerHTML + "<font  color='white' border=1>" + 'strike' + "</font>";
                        cell3.innerHTML = cell3.innerHTML + "<button id='bt_put_sell_price_" + i.toString() + "' name='" + i.toString() + "' class='btn tm-light-blue-bordered-btn tm-news-link' onclick='contracts_content(bt_put_sell_price_" + i.toString() + ")'>" + '-' + "</button>";
                        cell4.innerHTML = cell4.innerHTML + "<button id='bt_put_buy_price_" + i.toString() + "' name='" + i.toString() + "' class='btn tm-light-blue-bordered-btn tm-news-link' onclick='contracts_content(bt_put_buy_price_" + i.toString() + ")'>" + '-' + "</button>";
                    }

                    for (var i = 0; i < row_len; i++) {

                        document.getElementById('bt_call_sell_price_' + i.toString()).innerHTML = data_call.buy_price[i];
                        document.getElementById('bt_call_buy_price_' + i.toString()).innerHTML = data_call.sell_price[i];
                        document.getElementById('bt_code_' + i.toString()).innerHTML = "<font  color='white' border=1>" + data_call.code_num[i] + "</font>";

                    }
                } else {
                    for (var i = 0; i < row_len; i++) {
                        document.getElementById('bt_call_sell_price_' + i.toString()).innerHTML = data_call.buy_price[i];
                        document.getElementById('bt_call_buy_price_' + i.toString()).innerHTML = data_call.sell_price[i];
                        document.getElementById('bt_code_' + i.toString()).innerHTML = "<font  color='white' border=1>" + data_call.code_num[i] + "</font>";
                    }
                }
            })
    load_json_index()
    load_json_put()

}


function load_json_put() { //讀取data_put.json

    var url_str = (document.getElementById("month").value)[0] + (document.getElementById("month").value)[2] + (document.getElementById("month").value)[3];
    var url_put = 'json/TX' + url_str + '.json';
    var row_len = document.getElementById("t_table").rows.length; //左邊表格長度

    method: 'POST',
        fetch(url_put)
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                var data_put = data; //完整的data_call.json						
                for (var i = 0; i < row_len; i++) {
                    document.getElementById('bt_put_buy_price_' + i.toString()).innerHTML = data_put.sell_price[i];
                    document.getElementById('bt_put_sell_price_' + i.toString()).innerHTML = data_put.buy_price[i];
                }
            })
}

function load_json_index() { //讀取data_index.json
    var url_index = "json/data_index.json";

    method: 'POST',
        fetch(url_index)
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                document.getElementById('strike').innerHTML = data[0][0];
                index_num = data[0][1];


            })
}

// function load_json_index() { //讀取ml_rf.json
//     var url_ml_rf = "json/ml_rf.json";
//     method: 'POST',
//         fetch(url_ml_rf)
//             .then(function (resp) {
//                 return resp.json();
//             })
//             .then(function (data) {
//                 //document.getElementById('strike').innerHTML = data[0][0];
//                 //index_num = data[0][1];
//                 console.log(data.columns)
//             })
// }