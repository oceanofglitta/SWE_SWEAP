import React from "react";
import "../css/Contest.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import { BiTrophy } from "react-icons/bi";
function clickToRanking(e){ window.location.href="/ranking"} //사용자의 자산 평가 페이지로 이동 함수
//주식 경진대회 클래스
class Contest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestNum: 1,
      contestName: "",
      startDate: "",
      finishDate: "",
      preStartDate: "",
      preFinishDate: "",

      userID: window.sessionStorage.getItem("userID"),
      profit: 989812,
    };

    this.getContestInfo();
    this.getPortpolioInfo();
  }

  getContestInfo = () => {
    const post = {
      query: "SELECT * FROM CONTEST ORDER BY ContestNum DESC LIMIT 1;",
    };
    fetch("http://18.118.194.10:8080/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          contestNum: json.ContestNum,
          contestName: json.ContestName,
          startDate: json.StartDate,
          finishDate: json.FinishDate,
          preStartDate: json.PreStartDate,
          preFinishDate: json.PreFinishDate,
        });
      });

    console.log(this.state);
  };

  getPortpolioInfo = () => {
    console.log(this.state);

    const post = {
      query:
        "SELECT Profit FROM PORTFOLIO WHERE UserID = '".concat(
          this.state.userID
        ) + "';",
    };
      fetch("http://18.118.194.10:8080/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          profit: json.Profit,
        });
        console.log("포트폴리오인포");
        console.log(this.state);
      });
  };

  participate = () => {
    console.log(this.state);
    const post = {
      query:
        "SELECT EXISTS (SELECT * FROM PARTICIPATE WHERE UserID = '".concat(
          this.state.userID
        ) + "' LIMIT 1) AS SUCCESS;", // 사용자가 이미 참가자명단에 있으면 1 리턴
    };
    console.log(post.query);
     fetch("http://18.118.194.10:8080/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.SUCCESS) {
          alert("이미 참가 신청했습니다.");
        } else {
          const post2 = {
            query:
              "INSERT INTO PARTICIPATE (UserID, ContestNum, InitialProfit) VALUES ('".concat(
                this.state.userID
              ) +
              "'," +
              this.state.contestNum +
              "," +
              this.state.profit +
              ");",
          };
          fetch("http://18.118.194.10:8080/SQL1", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(post2),
          });

          alert("참가 신청이 완료되었습니다.");
          window.location.href = "/";
        }
      });
  };

  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <NavLink to="/" className="icon">
            <IoIosArrowBack size="40" />
          </NavLink>
          <NavLink to="/ranking" className="icon">
            <BiTrophy size="40" />
          </NavLink>
        </div>
        <div className="contesttt">
          <div className="contest1">
            {this.state.contestName}
            <br />
            참가자 모집
          </div>
          <div className="contest2">
            <br />
            <br />
            <br />
            대회 기간
            <br />
            {this.state.startDate} ~ {this.state.finishDate}
            <br />
            <br />
            신청 기간
            <br />
            {this.state.preStartDate} ~ {this.state.preFinishDate}
            <br />
            <br />
            <br />
            <div class="container">
              <div class="card">
                <RiMoneyDollarCircleLine class="face front" />
                <RiMoneyDollarCircleLine class="face back" />
              </div>
            </div>
          </div>
        </div>
        <br />
        <button className="ContestButton" onClick={this.participate}>
          참가신청
        </button>
      </>
    );
  }
}

export default Contest;
