//資料大致邏輯
//1輸入將資料到contracts_array->新增row
//2刪除資料先刪除contracts_array->刪除特定row
//3清空資料contracts_array、清空所有row

var contracts_array = new Array(); //先宣告一維						
var k = document.getElementById("tbody_contracts").rows.length;
//資料暫存在二唯陣列contracts_array
function contracts_content(bt_id) {
    if (bt_id.id === "bt_call_sell_price_" + bt_id.name.toString()) {
        //item = data_call["code"][bt_id.name],//TXO2300A1
        var item = k + 1,
            buysell = "short",
            callput = "call",
            strike = document.getElementById("bt_code_" + bt_id.name.toString()).textContent,
            quote = bt_id.textContent,
            button_id = bt_id.id;


    } else if (bt_id.id === "bt_call_buy_price_" + bt_id.name.toString()) {
        //item = data_call["code"][bt_id.name],
        var item = k + 1,
            buysell = "long",
            callput = "call",
            strike = document.getElementById("bt_code_" + bt_id.name.toString()).textContent,
            quote = bt_id.textContent,
            button_id = bt_id.id;

    } else if (bt_id.id === "bt_put_buy_price_" + bt_id.name.toString()) {
        //item = data_put["code"][bt_id.name]
        var item = k + 1,
            buysell = "long",
            callput = "put",
            strike = document.getElementById("bt_code_" + bt_id.name.toString()).textContent,
            quote = bt_id.textContent,
            button_id = bt_id.id;

    } else if (bt_id.id === "bt_put_sell_price_" + bt_id.name.toString()) {
        //item = data_put["code"][bt_id.name],
        var item = k + 1,
            buysell = "short",
            callput = "put",
            strike = document.getElementById("bt_code_" + bt_id.name.toString()).textContent,
            quote = bt_id.textContent,
            button_id = bt_id.id;
    }

    contracts_array[k] = new Array(); //宣告二維，每一個一維陣列裡面的一個元素都是一個陣列；							
    contracts_array[k][0] = item;
    contracts_array[k][1] = buysell;
    contracts_array[k][2] = callput;
    contracts_array[k][3] = strike;
    contracts_array[k][4] = quote;
    contracts_array[k][5] = 1; //暫定口數為1
    contracts_array[k][6] = button_id;//T字帳的按鈕id

    addHtmlTableRow(contracts_array, k) //新增至清單						
    return k++

}

// add Row
function addHtmlTableRow(contracts_array, k) {

    var table = document.getElementById("tbody_contracts"); // get the table by id							
    var newRow = table.insertRow(table.length); // create a new row and cells					
    cell0 = newRow.insertCell(0);
    cell1 = newRow.insertCell(1);
    cell2 = newRow.insertCell(2);
    cell3 = newRow.insertCell(3);
    cell4 = newRow.insertCell(4);
    cell5 = newRow.insertCell(5);
    cell6 = newRow.insertCell(6);
    newRow.setAttribute('class', 'active-row');

    cell0.innerHTML = contracts_array[k][0]; // set the values into row cell's
    cell1.innerHTML = contracts_array[k][1];
    cell2.innerHTML = contracts_array[k][2];
    cell3.innerHTML = contracts_array[k][3];
    cell4.innerHTML = contracts_array[k][4];
    cell5.innerHTML = cell5.innerHTML + "<input id=amount_" + k.toString() + " maxlength='4' size='5' placeholder='1' onchange='func_calculate(contracts_array)'>";
    cell6.innerHTML = cell6.innerHTML + "<button id=del_" + k.toString() + " name=" + k.toString() + " class='button button3' onclick='removeSelectedRow(this)' >X</button>";


    func_calculate(contracts_array); //教練跟涂								
}



//清除特定row	
function removeSelectedRow(delobject) {

    var table = document.getElementById("tbody_contracts");

    contracts_array.splice(delobject.name, 1) //將第x個位置刪掉，處理資料庫

    document.getElementById('tbody_contracts').deleteRow(delobject.name); //刪除欄位row

    for (var i = 0; i < table.rows.length; i++) { //重新分配id and name
        var reset_del = document.getElementById('tbody_contracts').rows[i].cells[6].firstChild;
        reset_del.setAttribute('id', 'del_' + i.toString());
        reset_del.setAttribute('name', i.toString());
        var reset_amount = document.getElementById('tbody_contracts').rows[i].cells[5].firstChild;
        reset_amount.setAttribute('id', 'amount_' + i.toString());


    }
    k = document.getElementById("tbody_contracts").rows.length; //讓k照著順序加


    if (contracts_array.length == 0) { //如果單子表格為0則將損益表格恢復原狀
        document.getElementById('pro_los_0').innerHTML = "<font size='2' color='green'>risk</font>";
        document.getElementById('pro_los_1').innerHTML = "<font size='2' color='red'>benefit</font>";
        document.getElementById('pro_los_2').innerHTML = "<font size='2' color='black'>balance</font>";
    }
    func_calculate(contracts_array); //教練跟涂				
}


//清除所有row
function ClearAll(contracts_array) {
    var table = document.getElementById("tbody_contracts");
    var row_len = document.getElementById("tbody_contracts").rows.length;
    for (var i = 0; i < row_len; i++) { //清除contracts_array資料
        contracts_array.pop();
    }
    for (var i = 0; i < row_len; i++) { //清除所有欄位							
        document.getElementById("tbody_contracts").deleteRow(0);
    }
    k = document.getElementById("tbody_contracts").rows.length; //讓k回歸0

    if (contracts_array.length == 0) { //如果單子表格為0則將損益表格恢復原狀
        document.getElementById('pro_los_0').innerHTML = "<font size='2' color='green'>risk</font>";
        document.getElementById('pro_los_1').innerHTML = "<font size='2' color='red'>benefit</font>";
        document.getElementById('pro_los_2').innerHTML = "<font size='2' color='black'>balance</font>";
    }
    func_calculate(contracts_array); //教練跟涂															
}
//刷新右邊清單的quote
function refresh_tbody_contracts() {
    var row_len = document.getElementById('tbody_contracts').rows.length;
    if (row_len !== 0) {
        for (var i = 0; i <= row_len; i++) {
            contracts_array[i][4] = document.getElementById(contracts_array[i][6]).innerHTML;
            document.getElementById("tbody_contracts").rows[i].cells[4].innerText = contracts_array[i][4];
        }
    }
}


//教練程式
function input_sort(option_type, strike, quote, amount) { //分類進單類型和輸入履約價

    for (var i = 0; i < amount; i++) {
        if (option_type === "long_call") {
            buy_call += 1;
            buy_call_strike.push(strike);
            buy_call_quote.push(quote);
        } else if (option_type === "long_put") {
            buy_put += 1;
            buy_put_strike.push(strike);
            buy_put_quote.push(quote);
        } else if (option_type === "short_call") {
            sell_call += 1;
            sell_call_strike.push(strike);
            sell_call_quote.push(quote);
        } else if (option_type === "short_put") {
            sell_put += 1;
            sell_put_strike.push(strike);
            sell_put_quote.push(quote);
        } else {
            console.log("查無此單類型");
        }
        //console.log('option_type= ' + option_type);
    }
}


function func_cash_in() { //計算進場時的資金變化
    let cash_in = 0;
    for (var i = 0; i < buy_call; i++) {
        cash_in -= buy_call_quote[i];
    }
    for (var i = 0; i < buy_put; i++) {
        cash_in -= buy_put_quote[i];
    }
    for (var i = 0; i < sell_call; i++) {
        cash_in += sell_call_quote[i];
    }
    for (var i = 0; i < sell_put; i++) {
        cash_in += sell_put_quote[i];
    }
    return cash_in;
}


function cash_out(i) { //計算出場時的資金變化
    let a = 0;
    for (var j = 0; j < buy_call; j++) {
        if (i > buy_call_strike[j]) {
            a += i - buy_call_strike[j];
        } else if (i <= buy_call_strike[j]) {
            //pass
        } else {
            console.log("計算出場時的資金變化error0");
        }
    }
    for (var j = 0; j < buy_put; j++) {
        if (i < buy_put_strike[j]) {
            a += buy_put_strike[j] - i;
        } else if (i >= buy_put_strike[j]) {
            //pass
        } else {
            console.log("計算出場時的資金變化error1");
        }
    }
    for (var j = 0; j < sell_call; j++) {
        if (i > sell_call_strike[j]) {
            a -= i - sell_call_strike[j];
        } else if (i <= sell_call_strike[j]) {
            //pass
        } else {
            console.log("計算出場時的資金變化error2");
        }
    }
    for (var j = 0; j < sell_put; j++) {
        if (i < sell_put_strike[j]) {
            a -= sell_put_strike[j] - i;
        } else if (i >= sell_put_strike[j]) {
            //pass
        } else {
            console.log("計算出場時的資金變化error3");
        }
    }
    return a;
}

function paint_x() { //描出X軸座標
    var a = [];
    for (var i = 0; i < buy_call; i++) {
        a.push(buy_call_strike[i]);
    }
    for (var i = 0; i < buy_put; i++) {
        a.push(buy_put_strike[i]);
    }
    for (var i = 0; i < sell_call; i++) {
        a.push(sell_call_strike[i]);
    }
    for (var i = 0; i < sell_put; i++) {
        a.push(sell_put_strike[i]);
    }
    if (a.length > 0) {
        var max_a = Math.max.apply(null, a);
        var min_a = Math.min.apply(null, a);
    } else if (a.length === 0) {
        var max_a = 0;
        var min_a = 0;
    } else {
        console.log("描出X軸座標error");
    }
    for (var i = min_a - 500; i < max_a + 500; i++) {
        x.push(i);
    }
}
function paint_x_1() {//描出X軸座標
    var a = [];
    for (var i = 0; i < buy_call; i++) {
        a.push(buy_call_strike[i]);
    }
    for (var i = 0; i < buy_put; i++) {
        a.push(buy_put_strike[i]);
    }
    for (var i = 0; i < sell_call; i++) {
        a.push(sell_call_strike[i]);
    }
    for (var i = 0; i < sell_put; i++) {
        a.push(sell_put_strike[i]);
    }
    if (a.length > 0) {
        var max_a = Math.max.apply(null, a);
        var min_a = Math.min.apply(null, a);
    } else if (a.length === 0) {
        var max_a = 0;
        var min_a = 0;
    } else {
        console.log("描出X軸座標error");
    }
    for (var i = min_a - 1; i < max_a + 2; i++) {//疑問
        x.push(i);
    }
}

function paint_x_2() {//描出將損益兩平點也考量後的X軸點位
    var a = [];
    for (var i = 0; i < balance.length; i++) {
        a.push(balance[i]);
    }
    for (var i = 0; i < buy_call; i++) {
        a.push(buy_call_strike[i]);
    }
    for (var i = 0; i < buy_put; i++) {
        a.push(buy_put_strike[i]);
    }
    for (var i = 0; i < sell_call; i++) {
        a.push(sell_call_strike[i]);
    }
    for (var i = 0; i < sell_put; i++) {
        a.push(sell_put_strike[i]);
    }
    if (a.length > 0) {
        var max_a = Math.max.apply(null, a);
        var min_a = Math.min.apply(null, a);
    } else if (a.length === 0) {
        var max_a = 0;
        var min_a = 0;
    } else {
        console.log("描出X軸座標error");
    }
    for (var i = min_a - 500; i < max_a + 501; i++) {
        x.push(i);
    }
}

function balance_point() {//將所有損益兩平時的X座標寫入balance陣列中
    for (var i = 0; i < y.length - 1; i++) {//加入除了最後一項之外的損益兩平點
        if (y[i] * y[i + 1] < 0) {
            balance.push(x[i]);
        } else if (y[i] === 0) {
            balance.push(x[i]);
        }
    }
    if (y[y.length - 1] === 0) {//加入最後一項的損益兩平點
        balance.push(x[y.length - 1]);
    }
    //向左右延伸找損益兩平點
    var i = 0;
    if (y[y.length - 1] > y[y.length - 2] && y[y.length - 1] < 0) {//往右獲利無限，但還沒畫到損益兩平點
        do {
            var test_y = cash_in + cash_out(x[x.length - 1] + i + 1);
            var test_front_y = cash_in + cash_out(x[x.length - 1] + i);
            if (test_y === 0) {
                balance.push(x[x.length - 1] + i + 1);
            } else if (test_y * test_front_y < 0) {
                balance.push(x[x.length - 1] + i);
            }
            i++;
        } while (test_y < 0);
    } else if (y[y.length - 1] < y[y.length - 2] && y[y.length - 1] > 0) {//往右損失無限，但還沒畫到損益兩平點
        do {
            var test_y = cash_in + cash_out(x[x.length - 1] + i + 1);
            var test_front_y = cash_in + cash_out(x[x.length - 1] + i);
            if (test_y === 0) {
                balance.push(x[x.length - 1] + i + 1);
            } else if (test_y * test_front_y < 0) {
                balance.push(x[x.length - 1] + i);
            }
            i++;
        } while (test_y > 0);
    }
    var i = 0;
    if (y[0] > y[1] && y[0] < 0) {//往左獲利無限，但還沒畫到損益兩平點
        do {
            var test_y = cash_in + cash_out(x[0] - i - 1);
            var test_front_y = cash_in + cash_out(x[0] - i);
            if (test_y === 0) {
                balance.push(x[0] - i - 1);
            } else if (test_y * test_front_y < 0) {
                balance.push(x[0] - i - 1);
            }
            i++;
        } while (test_y < 0);
    } else if (y[0] < y[1] && y[0] > 0) {//往左損失無限，但還沒畫到損益兩平點
        do {
            var test_y = cash_in + cash_out(x[0] - i - 1);
            var test_front_y = cash_in + cash_out(x[0] - i);
            if (test_y === 0) {
                balance.push(x[0] - i - 1);
            } else if (test_y * test_front_y < 0) {
                balance.push(x[0] - i - 1);
            }
            i++;
        } while (test_y > 0);
    }
}

function balance_text() {//將所有損益兩平點的HTML碼打出來
    var a = '<font size="2" color="black">No balance</font>';
    if (balance.length === 1) {
        a = '<font size="2" color="black">' + balance[0].toString() + '</font>';
    } else if (balance.length > 1) {
        a = '<font size="2" color="black">' + balance[0].toString();
        for (var i = 1; i < balance.length; i++) {
            a = a + ' & ' + balance[i].toString();
        }
        a = a + '</font>';
    } else {
        a = '<font size="2" color="black">--</font>';
    }
    return a;
}

function bs_cash_out(i, remain_year) {
    var a = 0;
    for (var j = 0; j < buy_call; j++) {
        a += bs_call_quote(i, buy_call_strike[j], r, sigma, remain_year);
    }
    for (var j = 0; j < buy_put; j++) {
        a += bs_put_quote(i, buy_put_strike[j], r, sigma, remain_year);
    }
    for (var j = 0; j < sell_call; j++) {
        a -= bs_call_quote(i, sell_call_strike[j], r, sigma, remain_year);
    }
    for (var j = 0; j < sell_put; j++) {
        a -= bs_put_quote(i, sell_put_strike[j], r, sigma, remain_year);
    }
    return a;
}


function normal(x, mu, sigma) {
    return stdNormal((x - mu) / sigma);
}


function stdNormal(z) {
    var j, k, kMax, m, values, total, subtotal, item, z2, z4, a, b;
    // Power series is not stable at these extreme tail scenarios
    if (z < -6) {
        return 0;
    }
    if (z > 6) {
        return 1;
    }
    m = 1; // m(k) == (2**k)/factorial(k)
    b = z; // b(k) == z ** (2*k + 1)
    z2 = z * z; // cache of z squared
    z4 = z2 * z2; // cache of z to the 4th
    values = [];
    // Compute the power series in groups of two terms.
    // This reduces floating point errors because the series
    // alternates between positive and negative.
    for (k = 0; k < 100; k += 2) {
        a = 2 * k + 1;
        item = b / (a * m);
        item *= (1 - (a * z2) / ((a + 1) * (a + 2)));
        values.push(item);
        m *= (4 * (k + 1) * (k + 2));
        b *= z4;
    }
    // Add the smallest terms to the total first that
    // way we minimize the floating point errors.
    total = 0;
    for (k = 49; k >= 0; k--) {
        total += values[k];
    }
    // Multiply total by 1/sqrt(2*PI)
    // Then add 0.5 so that stdNormal(0) === 0.5                        
    return 0.5 + 0.3989422804014327 * total; //0.3989422804014327??????
}


function bs_call_quote(price, strike, r, sigma, remain_year) {
    var d1 = (Math.log(price / strike) + (r + (Math.pow(sigma, 2) / 2)) * remain_year) / (sigma * (Math.pow(remain_year, 0.5)));
    var d2 = d1 - sigma * Math.pow(remain_year, 0.5);
    return price * normal(d1, 0, 1) - strike * (Math.pow(Math.E, (-r * remain_year))) * normal(d2, 0, 1);
}

function bs_put_quote(price, strike, r, sigma, remain_year) {
    var d1 = (Math.log(price / strike) + (r + (Math.pow(sigma, 2) / 2)) * remain_year) / (sigma * (Math.pow(remain_year, 0.5)));
    var d2 = d1 - sigma * Math.pow(remain_year, 0.5);
    return strike * (Math.pow(Math.E, (-r * remain_year))) * (1 - normal(d2, 0, 1)) - price * (1 - normal(d1, 0, 1));
}

function func_balance() { //計算損益兩平點balance，插入id=pro_los_2
    var balance = [];
    for (var i = 0; i < y.length; i++) {
        if (y[i] === 0) {
            balance.push(x[i])
        } else if (y[i] * y[i + 1] < 0) {
            balance.push(x[i])
        }
    }
    if (balance.length === 0) {
        document.getElementById('pro_los_2').innerHTML = '<font size="2" color="black">' + 'No balance' + '</font>';
    } else if (balance.length === 1) {
        document.getElementById('pro_los_2').innerHTML = '<font size="2" color="black">' + balance[0].toString() + '</font>';
    } else if (balance.length === 2) {
        document.getElementById('pro_los_2').innerHTML = '<font size="2" color="black">' + balance[0].toString() + ' & ' + balance[1].toString() + '</font>';
    } else {
        document.getElementById('pro_los_2').innerHTML = '<font size="2" color="black">' + '--' + '</font>';
    }
}


function profit_and_loss_cap() { //id=pro_los_0 & id=pro_los_1，risk&profit表格
    if (y[y.length - 1] < y[y.length - 2] | y[0] < y[1]) { //損失無上限
        //console.log('最差損益=', '損失無上限');
        document.getElementById('pro_los_0').innerHTML = '<font size="2" color="green">' + '損失無上限' + '</font>';
    } else {
        //console.log('最差損益=', Math.min(...y));
        document.getElementById('pro_los_0').innerHTML = '<font size="2" color="green">' + (Math.min(...y)).toString() + '</font>';
    }
    if (y[y.length - 1] > y[y.length - 2] | y[0] > y[1]) { //如果獲利無上限
        //console.log('最佳損益=', '獲利無上限');
        document.getElementById('pro_los_1').innerHTML = '<font size="2" color="red">' + '獲利無上限' + '</font>';
    } else {
        //console.log('最佳損益=', Math.max(...y));
        document.getElementById('pro_los_1').innerHTML = '<font size="2" color="red">' + (Math.max(...y)).toString() + '</font>';
    }

}

//涂
function draw(x, y, bs_y, line_n) {
    lineChart.data.labels = [];
    lineChart.data.datasets[0].data = [];
    lineChart.data.datasets[1].data = [];
    lineChart.data.datasets[2].data = [];
    lineChart.data.labels = x;

    lineChart_n.data.labels = [];
    lineChart_n.data.datasets[0].data = line_n;
    lineChart_n.data.labels = x;    

    for (var i = 0; i < x.length; i++) {
        if (y[i] < 0) {
            lineChart.data.datasets[1].data.push(y[i]);
            lineChart.data.datasets[0].data.push(null);

        } else {
            lineChart.data.datasets[0].data.push(y[i]);
            lineChart.data.datasets[1].data.push(null);

        }
    }

    //draw(x, y, bs_y, line_n);
    //判斷今天是星期幾並依照剩餘天數把bs寫進去
    var now = new Date();
    var day = now.getDay();

    if (day === 4) {//禮拜四則剩餘天數為4天
        lineChart.data.datasets[2].data = bs_y ;
        lineChart.data.datasets[2].label = 'remain 4 days' ;
    } else if (day === 5 || day === 6 || day === 0) {//禮拜五、六、日則剩餘天數為3天
        lineChart.data.datasets[2].data = bs_y ;
        lineChart.data.datasets[2].label = 'remain 3 days' ;
    } else if (day === 1) {//禮拜一則剩餘天數為2天
        lineChart.data.datasets[2].data = bs_y ;
        lineChart.data.datasets[2].label = 'remain 2 days' ;
    } else if (day === 2) {//禮拜二則剩餘天數為1天
        lineChart.data.datasets[2].data = bs_y ;
        lineChart.data.datasets[2].label = 'remain 1 day' ;
    } else if (day === 3) {//禮拜三則剩餘天數為0天
        lineChart.data.datasets[2].data = bs_y ;
        lineChart.data.datasets[2].label = 'remain 0 day' ;
    }

    lineChart.update();//使線圖可以即時更新
    lineChart.resize();//重設線圖

    lineChart_n.update();//使線圖可以即時更新
    lineChart_n.resize();//重設線圖
}

function pdf(x,mean,std){//計算機率密度函數      
    var pdf = (1 / (std * Math.pow(2*Math.PI,0.5))) * Math.pow(Math.E,(Math.pow(x - mean,2) / (-2 * Math.pow(std,2))));
    //pdf = Math.round(pdf * 10000) / 10000;
    pdf = pdf*10000;
    return pdf;
}



//main
var mytime = setInterval('myTimer()', 1000);
func_month();
setInterval('load_json_call()', 100); //反覆讀json
setInterval('refresh_tbody_contracts(contracts_array)', 1000);//刷新右方清單按鈕

var option_type = "";
var strike = 0;
var quote = 0;
var buy_call = 0;
var buy_put = 0;
var sell_call = 0;
var sell_put = 0;
var buy_call_strike = [];
var buy_put_strike = [];
var sell_call_strike = [];
var sell_put_strike = [];
var buy_call_quote = [];
var buy_put_quote = [];
var sell_call_quote = [];
var sell_put_quote = [];

var bs_y = [];

var x = [];
var y = [];
var amount = 1; //口數

var r = 0.01;
var sigma = 0.4;

var balance = [];

var index_num = 14350;
var line_n=[];
function func_calculate(contracts_array) { //計算教練程式main

    option_type = "";
    strike = 0;
    quote = 0;
    buy_call = 0;
    buy_put = 0;
    sell_call = 0;
    sell_put = 0;

    buy_call_strike.length = 0;
    buy_put_strike.length = 0;
    sell_call_strike.length = 0;
    sell_put_strike.length = 0;
    buy_call_quote.length = 0;
    buy_put_quote.length = 0;
    sell_call_quote.length = 0;
    sell_put_quote.length = 0;
    x.length = 0;
    y.length = 0;

    balance.length = 0;

    bs_y.length = 0;

    amount = 1; //口數
    //bs model
    //sigma = (parseFloat(document.getElementById("bs_0").innerText) / 100) / Math.pow(52, 0.5);//臺指選擇權波動率指數
    //r = (Math.pow((1 + parseFloat(document.getElementById("bs_1").innerText)), 1 / 52) - 1) / 100;//無風險利率

    sigma = parseFloat(document.getElementById("bs_0").innerText) / 100;//臺指選擇權波動率指數
    r = parseFloat(document.getElementById("bs_1").innerText)/100;//無風險利率
    line_n.length = 0;
    for (var i = 0; i < contracts_array.length; i++) { //分配contracts_array內的個數值
        option_type = contracts_array[i][1] + "_" + contracts_array[i][2];
        strike = parseInt(contracts_array[i][3]);
        quote = parseInt(contracts_array[i][4]);

        amount_value = document.getElementById('amount_' + i.toString()).value;

        if (amount_value === '' || amount_value === undefined || amount_value === null) { //取得amount，如果為空直則預設為1
            amount = 1;
        } else if (parseInt(amount_value) < 0) {
            alert('amount not allow be negative, so it will be 0');
            amount = 0;
        } else {
            amount = parseInt(amount_value);
        }
        contracts_array[i][5] = amount;

        input_sort(option_type, strike, quote, amount); //輸入進單類型和履約價
    }

    console.log('r = ', r);
    console.log('sigma = ', sigma);
    //console.log('remain_year = ', remain_year);

    paint_x_1();//第一次描出X軸點位
    cash_in = func_cash_in(); //計算進場時的資金變化
    for (var i = 0; i < x.length; i++) { //描出Y軸點位
        y.push(cash_in + cash_out(x[i])); //計算進出場後總共的資金變化
    }

    balance_point();//將所有損益兩平時的X座標寫入balance陣列中
    x.length = 0;//清空x陣列
    y.length = 0;//清空y陣列
    //bs_y.length = 0;//清空bs_y陣列

    paint_x_2();//描出將損益兩平點也考量後的X軸點位
    var now = new Date();
    var day = now.getDay();
    for (var i = 0; i < x.length; i++) { //第二次描出Y軸點位
        y.push(cash_in + cash_out(x[i])); //計算進出場後總共的資金變化
        
        bs_y.push(cash_in + bs_cash_out(x[i], day /365))
        // bs_y_1_day.push(cash_in + bs_cash_out(x[i], 1 /365)); //計算1天後到期的BS模型下進出場後總共的資金變化
        // bs_y_2_day.push(cash_in + bs_cash_out(x[i], 2 /365)); //計算2天後到期的BS模型下進出場後總共的資金變化
        // bs_y_3_day.push(cash_in + bs_cash_out(x[i], 3 /365)); //計算3天後到期的BS模型下進出場後總共的資金變化
        // bs_y_4_day.push(cash_in + bs_cash_out(x[i], 4/365)); //計算4天後到期的BS模型下進出場後總共的資金變化
        // bs_y_5_day.push(cash_in + bs_cash_out(x[i], 5/365)); //計算5天後到期的BS模型下進出場後總共的資金變化
    }



    console.log(contracts_array);
    console.log('x=', x);
    console.log('y=', y);
    //console.log('bs_y=', bs_y);

    //重設balane表格內容
    document.getElementById('pro_los_0').innerHTML = "<font size='2' color='green'>risk</font>";
    document.getElementById('pro_los_1').innerHTML = "<font size='2' color='red'>benefit</font>";
    document.getElementById('pro_los_2').innerHTML = "<font size='2' color='black'>balance</font>";

    //如果單子無內容則復原，否則作動
    if (contracts_array.length === 0) {
        ;
        x = [10000, 12000, 14000, 16000, 18000];
        y = [0, 0, 0, 0, 0];
        bs_y = [null, null, null, null, null];
        line_n = [0, 0, 0, 0, 0];//normal distrubution
        draw(x, y, bs_y, line_n);
        // bs_y_1_day = [null, null, null, null, null];
        // bs_y_2_day = [null, null, null, null, null];
        // bs_y_3_day = [null, null, null, null, null];
        // bs_y_4_day = [null, null, null, null, null];
        // bs_y_5_day = [null, null, null, null, null];
        //draw(x, y, bs_y); //畫線圖
        //draw(x, y, bs_y_1_day, bs_y_2_day, bs_y_3_day, bs_y_4_day, bs_y_5_day); //畫線圖


    } else {
        //func_balance();
        //balance_point();//計算所有損益兩平時的X座標
        document.getElementById('pro_los_2').innerHTML = balance_text();
        profit_and_loss_cap(); //計算損益上限
        var mean = index_num;
        var std = 100;//假設標準差100
        for(var i=0;i< x.length;i++){
            line_n.push(pdf(parseInt(x[i]),mean,std));
        }
        console.log(mean);
        console.log(std);
        console.log(line_n);
        draw(x, y, bs_y,line_n); //畫線圖
        
        //draw(x, y, bs_y_1_day, bs_y_2_day, bs_y_3_day, bs_y_4_day, bs_y_5_day); //畫線圖
    }
    return 0;
};
