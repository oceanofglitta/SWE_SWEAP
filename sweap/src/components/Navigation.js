import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "../css/Navigation.css";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineFileSearch } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

class Navigation extends Component {
  render() {
    return (
      <div className="Navigation1">
        <NavLink className="Navigation2" to="/home">
          <AiOutlineHome size="25" />홈
        </NavLink>
        <NavLink className="Navigation2" to="/search">
          <AiOutlineFileSearch size="25" />
          주식 조회
        </NavLink>
        <NavLink className="Navigation2" to="/contest">
          <AiOutlineStar size="25" />
          경진대회
        </NavLink>
        <NavLink className="Navigation2" to="/login">
          <CgProfile size="25" />
          마이페이지
        </NavLink>
      </div>
    );
  }
}

export default Navigation;
