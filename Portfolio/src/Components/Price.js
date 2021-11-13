import { findByDisplayValue } from '@testing-library/dom';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Price extends Component {
    render() {
      const stockname = '삼성전자';
      const price = 1000;
      return (
        <body>
        <text>
          <p>{stockname}</p>
          <p>가격 : {price}</p>
          <button><Link to='/Portfolio2'>주식 매수</Link></button>
        </text>
        <text>
          <button><Link to ='/Portfolio3'>주식 매도</Link></button>
        </text>
        </body>
      );
    }
  }
  
export default Price;


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

const text = styled.div`
    text-align: center;
`
