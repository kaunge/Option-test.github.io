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
    k = document.getElementById("tbody_contracts").rows.length; //讓k照著順序加
    for (var i = 0; i < table.rows.length; i++) { //重新分配id and name
        var reset_del = document.getElementById('tbody_contracts').rows[i].cells[6].firstChild;
        reset_del.setAttribute('id', 'del_' + i.toString());
        reset_del.setAttribute('name', i.toString());
        var reset_amount = document.getElementById('tbody_contracts').rows[i].cells[5].firstChild;
        reset_amount.setAttribute('id', 'amount_' + i.toString());       
    }
    for(var i=0;i<k;i++){
        contracts_array[i][0]=i+1;
        var reset_item = document.getElementById('tbody_contracts').rows[i].cells[0];
        reset_item.innerHTML = i+1;
    }
    
    if (contracts_array.length == 0) { //如果單子表格為0則將損益表格恢復原狀
        document.getElementById('pro_los_0').innerHTML = "<font size='2' color='green'>loss</font>";
        document.getElementById('pro_los_1').innerHTML = "<font size='2' color='red'>profit</font>";
        document.getElementById('pro_los_2').innerHTML = "<font size='2' color='black'>break-even point</font>";
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
        document.getElementById('pro_los_0').innerHTML = "<font size='2' color='green'>loss</font>";
        document.getElementById('pro_los_1').innerHTML = "<font size='2' color='red'>profit</font>";
        document.getElementById('pro_los_2').innerHTML = "<font size='2' color='black'>break-even point</font>";
    }
    func_calculate(contracts_array); //教練跟涂															
}
//刷新右邊清單的quote
function refresh_tbody_contracts() {
    var row_len = document.getElementById('tbody_contracts').rows.length;
    if (row_len !== 0) {
        for (var i = 0; i < row_len; i++) {
            contracts_array[i][4] = document.getElementById((contracts_array[i][6]).toString()).innerHTML;
            document.getElementById("tbody_contracts").rows[i].cells[4].innerText = contracts_array[i][4];
        }
    }
    console.log('refresh_tbody_contracts',contracts_array);
    func_calculate(contracts_array);
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
        var adj_max_a = max_a - max_a % 50;
        var adj_min_a = min_a + (50 - min_a % 50);
    } else if (a.length === 0) {
        var adj_max_a = 0;
        var adj_min_a = 0;
    } else {
        console.log("描出X軸座標error");
    }
    for (var i = adj_min_a - 500; i < adj_max_a + 501; i++) {
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
function kelly() {
    var odds=[-1,1,2];
    var pwin=[1/2,1/3,1/6];
    var PL=[];
    for (var i = 0; i <= 1; i+=0.01){
        var a = 1;
        for (var j = 0; j < odds.length; j++){
            a *= Math.pow(1+odds[j]*i, pwin[j]);
        }
        PL.push(a);
    }
    return PL;
}

//涂
function draw(x, y, bs_y, line_n) {
    
    lineChart.data.labels = [];
    lineChart.data.datasets[0].data = [];
    lineChart.data.datasets[1].data = [];
    lineChart.data.datasets[2].data = [];
    lineChart.data.labels = x;
   
    lineChart_n.data.labels = [];
    lineChart_n.data.datasets[0].data = [];
    lineChart_n.data.datasets[1].data = [];
    lineChart_n.data.labels = x;
    var std = func_std();
    var mean = parseFloat(document.getElementById('strike').innerHTML);

    for (var i = 0; i < x.length; i++) {
        if (y[i] < 0) {//profit and loss line
            lineChart.data.datasets[1].data.push(y[i]);
            lineChart.data.datasets[0].data.push(null);
        } else {
            lineChart.data.datasets[0].data.push(y[i]);
            lineChart.data.datasets[1].data.push(null);
        }

        if(x[i]<mean-std || x[i]>mean+std){//normal distribution line
            lineChart_n.data.datasets[0].data.push(line_n[i]);
            lineChart_n.data.datasets[1].data.push(null);
        }else{
            lineChart_n.data.datasets[0].data.push(null);
            lineChart_n.data.datasets[1].data.push(line_n[i]);
        }
    }
    load_json_ml(x);
    
    //draw(x, y, bs_y, line_n);
    //判斷今天是星期幾並依照剩餘天數把bs寫進去
    var now = new Date();
    var day = now.getDay();
    if (day === 4) {//禮拜四則剩餘天數為4天
        lineChart.data.datasets[2].data = bs_y;
        lineChart.data.datasets[2].label = 'BS(remain 4 days)';
        document.getElementById('Standard Deviation(days)').innerHTML='Standard Deviation(4 days)';
    } else if (day === 5 || day === 6 || day === 0) {//禮拜五、六、日則剩餘天數為3天
        lineChart.data.datasets[2].data = bs_y;
        lineChart.data.datasets[2].label = 'BS(remain 3 days)';
        document.getElementById('Standard Deviation(days)').innerHTML='Standard Deviation(3 days)'
    } else if (day === 1) {//禮拜一則剩餘天數為2天
        lineChart.data.datasets[2].data = bs_y;
        lineChart.data.datasets[2].label = 'BS(remain 2 days)';
        document.getElementById('Standard Deviation(days)').innerHTML='Standard Deviation(2 days)'
    } else if (day === 2) {//禮拜二則剩餘天數為1天
        lineChart.data.datasets[2].data = bs_y;
        lineChart.data.datasets[2].label = 'BS(remain 1 day)';
        document.getElementById('Standard Deviation(days)').innerHTML='Standard Deviation(1 day)'
    } else if (day === 3) {//禮拜三則剩餘天數為0天
        lineChart.data.datasets[2].data = bs_y;
        lineChart.data.datasets[2].label = 'BS(remain 0 day)';
        document.getElementById('Standard Deviation(days)').innerHTML='Standard Deviation(0 day)'
    }

    lineChart.update();//使線圖可以即時更新
    lineChart.resize();//重設線圖

    lineChart_n.update();//使線圖可以即時更新
    lineChart_n.resize();//重設線圖

    lineChart_rf_1.update();//使線圖可以即時更新
    lineChart_rf_1.resize();//重設線圖
}

function pdf(x, mean, std) {//計算機率密度函數      
    var pdf = (1 / (std * Math.pow(2 * Math.PI, 0.5))) * Math.pow(Math.E, (Math.pow(x - mean, 2) / (-2 * Math.pow(std, 2))));
    //pdf = Math.round(pdf * 10000) / 10000;
    //pdf = pdf*10000;
    return pdf;
}

//ztable
var val = [
    [0.50000, 0.50399, 0.50798, 0.51197, 0.51595, 0.51994, 0.52392, 0.52790, 0.53188, 0.53586],
    [0.53983, 0.54380, 0.54776, 0.55172, 0.55567, 0.55966, 0.56360, 0.56749, 0.57142, 0.57535],
    [0.57926, 0.58317, 0.58706, 0.59095, 0.59483, 0.59871, 0.60257, 0.60642, 0.61026, 0.61409],
    [0.61791, 0.62172, 0.62552, 0.62930, 0.63307, 0.63683, 0.64058, 0.64431, 0.64803, 0.65173],
    [0.65542, 0.65910, 0.66276, 0.66640, 0.67003, 0.67364, 0.67724, 0.68082, 0.68439, 0.68793],
    [0.69146, 0.69497, 0.69847, 0.70194, 0.70540, 0.70884, 0.71226, 0.71566, 0.71904, 0.72240],
    [0.72575, 0.72907, 0.73237, 0.73565, 0.73891, 0.74215, 0.74537, 0.74857, 0.75175, 0.75490],
    [0.75804, 0.76115, 0.76424, 0.76730, 0.77035, 0.77337, 0.77637, 0.77935, 0.78230, 0.78524],
    [0.78814, 0.79103, 0.79389, 0.79673, 0.79955, 0.80234, 0.80511, 0.80785, 0.81057, 0.81327],
    [0.81594, 0.81859, 0.82121, 0.82381, 0.82639, 0.82894, 0.83147, 0.83398, 0.83646, 0.83891],
    [0.84134, 0.84375, 0.84614, 0.84849, 0.85083, 0.85314, 0.85543, 0.85769, 0.85993, 0.86214],
    [0.86433, 0.86650, 0.86864, 0.87076, 0.87286, 0.87493, 0.87698, 0.87900, 0.88100, 0.88298],
    [0.88493, 0.88686, 0.88877, 0.89065, 0.89251, 0.89435, 0.89617, 0.89796, 0.89973, 0.90147],
    [0.90320, 0.90490, 0.90658, 0.90824, 0.90988, 0.91149, 0.91308, 0.91466, 0.91621, 0.91774],
    [0.91924, 0.92073, 0.92220, 0.92364, 0.92507, 0.92647, 0.92785, 0.92922, 0.93056, 0.93189],
    [0.93319, 0.93448, 0.93574, 0.93699, 0.93822, 0.93943, 0.94062, 0.94179, 0.94295, 0.94408],
    [0.94520, 0.94630, 0.94738, 0.94845, 0.94950, 0.95053, 0.95154, 0.95254, 0.95352, 0.95449],
    [0.95543, 0.95637, 0.95728, 0.95818, 0.95907, 0.95994, 0.96080, 0.96164, 0.96246, 0.96327],
    [0.96407, 0.96485, 0.96562, 0.96638, 0.96712, 0.96784, 0.96856, 0.96926, 0.96995, 0.97062],
    [0.97128, 0.97193, 0.97257, 0.97320, 0.97381, 0.97441, 0.97500, 0.97558, 0.97615, 0.97670],
    [0.97725, 0.97778, 0.97831, 0.97882, 0.97932, 0.97982, 0.98030, 0.98077, 0.98124, 0.98169],
    [0.98214, 0.98257, 0.98300, 0.98341, 0.98382, 0.98422, 0.98461, 0.98500, 0.98537, 0.98574],
    [0.98610, 0.98645, 0.98679, 0.98713, 0.98745, 0.98778, 0.98809, 0.98840, 0.98870, 0.98899],
    [0.98928, 0.98956, 0.98983, 0.99010, 0.99036, 0.99061, 0.99086, 0.99111, 0.99134, 0.99158],
    [0.99180, 0.99202, 0.99224, 0.99245, 0.99266, 0.99286, 0.99305, 0.99324, 0.99343, 0.99361],
    [0.99379, 0.99396, 0.99413, 0.99430, 0.99446, 0.99461, 0.99477, 0.99492, 0.99506, 0.99520],
    [0.99534, 0.99547, 0.99560, 0.99573, 0.99585, 0.99598, 0.99609, 0.99621, 0.99632, 0.99643],
    [0.99653, 0.99664, 0.99674, 0.99683, 0.99693, 0.99702, 0.99711, 0.99720, 0.99728, 0.99736],
    [0.99744, 0.99752, 0.99760, 0.99767, 0.99774, 0.99781, 0.99788, 0.99795, 0.99801, 0.99807],
    [0.99813, 0.99819, 0.99825, 0.99831, 0.99836, 0.99841, 0.99846, 0.99851, 0.99856, 0.99861],
    [0.99865, 0.99869, 0.99874, 0.99878, 0.99882, 0.99886, 0.99889, 0.99893, 0.99896, 0.99900],
    [0.99903, 0.99906, 0.99910, 0.99913, 0.99916, 0.99918, 0.99921, 0.99924, 0.99926, 0.99929],
    [0.99931, 0.99934, 0.99936, 0.99938, 0.99940, 0.99943, 0.99944, 0.99946, 0.99948, 0.99950],
    [0.99952, 0.99953, 0.99955, 0.99957, 0.99958, 0.99960, 0.99961, 0.99962, 0.99964, 0.99965],
    [0.99966, 0.99968, 0.99969, 0.99970, 0.99971, 0.99972, 0.99973, 0.99974, 0.99975, 0.99976],
    [0.99977, 0.99978, 0.99978, 0.99979, 0.99980, 0.99981, 0.99981, 0.99982, 0.99983, 0.99983],
    [0.99984, 0.99985, 0.99985, 0.99986, 0.99986, 0.99987, 0.99987, 0.99988, 0.99988, 0.99989],
    [0.99989, 0.99990, 0.99990, 0.99990, 0.99991, 0.99991, 0.99992, 0.99992, 0.99992, 0.99992],
    [0.99993, 0.99993, 0.99993, 0.99994, 0.99994, 0.99994, 0.99994, 0.99995, 0.99995, 0.99995],
    [0.99995, 0.99995, 0.99996, 0.99996, 0.99996, 0.99996, 0.99996, 0.99996, 0.99997, 0.99997],
    [0.99997, 0.99997, 0.99997, 0.99997, 0.99997, 0.99997, 0.99998, 0.99998, 0.99998, 0.99998]
];

function cdf(x, mean, std) {
    var z = (x - mean) / std;
    var abs_z = parseFloat(Math.round(Math.abs(z)*100)/100);
    var f_z = parseInt(abs_z * 10);
    var s_z=0
    if(abs_z.toString().length === 4){
        s_z = parseInt(abs_z.toString()[abs_z.toString().length-1]);
    }else{
        s_z = 0;
    }
             
    var cdf = 0;
    if (z >= 0) {
        cdf = val[f_z][s_z];
    } else {
        cdf = 1 - val[f_z][s_z];
    }    
    return cdf
}

//計算標準差
function func_std(){
    var std = 100;
    document.getElementById('std').innerHTML = std;
    return std;
}


//main
var mytime = setInterval('myTimer()', 1000);
func_month();
func_std();//計算標準差
setInterval('load_json_call()', 1000); //反覆讀json
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
var line_n = [];
var exp_value = 0;
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
    r = parseFloat(document.getElementById("bs_1").innerText) / 100;//無風險利率
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

    //console.log('r = ', r);
    //console.log('sigma = ', sigma);
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
    if (day == 5) {//星期四
        day = 4;
    } else if (day == 6 || day == 7 || day == 0) {//星期五、六、日
        day = 3;
    } else if (day == 1) {//星期一
        day = 2;
    } else if (day == 2) {//星期二
        day = 1;
    } else if (day == 3) {
        day == 0;
    }
    for (var i = 0; i < x.length; i++) { //第二次描出Y軸點位
        y.push(cash_in + cash_out(x[i])); //計算進出場後總共的資金變化

        bs_y.push(cash_in + bs_cash_out(x[i], day / 365));

        // bs_y_1_day.push(cash_in + bs_cash_out(x[i], 1 /365)); //計算1天後到期的BS模型下進出場後總共的資金變化
        // bs_y_2_day.push(cash_in + bs_cash_out(x[i], 2 /365)); //計算2天後到期的BS模型下進出場後總共的資金變化
        // bs_y_3_day.push(cash_in + bs_cash_out(x[i], 3 /365)); //計算3天後到期的BS模型下進出場後總共的資金變化
        // bs_y_4_day.push(cash_in + bs_cash_out(x[i], 4/365)); //計算4天後到期的BS模型下進出場後總共的資金變化
        // bs_y_5_day.push(cash_in + bs_cash_out(x[i], 5/365)); //計算5天後到期的BS模型下進出場後總共的資金變化
    }

    var PL = kelly();
    var optf = PL.indexOf(Math.max.apply(null, PL));

    console.log(contracts_array);
    //console.log('x=', x);
    //console.log('y=', y);
    //console.log('bs_y=', bs_y);

    //重設balane表格內容
    document.getElementById('pro_los_0').innerHTML = "<font size='2' color='green'>loss</font>";
    document.getElementById('pro_los_1').innerHTML = "<font size='2' color='red'>profit</font>";
    document.getElementById('pro_los_2').innerHTML = "<font size='2' color='black'>break-even point</font>";

    //如果單子無內容則復原，否則作動
    if (contracts_array.length === 0) {
        ;
        x = [10000, 12000, 14000, 16000, 18000];
        y = [0, 0, 0, 0, 0];
        bs_y = [null, null, null, null, null];
        line_n = [0, 0, 0, 0, 0];//normal distrubution
        draw(x, y, bs_y, line_n);
        document.getElementById('exp').innerHTML='exp_value';
    } else {
        //func_balance();
        //balance_point();//計算所有損益兩平時的X座標
        document.getElementById('pro_los_2').innerHTML = balance_text();
        profit_and_loss_cap(); //計算損益上限
        var mean = parseFloat(document.getElementById('strike').innerHTML);
        var std = 100;//假設標準差100
        var exp_value = 0;
        for (var i = 0; i < x.length; i++) {
            line_n.push(pdf(parseInt(x[i]), mean, std));//計算pdf
        }
        var cdf_max = parseFloat(document.getElementById('strike').innerHTML);//計算Z分數小於4時的最大值
        while ((cdf_max - mean) / std <= 4) {
            cdf_max++;
        }
        for (var i = mean * 2 - cdf_max + 0.5; i < cdf_max - 0.5; i++) {//計算期望值
            var diff_cdf = cdf(i + 1, mean, std) - cdf(i, mean, std);
            exp_value += diff_cdf * (cash_in + cash_out(i+0.5))
        }
        document.getElementById('exp').innerHTML=exp_value;
        //console.log(exp_value);
        if(day!==3){
            draw(x, y, bs_y, line_n);//畫線圖
        }else{
            bs_y = [null, null, null, null, null];
            draw(x, y, bs_y, line_n);
        }

        //draw(x, y, bs_y_1_day, bs_y_2_day, bs_y_3_day, bs_y_4_day, bs_y_5_day); //畫線圖
    }
    return 0;
};
