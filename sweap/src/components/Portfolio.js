import React, { Component } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import "../css/Portfolio.css";
import "../css/Button.css";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import shortStockInfos from '../dataframe.json';

var stockprice = 0;
var change = false;
var userInputAsset = 0;
var sname = "";
function handleChangeCost(e) {
  userInputAsset = e.target.value;
} //자산 추가 입력창에 입력 받기
function changeAsset() {
  change = true;
} //자산 변동
const PopupDom = ({ children }) => {
  const el = document.getElementById("popup");
  return ReactDom.createPortal(children, el);
};
function createData(stockName, quantity) {
  return { stockName, quantity };
}
var start = 0;
class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //현재 state 저장
      cost: 73200,
      userid: window.sessionStorage.getItem("userID"),
      asset: 0,
      totalAsset: 0,
      list: [
        {
          stockName: "삼성전자",
          quantity: 0,
        },
      ],
    };
    this.requestAsset();
    this.getStockInfo();
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  render() {
    if (start == 0) {
      this.startPage();
      this.requestAsset();
      this.requestStockList();
    }
    return (
      <body>
        <NavLink to="/" className="icon">
            <IoIosArrowBack size="40" />
          </NavLink>
        <div className="right">
          <div>
            <button
              className="assetButton"
              type="button"
              id="popup"
              onClick={this.openPopup}
            >
              자산 추가
            </button>
          </div>
          {!this.state.isOpenPopup && (
            <button className="logoutButton" onClick={this.logout}>
              로그 아웃
            </button>
          )}
        </div>
        {this.state.isOpenPopup && (
          <PopupDom>
            <PopupContent onClose={this.closePopup} />
          </PopupDom>
        )}
        <div className="form-wrappernf">
          <div className="portfolio1">
            <t style={{ fontSize: "5vh" }}>{this.state.userid}</t>
            님의 보유 잔고
          </div>
          <div className="portfolio2">
            보유 자산:{" "}
            <t style={{ color: "rgb(231, 179, 66)" }}>
              {this.state.totalAsset}
            </t>{" "}
            ₩
            <br />
            투자 가능 금액:{" "}
            <t style={{ color: "rgb(231, 179, 66)" }}>{this.state.asset}</t> ₩
          </div>
        </div>
        <div className="portfolio3">
          * 보유 주식 *
          <br />
        </div>
        {this.showStock()}
      </body>
    );
  }
  //페이지 새로고침 알림
  startPage = () => {if (start == 0) { start = 1;}};
  //로그아웃 함수
  logout = () => {window.sessionStorage.clear("userID");alert("로그아웃 되었습니다.");window.location.href = "./login";};
  //사용자의 자산 내역을 불러옴
  requestAsset = () => {
    const post = {
      query:
        "SELECT * FROM ACCOUNT WHERE UserID='" + this.state.userid + "';", //mysql로 전송할 쿼리 문
    };
    fetch("http://18.118.194.10:8080/SQL1", {
      //mysql fetch 서버 주소
      method: "post", // 통신방법
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          asset: json.Asset, //해당 사용자가 가지고 있는 현금 자산을 가지고옴
          totalAsset: json.TotalAsset, //해당 사용자가 가지고 있는 총 자산을 가지고옴
        });
      });
  };
  requestStockList=()=>{
    const post = {
      query:
        "SELECT * FROM MYSTOCKLIST WHERE WHERE UserID='" + this.state.userid + "';", //mysql로 전송할 쿼리 문
    };
    fetch("http://18.118.194.10:8080/SQL2", {
      //mysql fetch 서버 주소
      method: "post", // 통신방법
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          quantity: json.HoldingQuantity, 
          stock: json.HoldingStockName, 
        });
      });
  }
  clickToBuy = (e) => {sname = this.state.stockName;window.location.href = "/buy?stockName=" + sname;}; //매수 페이지로 이동 함수
  clickToSell = (e) => {sname = this.state.stockName;window.location.href = "/sell?stockName=" + sname;}; //매도 페이지로 이동 함수

  chargeAsset = () => {//Account DB에 자산 추가
    const post = {
      query:
        "UPDATE ACCOUNT SET Asset=" +(this.state.asset+Number(userInputAsset)) + ",TotalAsset=" +(this.state.totalAsset+Number(userInputAsset)) +" WHERE UserID='" +this.state.userid +"';", //mysql로 전송할 쿼리 문
    };
    fetch("http://18.118.194.10:8080/SQL1", {
      //mysql fetch 서버 주소
      method: "post", // 통신방법
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    });
  };
  getStockInfo = () => {
    console.log("stockinfo");
    const post = {
      query:
        "SELECT * FROM MYSTOCKLIST WHERE UserID = '" + this.state.userid + "';",
    };
    console.log(post.query);
     fetch("http://18.118.194.10:8080/SQL2", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json");
        console.log(json);

        this.state.list.shift();
        for (let i = 0; i < json.length; ++i) {
          this.setState({
            list: this.state.list.concat(
              createData(json[i].HoldingStockName, json[i].HoldingQuantity)
            ),
          });
        }
      });
  };
  handleAsset = () => {
    this.setState({
      asset: this.state.asset + Number(userInputAsset),
      totlaAsset: this.state.totalAsset + Number(userInputAsset),
    });
  };
  openPopup = () => {this.setState({ isOpenPopup: true });}; //팝업 오픈
  closePopup = () => {
    this.setState({ isOpenPopup: false });
    if (change == true) {// 팝업이 닫혔을 때, 자산이 추가될 경우
      this.setState({
        asset: this.state.asset + Number(userInputAsset),//현재 자산에 자산 추가
        totalAsset: this.state.totalAsset + Number(userInputAsset),//현재 총 자산에 자산 추가
      });
      this.chargeAsset();//Account DB에 자산 추가 
    }
    change = false;
  }; //팝업 닫음 이때, 자산 추가
  logout = () => {
    window.sessionStorage.clear("userID");
    alert("로그아웃 되었습니다.");
    window.location.href = "./login";
  };
  showStock = () =>
    this.state.list.map((stk) => {
      return (
        <div
          className="stocklist"
          onClick={() =>
            (window.location.href =
              "/StockInformation?stockName=" + stk.stockName)
          }
        >
          <div className="portfolio2">
            <div style={{ fontSize: "3vh", color: "rgb(231, 179, 66)" }}>
              {stk.stockName}
            </div>
            <div>보유 잔고: {stk.quantity}</div>
            {shortStockInfos.data.filter((data)=>{
              if(stk.stockName == data.종목) return data
              }).map((data, index) => (
                <div>평가금액: {data.현재가*stk.quantity}</div>
              ))}
          </div>
          <div>
            <button
              className="buyButton"
              onClick={() => {
                window.location.href = "/buy?stockName=" + stk.stockName;
              }}
            >
              매수
            </button>
            <button
              className="sellButton"
              onClick={() => {
                window.location.href = "/sell?stockName=" + stk.stockName;
              }}
            >
              매도
            </button>
          </div>
        </div>
      );
    });
}

export default Portfolio;
//자산 추가 팝업
class PopupContent extends Component {
  render() {
    return (
      <div className="popup">
        <div className="common_alert">
          <input
            className="assetInput"
            type="number"
            onChange={handleChangeCost}
          />
          <button
            className="plusButton"
            type="button"
            onClick={(e) => {
              changeAsset(e);
              this.props.onClose();
            }}
          >
            확인
          </button>
          <div>
            <button
              className="closeButton"
              type="button"
              onClick={this.props.onClose}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }
}


const Container = styled.div`
  width: 100%;
  border-style: solid;
  border-width: 0 0 0 8px;
  padding: 12px;
  border-color: #0067a3;
  word-break: break-all;
`;

const Button = styled.div`
  margin: 0 auto;
  width: 1080px;
  height: 100px;
  display: flex;
  flex-flow: row wrap;
`;

const Search = styled.div`
  order: 3;
  width: 1000px;
  background-color: #ffffff;
  text-align: center;
  color: #0607a3;
`;