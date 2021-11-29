import { render } from "@testing-library/react"; // eslint-disable-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Component } from "react/cjs/react.production.min";
import "../css/StockInformation.css";
import qs from "qs";
import { useLocation, useParams } from "react-router";
import shortStockInfos from "../dataframe.json";

const current = decodeURI(window.location.href);
const search = current.split("?")[1];
const params = new URLSearchParams(search);
const keyword = params.get("stockName");

class StockInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPrice: "",
      changeRate: "",
      highPrice: "",
      lowPrice: "",
    };
  }

  updateInfo() {
    const np = shortStockInfos.data
      .filter((data) => {
        if (data.종목 == keyword) return data;
      })
      .map((data, index) => {
        return data.현재가;
      });
    fetch("http://18.118.194.10:8080/getStockInfo?stockName=" + keyword, {
      // /posture를 post를 통해 서버와 연동
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.text);
        const infos = json.text.split(" ");
        setInterval(() => {
          this.setState({
            changeRate: Math.floor(((np - infos[0]) / infos[0]) * 1000) / 10,
            nowPrice: np,
            lowPrice: infos[1],
            highPrice: infos[2],
          });
        }, 5000);
      });
  }

  render() {
    const { newPrice, changeRate, highPrice, lowPrice } = this.state;
    return (
      <main className="centered">
        <div className="StockNow">
          <div className="StockName">{keyword}</div>
          <div className="StockCurrentPrice">
            {this.state.nowPrice}원 ({this.state.changeRate}%)
          </div>
        </div>
        <div className="chart-wrapper">차트 임시</div>
        <div className="buttons-wrapper">
          <div className="buttonsss">1D</div>
          <div className="buttonsss">1W</div>
          <div className="buttonsss">1M</div>
          <div className="buttonsss">6M</div>
        </div>
        <div className="goju-wrapper">
          <div className="gojuga">
            고가
            <br />
            {this.state.highPrice}원
          </div>
          <div className="gojuga">
            저가
            <br />
            {this.state.lowPrice}원
          </div>
          {this.updateInfo()}
          <hr />
        </div>
        <div className="info-wrapper"></div>
      </main>
    );
  }
}
export default StockInformation;
