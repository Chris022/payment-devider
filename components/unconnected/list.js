import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    table: {
      width: 600
    },
  });

export default function List({ columns, data, primaryColumn, setSelected, selected }) {

    const classes = useStyles();

    const handleChange = (event) => {
        let old = selected;
        if(event.target.checked){
            old = [...old,event.target.name]
        }else{
            old = old.filter(item => item !== event.target.name)
        }
        setSelected(old);
        return true;
      };

    return (
        <TableContainer className={classes.table} component={Paper} elevation={3}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> # </TableCell>
                        {columns.map((column, key) => {
                            return (<TableCell align="left" key={"table:" + column}><h2>{column}</h2></TableCell>)
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rkey) => {
                        return (
                            <TableRow key={"row"+rkey}>
                                <TableCell><Checkbox name={""+row[primaryColumn]} onChange={handleChange}/></TableCell>
                                {columns.map((el,key) => {
                                    return (<TableCell key={"row"+rkey+"val"+key} component="th" scope="row">{row[el]}</TableCell>)
                                })}
                            </TableRow>
                        )
                    })} 
                </TableBody>
            </Table>
        </TableContainer>
    )
}