import * as React from 'react';
import { useSelector } from 'react-redux'; 
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Items from './Items';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function Categories({data}) {
    const [dense, setDense] = React.useState(false);
    const selectList = state => state.list;
    const list = useSelector(selectList);


    return (
        <Grid item xs={12} md={6} key={data.category} sx={{ pt:'4%' }}  >
            <Typography sx={{ mt: 4, mb: 2, borderBottom: '2px solid blue', color: 'blue' , pl:'4%' }} variant="h6" component="div">
            {data.category}
            </Typography>
            <Demo >
                <List dense={dense}>
                    {list[data.category].map(item => (
                        <Items key={item.id} data={item}/>
                    ))}
                </List>
            </Demo>
        </Grid>
    );
}