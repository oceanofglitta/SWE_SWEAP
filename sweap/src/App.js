import React, { Component, useEffect } from 'react';
import ReactDOM from "react-dom";
import RRouter from './Routes/Router';
import shortStockInfos from './dataframe.json';

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }

  const fireNotif = () => {
    /* 권한 요청 부분 */
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          /* 권한을 요청받고 nofi를 생성해주는 부분 */
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      /* 권한이 있을때 바로 noti 생성해주는 부분 */
      new Notification(title, options);
    }
  };
  return fireNotif;
};

const sanghan = shortStockInfos.data.filter((data) => {
  if(data.변동률 > 10) return data
}).map((data, index) => (data.종목))

const hahan = shortStockInfos.data.filter((data) => {
  if(data.변동률 < -10) return data
}).map((data, index) => (data.종목))

const App = () => {
  const sang = useNotification(sanghan , {
    body: "상한가에 도달했습니다!"
  });
  const ha = useNotification(hahan , {
    body: "하한가에 도달했습니다!"
  });

  return (
    <div className="App">
      <button onClick={sang}> 상한가 알림 </button>
      <button onClick={ha}> 하한가 알림 </button>
      <RRouter />
    </div>
  );
};

export default App;
