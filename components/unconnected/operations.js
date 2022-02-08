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


/**
 * 
 * options: [
 *  {
 *      "name":"name",
 *      "handlerFunction":func
 *  }
 * ]
 * 
 * 
 */
export default function Operations({name,label, options, onFilter}) {

    const classes = useStyles();

    const handleFilter = (event) => {
        onFilter({"filter":{name:value}});
    };
    
    return (
        <Paper elevation={3} className={classes.paper} >
            <center>
                {options.map((option,key) => {
                    return <Button key={option.name + ":" + key} className={classes.button} variant="contained" color="secondary" onClick={option.handlerFunction}>{option.name}</Button>
                })}
            </center>
        </Paper>
    )
}