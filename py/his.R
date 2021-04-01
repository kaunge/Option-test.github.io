library(quantmod)
#auto.assign=FALSE不自動指定變數
STK <- na.omit(getSymbols("^TWII",auto.assign=FALSE))
#cbind把時間欄加入dataframe
STK <- as.data.frame(STK)
STK <- cbind(row.names(STK),STK)
#更改欄位名稱
colnames(STK) = c("Date","Open","High","Low","Close","Volume","Adjusted")
#依照Date遞減排序
STK = STK[rev(order(as.Date(STK$Date, format = "%y-%m-%d"))),]
#輸出csv檔
write.csv(STK, "C:\\xampp\\htdocs\\project\\json\\history.csv",row.names = FALSE)

head(STK)
tail(STK)