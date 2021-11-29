import React, { useState } from "react";
import "../css/Write.css";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Write() {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const { title, content } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  function write() {
    const post = {
      query:
        "INSERT INTO BOARD (BoardNum, Title, Content, LikeCnt, DayTime) VALUES ('" +
        0 +
        "','" +
        title +
        "','" +
        content +
        "'," +
        0 +
        ", NOW());",
    };
    console.log(post.query);

     fetch("http://18.118.194.10:8080/SQL1", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    });

    alert("작성 완료");
    window.location.href = "/board";
  }

  console.log(inputs);

  return (
    <>
      <div className="Write">
        <NavLink to="/board">
          <IoIosArrowBack size="40" />
        </NavLink>
        게시글 작성
      </div>
      <input
        className="write_title"
        placeholder="Title"
        name="title"
        value={title}
        onChange={onChange}
      />
      <input
        className="write_content"
        placeholder="Fill the content."
        name="content"
        value={content}
        onChange={onChange}
      />
      <br />
      <div style={{ textAlign: "center" }}>
        <button className="WriteButton" onClick={write}>
          완료
        </button>
      </div>
    </>
  );
}

export default Write;
