import * as React from 'react';
import { useSelector } from 'react-redux'; 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {updateList } from "../features/listSlice";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { useEffect } from 'react';
import Categories from './Categories';



export default function InteractiveList() {
    const dispatch = useDispatch()
    const selectList = state => state.list;
    const list = useSelector(selectList);
    const categories2 = Object.keys(list);

useEffect(() => {
    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:3000/items');
            dispatch(  updateList(response.data));
                    } 
            catch (error) {
            console.error(error.response.data.error); 
        }
    }

   fetchData(); 
}, []);

    return (
        <Box sx={{ flexGrow: 1.5, maxWidth: 752 }}>
            <Grid container spacing={2}  >
                {categories2.map(category => (
                    <Categories key={category} data={{category}}/>
                ))}
            </Grid>
        </Box>
    );
}