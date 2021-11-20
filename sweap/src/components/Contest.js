import React from "react";
import "./css/Contest.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Contest() {
  const participate = () => {
    alert("참가 신청이 완료되었습니다.");

    window.location.href = "/home";
  };

  const contest = {
    contestNum: 1,
    contestName: "SWEAP",
    startDate: "2021.11.22",
    finishDate: "2021.12.05",
    preStartDate: "2021.11.15",
    preFinishDate: "2021.11.21",
  };

  return (
    <>
      <NavLink to="/">
        <IoIosArrowBack size="40" />
      </NavLink>
      <div className="contest1">
        제 {contest.contestNum}회
        <br />
        {contest.contestName}
        <br />
        모의투자 경진대회
        <br />
        참가자 모집
      </div>
      <div className="contest2">
        <br />
        대회 기간
        <br />
        {contest.startDate} - {contest.finishDate}
        <br />
        <br />
        신청 기간
        <br />
        {contest.preStartDate} - {contest.preFinishDate}
        <br />
        <br />
      </div>
      <div>
        <RiMoneyDollarCircleLine size="150" />
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <button className="ContestButton" onClick={participate}>
          참가신청
        </button>
      </div>
    </>
  );
}

export default Contest;
