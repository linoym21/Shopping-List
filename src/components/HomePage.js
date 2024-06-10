
import React, { useState, useEffect } from 'react';
import AddItem from './AddItem';
import CustomizedSelects from './CustomizedSelects'
import InteractiveList from './InteractiveList'
import Box from '@mui/material/Box';

function HomePage() {
  return (
    // <>

    //   <CustomizedSelects />
    //   <InteractiveList />

    // </>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CustomizedSelects />
      <InteractiveList />
    </div>


  );

} export default HomePage;
