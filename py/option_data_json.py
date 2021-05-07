#!/usr/bin/env python
# coding: utf-8

# In[1]:


#LOGIN
def login():
    global api
    '''
    #虛擬帳
    api = sj.Shioaji(simulation=True) 
    api.login(
        person_id="PAPIUSER01", 
        passwd="2222", 
        contracts_cb=lambda security_type: print(f"{repr(security_type)} fetch done."))
    '''
    #簡靖
    api = sj.Shioaji() 
    api.login(
    person_id="C121516999", 
    passwd="jeinjin123", 
    contracts_cb=lambda security_type: print(f"{repr(security_type)} fetch done."))
    

#取得當周數跟年月日
def get_week_name():
    now = datetime.now()
    y=int(now.strftime('%Y'))
    m=int(now.strftime('%m'))
    
    #當月資訊
    this_month_start = datetime(y, m, 1)#當月1號
    this_month_end = datetime(y, m, calendar.monthrange(y, m)[1])#當月最後一天
    this_delta = (this_month_end-this_month_start).days #當月天數

    date_list = []#每月星期三陣列
    #當月的星期三陣列
    for i in range(this_delta + 1):
        p = (this_month_start + timedelta(days=i)).strftime('%Y-%m-%d')
        pp = datetime.strptime(str(p), '%Y-%m-%d')
        one = pp.isoweekday()
        if one == 3:#如果是周三就加入陣列#attention
            d2 = pp.strftime('%Y-%m-%d')
            date_list.append(d2)
   
    #依照各星期三減今天的天數來判斷今天為當月第幾週
    
    w= 0
    for i in range(len(date_list)):
        diff = (datetime.strptime(date_list[i],'%Y-%m-%d')-now ).days+1
        if diff >=0 and diff<7:
            w = i+1
            y=now.strftime('%Y')
            m=now.strftime('%m')
            
        elif diff <0 and diff >= -7:
            now = datetime.now()
            w = 1          
            y = (now+timedelta(days=7)).strftime('%Y')
            m = (now+timedelta(days=7)).strftime('%m')
            
        elif diff >7:
            continue         
    return w,  str(y), int(m)

def func_creat_data(index_num):
    for i in range(1):#取幾個月
        week_name, year_name, month_name=  get_week_name()
        
        month_call = month_call_dict[int(month_name)]#call的月份代號
        month_put = month_put_dict[int(month_name)]#put的月份代號
        
        contracts_call=[]
        contracts_put=[]
        code_num=[]
       
        if week_name == 3:
            week_name = 'O'
   
        #取得所有的報價
        for i in range(32):
            index_name = str(int(index_num)-800+i*50)#點數總攬
            code_name_call = 'TX'+str(week_name)+str(index_name)+month_call+year_name[3]#call代號
            code_name_put = 'TX'+str(week_name)+str(index_name)+month_put+year_name[3]#put代號
            if api.Contracts.Options[code_name_call] is not None and api.Contracts.Options[code_name_put] is not None:
                contracts_call.append(api.Contracts.Options[code_name_call])
                contracts_put.append(api.Contracts.Options[code_name_put])
                code_num.append(str(index_name))
            else:
                pass
              
        #近月會沒有資料
        if len(contracts_call) != 0  and len(contracts_put) != 0:
            snapshots_call = api.snapshots(contracts_call)#擷取call data
            snapshots_put = api.snapshots(contracts_put)#擷取put data
            df_call = pd.DataFrame(snapshots_call)#建立DataFrame
            df_put = pd.DataFrame(snapshots_put)#建立DataFrame
            
            
            df_call.ts = pd.to_datetime(df_call.ts)#調整時間
            df_put.ts = pd.to_datetime(df_put.ts)#調整時間
            
            df_call["code_num"] = code_num
            df_put["code_num"] = code_num
           
            table_call_name = 'TX'+str(week_name)+month_call+year_name[3]
            table_put_name = 'TX'+str(week_name)+month_put+year_name[3]

            #建立資料庫.json
            df_call.to_json (r"C:/xampp/htdocs/project/json/"+table_call_name+".json",orient="columns")
            print(table_call_name+".json.......well done")
            df_put.to_json (r"C:/xampp/htdocs/project/json/"+table_put_name+".json",orient="columns")
            print(table_put_name+".json.......well done")
            '''
             #將"data_call=''"/"data_put=''"放入.json
            with open("C:/Users/USER/Desktop/project/json/"+table_call_name+".json",'r+') as f:
                old = f.read()
                f.seek(0)
                f.write("data_call='")
                f.write(old)
            with open("C:/Users/USER/Desktop/project/json/"+table_call_name+".json",'a') as f2:
                f2.write("'")
            with open("C:/Users/USER/Desktop/project/json/"+table_put_name+".json",'r+') as f:
                old = f.read()
                f.seek(0)
                f.write("data_put='")
                f.write(old)
            with open("C:/Users/USER/Desktop/project/json/"+table_put_name+".json",'a') as f2:
                f2.write("'")
            '''
        else:
            print('error at .json')
            pass
#訂閱報價
def index_subscribe():
    api.quote.subscribe(api.Contracts.Indexs.TSE.TSE001, quote_type='tick')  
    @api.quote.on_quote
    def quote_callback(topic: str, quote: dict):
        #print(f"Topic: {topic}, Quote: {quote}")
        global index_now, index_num
        index_now = quote["Close"]#目前加權指數
        
        index_num = round(int(index_now),-1)
        if index_num % 50 >= 25:
            index_num+=50-(index_num%50)
        else:
            index_num-=index_num%50
 
        df_index_data = pd.DataFrame([index_now,index_num])
        df_index_data.to_json (r"C:/xampp/htdocs/project/json/data_index.json")
        '''
        with open("C:/Users/USER/Desktop/project/json/data_index.json",'r+') as f:
                old = f.read()
                f.seek(0)
                f.write("data_index='")
                f.write(old)
        with open("C:/Users/USER/Desktop/project/json/data_index.json",'a') as f2:
            f2.write("'")
        '''
        
#main
import shioaji as sj
import pandas as pd
import datetime, time
#from dateutil.relativedelta import relativedelta#計算月份後
from datetime import datetime, date,timedelta
import calendar

api=0#登入用
index_now=pd.read_json("C:/xampp/htdocs/project/json/data_index.json")[0][1]#目前加權指數
index_num = pd.read_json("C:/xampp/htdocs/project/json/data_index.json")[0][1]#50級距加權指數
table_call_name ="" #資料庫裡的call table
table_put_name = ""#資料庫裡的put table

#now = datetime.datetime.now()#(now.year, now.month, now.day, now.hour, now.minute, now.second)

month_call_list=["A","B","C","D","E","F","G","H","I","J","K","L"]#call的所有月份代號list
month_put_list=["M","N","O","P","Q","R","S","T","U","V","W","X"]#put的所有月份代號list

month_call_dict = {
    1:"A", 2:"B", 3:"C", 4:"D", 5:"E", 6:"F", 7:"G", 8:"H", 9:"I",10:"J", 11:"K", 12:"L"#put的所有月份代號dict
}
month_put_dict = {
    1:"M", 2:"N", 3:"O", 4:"P", 5:"Q", 6:"R", 7:"S", 8:"T", 9:"U",10:"V", 11:"W", 12:"X"#put的所有月份代號dict
}

login()#登入
time.sleep(10)
index_subscribe()#訂閱報價跟建立json
func_creat_data(index_num)#建立資料庫並轉成.json格式
time.sleep(1)


# In[ ]:




