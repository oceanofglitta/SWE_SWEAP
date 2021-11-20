import React from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import "./css/Login.css";
import { Link } from "react-router-dom";

function Login() {
  function handleClick(e) {
    window.location.href = "/register";
  }

  return (
    <>
      <div className="Login">
        <br />
        SWEAP
        <br />
        <RiMoneyDollarCircleLine size="150" />
      </div>
      <form>
        <br />
        <div className="Login2">
          <input className="LInput" name="id" placeholder=" ID" />
          <br />
          <br />
          <input className="LInput" name="pw" placeholder=" PW" />
        </div>
        <br />
        <br />
      </form>
      <div className="Buttons">
        <button className="LoginButton">로그인</button>
        <button className="LRegisterButton" onClick={handleClick}>
          회원가입
        </button>
      </div>
    </>
  );
}

export default Login;
