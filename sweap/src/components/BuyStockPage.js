import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import '../css/Button.css';
import ReactDom from 'react-dom';
import shortStockInfos from '../dataframe.json'
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

//url에서 넘어오는 매수할 주식의 stockName을 가지고 옴
const current = decodeURI(window.location.href);
const search = current.split("?")[1];
const params = new URLSearchParams(search);
const keyword = params.get('stockName');

function handleChangeCost(e){ userInputCost=e.target.value;}//지정가 입력창에 입력 받기
function changeCost(){ change=true;}//지정가로 가격 변동
function clickToPortfolio(e){ window.location.href="/Portfolio"} //사용자의 자산 평가 페이지로 이동 함수
var start=0; var userInputCost=0; var change=false;
const PopupDom = ({ children }) => {const el = document.getElementById('popup'); return ReactDom.createPortal(children, el);};
class BuyStockPage  extends Component {
    constructor(props) { 
        super(props);
        this.state = {
          stockName:keyword,
          inputcost: 0,
          nowcost:0,
          lowcost:0,
          highcost:0,
          quantity:1,
          userid:window.sessionStorage.getItem("userID"),
          userAsset:0,
          userTotalAsset:0,  
          totalCost:0,
          userQuantity:0,
          isOpenPopup: false,
          result:"주문 대기",
        }; 
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);  
      }
    render() {  
        if(start==0){this.startPage();this.requestUser();this.hasStock();this.requestCost();}
        return (
          <>
            <div className="buy1">
              <NavLink to="/Portfolio" className="icon">
                <IoIosArrowBack size="40" />
              </NavLink>
              {this.state.stockName}
            </div>
            <div className="form">
              <div className="centered">
                매수 시장가
                <br />
                <button className="bt" onClick={this.minusCost}>
                  –
                </button>
                <input
                  className="buyInput"
                  id="cost"
                  value={this.state.inputcost}
                  type="number"
                />
                <button className="bt" onClick={this.AddCost}>
                  +
                </button>
                <div>
                  <p />
                  <button
                    className="priceButton"
                    type="button"
                    id="popup"
                    onClick={this.openPopup}
                  >
                    매수 지정가
                  </button>
    
                  {this.state.isOpenPopup && (
                    <PopupDom>
                      <PopupContent onClose={this.closePopup} />
                    </PopupDom>
                  )}
                </div>
                <br />
                매수 개수
                <br />
                <button className="bt" onClick={this.minusQuantity}>
                  –
                </button>
                <input
                  id="quantity"
                  value={this.state.quantity}
                  min="0"
                  type="number"
                />
                <button className="bt" onClick={this.AddQuantity}>
                  +
                </button>
              </div>
              <br />
              총 금액
              <br />
              <span
                id="TotalCost"
                class="quiz-text"
                style={{ color: "red", fontSize: "60px " }}
              >
                {this.CalTotalCost()}
              </span>
              <div className="button-centered">
                <button onClick={this.buyStock} className="bButton">
                  매수
                </button>
                <button onClick={this.resetBuy} className="cButton">
                  취소
                </button>
              </div>
            </div>
          </>
        );
      }
    //페이지가 새로고침되었음을 알리는 함수
    startPage=()=>{if(start==0){start=1;}    }
    //매수를 진행하는 함수
    buyStock = ()=>{
      if(this.state.userAsset>=this.state.totalCost){//현재 사용자의 자산이 매수하려는 총 가격보다 많을 경우 
      this.requestOrder();
      this.updateTransaction();
      this.resetBuy();
      alert("매수 주문 전송 완료");
    }
    else{
      alert("매수 불가! 현재 보유하고있는 자산 금액을 확인해주세요.");
    } 
  };
  requestCost=()=>{//json 파일에서 해당 주식의 현재가/고가/저가 데이터 가져옴
    shortStockInfos.data.filter((data) => {
      if(data.종목 == keyword) return data
            }).map((data, index) => {
              this.state.nowcost=data.현재가
              this.state.inputcost=data.현재가//처음 가격은 시장가로 지정
              this.state.highcost=data.고가
              this.state.lowcost=data.저가
      })
  };
  //매수를 위해 사용자의 자산을 가지고옴
  requestUser = ()=>{
    const post ={
      query : "SELECT * FROM ACCOUNT WHERE UserID='"+this.state.userid+"';",//현재 아이디의 사용자의 계정 접근
    };
    fetch("http://18.118.194.10:8080/SQL1",{//mysql fetch 서버 주소 
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
    .then((res)=>res.json())
    .then((json)=>{
      this.setState({
        userAsset : json.Asset,//해당 사용자가 가지고 있는 현금 자산을 가지고옴
        userTotalAsset:json.TotalAsset,//해당 사용자가 가지고 있는 주식 자산을 가지고옴
      });
    });
  };
  //매수 주문 전송
  requestOrder=()=>{
    if(this.state.inputcost==this.state.nowcost){//사용자 입력값이 현재 시장가와 동일하면 
      this.setState({ result:"주문 완료" });
      this.updateMystockList(); //매수 체결
      this.updateAccount();
    }
    else if(this.state.inputcost>this.state.nowcost){//사용자 입력값이 현재 시장가보다 크면
      this.setState({ inputcost: this.state.nowcost, result:"주문 완료" });
      this.updateMyStockList();//매수 체결
      this.updateAccount();
    }
  }
  //MYSTOCKLIST db에 매수 주식 개수 반영
  updateMystockList=()=>{
    this.hasStock();
    if(this.state.userQuantity>=0){//해당 주식을 사용자가 가지고 있으면
      const post ={//주식 개수만 업데이트
        query : "UPDATE MYSTOCKLIST SET HoldingQuantity="+(this.state.userQuantity+this.state.quantity)+" WHERE UserID='"+this.state.userid+"' AND HoldingStockName='"+this.state.stockName+"';",//mysql로 전송할 쿼리 문 
      };
      fetch("http://18.118.194.10:8080/SQL1",{
        method : "post", // 통신방법
        headers : {"content-type" : "application/json",},
        body : JSON.stringify(post),
      })
    }else{//해당 주식을 사용자가 가지고 있지않으면
      const post ={//주식 리스트에 추가 
        query : "INSERT INTO MYSTOCKLIST(UserID,HoldingQuantity,HoldingStockName) VALUES ('"+this.state.userid+"',"+this.state.quantity+",'"+this.state.stockName+"');",//mysql로 전송할 쿼리 문 
      };
      fetch("http://18.118.194.10:8080/SQL1",{ 
        method : "post", // 통신방법
        headers : {"content-type" : "application/json",},
        body : JSON.stringify(post),
      })
    }
  };
  //해당 주식 종류를 사용자가 가지고 있는지 확인
  hasStock=()=>{
    const post ={
      query : "SELECT * FROM MYSTOCKLIST WHERE HoldingStockName='"+this.state.stockName+"' AND UserID='"+this.state.userid+"';",//mysql로 전송할 쿼리 문 
    };
    fetch("http://18.118.194.10:8080/SQL1",{
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
    .then((res)=>res.json())
        .then((json)=>{
          this.setState({
            userQuantity : json.HoldingQuantity,//해당 주식을 사용자가 가지고 있다면 수량을 가져옴
          });
        });
  }
  //Account db에 매수 주식 자산 반영
  updateAccount=()=>{
    const post ={
      query : "UPDATE ACCOUNT SET TotalAsset="+(this.state.userTotalAsset+this.state.totalCost)+", Asset="+(this.state.userAsset-this.state.totalCost)+" WHERE UserID='"+this.state.userid+"';"//mysql로 전송할 쿼리 문 
    };
    fetch("http://18.118.194.10:8080/SQL1",{//mysql fetch 서버 주소 
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
    }
  //transaction db에 거래 내역 반영
  updateTransaction=()=>{
    const post ={
      query : "INSERT INTO TRANSACTION(StockName, Quantity,TransactionDate,TransactionType, UserID,InputPrice,Result) VALUES ('"
      +this.state.stockName+"',"+this.state.quantity+",NOW(),'SELL','"+this.state.userid+"',"+this.state.inputcost+" , '"+this.state.result+"');"//mysql로 전송할 쿼리 문 
    };
    fetch("http://18.118.194.10:8080/SQL1",{//mysql fetch 서버 주소 
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
    }

    resetBuy=()=>{this.setState({ quantity : 0});}//매도 취소 및 거래 완료 
    CalTotalCost=()=>{ this.state.totalCost=this.state.inputcost*this.state.quantity; return this.state.totalCost;};//총 가격=현재가격*현재 개수
    AddCost = () => {this.setState({ inputcost: this.state.inputcost + 100, }); }; //가격 +100
    minusCost = () => { if(this.state.inputcost!=0){this.setState({ inputcost: this.state.inputcost - 100,});}}; //가격 -100
    AddQuantity = () => {this.setState({ quantity: this.state.quantity + 1, }); }; //수량 +1
    minusQuantity = () => { if(this.state.quantity!=0){this.setState({ quantity: this.state.quantity - 1,});}}; //수량 -1
    openPopup=()=>{this.setState({isOpenPopup: true,})};//팝업 오픈
     closePopup=()=>{this.setState({isOpenPopup: false, });if(change==true){this.setState({inputcost: Number(userInputCost),})}change=false;};//팝업 닫음 이때, 가격을 변동시킴   
}
//지정가 입력 팝업
class PopupContent extends Component {
  render() {
    return (
      <div className="popup">
        <div className="common_alert">
          <input
            className="assetInput"
            type="number"
            onChange={handleChangeCost}
            style={{ width: "25vw" }}
          />
          <button
            className="plusButton"
            type="button"
            onClick={(e) => {
              changeCost(e);
              this.props.onClose();
            }}

          >입력
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
export default BuyStockPage;
