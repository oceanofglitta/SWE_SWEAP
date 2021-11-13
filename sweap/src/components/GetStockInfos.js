const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const getStock = async(stockNumber) => {
    let datum = [];
    let result = [];
    let temp;

    const html = await axios.get(`https://finance.naver.com/item/main.naver?code=${stockNumber}`);
    const $ = cheerio.load(iconv.encode(html.data, 'euc-kr'));

    const stockInfo = $('div.new_totalinfo>dl').children('dd');
    stockInfo.each(function (i, elem) {
        datum[i] = $(this).text();
    })
    
    // result[0]: 현재가 result[1]: 전일종가 result[2]: 시가
    // result[3]: 고가 result[4]: 저가
    temp = datum[3].split(' ');
    result[0] = temp[1].replace(',','') *1;
    temp = datum[4].split(' ');
    result[1] = temp[1].replace(',','') *1;
    temp = datum[5].split(' ');
    result[2] = temp[1].replace(',','') *1;
    temp = datum[6].split(' ');
    result[3] = temp[1].replace(',','') *1;
    temp = datum[8].split(' ');
    result[4] = temp[1].replace(',','') *1;
    // replace로 쉼표 제거, *1로 string to int
    
    return result;
}

const printStockInfo = async(stockNumber) => {
    const stockInfoArr = await getStock(stockNumber);
    console.log(stockInfoArr);
}


printStockInfo('005930');
