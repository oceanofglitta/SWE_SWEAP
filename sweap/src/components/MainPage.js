import { render } from "@testing-library/react"; // eslint-disable-line no-unused-vars
import React from "react";
import { Component } from "react/cjs/react.production.min";
import "../css/MainPage.css";
//메인페이지 클래스
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
    this.getTitle();
  }
  getTitle = () => {
    const post = {
      query: "SELECT Title FROM BOARD ORDER BY LikeCnt DESC;",
    };

    console.log(post.query);

    fetch("http://18.118.194.10:8080/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          title: json.Title,
        });
      });
  };

  render() {
    return (
      <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
        <h1 style={{ textAlign: "center", fontSize: "10vh" }}>SWEAP</h1>

        <div className="align">
          <div
            className="box_account"
            onClick={() => (window.location.href = "./PortFolio")}
          >
            <t style={{ color: "white" }}>
              {window.sessionStorage.getItem("userID")}
            </t>
          </div>
        </div>
        <br />
        <div
          className="box_contest"
          onClick={() => (window.location.href = "./contest")}
        >
          <span className="box_contest_text">
            <t style={{ fontWeight: "bold" }}>" 제 2회 모의투자 경진대회 "</t>
            <br />
            참가신청 바로가기
          </span>
        </div>
        <div
          className="box_event"
          onClick={() => (window.location.href = "./board")}
        >
          <span className="box_event_text">
            ⭐인기 게시글⭐
            <br />
            <t style={{ fontWeight: "bold" }}>" {this.state.title} "</t>
          </span>
        </div>
      </div>
    );
  }
}

export default MainPage;
