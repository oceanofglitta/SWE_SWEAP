import { render } from "@testing-library/react"; // eslint-disable-line no-unused-vars
import React from "react";
import {
  Component,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} from "react/cjs/react.production.min";
import shortStockInfos from "../dataframe.json";
import "../css/SearchPage.css";
//주식의 정보를 출력하는 클래스
class SearchPage extends Component {
  constructor() {
    super();

    this.state = {
      search: null,
    };
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  render() {
    const styleInfo = {
      paddingRight: "10px",
    };

    const items = shortStockInfos.data
      .filter((data) => {
        if (this.state.search == null) return data;
        else if (
          data.종목.toLowerCase().includes(this.state.search.toLowerCase())
        )
          return data;
      })
      .map((data, index) => {
        const theStock = "/StockInformation?stockName=" + data.종목;
        return (
          <a href={theStock} style={{ textDecoration: "none" }}>
            <div className="stockItem" key={index}>
              <div>{data.종목}</div>
              <div style={{ color: "rgb(231, 179, 66)" }}>{data.현재가}원</div>
            </div>
          </a>
        );
      });
    return (
      <div style={{ textAlign: "center" }}>
        <div className="searchSpace">
          <input
            type="text"
            placeholder="StockName"
            className="searchForm"
            onChange={(e) => this.searchSpace(e)}
          />
        </div>

        <div className="searchResult">{items}</div>
      </div>
    );
  }
}
export default SearchPage;