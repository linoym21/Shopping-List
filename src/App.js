import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from "./components/HomePage";
import { Provider } from 'react-redux';
import List from './components/List';
import TotalItems from './components/TotalItems';
import ScrollTop from './components/ScrollTop'
import { useScrollTrigger, Zoom } from '@mui/material';
import DisableClickSelectionGrid from './components/DisableClickSelectionGrid'
function App() {


  return (
    <div>
      <ScrollTop />
      <HomePage />
      {/* < DisableClickSelectionGrid /> */}
      {/* <List /> */}
    </div>


  );
}

export default App;
