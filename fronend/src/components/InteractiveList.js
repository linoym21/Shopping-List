import * as React from 'react';
import { useSelector } from 'react-redux'; 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeItem, decrementItem, incrementItem } from "../features/listSlice";
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
    const dispatch = useDispatch()
    const [dense, setDense] = React.useState(false);
    const selectList = state => state.list;
    const list = useSelector(selectList);
    const categories = Object.keys(list);
//The items within the category
    return (
        <Box sx={{ flexGrow: 1.5, maxWidth: 752 }}>
            <Grid container spacing={2}  >
                {categories.map(category => (
                    <Grid item xs={12} md={6} key={category} sx={{ pt:'4%' }}  >
                        <Typography sx={{ mt: 4, mb: 2, borderBottom: '2px solid blue', color: 'blue' , pl:'4%' }} variant="h6" component="div">
                            {category}
                        </Typography>
                        <Demo >
                            <List dense={dense}>
                                {list[category].map(item => (
                                    <ListItem
                                        key={item.id}
                                        secondaryAction={
                                            <React.Fragment>
                                                <IconButton edge="end" aria-label="add" onClick={() => dispatch(incrementItem(item))}>
                                                    <AddIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeItem(item))}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="subtract" onClick={() => dispatch(decrementItem(item))}>
                                                    <RemoveIcon />
                                                </IconButton>
                                            </React.Fragment>
                                        }
                                    >
                                        <ListItemText
                                            primary={item.text + " X " + item.quantity}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Demo>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
