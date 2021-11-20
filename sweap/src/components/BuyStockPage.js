import { render } from '@testing-library/react';// eslint-disable-line no-unused-vars
import React ,{useEffect} from 'react';
import { Component } from 'react/cjs/react.production.min';
import '../css/BuySellPage.css';

function clickToSearch(e){ window.location.href="/search"} //주식 검색 페이지로 이동 함수 
function clickToSell(e){ window.location.href="/sell"} //매수 페이지로 이동 함수 
var start=0;
class BuyStockPage  extends Component {
    constructor(props) { 
        super(props);
        this.state = {
          stockName:"삼성전자",
          stockid:'samsung',
          cost: 73200,
          quantity:0,
          userid:"ggh",
          userAsset:0,
          userTotalAsset:0,  
          totalCost:0,
          userQuantity:0
        }; 
      }
    render() {
      if(start==0){this.startPage();this.requestUser();this.hasStock();}
        return (
            <div className="form">
                <div className="form-wrapper">
                    <button onClick={clickToSearch}>&lt; </button>
                    <h1>{this.state.stockName}</h1>
                </div>  
                <div className="centered">
                <div className="button-centered">
                    <div className="button button-red">매수</div>
                    <div onClick={clickToSell} className="button button-blue">매도</div>
                </div>
                    <p>매수 가격 </p>
                    <button onClick={this.minusCost}>-</button>
                    <input id="cost" value={this.state.cost} type='number'/>
                    <button onClick={this.AddCost}>+</button>
                    <p>매수 개수</p>
                    <button onClick={this.minusQuantity}>-</button>
                    <input id="quantity" value={this.state.quantity} min="0" type='number'/>
                    <button onClick={this.AddQuantity}>+</button>
                </div>
                <div className="button-centered">
                    <div className="button button-small" >전액 사용</div>
                </div>
                <p style ={{color:"red",fontSize: "20px"}}>총 금액</p>
                <span id="TotalCost" class="quiz-text" style ={{color:"red",fontSize: "60px "}}>{this.CalTotalCost()}</span>
                <div className="button-centered">
                    <div onClick={this.buyStock} className="button button-red">매수</div>
                    <div  onClick={this.resetBuy} className="button button-gray" >취소</div>
                </div>
            </div>
        );
      }
    startPage=()=>{if(start==0){start=1;}    }
    //매수
    buyStock = ()=>{
      if(this.state.userAsset>=this.state.totalCost){//현재 사용자의 자산이 매수하려는 총 가격보다 많을 경우 
      this.updateMystockList();//매수 내역을 사용자 주식 리스트에 반영
      this.updateAccount();
      this.updateTransaction()
      this.resetBuy()
      alert("매수 완료");
    }
    else{
      alert("매수 불가! 현재 보유하고있는 자산 금액을 확인해주세요.");
    } 
  };
  //매수를 위해 사용자의 자산을 가지고옴
  requestUser = ()=>{
    const post ={
      query : "SELECT * FROM ACCOUNT WHERE UserID='"+this.state.userid+"';",//현재 아이디의 사용자의 계정 접근
    };
    fetch("http://localhost:3001/SQL",{//mysql fetch 서버 주소 
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
  //MYSTOCKLIST db에 매수 주식 개수 반영
  updateMystockList=()=>{
    this.hasStock();
    if(this.state.userQuantity<1){//해당 주식을 사용자가 가지고 있지않으면
      const post ={//주식 리스트에 추가 
        query : "INSERT INTO MYSTOCKLIST(UserID,HoldingStockID,HoldingQuantity,HoldingStockName) VALUES ('"+this.state.userid+"', '"+this.state.stockid+"',"+this.state.quantity+",'"+this.state.stockName+"');",//mysql로 전송할 쿼리 문 
      };
      fetch("http://18.118.194.10:8080/SQL",{//mysql fetch 서버 주소 
        method : "post", // 통신방법
        headers : {"content-type" : "application/json",},
        body : JSON.stringify(post),
      })
    }else{//해당 주식을 사용자가 가지고 있으면
      const post ={//주식 개수만 업데이트
        query : "UPDATE MYSTOCKLIST SET HoldingQuantity="+(this.state.userQuantity+this.state.quantity)+" WHERE UserID='"+this.state.userid+"' AND HoldingStockID='"+this.state.stockid+"';",//mysql로 전송할 쿼리 문 
      };
      fetch("http://18.118.194.10:8080/SQL",{//mysql fetch 서버 주소 
        method : "post", // 통신방법
        headers : {"content-type" : "application/json",},
        body : JSON.stringify(post),
      })
    }
  }
  //해당 주식 종류를 사용자가 가지고 있는지 확인
  hasStock=()=>{
    const post ={
      query : "SELECT * FROM MYSTOCKLIST WHERE HoldingStockID='"+this.state.stockid+"' AND UserID='"+this.state.userid+"';",//mysql로 전송할 쿼리 문 
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
          });
        });
  }
  //Account db에 매수 주식 자산 반영
  updateAccount=()=>{
    const post ={
      query : "UPDATE ACCOUNT SET TotalAsset="+(this.state.userTotalAsset+this.state.totalCost)+", Asset="+(this.state.userAsset-this.state.totalCost)+" WHERE UserID='"+this.state.userid+"';"//mysql로 전송할 쿼리 문 
    };
    fetch("http://18.118.194.10:8080/SQL",{//mysql fetch 서버 주소 
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
    }
  //transaction db에 거래 내역 반영
  updateTransaction=()=>{
    const post ={
      query : "INSERT INTO TRANSACTION(StockID, Quantity,TransactionDate,TransactionType, UserID) VALUES ('"
      +this.state.stockid+"',"+this.state.quantity+",NOW(),'BUY','"+this.state.userid+"');"
    };
    fetch("http://18.118.194.10:8080/SQL",{//mysql fetch 서버 주소 
      method : "post", // 통신방법
      headers : {"content-type" : "application/json",},
      body : JSON.stringify(post),
    })
    }

    resetBuy=()=>{this.setState({ quantity : 0});}//매도 취소 및 거래 완료 
    CalTotalCost=()=>{ this.state.totalCost=this.state.cost*this.state.quantity; return this.state.totalCost;};//총 가격=현재가격*현재 개수
    AddCost = () => {this.setState({ cost: this.state.cost + 1, }); }; //가격 +1
    minusCost = () => { this.setState({ cost: this.state.cost - 1,});}; //가격 -1
    AddQuantity = () => {this.setState({ quantity: this.state.quantity + 1, }); }; //수량 +1
    minusQuantity = () => { this.setState({ quantity: this.state.quantity - 1,});}; //수량 -1
    changeToSell = () => { this.setState({text: "매도", buttonColor:"button button-blue"});};//매도로 변경
    changeToBuy = () => {this.setState({ text: "매수", buttonColor:"button button-red"});};//매수로 변경
    
}
export default BuyStockPage;