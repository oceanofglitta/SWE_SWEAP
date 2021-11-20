import React from "react";
import "./css/Ranking.css";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Ranking() {
  const sample = [
    {
      id: "gayoungee",
      profit: 35.5,
    },
    {
      id: "park3",
      profit: 20.5,
    },
    {
      id: "gogogo",
      profit: 19.5,
    },
    {
      id: "chang___nos",
      profit: 18.4,
    },
    {
      id: "parkk_ny0",
      profit: -15.3,
    },
  ];

  return (
    <>
      <NavLink to="/">
        <IoIosArrowBack size="40" />
      </NavLink>
      <div className="ranking1">제 2회 모의투자 경진대회 결과</div>
      <div className="ranking">
        <br />
        <br />
        <div className="top1">
          <div className="top3">
            1<div>{sample[0].id}</div>
            <div style={{ color: sample[0].profit > 0 ? "red" : "blue" }}>
              {sample[0].profit}%
            </div>
          </div>
        </div>
        <br />
        <div className="tops">
          <div className="top3">
            2<div>{sample[1].id}</div>
            <div style={{ color: sample[1].profit > 0 ? "red" : "blue" }}>
              {sample[1].profit}%
            </div>
          </div>
          <br />
          <div className="top3">
            3<div>{sample[2].id}</div>
            <div style={{ color: sample[2].profit > 0 ? "red" : "blue" }}>
              {sample[2].profit}%
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="ranking3">
          4<div>{sample[3].id}</div>
          <div style={{ color: sample[3].profit > 0 ? "red" : "blue" }}>
            {sample[3].profit}%
          </div>
        </div>
        <br />
        <div className="ranking3">
          5<div>{sample[4].id}</div>
          <div style={{ color: sample[4].profit > 0 ? "red" : "blue" }}>
            {sample[4].profit}%
          </div>
        </div>
        <br />
        <div className="ranking3">6</div>
        <br />
        <div className="ranking3">7</div>
      </div>
    </>
  );
}

export default Ranking;
