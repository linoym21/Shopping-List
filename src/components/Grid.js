import * as React from 'react';
import { useSelector } from 'react-redux'; // <-- ייבוא ה-Hook של useSelector

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Grid(props) {
    // const list = useSelector(state => state.list.list)


    return (
        <Grid item xs={12} md={6} key={category}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                {props}
            </Typography>
            <Demo>
                <List dense={dense}>
                    {props[category].map(item => (
                        <ListItem
                            key={item.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={item.text}
                                secondary={secondary ? 'Secondary text' : null}
                            />
                        </ListItem>
                    ))}
                </List>
            </Demo>
        </Grid>
    )
}
