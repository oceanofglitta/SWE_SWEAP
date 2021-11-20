import { render } from '@testing-library/react';// eslint-disable-line no-unused-vars
import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import '../css/StockInformation.css';


class StockInformation  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockName:"삼성전자",
            cost: 73200,
            changeRate: 10,
        };
    }
    render() {
        let plusminus = '+';
        return (
                <main className="centered">
                    <div className="StockNow">
                        <div className="StockName">{this.state.stockName}</div>
                        <div className="StockCurrentPrice">{this.state.cost} ({plusminus}{this.state.changeRate}%)</div>
                    </div>
                    <div className="chart-wrapper">
                        차트 임시
                    </div>
                    <div className="buttons-wrapper">
                    
                        <div className="buttonsss">1D</div>
                        <div className="buttonsss">1W</div>
                        <div className="buttonsss">1M</div>
                        <div className="buttonsss">6M</div>
                    </div>
                    <div className="goju-wrapper">
                        <div className="gojuga">고가<br/>123,456원</div>
                        <div className="gojuga">저가<br/>1,111원</div>
                        <hr />
                    </div>
                    <div className="info-wrapper">
                    </div>
                </main>
        );
      }
}
export default StockInformation;
