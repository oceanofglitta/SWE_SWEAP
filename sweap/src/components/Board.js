import React from "react";
import "../css/Board.css";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { HiSearch } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";

function createData(title, content, like, time) {
  return { title, content, like, time };
}
//사용자 게시판 클래스
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [
        { title: "", content: "", like: 0, time: "" },
        { title: "", content: "", like: 0, time: "" },
        { title: "", content: "", like: 0, time: "" },
        { title: "", content: "", like: 0, time: "" },
        { title: "", content: "", like: 0, time: "" },
      ],
      modalOn: false,
      search: "",
    };

    this.getArticle();
  }

  handleSearchModal = () => {
    this.setState({ modalOn: !this.state.modalOn });
  };

  searchArticle = () =>
    this.state.article.map((atc) => {
      if (atc.title == this.state.search) {
        console.log("asfsasaasaf");
        return (
          <div className="article">
            <div className="title">{atc.title}</div>
            <div className="content">
              {atc.content}{" "}
              <div style={{ fontSize: "20px" }}>
                <button
                  className="likeButton"
                  onClick={() => this.updateLike(atc.title)}
                >
                  <AiFillLike size="20" />
                </button>
                {atc.like}
              </div>
            </div>
          </div>
        );
      }
    });

  updateLike = (title) => {
    console.log("buttonclick");
    const post = {
      query:
        "UPDATE BOARD SET LikeCnt = LikeCnt + 1 WHERE Title = '" + title + "';",
    };

    console.log(post.query);
    fetch("http://18.118.194.10:8080/SQL2", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    });
    window.location.href = "/board";
  };

  showArticle = () =>
    this.state.article.map((atc) => {
      return (
        <div className="article">
          <div className="title">{atc.title}</div>
          <div className="content">
            {atc.content}{" "}
            <div style={{ fontSize: "20px" }}>
              <button
                className="likeButton"
                onClick={() => this.updateLike(atc.title)}
              >
                <AiFillLike size="20" />
              </button>
              {atc.like}
            </div>
          </div>
        </div>
      );
    });

  getArticle = () => {
    const post = {
      query: "SELECT * FROM BOARD ORDER BY DayTime DESC;",
    };

    console.log(post.query);
    fetch("http://18.118.194.10:8080/SQL2", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        for (let i = 0; i < 5; ++i) this.state.article.shift();
        for (let i = 0; i < json.length; ++i) {
          this.setState({
            article: this.state.article.concat(
              createData(
                json[i].Title,
                json[i].Content,
                json[i].LikeCnt,
                json[i].DayTime
              )
            ),
          });
        }
      });
  };

  handleInput = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    return (
      <>
        <div className="Board">
          {this.state.modalOn ? (
            <IoIosArrowBack
              className="icon"
              size="40"
              onClick={() => (window.location.href = "/board")}
            />
          ) : (
            <NavLink to="/">
              <IoIosArrowBack className="icon" size="40" />
            </NavLink>
          )}
          게시판
          <HiSearch
            className="icon"
            size="25"
            style={{ marginTop: "10px" }}
            onClick={() =>
              this.setState({
                modalOn: true,
              })
            }
            visibility={this.state.modalOn && "hidden"}
          />
        </div>
        {this.state.modalOn && (
          <>
            <br />
            <div className="search">
              <input
                className="searchInput"
                name="search"
                value={this.state.search}
                onChange={this.handleInput}
                placeholder="제목을 입력해주세요."
              />
            </div>
            <br />
          </>
        )}
        {this.state.modalOn && this.searchArticle()}
        {!this.state.modalOn && this.showArticle()}
        <div style={{ textAlign: "center" }}>
          <NavLink className="WriteButton" to="/write">
            글 쓰기
          </NavLink>
        </div>
      </>
    );
  }
}

export default Board;
