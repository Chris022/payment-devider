import { Paper } from '@material-ui/core';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 600
  },
  button:{
      margin: theme.spacing(2)
  },
  formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
  },
}));

export default function Statistic({data}) {

  const classes = useStyles();

  const visibilityData = {
    labels: ['Chris', 'Kay'],
    datasets: [
      {
        label: '# of Votes',
        data: data,
        backgroundColor: [
          'rgba(255, 0, 0, 0.2)',
          'rgba(0, 0, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 0, 0, 0.2)',
          'rgba(0, 0, 255, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <center>
        <Pie data={visibilityData}/>
        <h2>{Math.abs(data[0]-data[1])} €</h2>
      </center>
    </Paper>
  )
}