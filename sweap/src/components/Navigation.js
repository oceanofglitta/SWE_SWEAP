import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/Navigation.css";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineFileSearch } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineBars } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

class Navigation extends Component {
  render() {
    return (
      <div className="Navigation1">
        <NavLink className="Navigation2" to="/">
          <AiOutlineHome size="25" className="icon" />
          <br />홈
        </NavLink>
        <NavLink className="Navigation2" to="/search">
          <AiOutlineFileSearch size="25" className="icon" />
          <br />
          주식 조회
        </NavLink>
        <NavLink className="Navigation2" to="/contest">
          <AiOutlineStar size="25" className="icon" />
          <br />
          경진대회
        </NavLink>
        <NavLink className="Navigation2" to="/board">
          <AiOutlineBars size="25" className="icon" />
          <br />
          게시판
        </NavLink>
        {window.sessionStorage.getItem("userID") == null ? (
          <NavLink className="Navigation2" to="/login">
            <CgProfile size="25" className="icon" />
            <br />
            로그인
          </NavLink>
        ) : (
          <NavLink className="Navigation2" to="/Portfolio">
            <CgProfile size="25" className="icon" />
            <br />
            마이페이지
          </NavLink>
        )}
      </div>
    );
  }
}

export default Navigation;
