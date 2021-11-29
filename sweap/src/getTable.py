#!/usr/bin/env python
# coding: utf-8

from bs4 import BeautifulSoup
import requests
import pandas as pd
import urllib.request as urllib
from time import sleep

headers = requests.utils.default_headers()
headers.update({
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
})

while 1:
  url = "https://kr.investing.com/equities/south-korea"
  req = requests.get(url, headers = headers)
  source = req.text
  bsObject = BeautifulSoup(source, 'html.parser')

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

  df = df[['종목','현재가']]

  # 데이터 정렬을 위해 string -> int or float값으로 변환
  df['현재가'] = df.현재가.str.replace(',', '').astype('float64')

  #dataframe -> json
  js = df.to_json('dataframe.json',orient = 'table', force_ascii=False)
  sleep(3)
