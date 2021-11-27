import React, { useState } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import "../css/Login.css";

function Login() {
  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });

  const { id, pw } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  function handleLogin() {
    const post = {
      query:
        "SELECT EXISTS (SELECT * FROM USER WHERE UserID = '" +
        id +
        "' AND Password = '" +
        pw +
        "' LIMIT 1) AS SUCCESS;",
    };
    console.log(post.query);

    fetch("http://localhost:4000/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.SUCCESS) {
          window.sessionStorage.setItem("userID", id);
          window.location.href = "/ranking"; // 로그인 성공시 페이지 이동
        } else alert("ID/PW를 다시 확인해주세요.");
      });
  }

  function toRegister(e) {
    window.location.href = "/register";
  }

  console.log(inputs);

  return (
    <>
      <div className="Login">
        <br />
        SWEAP
        <br />
        <RiMoneyDollarCircleLine size="150" />
      </div>
      <br />
      <div className="Login2">
        <input
          className="LInput"
          name="id"
          placeholder=" ID"
          onChange={onChange}
          value={id}
        />
        <br />
        <br />
        <input
          className="LInput"
          name="pw"
          placeholder=" PW"
          onChange={onChange}
          value={pw}
        />
      </div>
      <br />
      <br />
      <div className="Buttons">
        <button className="LoginButton" onClick={handleLogin}>
          로그인
        </button>
        <button className="LRegisterButton" onClick={toRegister}>
          회원가입
        </button>
      </div>
    </>
  );
}

export default Login;
