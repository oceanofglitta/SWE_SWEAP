import React, { Component } from 'react';
import styled from 'styled-components';

class Portfolio2 extends Component {
    render() {
      return (
        <body>
        <p>보유 자산 : 3000</p>
        <p>투자 가능 금액: 2000</p>
        <p>보유 주식: 삼성전자 : 1</p>
        </body>
      );
    }
  }
  
export default Portfolio2;


const Container = styled.div`
    width: 100%;
    border-style: solid; 
    border-width: 0 0 0 8px; padding: 12px;
    border-color: #0067A3; 
    word-break: break-all;
`

const Button = styled.div`
    margin: 0 auto;
    width: 1080px;
    height: 100px;
    display: flex;
    flex-flow: row wrap;
`

const Search = styled.div`
    order: 3;
    width: 1000px;
    background-color: #FFFFFF;
    text-align: center;
    color: #0607A3;
`
