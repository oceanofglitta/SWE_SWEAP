import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuySellPage from './components/BuySellPage';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';

class App extends Component {
  render() {
    return (
      <>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<MainPage /> }/>
            <Route path='/buysell'element={<BuySellPage /> }/>
            <Route path='/search'element={<SearchPage /> }/>
          </Routes>
        </div>
      </Router>
      </>
    );
  }
}
export default App;