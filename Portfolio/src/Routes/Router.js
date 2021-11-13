import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {  Portfolio, Portfolio2, Portfolio3, Price } from './index';

const Router = () => (
    <Routes>
        <Route exact={true} path="/" element={<Portfolio/>} />
        <Route exact={true} path="/Price" element={<Price/>} />
        <Route exact={true} path="/Portfolio2" element={<Portfolio2/>} />
        <Route exact={true} path="/Portfolio3" element={<Portfolio3/>} />
    </Routes>
);


export default Router;