import React from "react";
import "../css/Ranking.css";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";

function createData(id, profit) {
  return { id, profit };
}
//경진대회 랭킹 함수 
class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: "1번",
          profit: 0,
        },
        {
          id: "2번",
          profit: 0,
        },
        {
          id: "3번",
          profit: 0,
        },
        {
          id: "4번",
          profit: 0,
        },
        {
          id: "5번",
          profit: 0,
        },
        {
          id: "6번",
          profit: 0,
        },
        {
          id: "7번",
          profit: 0,
        },
      ],
    };

    this.getRanking();
  }

  getRanking = () => {
    console.log(this.state);
    const post = {
      // InitialProfit --> ContestProfit으로 수정해야됨
      query:
        "SELECT * FROM PARTICIPATE WHERE ContestNum = 1 ORDER BY InitialProfit DESC LIMIT 7;",
      // "SELECT * FROM PARTICIPATE WHERE ContestNum = 1 ORDER BY ContestProfit DESC LIMIT 7;",
    };
    fetch("http://18.118.194.10:8080/SQL2", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        for (let i = 0; i < json.length; ++i) {
          this.state.list.shift();
          this.setState({
            list: this.state.list.concat(
              createData(json[i].UserID, json[i].InitialProfit)
            ),
          });
        }
      });
  };

  render() {
    return (
      <>
        <div style={{ margin: "10px", display: "flex" }}>
          <NavLink to="/contest" className="icon">
            <IoIosArrowBack size="40" />
          </NavLink>
          <div className="ranking1">제 1회 모의투자 경진대회 결과</div>
        </div>
        <div className="ranking">
          <br />
          <div className="top1">
            <div className="top3">
              <t style={{ color: "rgb(218, 187, 104)" }}> 1</t>
              <div style={{ color: "white" }}>{this.state.list[0].id}</div>
              <div
                style={{
                  color: this.state.list[0].profit > 0 ? "red" : "blue",
                }}
              >
                {this.state.list[0].profit}%
              </div>
            </div>
          </div>
          <br />
          <div className="tops">
            <div className="top3">
              <t style={{ color: "rgb(218, 187, 104)" }}> 2</t>
              <div style={{ color: "white" }}>{this.state.list[1].id}</div>
              <div
                style={{
                  color: this.state.list[1].profit > 0 ? "red" : "blue",
                }}
              >
                {this.state.list[1].profit}%
              </div>
            </div>
            <br />
            <div className="top3">
              <t style={{ color: "rgb(218, 187, 104)" }}> 3</t>
              <div style={{ color: "white" }}>{this.state.list[2].id}</div>
              <div
                style={{
                  color: this.state.list[2].profit > 0 ? "red" : "blue",
                }}
              >
                {this.state.list[2].profit}%
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="ranking3">
            4.<div>{this.state.list[3].id}</div>
            <div
              style={{ color: this.state.list[3].profit > 0 ? "red" : "blue" }}
            >
              {this.state.list[3].profit}%
            </div>
          </div>
          <br />
          <div className="ranking3">
            5.<div>{this.state.list[4].id}</div>
            <div
              style={{ color: this.state.list[4].profit > 0 ? "red" : "blue" }}
            >
              {this.state.list[4].profit}%
            </div>
          </div>
          <br />
          <div className="ranking3">
            6.<div>{this.state.list[5].id}</div>
            <div
              style={{ color: this.state.list[5].profit > 0 ? "red" : "blue" }}
            >
              {this.state.list[5].profit}%
            </div>
          </div>
          <br />
          <div className="ranking3">
            7.<div>{this.state.list[6].id}</div>
            <div
              style={{ color: this.state.list[6].profit > 0 ? "red" : "blue" }}
            >
              {this.state.list[6].profit}%
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Ranking;
