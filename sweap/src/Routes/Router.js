import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {  MainPage,BuyStockPage, SellStockPage, SearchPage, Portfolio, Contest, Login, Price ,Register, StockInformation} from './index';


const RRouter = () => (
    <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<MainPage /> }/>
            <Route path='/buy' element={<BuyStockPage /> }/>
            <Route path='/sell' element={<SellStockPage /> }/>
            <Route path='/search' element={<SearchPage /> }/>
            <Route  path="/Portfolio" element={<Portfolio/>} />
            <Route  path="/Price" element={<Price/>} />
            <Route path="/contest" element={<Contest/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/StockInformation" element={<StockInformation/>} />
          </Routes>
          <Navigation/>
        </div>
      </Router>
);


export default RRouter;
