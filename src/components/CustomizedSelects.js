import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from '../features/listSlice';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';


const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default function CustomizedSelects() {
    const [inputValue, setInputValue] = React.useState('');
    const [category, setCategory] = React.useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const addItemHandler = () => {
        if (inputValue.trim() === '' || category.trim() === '') {
            setError('Both item and category must be selected');
            alert('Both item and category must be selected');

            return;
        }

        dispatch(addItem({ text: inputValue, category: category }));
        setInputValue('');
        setCategory('');
        setError('');
    };

    return (




        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <FormControl sx={{ m: 1 }} variant="standard">
                {/* <InputLabel htmlFor="demo-customized-textbox">Item</InputLabel> */}
                <BootstrapInput
                    id="demo-customized-textbox"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
                {/* <InputLabel id="demo-customized-select-label" style={{ color: 'black' }}>Category</InputLabel> */}
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={category}
                    onChange={handleCategoryChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'cleaning products'}>cleaning products</MenuItem>
                    <MenuItem value={'cheeses'}>cheeses</MenuItem>
                    <MenuItem value={'vegetables and fruits'}>vegetables and fruits</MenuItem>
                    <MenuItem value={'meat and fish'}>meat and fish</MenuItem>
                    <MenuItem value={'pastries'}>pastries</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
                <Button variant="contained" onClick={addItemHandler}>Add</Button>
            </FormControl>

        </div>



    );
}
