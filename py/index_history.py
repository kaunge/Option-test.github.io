#!/usr/bin/env python
# coding: utf-8

# In[ ]:


#取得歷史報價並畫圖
def get_data(stock):
    #加入取得報價的套件
    import yfinance as yf
    from datetime import date

    end = date.today().strftime("%Y-%m-%d")
    #歷史報價存入df(查詢標的,開始時間,結束時間)
    df = yf.download(stock,start='2010-01-01',end=end).dropna()#download data from yahoo
    print('get_data ok')
    return df

def sort_data(df):
    df=df.sort_index(ascending=False)
    df.reset_index(level=0, inplace=True)
    df=df[['Date','Open', 'High', 'Low', 'Close', 'Volume',  'Adj Close']]
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    df.to_csv("C:\\xampp\\htdocs\\project\json\history.csv",header=True,index=False)
    print('sort_data ok')
    return df

def plot_close(df):
    import matplotlib.pyplot as plt
    get_ipython().run_line_magic('matplotlib', 'inline')
    df=df.sort_values(by='Date')
    close=np.array(df['Close'])
    date=np.array(df['Date'])
    fig, ax1 = plt.subplots()
    fig.set_size_inches(20, 5, forward=True)
    ax1.plot(date,close)
    ax1.set_title('^TWII', fontsize=20)
    ax1.set_ylabel('Close',fontsize=18)
    ax1.set_xlabel('Date',fontsize=18)
    

import numpy as np
import pandas as pd
stock='^TWII'#股票種類
df=get_data(stock)#取得歷史報價
df=sort_data(df)
plot_close(df)


# In[ ]:





# In[ ]:




