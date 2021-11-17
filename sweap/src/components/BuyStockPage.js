import { render } from '@testing-library/react';// eslint-disable-line no-unused-vars
import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import '../css/BuySellPage.css';

function clickToSearch(e){ window.location.href="/search"} //주식 검색 페이지로 이동 함수 
function clickToSell(e){ window.location.href="/sell"} //매수 페이지로 이동 함수 

class BuyStockPage  extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            stockName:"삼성전자",
            cost: 73200,
            quantity:0,
        }; 
    }
    //매수
    buyStock = ()=>{
        const post ={
          test : this.state.testbody,
        };
       
        fetch("http://localhost:3001/ACCOUNT", {
          method : "post", // 통신방법
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(post),
        })
        .then((res)=>res.json())
        .then((json)=>{
          this.setState({
            testbody : json.text,
          });
        });
      };
    CalTotalCost=()=>{ return this.state.cost*this.state.quantity};//총 가격=현재가격*현재 개수
    AddCost = () => {this.setState({ cost: this.state.cost + 1, }); }; //가격 +1
    minusCost = () => { this.setState({ cost: this.state.cost - 1,});}; //가격 -1
    AddQuantity = () => {this.setState({ quantity: this.state.quantity + 1, }); }; //수량 +1
    minusQuantity = () => { this.setState({ quantity: this.state.quantity - 1,});}; //수량 -1
    changeToSell = () => { this.setState({text: "매도", buttonColor:"button button-blue"});};//매도로 변경
    changeToBuy = () => {this.setState({ text: "매수", buttonColor:"button button-red"});};//매수로 변경
    render() {
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
                    <div className="button button-small" >
                        전액 사용
                    </div>
                </div>
                <p style ={{color:"red",fontSize: "20px"}}>총 금액</p>
                <span id="TotalCost" class="quiz-text" style ={{color:"red",fontSize: "60px "}}>{this.CalTotalCost()}</span>
                <div className="button-centered">
                    <div className="button button-red">매수</div>
                    <div className="button button-gray" >
                        취소
                    </div>
                </div>
            </div>
        );
      }
}
export default BuyStockPage;