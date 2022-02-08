import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, FormControl, InputLabel, TextField, MenuItem } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 600
    },
    button:{
        margin: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
  }));


export default function Filter({name,label, options, onFilter,lables}) {

    const classes = useStyles();

    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleFilter = (event) => {
        onFilter({"filter":{name:value}});
    };
  
    
    return (
        <Paper elevation={3} className={classes.paper} >
            <center>
                {label}
                <FormControl className={classes.formControl}>
                    <Select value={value} onChange={handleChange}>
                            {options.map((option,key) => {
                                return (<MenuItem key={"filterOption:"+key} value={option}>{lables[key]}</MenuItem>)
                            })}
                    </Select>
                </FormControl>
                <Button className={classes.button} variant="contained" color="secondary" onClick={handleFilter}>Filter</Button>
            </center>
        </Paper>
    )
}