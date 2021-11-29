import { render } from "@testing-library/react"; // eslint-disable-line no-unused-vars
import React from "react";
import { Component } from "react/cjs/react.production.min";
import "../css/StockInformation.css";
import "../css/Button.css";
import shortStockInfos from "../dataframe.json";

const current = decodeURI(window.location.href);
const search = current.split("?")[1];
const params = new URLSearchParams(search);
const keyword = params.get("stockName");
//주식 정보 클래스 
class StockInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPrice: 12,
      changeRate: "-12",
      highPrice: "2000",
      lowPrice: "1000",

      btn1: "rgb(231, 179, 66)",
      btn2: "",
      btn3: "",
      btn4: "",
    };
    this.updateInfo();
  }

  updateInfo() {
    console.log("asdfasdf");
    const np = shortStockInfos.data
      .filter((data) => {
        if (data.종목 == keyword) return data;
      })
      .map((data, index) => {
        return data.현재가;
      });
    fetch("http://18.118.194.10:8080/getStockinfo?stockName=" + keyword, {
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
        }, 1000);
      });
  }

  render() {
    const changeColor = (e) => {
      let a = e.target.id;

      switch (a) {
        case "btn1":
          this.setState({
            btn1: "rgb(231, 179, 66)",
            btn2: "",
            btn3: "",
            btn4: "",
          });
          break;
        case "btn2":
          this.setState({
            btn2: "rgb(231, 179, 66)",
            btn1: "",
            btn3: "",
            btn4: "",
          });
          break;
        case "btn3":
          this.setState({
            btn3: "rgb(231, 179, 66)",
            btn2: "",
            btn1: "",
            btn4: "",
          });
          break;
        case "btn4":
          this.setState({
            btn4: "rgb(231, 179, 66)",
            btn2: "",
            btn3: "",
            btn1: "",
          });
          break;
        default:
      }
    };

    return (
      <main>
        <div className="StockNow">
          <div className="StockName">{keyword}</div>
          {this.state.nowPrice === 1 ? (
            <div className="spin" />
          ) : (
            <>
              <div className="StockCurrentPrice">
                {this.state.nowPrice}원
                <div
                  style={{
                    color: this.state.changeRate > 0 ? "red" : "blue",
                    marginLeft: "1vh",
                  }}
                >
                  ({this.state.changeRate})%
                </div>
              </div>
            </>
          )}
        </div>
        {this.state.nowPrice === 1 ? (
          <></>
        ) : (
          <>
            <div className="chart-wrapper">차트</div>
            <div className="buttons-wrapper">
              <div
                className="buttonsss"
                id="btn1"
                onClick={changeColor}
                style={{ backgroundColor: this.state.btn1 }}
                defaultChecked
              >
                1D
              </div>
              <div
                className="buttonsss"
                id="btn2"
                onClick={changeColor}
                style={{ backgroundColor: this.state.btn2 }}
              >
                1W
              </div>
              <div
                className="buttonsss"
                id="btn3"
                onClick={changeColor}
                style={{ backgroundColor: this.state.btn3 }}
              >
                1M
              </div>
              <div
                className="buttonsss"
                id="btn4"
                onClick={changeColor}
                style={{ backgroundColor: this.state.btn4 }}
              >
                6M
              </div>
            </div>
            <br />
            <div className="stkinfo">투자 정보</div>
            <div className="goju-wrapper">
              <div className="gojuga">
                고가
                <br />
                <div style={{ fontSize: "3vh" }}>{this.state.highPrice}원</div>
              </div>
              <div className="gojuga">
                저가
                <br />
                <div style={{ fontSize: "3vh" }}>{this.state.lowPrice}원</div>
              </div>
              <hr style={{ border: "1px solid rgb(231, 179, 66)" }} />
            </div>
            <div className="chart-wrapper">매출액</div>
            <div>
            <div className="centered">
            <button
              className="buyBigButton"
              onClick={() => {
                window.location.href = "/buy?stockName=" +keyword;
              }}
            >
              매수
            </button>
            <button
              className="sellBigButton"
              onClick={() => {
                window.location.href = "/sell?stockName=" + keyword;
              }}
            >
              매도
            </button>
            </div>
          </div>
          </>
        )}
      </main>
    );
  }
}
export default StockInformation;