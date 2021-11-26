import { render } from '@testing-library/react';// eslint-disable-line no-unused-vars
import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import '../css/BuySellPage.css';
import ReactDom from 'react-dom';

function handleChangeCost(e){ userInputCost=e.target.value;}//지정가 입력창에 입력 받기
function changeCost(){ change=true;}//지정가로 가격 변동
function clickToSearch(e){ window.location.href="/seach"} //주식 검색 페이지로 이동 함수 
function clickToBuy(e){ window.location.href="/buy"} //매도 페이지로 이동 함수 
var start=0; var userInputCost=0; var change=false;
const PopupDom = ({ children }) => {const el = document.getElementById('popup'); return ReactDom.createPortal(children, el);};
class SellStockPage  extends Component {
    constructor(props) { 
        super(props);
        this.state = {//현재 state 저장 
            stockName:"삼성전자",
            stockid:'samsung',
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
                  <button onClick={clickToSearch}>&lt; </button>
                  <h1>{this.state.stockName}</h1>
              </div>  
              <div className="centered">
              <div className="button-centered">
                  <div onClick={clickToBuy} className="button button-red">매수</div>
                  <div className="button button-blue">매도</div>
              </div>
                  <p>매도 시장가 </p>
                  <button onClick={this.minusCost}>-</button>
                  <input id="cost" value={this.state.cost} type='number'/>
                  <button onClick={this.AddCost}>+</button>
                  <div>
                    <button type="button" id="popup" onClick={this.openPopup}>매도 지정가</button>
                    {this.state.isOpenPopup && <PopupDom><PopupContent onClose={this.closePopup}/></PopupDom>}
                  </div>
                  <p>매도 개수</p>
                  <button onClick={this.minusQuantity}>-</button>
                  <input id="quantity" value={this.state.quantity} min="0" type='number'/>
                  <button onClick={this.AddQuantity}>+</button>
              </div>
              <div className="button-centered">
                  <div className="button button-small" >전액 사용</div>
              </div>
              <p style ={{color:"blue",fontSize: "20px"}}>총 금액</p>
              <span id="TotalCost" class="quiz-text" style ={{color:"blue",fontSize: "60px "}}>{this.CalTotalCost()}</span>
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
        query : "UPDATE MYSTOCKLIST SET HoldingQuantity='"+(this.state.userQuantity-this.state.quantity)+"' WHERE UserID='"+this.state.userid+"' AND HoldingStockID='"+this.state.stockid+"';",//mysql로 전송할 쿼리 문 
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
      +this.state.stockid+"',"+this.state.quantity+",NOW(),'SELL','"+this.state.userid+"');"//mysql로 전송할 쿼리 문 
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