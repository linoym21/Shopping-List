import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeItem, decrementItem, incrementItem } from "../features/listSlice";
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

   
export default function Items(data) {
    const dispatch = useDispatch()

    return (
        <ListItem
                secondaryAction={
                <React.Fragment>
                    <IconButton edge="end" aria-label="add" onClick={() => dispatch(incrementItem(data.data))}>
                        <AddIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeItem(data.data))}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="subtract" onClick={() => dispatch(decrementItem(data.data))}>
                        <RemoveIcon />
                    </IconButton>
                </React.Fragment>
            }
        >
            <ListItemText
                primary={data.data.text + " X " + data.data.quantity}
            />
        </ListItem>
    );
}