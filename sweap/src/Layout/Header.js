import React, { Component } from 'react';
import styled from 'styled-components';

class Header extends Component {
    render() {
      return (
        <Container>
            <Element>
                <Search><h1>SWEAP</h1></Search>
            </Element>
        </Container>
      );
    }
  }
  
export default Header;

const Container = styled.div`
    width: 100%;
    border-style: solid; 
    border-width: 0 0 0 8px; padding: 12px;
    border-color: #0067A3; 
    word-break: break-all;
`

const Element = styled.div`
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
