import React, { useState } from "react";
import "../css/Register.css";
import { NavLink } from "react-router-dom";

function Register() {
  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
    pwc: "",
    nickname: "",
    email: "",
    pwq: "",
    pwa: "",
  });

  const { id, pw, pwc, nickname, email, pwq, pwa } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs({
      id: "",
      pw: "",
      pwc: "",
      email: "",
      pwq: "",
      pwa: "",
    });
  };

  const submitCheck = () => {
    console.log("submitcheck");
    if (pw != pwc) alert("비밀번호를 다시 확인해주세요.");
    else register();
  };

  function register() {
    const post = {
      query:
        "INSERT INTO USER (UserID, Password, Email, PwQuestion, PwAnswer, IsManger) VALUES ('" +
        id +
        "','" +
        pw +
        "','" +
        email +
        "','" +
        pwq +
        "','" +
        pwa +
        "'," +
        0 +
        ");",
    };
    console.log(post.query);
    fetch("http://localhost:4000/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    });

    alert("회원가입이 완료되었습니다.");
    // window.location.href = "/login";
  }

  console.log(inputs);

  return (
    <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
      <h1 style={{ textAlign: "center" }}>SWEAP 회원가입</h1>
      <br />
      <div className="Register">
        <div className="TEXT">아이디</div>
        <input
          className="Input"
          name="id"
          placeholder=" 내용을 입력해주세요"
          onChange={onChange}
          value={id}
        />
      </div>
      <br />
      <div className="Register">
        <div className="TEXT">비밀번호</div>
        <input
          type="password"
          className="Input"
          name="pw"
          placeholder=" 내용을 입력해주세요"
          onChange={onChange}
          value={pw}
        />
      </div>
      <br />
      {pw !== "" ? (
        <>
          <div className="Register">
            <div className="TEXT">
              비밀번호 <br />
              확인
            </div>
            <input
              type="password"
              className="Input"
              name="pwc"
              placeholder=" 내용을 입력해주세요"
              onChange={onChange}
              value={pwc}
            />
          </div>
          <br />
        </>
      ) : (
        <></>
      )}
      <div className="Register">
        <div className="TEXT">e-mail</div>
        <input
          className="Input"
          name="email"
          placeholder=" 내용을 입력해주세요"
          onChange={onChange}
          value={email}
        />
      </div>
      <br />
      <div className="Register">
        <div className="TEXT">
          비밀번호 <br />
          질문선택
        </div>
        <select
          className="Input"
          name="pwq"
          placeholder=" 내용을 입력해주세요"
          onChange={onChange}
          value={pwq}
        >
          <option value="1">기억에 남는 추억의 장소는?</option>
          <option value="2">자신의 인생 좌우명은?</option>
          <option value="3">자신의 보물 제 1호는?</option>
          <option value="4">가장 기억에 남는 선생님 성함은?</option>
          <option value="5">다시 태어나면 되고 싶은 것은?</option>
        </select>
      </div>
      <br />
      <div className="Register">
        <div className="TEXT">
          비밀번호 <br />
          답변입력
        </div>
        <input
          className="Input"
          name="pwa"
          placeholder=" 내용을 입력해주세요"
          onChange={onChange}
          value={pwa}
        />
      </div>
      <br />
      <br />
      <div className="Button">
        {id === "" &&
        pw === "" &&
        pwc === "" &&
        email === "" &&
        pwq === "" &&
        pwa === "" ? (
          <NavLink className="toLogin" to="../login">
            취소
          </NavLink>
        ) : (
          <button className="CancelButton" onClick={onReset}>
            초기화
          </button>
        )}
        {id === "" || pw === "" || pwc === "" || email === "" || pwa === "" ? (
          <button disabled className="RegisterButton" onClick={submitCheck}>
            회원가입
          </button>
        ) : (
          <button className="RegisterButton" onClick={submitCheck}>
            회원가입
          </button>
        )}
      </div>
    </div>
  );
}

export default Register;
