#!/usr/bin/env python
# coding: utf-8

# In[1]:


#取得歷史報價並畫圖
def get_data(stock,start,end):
    #加入取得報價的套件
    import yfinance as yf
    
    #歷史報價存入df(查詢標的,開始時間,結束時間)
    df = yf.download(stock,start,end,interval = "1d").dropna()#download data from yahoo
    #1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max
    
    #畫圖
    import matplotlib.pyplot as plt
    get_ipython().run_line_magic('matplotlib', 'inline')
    plt.figure(figsize=(20,5))
    plt.title(stock+' Adj Close')
    plt.plot(df['Adj Close'])
    plt.show()
    
    return df


# In[2]:


#整理資料與增加複雜度
def sort_data(df):
    df['Open-Close'] = (df.Open - df.Close)/df.Open
    df['High-Low'] = (df.High - df.Low)/df.Low
    df['percent_change'] = df['Close'].pct_change()
    df['std_5'] = df['percent_change'].rolling(5).std()
    df['ret_5'] = df['percent_change'].rolling(5).mean()
    df.dropna(inplace=True)
    return df


# In[3]:


def split_data(df):
    #label
    # X is the input variable
    X = df[['Open-Close', 'High-Low', 'std_5', 'ret_5']]

    # Y is the target or output variable
    # y = np.where(df['Close'].shift(-1) > df['Close'], 1, -1)
    y=df['Adj Close']
    y=np.around(y)
    #分割訓練組跟測試組
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)
    print(X_train.shape, X_test.shape)
    print(y_train.shape, y_test.shape)
    return X_train, X_test, y_train, y_test


# In[4]:


def RandomForestClassifier(X_train, X_test, y_train, y_test):
    from sklearn.ensemble import RandomForestClassifier
    from sklearn import metrics
    import pandas as pd
    #from sklearn.ensemble import RandomForestClassifier
    clf = RandomForestClassifier(n_estimators=1000, random_state=10, n_jobs=-1, min_samples_leaf = 5)
    # Create the model on train dataset
    model = clf.fit(X_train, y_train)
    y_pre = clf.predict(X_test)
    table=pd.DataFrame(clf.predict_proba(X_test), columns=clf.classes_)
    
    from sklearn.metrics import classification_report
    report = classification_report(y_test, y_pre)
    print('RandomForestClassifier')
    return table,y_test, y_pre


# In[5]:


def SVM(X_train, X_test, y_train, y_test):
    from sklearn import svm
    # 建立 SVC 模型
    #svc參數
    #https://blog.csdn.net/szlcw1/article/details/52336824
    svc = svm.SVC(gamma='scale', C=30,probability=True, random_state=0,
              kernel='rbf',decision_function_shape='ovo')
    model = svc.fit(X_train,y_train)
    
    # 預測
    y_pre=svc.predict(X_test)
    table=pd.DataFrame(svc.predict_proba(X_test), columns=svc.classes_)
    
    from sklearn.metrics import classification_report
    report = classification_report(y_test, y_pre)
    print('SVM')
    return table, y_test, y_pre


# In[6]:


def auc_roc(y_test, y_pre):  
    # 績效
    fpr, tpr, thresholds = metrics.roc_curve(y_test, y_pre)
    auc = metrics.auc(fpr, tpr)
    #auc = metrics.roc_auc_score(y_test, y_pred_proba)#計算面積，越高越好
    print(auc)
    import matplotlib.pyplot as plt

    plt.plot(fpr,tpr,label="random forest, auc="+str(auc),color='blue')
    plt.title("ROC")
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.legend(loc=4)
    plt.show()


# In[7]:


def to_json(table,table_name):
    result = table.iloc[:1,:].T
    result.reset_index(inplace=True)
    result.columns=['strike','p']
    result.to_json(r"C:/xampp/htdocs/project/json/"+table_name+".json",orient='values')
    result_read=pd.read_json("C:/xampp/htdocs/project/json/"+table_name+".json",orient='values')
    result_read
    print('table_name= ',table_name,' finish')


# In[8]:


import numpy as np
import pandas as pd
stock='^TWII'#股票種類
df=get_data(stock,'2020-04-27','2021-04-27')#取得歷史報價並畫圖
df=sort_data(df)
df.head(10)
X_train, X_test, y_train, y_test=split_data(df)
table_RF,y_test_RF, y_pre_RF=RandomForestClassifier(X_train, X_test, y_train, y_test)
table_SVM,y_test_SVM, y_pre_SVM=SVM(X_train, X_test, y_train, y_test)
#auc_roc(y_test, y_pre)
to_json(table_RF,'RF')
to_json(table_SVM,'SVM')


# In[9]:


table_SVM.iloc[:1,:]


# In[10]:


table_RF.iloc[:1,:]


# In[11]:


rf=pd.read_json("C:/xampp/htdocs/project/json/RF.json",orient='values')
rf


# In[ ]:




