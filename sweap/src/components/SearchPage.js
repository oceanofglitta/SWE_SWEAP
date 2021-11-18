import { render } from '@testing-library/react';// eslint-disable-line no-unused-vars
import React from 'react';
import { Component, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';
import shortStockInfos from './stockList.json';
import '../css/SearchPage.css'

class SearchPage  extends Component {
    constructor() { 
        super();

        this.state={
            search:null
        };
    }

    searchSpace=(event)=>{
        let keyword = event.target.value;
        this.setState({search:keyword})
    }

    render() {
        const styleInfo = {
            paddingRight:'10px'
        }

        const items = shortStockInfos.filter((data)=> {
            if(this.state.search == null) return data
            else if(data.name.toLowerCase().includes(this.state.search.toLowerCase())) return data
        }).map((data, index)=> {
            return (
                <div className="stockItem" key={index}>{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.currentPrice}원</div>
            )
        })

        return (
            <main className="centered">
                <div className="searchSpace">
                    <input type="text" placeholder="StockName" className="searchForm" onChange={(e)=>this.searchSpace(e)} />
                </div>
                <div className="searchResult">
                   {items}
                </div>
            </main>
        )
      }
}
export default SearchPage;