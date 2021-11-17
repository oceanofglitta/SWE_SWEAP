import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
      return (
        <Nav>
            <NavList>
                <NavItem><Link to='/'><b>마이페이지</b></Link></NavItem>
                <NavItem><b>역사</b></NavItem>
                <NavItem><Link to='/Price'><b>매수 및 매도</b></Link></NavItem>
            </NavList>
        </Nav>
      );
    }
  }
  
export default Navigation;

const Nav = styled.div`
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #d1d8e4;
`

const NavList = styled.ul`
    width: 1080px;
    display: flex;
    margin: 0 auto;
`

const NavItem = styled.li`
    width: 120px;
    margin-left: 15px;
    margin-top: 5px;
    display: flex;
    font-family: "Malgun Gothic";
    font-size: 18px;
`