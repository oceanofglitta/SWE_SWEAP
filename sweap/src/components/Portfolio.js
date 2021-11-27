import React, { Component } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import "../css/Button.css";
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

var start = 0;
class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //현재 state 저장
      stockName: "삼성전자",
      cost: 73200,
      quantity: [],
      stock:[],
      stocklist:[],
      userid: window.sessionStorage.getItem("userID"),
      asset: 10,
      totalAsset: 10,
    };
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
        <div className="right">
        <button className="button-green" onClick={this.logout}>로그 아웃</button>
        <div>
          <button className="button-green" type="button"id="popup"onClick={this.openPopup} >자산 추가</button>
        </div>
        </div>
        {this.state.isOpenPopup && (
          <PopupDom>
            <PopupContent onClose={this.closePopup} />
          </PopupDom>
        )}
        <div className="form-wrappernf">
          <h1>{this.state.userid} 님의 보유 잔고</h1>
          <div>
            <p>보유 자산 :{this.state.totalAsset}</p>
          </div>
          <p>투자 가능 금액: {this.state.asset}</p>
        </div>
        <p>보유 주식: 삼성전자 : 1</p>
        <div className="button-centered">
          <div className="button button-red-small" onClick={this.clickToBuy}>
            매수
          </div>
          <div className="button button-blue-small" onClick={this.clickToSell}>
            매도
          </div>
        </div>
      </body>
    );
  }
  startPage = () => {
    if (start == 0) {
      start = 1;
    }
  };
  logout = () => {
    window.sessionStorage.clear("userID");
    alert("로그아웃 되었습니다.");
    window.location.href = "./login";
  };

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
          totalAsset: json.TotalAsset, //해당 사용자가 가지고 있는 주식 자산을 가지고옴
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
          quantity: json.HoldingQuantity, //해당 사용자가 가지고 있는 현금 자산을 가지고옴
          stock: json.HoldingStockName, //해당 사용자가 가지고 있는 주식 자산을 가지고옴
        });
      });
  }
  clickToBuy = (e) => {
    sname = this.state.stockName;
    window.location.href = "/buy?stockName=" + sname;
  }; //매수 페이지로 이동 함수
  clickToSell = (e) => {
    sname = this.state.stockName;
    window.location.href = "/sell?stockName=" + sname;
  }; //매수 페이지로 이동 함수

  chargeAsset = () => {
    const post = {
      query:
        "UPDATE ACCOUNT SET Asset=" +
        this.state.asset +
        ",TotalAsset=" +
        this.state.totalAsset +
        " WHERE UserID='" +
        this.state.userid +
        "';", //mysql로 전송할 쿼리 문
    };
    fetch("http://18.118.194.10:8080/SQL1", {
      //mysql fetch 서버 주소
      method: "post", // 통신방법
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    });
  };
  openPopup = () => {
    this.setState({ isOpenPopup: true });
  }; //팝업 오픈
  closePopup = () => {
    this.setState({ isOpenPopup: false });
    if (change == true) {
      this.setState({
        asset: this.state.asset + Number(userInputAsset),
        totlaAsset: this.state.totlaAsset + Number(userInputAsset),
      });
      this.chargeAsset();
    }
    change = false;
  }; //팝업 닫음 이때, 자산 추가
}

export default Portfolio;
//자산 추가 팝업
class PopupContent extends Component {
  render() {
    return (
      <div className="full_layer">
        <div className="common_alert">
          <input type="number" onChange={handleChangeCost} />
          <button type="button" onClick={changeAsset}>추가</button>
          <div>
            <button type="button" onClick={this.props.onClose}>닫기</button>
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