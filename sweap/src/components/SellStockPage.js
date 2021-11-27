import { render } from '@testing-library/react';// eslint-disable-line no-unused-vars
import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import '../css/Button.css';
import ReactDom from 'react-dom';

const current = decodeURI(window.location.href);
const search = current.split("?")[1];
const params = new URLSearchParams(search);
const keywords = params.get('stockName');

function handleChangeCost(e){ userInputCost=e.target.value;}//지정가 입력창에 입력 받기
function changeCost(){ change=true;}//지정가로 가격 변동
function clickToPortfolio(e){ window.location.href="/Portfolio"} //주식 검색 페이지로 이동 함수
var start=0; var userInputCost=0; var change=false;
const PopupDom = ({ children }) => {const el = document.getElementById('popup'); return ReactDom.createPortal(children, el);};
class SellStockPage  extends Component {
    constructor(props) { 
        super(props);
        this.state = {//현재 state 저장 
            stockName:keywords,
            cost: 73200,
            quantity:0,
            userid:"ggh",
            testbody:"", 
            totalCost:0,
            userQuantity:0,
            userQuantity:0,
            isOpenPopup: false,
        }; 
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);  
    }
    render() {
      if(start==0){this.startPage();this.requestStock();}
      return (
          <div className="form">
              <div className="form-wrapper">
                  <button onClick={clickToPortfolio}>&lt; </button>
                  <h1>{this.state.stockName}</h1>
              </div>  
              <div className="centered">
                  <p>매도 시장가 </p>
                  <button onClick={this.minusCost}>-</button>
                  <input id="cost" value={this.state.cost} type='number'/>
                  <button onClick={this.AddCost}>+</button>
                  <div><p/>
                  <button type="button" id="popup" onClick={this.openPopup}>매도 지정가</button><p/><p/><p/><p/>
                    {this.state.isOpenPopup && <PopupDom><PopupContent onClose={this.closePopup}/></PopupDom>}
                  </div><p/><p/><p/><p/><p/>
                  <p>매도 개수</p>
                  <button onClick={this.minusQuantity}>-</button>
                  <input id="quantity" value={this.state.quantity} min="0" type='number'/>
                  <button onClick={this.AddQuantity}>+</button>
              </div>
              <p style ={{color:"blue",fontSize: "20px"}}>총 금액</p><p/>
              <span id="TotalCost" class="quiz-text" style ={{color:"blue",fontSize: "60px "}}>{this.CalTotalCost()}</span><p/><p/><p/>
              <div className="button-centered">
                  <div onClick={this.sellStock} className="button button-blue">매도</div>
                  <div onClick={this.resetSell} className="button button-gray">취소</div>
              </div>
          </div>
      );
    }
    startPage=()=>{if(start==0){start=1;} }
    //매도
    sellStock = ()=>{
      if(this.state.userQuantity>=this.state.quantity){//매도하려는 양이 현재 보유하고 있는 양보다 많을 경우
        this.updateMyStockList()
        this.updateAccount()
        this.updateTransaction()
        this.resetSell()
        alert("매도 완료");
      }
      else{
        alert("매도 불가! 현재 주식을 보유하고있는지 확인해주세요.");
      }
    };
    //매도를 위해 사용자가 해당 주식을 가지고 있는지 확인
    requestStock = ()=>{
      const post ={
        query : "UPDATE MYSTOCKLIST SET HoldingQuantity='"+(this.state.userQuantity-this.state.quantity)+"' WHERE UserID='"+this.state.userid+"' AND HoldingStockName='"+this.state.stockName+"';",//mysql로 전송할 쿼리 문 
      };
      fetch("http://18.118.194.10:8080/SQL",{//mysql fetch 서버 주소 
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
  //transaction db에 거래내역 업데이트
  updateTransaction=()=>{
    const post ={
      query : "INSERT INTO TRANSACTION(StockName, Quantity,TransactionDate,TransactionType, UserID) VALUES ('"
      +this.state.stockName+"',"+this.state.quantity+",NOW(),'SELL','"+this.state.userid+"');"//mysql로 전송할 쿼리 문 
    };
    fetch("http://18.118.194.10:8080/SQL",{//mysql fetch 서버 주소 
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
    fetch("http://18.118.194.10:8080/SQL",{//mysql fetch 서버 주소 
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
    fetch("http://18.118.194.10:8080/SQL",{//mysql fetch 서버 주소 
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
  }
  //매도 취소 및 거래 완료 
  resetSell=()=>{this.setState({quantity : 0,});}
  CalTotalCost=()=>{ this.state.totalCost=this.state.cost*this.state.quantity; return this.state.totalCost;};//총 가격=현재가격*현재 개수
  AddCost = () => {this.setState({ cost: this.state.cost + 10, }); }; //가격 +10
  minusCost = () => { if(this.state.cost!=0){this.setState({ cost: this.state.cost - 100,});}}; //가격 -100
  AddQuantity = () => {this.setState({ quantity: this.state.quantity + 1, }); }; //수량 +1
  minusQuantity = () => { if(this.state.quantity!=0){this.setState({ quantity: this.state.quantity - 1,});}}; //수량 -1
  openPopup=()=>{this.setState({isOpenPopup: true,})};//팝업 오픈
  closePopup=()=>{this.setState({isOpenPopup: false, });if(change==true){this.setState({cost: Number(userInputCost),})}change=false;};//팝업 닫음 이때, 가격을 변동시킴
}
//지정가 입력 팝업
class PopupContent extends Component {
  render(){
      return(
              <div className="full_layer">
                  <div className="common_alert"> 
                    <input type="number" onChange={handleChangeCost}/>
                    <button type="button" onClick={this.props.onClose,changeCost}>입력</button>
                      <div>
                      <button type="button" onClick={this.props.onClose}>닫기</button>
                      </div>
                  </div>
              </div>
      );
  }
}
export default SellStockPage;