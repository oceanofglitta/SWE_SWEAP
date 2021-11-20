#!/usr/bin/env python
# coding: utf-8

from bs4 import BeautifulSoup
import requests
import pandas as pd
import urllib.request as urllib
from selenium import webdriver

#chrome driver에서 url get해오기
driver = webdriver.Chrome('chromedriver')
driver.implicitly_wait(3)
driver.get('https://kr.investing.com/equities/south-korea')

#select 버튼 조작
from selenium.webdriver.support.select import Select

select= Select(driver.find_element_by_id("stocksFilter"))
select.select_by_index(0)

html = driver.page_source 
bsObject = BeautifulSoup(html, 'html.parser')


tmp = bsObject.find('table', id = 'cross_rate_markets_stocks_1')
#table에서 정보 get
column = ['None','종목','현재가','고가','저가','변동','변동률','거래량','시간']
df = pd.DataFrame(columns=column)
tmplen = len(tmp.find_all("tr"))

for i in range(1, tmplen):
  tempTr = tmp.find_all("tr")[i]
  if(tempTr.find("th") is not None):
    continue
  row = {}
  column_idx = 0
  for j in range(9):
    tempTd = tempTr.find_all("td")[j].text
    if(tempTd == "" and j > 0):
      continue
    row[column[column_idx]] = tempTd
    column_idx += 1
  df = df.append(row,ignore_index=True)

df = df[['종목','현재가','고가','저가','변동','변동률','거래량','시간']]

# 데이터 정렬을 위해 string -> int or float값으로 변환
df['현재가'] = df.현재가.str.replace(',', '').astype('int64')
df['고가'] = df.고가.str.replace(',', '').astype('int64')
df['저가'] = df.저가.str.replace(',', '').astype('int64')
ch = df.변동.str[0]
for i in range(len(ch)):
    if ch[i] == '+':
        df.변동[i] =int(df.변동[i][1:])
    elif ch[i] == '-':
        df.변동[i] = int(df.변동[i][1:])*-1
    else:
        df.변동[i] = int(df.변동[i])

ch2 = df.변동률.str[0]
for i in range(len(ch2)):
    if ch[i] == '+':
        df.변동률[i] = float(df.변동률[i][1:-1])
    elif ch[i] == '-':
        df.변동률[i] = float(df.변동률[i][1:-1])*-1
    else:
        df.변동률[i] = float(df.변동률[i][:-1])
        
ch3 = df.거래량.str[-1]

for i in range(len(ch3)):
    if ch3[i] == 'M':
        df.거래량[i] = float(df.거래량[i][:-1])*1000000
    elif ch3[i] == 'K':
        df.거래량[i] = float(df.거래량[i][:-1])*1000
    else:
        df.거래량[i] = float(df.거래량[i])

#dataframe -> json
js = df.to_json('dataframe.json',orient = 'table', force_ascii=False)

