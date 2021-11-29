import React from 'react';
import { NavLink } from "react-router-dom";
import { Component } from 'react/cjs/react.production.min';
import '../css/Button.css';
import ReactDom from 'react-dom';
import shortStockInfos from '../dataframe.json'
import { IoIosArrowBack } from "react-icons/io";

//url에서 넘어오는 매도할 주식의 stockName을 가지고 옴
const current = decodeURI(window.location.href);
const search = current.split("?")[1];
const params = new URLSearchParams(search);
const keyword = params.get('stockName');

function handleChangeCost(e){ userInputCost=e.target.value;}//지정가 입력창에 입력 받기
function changeCost(){ change=true;}//지정가로 가격 변동
var start=0; var userInputCost=0; var change=false;
const PopupDom = ({ children }) => {const el = document.getElementById('popup'); return ReactDom.createPortal(children, el);};
//주식을 매수하는 페이지 생성함수 
class SellStockPage  extends Component {
    constructor(props) { 
        super(props);
        this.state = {//현재 state 저장 
            stockName:keyword,
            inputcost: 0,nowcost:0, lowcost:0, highcost:0,
            quantity:1,
            userid:window.sessionStorage.getItem("userID"),
            userTotalAsset:0,userAsset:0,userQuantity:0,
            totalCost:0,
            result:"주문 대기",
            isOpenPopup: false,
        }; 
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);  
    }
    render() {
      //페이지가 새로고침될 경우 DB와 연동해 데이터를 가지고 옴
      if(start==0){this.startPage();this.requestStock();this.requestCost();this.requestAccount();}
      return (
        <>
        <div className="buy1">
          <NavLink to="/Portfolio" className="icon" style={{ position: "absolute", left: "10px" }} > <IoIosArrowBack size="40"/> </NavLink>
          {this.state.stockName}
        </div>
        <div className="form">
          <div className="centered"> 매도 시장가<br />
            <button className="bt" onClick={this.minusCost}> – </button>
            <input className="buyInput" id="cost" value={this.state.inputcost} type="number" />
            <button className="bt" onClick={this.AddCost}> + </button>
            <div>
              <p />
              <button className="priceButton" type="button" id="popup" onClick={this.openPopup}> 매도 지정가 </button>
              {this.state.isOpenPopup && ( <PopupDom> <PopupContent onClose={this.closePopup} /></PopupDom> )}
            </div>
            <br />매도 개수 <br />
            <button className="bt" onClick={this.minusQuantity}> – </button>
            <input id="quantity" value={this.state.quantity}  min="0" type="number" />{" "}
            <button className="bt" onClick={this.AddQuantity}> + </button>
          </div>
          <br />총 금액 <br />
          <span id="TotalCost" class="quiz-text" style={{ color: "blue", fontSize: "60px " }}> {this.CalTotalCost()}</span>
          <div className="button-centered">
            <button onClick={this.sellStock} className="sButton"> 매도 </button>
            <button onClick={this.resetSell} className="cButton"> 취소 </button>
          </div>
        </div>
      </>
      );
    }
    //페이지 새로고침 
    startPage=()=>{if(start==0){start=1;} }
    //매도를 진행하는 함수
    sellStock = ()=>{
      if(this.state.userQuantity>=this.state.quantity){//매도하려는 양이 현재 보유하고 있는 양보다 많을 경우
        this.requestOrder();
        this.updateTransaction();
        this.resetSell();
        alert("매도 주문 전송 완료!");
      }
      else{
        alert("매도 불가! 현재 주식을 보유하고있는지 확인해주세요.");
      }
    };
    //매도를 위해 사용자가 해당 주식을 가지고 있는지 확인
    requestStock = ()=>{
      const post ={
        query : "SELECT * FROM MYSTOCKLIST WHERE UserID='"+this.state.userid+
        "' AND HoldingStockName='"+this.state.stockName+"';",//mysql로 전송할 쿼리 문 
      };
      fetch("http://18.118.194.10:8080/SQL1",{//mysql fetch 서버 주소 
        method : "post", // 통신방법
        headers : {"content-type" : "application/json",},
        body : JSON.stringify(post),
      })
      .then((res)=>res.json())
      .then((json)=>{
        this.setState({
          userQuantity : json.HoldingQuantity,//해당 주식을 사용자가 가지고 있다면 수량을 가져옴
        }    );
      });
  };
  //json 파일에서 해당 주식의 현재가/고가/저가 데이터 가져옴
  requestCost=()=>{
    shortStockInfos.data.filter((data) => {
      if(data.종목 == keyword) return data
            }).map((data, index) => {
              this.setState({
                nowcost:data.현재가,
                inputcost:data.현재가,//처음 가격은 시장가로 지정
                highcost:data.고가,
                lowcost:data.저가
          });
      })
  };
  //ACCOUNT DB에서 매도를 위해 사용자가 보유하고 있는 해당 주식의 수량을 가져옴
  requestAccount = ()=>{
    const post ={
      query : "SELECT * FROM ACCOUNT WHERE UserID='"+this.state.userid+"';",//mysql로 전송할 쿼리 문 
    };
    fetch("http://18.118.194.10:8080/SQL1",{//mysql fetch 서버 주소 
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
    .then((res)=>res.json())
    .then((json)=>{
      this.setState({
        userTotalAsset : json.TotalAsset,//해당 주식을 사용자가 가지고 있다면 수량을 가져옴
          userAsset:json.Asset,
      }    );
    });
  };
  //매도 요청을 보내는 함수
  requestOrder=()=>{
    if(this.state.inputcost==this.state.nowcost){//사용자 입력값이 현재 시장가와 동일하면 
      this.setState({ result:"주문 완료" });
      this.updateMyStockList();//매수 체결
      this.updateAccount();
    }
    else if(this.state.inputcost<this.state.nowcost){//사용자 입력값이 현재 시장가보다 크면
      this.setState({ inputcost: this.state.nowcost, result:"주문 완료" });
      this.updateMyStockList();//매수 체결
      this.updateAccount();
    }
  }
  //transaction db에 거래내역 업데이트
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
  //MYSTOCKLIST db에 매도 주식 개수 반영
  updateMyStockList=()=>{
    const post ={
      query : "UPDATE MYSTOCKLIST SET HoldingQuantity="+(this.state.userQuantity-this.state.quantity)+" WHERE UserID='"+this.state.userid+"' AND HoldingStockName='"+this.state.stockName+"';",//mysql로 전송할 쿼리 문 
    };
    fetch("http://18.118.194.10:8080/SQL1",{//mysql fetch 서버 주소 
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
  }
  //Account db에 매도 주식 자산 반영
  updateAccount=()=>{
    const post ={
      query : "UPDATE ACCOUNT SET TotalAsset="+(this.state.userTotalAsset-this.state.totalCost)+", Asset="+(this.state.userAsset+this.state.totalCost)+" WHERE UserID='"+this.state.userid+"';"//mysql로 전송할 쿼리 문 
    };
    fetch("http://18.118.194.10:8080/SQL1",{//mysql fetch 서버 주소 
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
  }
  //매도 취소 및 거래 완료 
  resetSell=()=>{this.setState({quantity : 0,});}
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
          <input className="assetInput" type="number" min="0" onChange={handleChangeCost} style={{ width: "25vw" }}/>
          <button className="plusButton" type="button" 
          onClick={(e) => {  
            changeCost(e); //입력을 클릭했을 경우 지정가를 변경 
            this.props.onClose(); }}> 입력</button>
          <div>
            <button className="closeButton" type="button"  onClick={this.props.onClose}> 닫기 </button>
          </div>
        </div>
      </div>
    );
  }
}
export default SellStockPage;