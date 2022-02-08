import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { Select, FormControl, InputLabel, TextField, MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format'
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    saveButton: {
        marginTop: theme.spacing(5)
    }
}));

/**
 * supportet Data Types:
 *  Number,
 *  Date,
 *  String,
 *  List
 * 
 * data: [
 *      {
 *          "name" : NAME
 *          "type" : TYPE
 *          "data" : DATA
 *      }
 * ]
 * 
 */
export default function CreateComponent({options,submitFunc,open,setOpen}) {

    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const [data, setData] = React.useState({});

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Paper elevation={3} style={{ "width": "auto", "height": "auto", "textAlign":"center", "padding":50 }} >
                {options.map((option,key) => {
                    if(option["type"] == "text"){
                        return (<div key={"input:"+option["name"]}><StringInput  name={option["name"]} data={data} setData={setData} lable={option["lable"]}/><br/></div>)
                    }
                    if(option["type"] == "select"){
                        return (<div key={"input:"+option["name"]}><SelectInput name={option["name"]} data={data} setData={setData} options={option["data"]} labels={option["lables"]} lable={option["lable"]}/><br/></div>)
                    }
                    if(option["type"] == "date"){
                        return (<div key={"input:"+option["name"]}><DateInput name={option["name"]} data={data} setData={setData}/><br/></div>)
                    }
                })}
                <br/>
                <Button variant="contained" className={classes.saveButton} color="secondary" onClick={()=>{submitFunc(data);setOpen(false)}}>Save</Button>
            </Paper>
        </Modal>
    )
}

function StringInput({name,setData,data,lable}) {

    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
        setData({
            ...data,
            [name]:event.target.value
        })
    };

    return ( <TextField value={value} onChange={handleChange} placeholder={lable}/> )
}

function SelectInput({ name,options,labels,setData,data,lable }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        setData({
            ...data,
            [name]:event.target.value
        })
    };

    return (
        <div>
        <FormControl className={classes.formControl}>
            <InputLabel>{lable}</InputLabel>
            <Select value={value} onChange={handleChange}>
                {options.map((option,key) => {
                    return (<MenuItem key={name+":"+key} value={option}>{labels[key]}</MenuItem>)
                })}
            </Select>
        </FormControl>
        </div>
    );
}

function DateInput({name,setData,data}) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    React.useEffect(()=>{
        setData({
            ...data,
            [name]:format(selectedDate, 'yyyy-MM-dd HH:mm:ss')
        })
    },[])

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData({
            ...data,
            [name]:format(date, 'yyyy-MM-dd HH:mm:ss')
        })
    };
  
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
                autoOk
                ampm={false}
                value={selectedDate}
                onChange={handleDateChange}
                label="24h clock"
            />
        </MuiPickersUtilsProvider>
    )
}