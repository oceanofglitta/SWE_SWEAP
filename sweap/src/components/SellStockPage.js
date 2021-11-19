import { render } from '@testing-library/react';// eslint-disable-line no-unused-vars
import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import '../css/BuySellPage.css';

function clickToSearch(e){ window.location.href="/seach"} //주식 검색 페이지로 이동 함수 
function clickToBuy(e){ window.location.href="/buy"} //매도 페이지로 이동 함수 

class SellStockPage  extends Component {
    constructor(props) { 
        super(props);
        this.state = {//현재 state 저장 
            stockName:"삼성전자",
            stockid:'123',
            cost: 73200,
            quantity:2,
            id:"ggh",
            testbody:"",
            request:""
        }; 
    }
    AlertFaiil=()=>{alert('Click!')};
    //매도하고자하는 주식을 사용자가 가지고있는지 확인
    sellStock = ()=>{
        const post ={
          query : "SELECT * FROM STOCK WHERE StockID='123'",//mysql로 전송할 쿼리 문 
        };
        fetch("http://18.118.194.10:8080/SQL",{//mysql fetch 서버 주소 
          method : "post", // 통신방법
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(post),
        })
        .then((res)=>res.json())
        .then((json)=>{
          this.setState({
            testbody : json.StockID,//mysql에서 전송된 데이터 중 필요한 데이터 
          }    );
        });
        this.alterSell()
    };
    alterSell = ()=>{
      if(this.state.testbody===this.state.id){
        this.setState({request:"매도 요청 불가"});
      }
      else{
        this.setState({request:"매도 요청 가능"});
      }
    }
    CalTotalCost=()=>{ return this.state.cost*this.state.quantity};//총 가격=현재가격*현재 개수
    AddCost = () => {this.setState({ cost: this.state.cost + 10, }); }; //가격 +10
    minusCost = () => { this.setState({ cost: this.state.cost - 10,});}; //가격 -10
    AddQuantity = () => {this.setState({ quantity: this.state.quantity + 1, }); }; //수량 +1
    minusQuantity = () => { this.setState({ quantity: this.state.quantity - 1,});}; //수량 -1
    render() {
        return (
            <div className="form">
                <div className="form-wrapper">
                    <button onClick={clickToSearch}>&lt; </button>
                    <h1>{this.state.stockName}</h1>
                </div>  
                <div className="centered">
                <div className="button-centered">
                <button onClick = {this.sellStock}>Submit</button>
                    <div onClick={clickToBuy} className="button button-red">매수</div>
                    <div className="button button-blue">매도</div>
                </div>
                <h1>{this.state.testbody}</h1>
                    <p>매도 가격 </p>
                    <button onClick={this.minusCost}>-</button>
                    <input id="cost" value={this.state.cost} type='number'/>
                    <button onClick={this.AddCost}>+</button>
                    <p>매도 개수</p>
                    <button onClick={this.minusQuantity}>-</button>
                    <input id="quantity" value={this.state.quantity} min="0" type='number'/>
                    <button onClick={this.AddQuantity}>+</button>
                </div>
                <div className="button-centered">
                    <div className="button button-small" >
                        전액 사용
                    </div>
                </div>
                <p style ={{color:"blue",fontSize: "20px"}}>총 금액</p>
                <span id="TotalCost" class="quiz-text" style ={{color:"blue",fontSize: "60px "}}>{this.CalTotalCost()}</span>
                <div className="button-centered">
                    <div className="button button-blue">매도</div>
                    <div className="button button-gray" >
                        취소
                    </div>
                </div>
            </div>
        );
      }
}
export default SellStockPage;