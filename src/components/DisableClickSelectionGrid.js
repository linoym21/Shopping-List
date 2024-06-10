import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { incrementItem, decrementItem, removeItem, toggleItemStrike } from '../features/listSlice';
import Box from '@mui/material/Box';

export default function DisableClickSelectionGrid() {
    const items = useSelector((state) => state.list || []);
    const dispatch = useDispatch();

    const columns = [

        { field: 'text', headerName: 'Item Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <button className='btn' padding onClick={(e) => { e.stopPropagation(); dispatch(decrementItem(params.id)); }}>-</button>

                    <button className='btn' onClick={(e) => { e.stopPropagation(); dispatch(removeItem(params.id)); }}>Delete</button>

                    <button className='btn' onClick={(e) => { e.stopPropagation(); dispatch(incrementItem(params.id)); }}>+</button>

                </>
            )
        },

    ];

    const rows = items.map(item => ({ id: item.id, ...item }));

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
